import React from 'react';
import '../Css/UsuarioPage.css';

function UsuarioPage() {
    const handleEdit = (index) => {
        setNombreCategoria(productos[index].nombre);
        setEditIndex(index);
      };
    
      const handleDelete = (index) => {
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
      };
    const usuarios = [
        {
            usuarioID: 1,
            UsuarioID: 'U001',
            Nombre: 'quintero',
            Correo: 'quintero@example.com',
            telefono: '12345678',
            fechanacimiento: '1990-05-15',
            sexo: 'Masculino',
            rol: 'Administrador',
            estado: 'Activo'
        },
        {
            usuarioID: 2,
            UsuarioID: 'U002',
            Nombre: 'quintero',
            Correo: 'quintero@example.com',
            telefono: '123456781',
            fechanacimiento: '1990-05-15',
            sexo: 'Femenino',
            rol: 'Usuario',
            estado: 'Inactivo'
        }
    ];

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
                                    <tr key={usuario.usuarioID}>
                                        <td>{usuario.usuarioID}</td>
                                        <td>{usuario.Nombre}</td>
                                        <td>{usuario.Correo}</td>
                                        <td>{usuario.telefono}</td>
                                        <td>{usuario.fechanacimiento}</td>
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