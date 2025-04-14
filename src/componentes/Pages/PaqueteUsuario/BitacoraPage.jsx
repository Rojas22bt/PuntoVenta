import React from 'react'
import '../../Css/BitacoraPage.css'
import { obtenerBitacoraRequest } from '../../../api/auth'

const BitacoraPage = () => {

    const obtenerBitacora = async () => {
        try {
            const res = await obtenerBitacoraRequest();
            console.log(res.data); 
        } catch (error) {
            console.error("Error al obtener la bitácora:", error);
        }
    };
    

    const bitacoras = [
        {
            BitacoraID: 1,
            UsuarioID: 'U001',
            Nombre: 'Juan Pérez',
            Correo: 'juan@example.com',
            ip: '192.168.1.10',
            fecha: '2025-04-04',
            Hora: '10:23:45',
            Accion: 'Inicio de sesión'
        },
        {
            BitacoraID: 2,
            UsuarioID: 'U002',
            Nombre: 'María López',
            Correo: 'maria@example.com',
            ip: '192.168.1.20',
            fecha: '2025-04-04',
            Hora: '10:45:12',
            Accion: 'Actualización de perfil'
        },
        {
            BitacoraID: 3,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 4,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 5,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 6,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 7,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 8,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 39,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 10,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 11,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 12,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        },
        {
            BitacoraID: 13,
            UsuarioID: 'U003',
            Nombre: 'Carlos Díaz',
            Correo: 'carlos@example.com',
            ip: '192.168.1.30',
            fecha: '2025-04-03',
            Hora: '09:15:33',
            Accion: 'Cierre de sesión'
        }
    ]

        return (
            <div className="bitacora-container">
                <div>
                    <h2>Registros de acciones en el Sistema</h2>
                    <button onClick={obtenerBitacora}>Listar Bitacora</button>
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
                                        <tr key={bitacora.BitacoraID}>
                                            <td>{bitacora.BitacoraID}</td>
                                            <td>{bitacora.UsuarioID}</td>
                                            <td>{bitacora.Nombre}</td>
                                            <td>{bitacora.Correo}</td>
                                            <td>{bitacora.ip}</td>
                                            <td>{bitacora.fecha}</td>
                                            <td>{bitacora.Hora}</td>
                                            <td>{bitacora.Accion}</td>
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