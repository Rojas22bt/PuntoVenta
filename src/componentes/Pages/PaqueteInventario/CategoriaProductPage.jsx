import React, { useState } from 'react';
import '../../Css/CategoriaProductPage.css';

function CategoriaProductPage() {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [productos, setProductos] = useState([]);
  const [idIncremental, setIdIncremental] = useState(1);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombreCategoria) {
      if (editIndex !== null) {
        // Editar producto existente
        const updatedProductos = productos.map((producto, index) =>
          index === editIndex ? { ...producto, nombre: nombreCategoria } : producto
        );
        setProductos(updatedProductos);
        setEditIndex(null);
      } else {
        // Agregar nuevo producto
        const nuevoProducto = {
          id: idIncremental,
          nombre: nombreCategoria,
        };
        setProductos([...productos, nuevoProducto]);
        setIdIncremental(idIncremental + 1);
      }
      setNombreCategoria('');
    }
  };

  const handleEdit = (index) => {
    setNombreCategoria(productos[index].nombre);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProductos = productos.filter((_, i) => i !== index);
    setProductos(updatedProductos);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <div className='categoriaproductoConteiner'>
        <h1>Registrar Nueva Categoria</h1>
          <div className="form-group">
            <label htmlFor="categoriaInput">Nueva Categoria</label>
            <input
              type="text"
              className="form-control"
              id="categoriaInput"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              placeholder="Ingresa el nombre de la categoria"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editIndex !== null ? 'Actualizar' : 'Registrar'}
          </button>
        </div>
      </form>

     
      <div className='tablaCategorias'>
      <h1>Lista de Productos Registrados</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>
                  <button onClick={() => handleEdit(index)} className="btn btn-warning">Editar</button>
                  <button onClick={() => handleDelete(index)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoriaProductPage;