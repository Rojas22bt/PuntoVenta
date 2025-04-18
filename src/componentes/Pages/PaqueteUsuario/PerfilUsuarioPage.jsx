import React, { useState, useEffect } from 'react';
import '../../Css/PerfilUsuarioPage.css';
import { useAuth } from '../../../context/AuthContext';

function PerfilUsuarioPage() {

    const { user } = useAuth();


    const [nit, setNit] = useState('');
    const [ci, setCI] = useState('');

    useEffect(() => {
        if (user?.documentos && Array.isArray(user.documentos)) {
            user.documentos.forEach((doc) => {
                if (doc.documento__descripcion === "Carnet de Identidad") setCI(doc.numero);
                if (doc.documento__descripcion === "NIT") setNit(doc.numero);
            });
        }
    }, [user]);

    if (!user) return <p>Cargando usuario...</p>;
    

    return (
        <div className='conteinerPerfilUsuario'>
            <div className='perfilCard'>

                <div className="headerUsuario">
                    <div className="tituloConIcono">
                        <h2 className='titleUsuario'>{user.nombre}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="34" fill="currentColor" className="bi bi-person iconoUsuario" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </div>
                    <hr className="lineaDecorativa" />
                </div>

                <div className="mb-3">
                    <label>Nombre:</label>
                    <input type="text" className="form-control" value={user.nombre} readOnly />
                </div>

                <div className="mb-3">
                    <label>Correo:</label>
                    <input type="email" className="form-control" value={user.correo} readOnly />
                </div>

                <div className="mb-3">
                    <label>Teléfono:</label>
                    <input type="tel" className="form-control" value={user.telefono} readOnly />
                </div>

                <div className="mb-3">
                    <label>Fecha de Nacimiento:</label>
                    <input type="date" className="form-control" value={user.fecha_nacimiento} readOnly />
                </div>

                <div className="mb-3">
                    <label>Sexo:</label>
                    <input type="text" className="form-control" value={user.sexo} readOnly />
                </div>

                <div className="mb-3">
                    <label>Estado:</label>
                    <input type="text" className="form-control" value={user.estado} readOnly />
                </div>

                <div className="mb-3">
                    <label>Puntos:</label>
                    <input type="number" className="form-control" value={user.puntos} readOnly />
                </div>

                <h2>Documentos</h2>

                <div className="mb-3">
                    <label>CI:</label>
                    <input type="text" className="form-control" value={ci} readOnly />
                </div>

                <div className="mb-3">
                    <label>NIT:</label>
                    <input type="number" className="form-control" value={nit} readOnly />
                </div>

            </div>
        </div>
    );
}

export default PerfilUsuarioPage;
