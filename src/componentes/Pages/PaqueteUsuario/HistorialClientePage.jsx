import React, { useState, useEffect } from 'react';
import '../../Css/HistorialClientePage.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { obtenerHistotialCliente } from '../../../api/auth';
import { useAuth } from '../../../context/AuthContext';

function HistorialClientePage() {
    const { user } = useAuth();

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [historial, setHistorial] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');

    const listarHistorial = (comprobantes) => {
        const datosConvertidos = comprobantes.map(comprobante => ({
            fecha: comprobante.fecha,
            documento: comprobante.documento_usuario,
            tipo: "Factura",
            montoTotal: comprobante.precio_total,
            detalles: [...(comprobante.detalles_productos || []), ...(comprobante.detalles_ofertas || [])]
        }));

        setHistorial(datosConvertidos);
        setMostrarTabla(true);
    };

    const obtenerBk = async () => {
        try {
            const data = {
                correo: user.correo,
                fecha_inicio: desde,
                fecha_fin: hasta
            };

            const response = await obtenerHistotialCliente(data);

            if (response.data.comprobantes && response.data.comprobantes.length > 0) {
                listarHistorial(response.data.comprobantes);
                setNombreUsuario(response.data.nombre);
            } else {
                alert("No hay comprobantes disponibles en el rango indicado.");
                setHistorial([]);
                setMostrarTabla(false);
            }
        } catch (error) {
            console.error("Error al obtener el historial del cliente:", error);
            alert("Ocurrió un error al consultar el historial.");
        }
    };

    const exportarExcel = () => {
        if (!historial.length) {
            alert("No hay datos para exportar.");
            return;
        }

        const data = historial.map(item => ({
            Fecha: item.fecha,
            Documento: item.documento,
            Tipo: item.tipo,
            "Monto Total": item.montoTotal,
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Historial");
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(file, `historial_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const exportarPDF = () => {
        if (!historial.length) {
            alert("No hay datos para exportar.");
            return;
        }

        const doc = new jsPDF();
        doc.text(`Historial del Cliente: ${nombreUsuario}`, 20, 20);

        const data = historial.map(item => [
            item.fecha,
            item.documento,
            item.tipo,
            item.montoTotal,
        ]);

        doc.autoTable({
            head: [["Fecha", "Documento", "Tipo", "Monto Total"]],
            body: data,
            startY: 30,
        });

        doc.save(`historial_cliente_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const exportarPDFUnic = (item) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Comprobante de Historial", 70, 20);

        doc.setFontSize(12);
        doc.text(`Cliente: ${nombreUsuario}`, 20, 40);
        doc.text(`Fecha: ${item.fecha}`, 20, 50);
        doc.text(`Documento: ${item.documento}`, 20, 60);
        doc.text(`Tipo: ${item.tipo}`, 20, 70);
        doc.text(`Monto Total: Bs ${item.montoTotal}`, 20, 80);

        if (item.detalles && item.detalles.length) {
            const detalleData = item.detalles.map(d => [
                d.producto || d.oferta || "Ítem",
                d.cantidad || 1,
                d.precio_unitario || d.precio_oferta || 0,
                d.subtotal || 0
            ]);

            doc.autoTable({
                head: [["Item", "Cantidad", "Precio Unitario", "Subtotal"]],
                body: detalleData,
                startY: 90,
            });
        }

        doc.save(`comprobante_${item.documento}.pdf`);
    };

    if (!user) return <p>Cargando usuario...</p>;

    return (
        <div className='historialConteiner'>
            <h1>Historial del Cliente: {nombreUsuario}</h1>
            <div className="input-group">
                <div className="mb-3">
                    <label>Desde: </label>
                    <input
                        type="date"
                        name="desde"
                        className="form-control"
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Hasta: </label>
                    <input
                        type="date"
                        name="hasta"
                        className="form-control"
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={obtenerBk}>
                        Listar Historial
                    </button>
                    <button className="btn btn-success" onClick={exportarExcel}>
                        Exportar a Excel
                    </button>
                    <button className="btn btn-danger" onClick={exportarPDF}>
                        Exportar a PDF
                    </button>
                </div>
            </div>

            {mostrarTabla && (
                <div className='historial-table'>
                    <table className="table-historial">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Documento</th>
                                <th>Tipo</th>
                                <th>Monto Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fecha}</td>
                                    <td>{item.documento}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.montoTotal}</td>
                                    <td>
                                        <button id='VerImprimir' className="btn btn-secondary no-border" onClick={() => exportarPDFUnic(item)}>
                                            Ver/Imprimir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HistorialClientePage;
