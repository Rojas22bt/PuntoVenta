import React, { useState } from 'react';
import '../../Css/UsuarioPage.css';
import { useAuth } from '../../../context/AuthContext';

function UsuarioPage() {
  const { usuarios, roles } = useAuth();

  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    fecha_nacimiento: '',
    sexo: '',
    rol: '',
    estado: true,
  });

  const handleEdit = (index) => {
    const usuario = usuarios[index];
    setEditIndex(index);
    setFormData({
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      fecha_nacimiento: usuario.fecha_nacimiento,
      sexo: usuario.sexo,
      rol: usuario.rol,
      estado: usuario.estado,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario editado:", formData);
    // Aquí deberías llamar a una función para hacer el update en el backend
    setEditIndex(null);
  };


  return (
    <div className="usuario-container">
      <h1>Lista de Usuarios</h1>

      {editIndex !== null && (
        <div className="usuario-form">
          <h3>Editar Usuario</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Nombre</label>
            <input type="text" name="nombre" placeholder="Nombre" className="form-control" value={formData.nombre} onChange={handleChange} required />
            <label htmlFor="">Correo</label>
            <input type="email" name="correo" placeholder="Correo" className="form-control" value={formData.correo} onChange={handleChange} required />
            <label htmlFor="">Telefono</label>
            <input type="text" name="telefono" placeholder="Teléfono" className="form-control" value={formData.telefono} onChange={handleChange} required />
            <label htmlFor="">Fechaa de nacimiento</label>
            <input type="date" name="fecha_nacimiento" className="form-control" value={formData.fecha_nacimiento} onChange={handleChange} required />
            <label htmlFor="">Genero</label>
            <select name="sexo" className="form-control" value={formData.sexo} onChange={handleChange} required>
              <option value="">Seleccione sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            <label htmlFor="">Tipo de rol</label>
            <select name="rol" className="form-control" value={formData.rol} onChange={handleChange} required>
              <option value="">Seleccione rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>
            <label htmlFor="">Estado del usuario</label>  
            <select name="estado" className="form-control" value={formData.estado} onChange={handleChange} required>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>

            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
          </form>
        </div>
      )}

      <div className="table-responsive">
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
              usuarios.map((usuario, index) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.fecha_nacimiento}</td>
                  <td>{usuario.sexo}</td>
                  <td>{roles.find((r) => r.id === usuario.rol)?.nombre || usuario.rol}</td>
                  <td>{usuario.estado ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button onClick={() => handleEdit(index)} className="btn btn-warning">Editar</button>
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
  );
}

export default UsuarioPage;
