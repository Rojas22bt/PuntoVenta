import React, { useState, useEffect } from 'react';
import '../../Css/HistorialClientePage.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function HistorialClientePage() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [historial, setHistorial] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');


    useEffect(() => {
        const fetchNombreUsuario = async () => {
            try {
                const response = await fetch('/api/usuario');
                const data = await response.json();
                setNombreUsuario(data.nombre);
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        };

        fetchNombreUsuario();
    }, []);

    const listarHistorial = () => {
        const datos = [
            { fecha: '2026-10-01', documento: '123456', tipo: 'CI', montoTotal: 100 },
            { fecha: '2025-10-02', documento: '654321', tipo: 'NIT', montoTotal: 200 },
            { fecha: '2024-11-10', documento: '789012', tipo: 'CI', montoTotal: 300 },
        ];

        // Convertimos las fechas
        const desdeFecha = desde ? new Date(desde + 'T00:00:00') : null;
        const hastaFecha = hasta ? new Date(hasta + 'T23:59:59') : null;
        
        const historialFiltrado = datos.filter(item => {
            const fechaItem = new Date(item.fecha + 'T00:00:00');
            if (desdeFecha && fechaItem < desdeFecha) return false;
            if (hastaFecha && fechaItem > hastaFecha) return false;
            return true;
        });
        
        setHistorial(historialFiltrado);
        setMostrarTabla(true);
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

        doc.save(`comprobante_${item.documento}.pdf`);
    };

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
                    <button type="button" className="btn btn-primary" onClick={listarHistorial}>
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
