import React, { useState } from 'react'
import '../../Css/BitacoraPage.css'
import { obtenerBitacoraRequest } from '../../../api/auth'

const BitacoraPage = () => {

    const [bitacoras, setBitacoras] = useState([]);

    const obtenerBitacora = async () => {
        try {
            const res = await obtenerBitacoraRequest();
            setBitacoras(res.data)
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
        }
    };
    
        return (
            <div className="bitacora-container">
                <div>
                    <h2>Registros de acciones en el Sistema</h2>
                    <button onClick={obtenerBitacora} className='btn btn-primary'>Listar Bitacora</button>
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