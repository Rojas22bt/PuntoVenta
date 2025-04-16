import React, { useState, useEffect } from 'react';
import '../../Css/BitacoraPage.css';
import { obtenerBitacoraRequest } from '../../../api/auth';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BitacoraPage = () => {
    const [bitacoras, setBitacoras] = useState([]);
    const [filtros, setFiltros] = useState({
        desde: '',
        hasta: '',
        correo: ''
    });

    const [bitacorasFiltradas, setBitacorasFiltradas] = useState([]);

    useEffect(() => {
        aplicarFiltros();
    }, [bitacoras, filtros]);

    const obtenerBitacora = async () => {
        try {
            const res = await obtenerBitacoraRequest();
            setBitacoras(res.data);
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
        }
    };

    const aplicarFiltros = () => {
        const { desde, hasta, usuario, correo } = filtros;

        const filtradas = bitacoras.filter((bit) => {
            const fecha = new Date(bit.fecha);
            const desdeDate = desde ? new Date(desde) : null;
            const hastaDate = hasta ? new Date(hasta) : null;

            return (
                (!desdeDate || fecha >= desdeDate) &&
                (!hastaDate || fecha <= hastaDate) &&
                (!correo || bit.usuario_correo.toLowerCase().includes(correo.toLowerCase()))
            );
        });

        setBitacorasFiltradas(filtradas);
    };

    const exportarExcel = () => {
        if (!bitacorasFiltradas.length) {
            alert("No hay datos para exportar.");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(bitacorasFiltradas);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Bitacora');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, `bitacora_filtrada_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };

    const exportarPDF = () => {
        if (!bitacorasFiltradas.length) {
            alert("No hay datos para exportar.");
            return;
        }

        const doc = new jsPDF();
        doc.text('Reporte de Bitácora Filtrada', 20, 20);

        const data = bitacorasFiltradas.map((bit) => [
            bit.id,
            bit.usuario,
            bit.usuario_nombre,
            bit.usuario_correo,
            bit.ip,
            bit.fecha,
            bit.hora,
            bit.accion
        ]);

        doc.autoTable({
            head: [['ID', 'Usuario', 'Nombre', 'Correo', 'IP', 'Fecha', 'Hora', 'Acción']],
            body: data,
            startY: 30
        });

        doc.save(`Reporte_Bitacora_Filtrada.pdf`);
    };

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bitacora-container">
            <h2 className="title">Registros de acciones en el Sistema</h2>

            <div className="mb-3">
                <div className="filtro-item">
                    <label htmlFor="desde">Desde:</label>
                    <input className='form-control' type="date" name="desde" value={filtros.desde} onChange={handleFiltroChange} />
                </div>
                <div className="filtro-item">
                    <label htmlFor="hasta">Hasta:</label>
                    <input className='form-control' type="date" name="hasta" value={filtros.hasta} onChange={handleFiltroChange} />
                </div>
                <div className="filtro-item">
                    <label htmlFor="Buscar">Buscar:</label>
                    <input className='form-control' type="text" name="correo" placeholder="Filtrar por correo" value={filtros.correo} onChange={handleFiltroChange} />
                </div>
            </div>


            <div className="button-container-bitacora">
                <button onClick={obtenerBitacora} className="btn btn-primary">Listar Bitacora</button>
                <button onClick={exportarExcel} className="btn btn-primary">Reporte Excel</button>
                <button onClick={exportarPDF} className="btn btn-primary">Reporte PDF</button>
            </div>

            <div className="table-responsive">
                <table className="bitacora-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Dirección IP</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bitacorasFiltradas.length ? (
                            bitacorasFiltradas.map((bitacora) => (
                                <tr key={bitacora.id}>
                                    <td>{bitacora.id}</td>
                                    <td>{bitacora.usuario}</td>
                                    <td>{bitacora.usuario_nombre}</td>
                                    <td>{bitacora.usuario_correo}</td>
                                    <td>{bitacora.ip}</td>
                                    <td>{bitacora.fecha}</td>
                                    <td>{bitacora.hora}</td>
                                    <td>{bitacora.accion}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No se encontraron registros de bitácora.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BitacoraPage;
