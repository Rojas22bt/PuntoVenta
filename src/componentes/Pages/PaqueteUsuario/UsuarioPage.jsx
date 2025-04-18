import React, { useState } from 'react';
import '../../Css/UsuarioPage.css';
import { useAuth } from '../../../context/AuthContext';
import { actualizarUsuario} from '../../../api/auth';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function UsuarioPage() {
  const { usuarios, roles,recargarUsuarios } = useAuth(); // Asegúrate que `setUsuarios` exista en el context
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
      console.log(data)
        await actualizarUsuario(data);
    } catch (err) {
      throw err
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
    try {
      await recargarUsuarios();
    } catch (error) {
        console.log(error)
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
    const exportarExcel = () => {
      if (!usuariosFiltrados.length) {
        alert("No hay usuarios para exportar.");
        return;
      }
  
      const data = usuariosFiltrados.map((u) => ({
        ID: u.id,
        Nombre: u.nombre,
        Correo: u.correo,
        Teléfono: u.telefono,
        "Fecha Nacimiento": u.fecha_nacimiento,
        Sexo: u.sexo,
        Rol: roles.find((r) => r.id === u.rol)?.nombre || u.rol,
        Estado: u.estado ? "Activo" : "Inactivo",
      }));
  
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const file = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(file, `usuarios_filtrados_${new Date().toISOString().slice(0, 10)}.xlsx`);
    };
  
    const exportarPDF = () => {
      if (!usuariosFiltrados.length) {
        alert("No hay usuarios para exportar.");
        return;
      }
  
      const doc = new jsPDF();
      doc.text("Reporte de Usuarios Filtrados", 20, 20);
  
      const data = usuariosFiltrados.map((u) => [
        u.id,
        u.nombre,
        u.correo,
        u.telefono,
        u.fecha_nacimiento,
        u.sexo,
        roles.find((r) => r.id === u.rol)?.nombre || u.rol,
        u.estado ? "Activo" : "Inactivo",
      ]);
  
      doc.autoTable({
        head: [["ID", "Nombre", "Correo", "Teléfono", "Fecha Nacimiento", "Sexo", "Rol", "Estado"]],
        body: data,
        startY: 30,
      });
  
      doc.save(`usuarios_filtrados.pdf`);
    };
  
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

        <div className="button-container-bitacora">
                <button onClick={handleRefresh} className="btn btn-primary">Refresh</button>
                <button onClick={exportarExcel} className="btn btn-primary">Reporte Excel</button>
                <button onClick={exportarPDF} className="btn btn-primary">Reporte PDF</button>
            </div>
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
