import React from 'react';
import '../../Css/UsuarioPage.css';
import { useAuth } from '../../../context/AuthContext';

function UsuarioPage() {

    const { usuarios } = useAuth();

    const handleEdit = (index) => {
        setNombreCategoria(productos[index].nombre);
        setEditIndex(index);
      };
    
      const handleDelete = (index) => {
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
      };
    

    return (
        <div className='usuario-container'>
            <div>
                <h1>Lista de Usuarios</h1>
                <div className="table-responsive"> {/* Contenedor para el scroll horizontal */}
                    <table className="usuario-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Fecha Nacimiento</th>
                                <th>Sexo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(usuarios) && usuarios.length > 0 ? (
                                usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.fecha_nacimiento}</td>
                                        <td>{usuario.sexo}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.estado}</td>
                                        <td>
                                        <button onClick={() => handleEdit(index)} className="btn btn-warning">Editar</button>
                                        <button onClick={() => handleDelete(index)} className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9">No se encontraron registros de usuarios.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UsuarioPage;