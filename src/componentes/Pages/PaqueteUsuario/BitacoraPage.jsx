import React, { useState } from 'react';
import '../../Css/BitacoraPage.css';
import { obtenerBitacoraRequest } from '../../../api/auth';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 


const BitacoraPage = () => {
    const [bitacoras, setBitacoras] = useState([]);

    const obtenerBitacora = async () => {
        try {
            const res = await obtenerBitacoraRequest();
            setBitacoras(res.data);
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
        }
    };

    const exportarExcel = () => {
        if (!bitacoras.length) {
            alert("Primero debe listar la bitácora.");
            return;
        }
    
        const ws = XLSX.utils.json_to_sheet(bitacoras);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Bitacora');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, `bitacora_${new Date().toISOString().slice(0,10)}.xlsx`);
    };
    

    const exportarPDF = () => {
        if (!bitacoras.length) {
            alert("Primero debe listar la bitácora.");
            return;
        }
        const doc = new jsPDF();
        doc.text('Reporte de Bitácora', 20, 20);
        const bitacoraData = bitacoras.map(bitacora => [
            bitacora.id,
            bitacora.usuario,
            bitacora.usuario_nombre,
            bitacora.usuario_correo,
            bitacora.ip,
            bitacora.fecha,
            bitacora.hora,
            bitacora.accion
        ]);
        doc.autoTable({
            head: [['Id', 'Usuario', 'Nombre', 'Correo', 'IP', 'Fecha', 'Hora', 'Acción']],
            body: bitacoraData,
            startY: 30
        });
       doc.save('Reporte_Bitacora.pdf');
    };
    
    

    return (
        <div className="bitacora-container">
            <div>
                <h2 className='title'>Registros de acciones en el Sistema</h2>
                <div className="button-container-bitacora">
                    <button onClick={obtenerBitacora} className='btn btn-primary'>
                        Listar Bitacora
                    </button>
                    <button onClick={exportarExcel} className='btn btn-primary'>
                        Reporte Excel
                    </button>
                    <button onClick={exportarPDF} className='btn btn-primary'>
                        Reporte PDF
                    </button>
                </div>
                <div className="table-responsive"> {/* Contenedor para el scroll horizontal */}
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
                            {Array.isArray(bitacoras) && bitacoras.length > 0 ? (
                                bitacoras.map((bitacora) => (
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
        </div>
    );
}

export default BitacoraPage;