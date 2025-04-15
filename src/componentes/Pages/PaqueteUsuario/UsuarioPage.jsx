import React, { useState, useEffect } from 'react';
import '../../Css/UsuarioPage.css';
import { useAuth } from '../../../context/AuthContext';
import { actualizarUsuario, obtenerUsuarios } from '../../../api/auth'; // 👈 importa la función que recupera usuarios

function UsuarioPage() {
  const { usuarios, roles, setUsuarios } = useAuth(); // Asegúrate que `setUsuarios` exista en el context
  const [filtroLetra, setFiltroLetra] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    correo: '',
    telefono: '',
    fecha_nacimiento: '',
    sexo: '',
    rol: '',
    estado: true,
  });

  const [filtroCorreo, setFiltroCorreo] = useState('');
  const [filtroSexo, setFiltroSexo] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const handleEdit = (index) => {
    const usuario = usuarios[index];
    setEditIndex(index);
    setFormData({
      id: usuario.id,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      estado: formData.estado === "true" || formData.estado === true,
    };
    try {
      await actualizarUsuario(data);
      await fetchUsuarios(); // 👈 recargamos usuarios luego de editar
    } catch (err) {
      console.error(err);
    }
    setEditIndex(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setFormData({
      nombre: '',
      correo: '',
      telefono: '',
      fecha_nacimiento: '',
      sexo: '',
      rol: '',
      estado: true,
    });
  };

  const handleRefresh = async () => {
    setFiltroCorreo('');
    setFiltroSexo('');
    setFiltroEstado('');
    setFiltroLetra('');
    await fetchUsuarios(); // 👈 fuerza recarga
  };

  const fetchUsuarios = async () => {
    try {
      const nuevosUsuarios = await obtenerUsuarios();
      setUsuarios(nuevosUsuarios);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  const usuariosFiltrados = usuarios
    .filter((u) =>
      u.correo.toLowerCase().includes(filtroCorreo.toLowerCase())
    )
    .filter((u) => (filtroSexo ? u.sexo === filtroSexo : true))
    .filter((u) =>
      filtroEstado !== '' ? u.estado === (filtroEstado === 'true') : true
    )
    .filter((u) =>
      filtroLetra ? u.nombre.toUpperCase().startsWith(filtroLetra) : true
    );

  return (
    <div className="usuario-container">
      <h1>Lista de Usuarios</h1>

      <div className="filtros-horizontal">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por Gmail"
          value={filtroCorreo}
          onChange={(e) => setFiltroCorreo(e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Buscar por letra (A-Z)"
          maxLength="1"
          value={filtroLetra}
          onChange={(e) => setFiltroLetra(e.target.value.toUpperCase())}
        />

        <select
          className="form-control"
          value={filtroSexo}
          onChange={(e) => setFiltroSexo(e.target.value)}
        >
          <option value="">Todos los sexos</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>

        <select
          className="form-control"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <button className="btn btn-primary w-50" onClick={handleRefresh}>
          Refrescar
        </button>
      </div>

      {editIndex !== null && (
        <div className="usuario-form">
          <h3>Editar Usuario</h3>
          <form onSubmit={handleSubmit}>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <label>Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              disabled
            />

            <label>Telefono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
            />

            <label>Fecha de nacimiento</label>
            <input
              type="date"
              name="fecha_nacimiento"
              className="form-control"
              value={formData.fecha_nacimiento}
              disabled
            />

            <label>Género</label>
            <select
              name="sexo"
              className="form-control"
              value={formData.sexo}
              disabled
            >
              <option value="">Seleccione sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>

            <label>Tipo de rol</label>
            <select
              name="rol"
              className="form-control"
              value={formData.rol}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione rol</option>
              {roles.map((rol) => (
                <option key={rol.id} value={rol.id}>
                  {rol.nombre}
                </option>
              ))}
            </select>

            <label>Estado del usuario</label>
            <select
              name="estado"
              className="form-control"
              value={formData.estado}
              onChange={handleChange}
              required
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>

            <div className="botones-formulario">
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancel}
              >
                Cancelar Cambios
              </button>
            </div>
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
            {Array.isArray(usuariosFiltrados) && usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((usuario, index) => (
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
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn btn-warning"
                    >
                      Editar
                    </button>
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
