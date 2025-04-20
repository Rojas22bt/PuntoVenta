import React, { useState, useEffect } from 'react';
import '../../Css/PrivilegioPage.css';
import { useAuth } from '../../../context/AuthContext';
import { actualizarPermisosRequest } from '../../../api/auth';

function PrivilegioPage() {
    const { roles, permisos } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [privilegios, setPrivilegios] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState('');
    const [mensajeExitoso, setMensajeExitoso] = useState('');
    const [loading, setLoading] = useState(true);
    const [privilegiosOriginales, setPrivilegiosOriginales] = useState([]);


    useEffect(() => {
        if (permisos && rolSeleccionado) {
            setLoading(true);
            const timer = setTimeout(() => {
                const filtrados = permisos.filter(p => p.rol === parseInt(rolSeleccionado));
                setPrivilegios(filtrados);
                setPrivilegiosOriginales(filtrados); // guardamos copia original
                setLoading(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [rolSeleccionado, permisos]);



    useEffect(() => {
        if (!rolSeleccionado && roles.length > 0) {
            setRolSeleccionado(roles[0].id.toString()); // o directamente roles[0].id si no haces parseInt luego
        }
    }, [roles]);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const manejarCambio = (id) => {
        setPrivilegios(prev =>
            prev.map(priv =>
                priv.id === id ? { ...priv, estado: !priv.estado } : priv
            )
        );
    };

    const manejarCambioRol = (event) => {
        setRolSeleccionado(event.target.value);
        setIsMenuOpen(false);
        setMensajeExitoso('');
    };

    const guardarCambios = async () => {
        const cambios = privilegios.filter((p) => {
            const original = privilegiosOriginales.find(o => o.id === p.id);
            return original && original.estado !== p.estado;
        });
    
        if (cambios.length === 0) {
            setMensajeExitoso("No hay cambios para guardar.");
            return;
        }
    
        const payload = {
            rolActualizo: parseInt(rolSeleccionado),
            permisos: cambios.map(p => ({
                id: p.id,
                estado: p.estado
            }))
        };
    

        console.log(payload)
        try {
            const res = await actualizarPermisosRequest(payload);
            console.log(res.data)
            if (res.data.mensaje) {
                setMensajeExitoso("Cambios guardados exitosamente");
                setPrivilegiosOriginales(privilegios); // actualizamos referencia
            } else {
                setMensajeExitoso("Error al guardar cambios");
            }
        } catch (error) {
            console.error("Error al enviar al backend:", error);
            setMensajeExitoso("Error de conexión");
        }
    };
    

    return (
        <div className='principalPrivilegio'>
            <h1>Gestión de Privilegios</h1>
            <div className='contenedorPrivilegios'>
                <div className='contenedorRol'>
                    <h2>Seleccionar Rol</h2>
                    <select
                        name="rol"
                        className="form-control"
                        value={rolSeleccionado}
                        onChange={manejarCambioRol}
                        required
                    >
                        <option value="">Seleccione rol</option>
                        {roles.map((rol) => (
                            <option key={rol.id} value={rol.id}>
                                {rol.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                {rolSeleccionado && (
                    <div className='contenedorPrivilegios'>
                        <button onClick={toggleMenu} className="toggle-menu">
                            Privilegios {isMenuOpen ? "▲" : "▼"}
                        </button>
                        {isMenuOpen && (
                            <div className="submenu">
                                {loading ? (
                                    <p className="mensaje-cargando">Cargando privilegios...</p>
                                ) : (
                                    <>
                                        <ul className="privileges-list">
                                            {privilegios.map((privilegio) => (
                                                <li key={privilegio.id} className="privilege-item">
                                                    <span className="privilege-name">{privilegio.privilegio_nombre}</span>
                                                    <button
                                                        onClick={() => manejarCambio(privilegio.id)}
                                                        className={`privilege-button ${privilegio.estado ? 'active' : 'inactive'}`}
                                                    >
                                                        {privilegio.estado ? 'OK' : 'NO'}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                        <button onClick={guardarCambios} className="save-changes">
                                            Guardar Cambios
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {mensajeExitoso && (
                <div className="mensaje-exito">
                    {mensajeExitoso}
                </div>
            )}
        </div>
    );
}

export default PrivilegioPage;
