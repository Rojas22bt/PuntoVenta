import React, { useState, useEffect } from 'react';
import '../../Css/CaracteristicasPage.css';
import { crearMarcaRequest, crearCategoriaRequest, crearAlmacenRequest, 
        obtenerAlmacenRequest, obtenerMarcaRequest, obtenerCategoriaRequest,
        actualizarAlmacenRequest,actualizarMarcaRequest,actualizarCategoriaRequest
      
      } from '../../../api/auth';

function CategoriaProductPage() {
  // Estados para Categoría
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState(1);
  const [editCategoriaIndex, setEditCategoriaIndex] = useState(null);

  // Estados para Almacén
  const [nombreAlmacen, setNombreAlmacen] = useState('');
  const [almacenes, setAlmacenes] = useState([]);
  const [idAlmacen, setIdAlmacen] = useState(1);
  const [editAlmacenIndex, setEditAlmacenIndex] = useState(null);

  // Estados para Marca
  const [nombreMarca, setNombreMarca] = useState('');
  const [marcas, setMarcas] = useState([]);
  const [idMarca, setIdMarca] = useState(1);
  const [editMarcaIndex, setEditMarcaIndex] = useState(null);

  const [mostrarCategorias, setMostrarCategorias] = useState(true);
  const [mostrarAlmacenes, setMostrarAlmacenes] = useState(true);
  const [mostrarMarcas, setMostrarMarcas] = useState(true);

  const handleFormSubmit = async (e, tipo) => {
    e.preventDefault();
    try {
      if (tipo === 'categoria' && nombreCategoria) {
        if (editCategoriaIndex !== null) {

          const categoriaEditada = categorias[editCategoriaIndex];

          const datosNuevosCategoria ={
            id: categoriaEditada.id,
            nombre: nombreCategoria
          }

          await actualizarCategoriaRequest(datosNuevosCategoria);

          const updated = categorias.map((item, idx) =>
            idx === editCategoriaIndex ? { ...item, nombre: nombreCategoria } : item
          );
          console.log(updated)
          setCategorias(updated);
          setEditCategoriaIndex(null);
        } else {
          const data = {
            nombre: nombreCategoria
          }
          await crearCategoriaRequest(data);
          setCategorias([...categorias, { id: idCategoria, nombre: nombreCategoria }]);
          setIdCategoria(idCategoria + 1);
        }
        setNombreCategoria('');
      } else if (tipo === 'almacen' && nombreAlmacen) {
        if (editAlmacenIndex !== null) {

          const almacenEditada = almacenes[editAlmacenIndex]

          const datoNuevosAlmacen ={
            id : almacenEditada.id,
            descripcion: nombreAlmacen
          }

          await actualizarAlmacenRequest(datoNuevosAlmacen);

          const updated = almacenes.map((item, idx) =>
            idx === editAlmacenIndex ? { ...item, nombre: nombreAlmacen } : item
          );
          setAlmacenes(updated);
          setEditAlmacenIndex(null);
        } else {
          const dato2 = {
            descripcion: nombreAlmacen,
            cantidad: 0
          }
          console.log(dato2)
          await crearAlmacenRequest(dato2);
          setAlmacenes([...almacenes, { id: idAlmacen, descripcion: nombreAlmacen }]);
          setIdAlmacen(idAlmacen + 1);
        }
        setNombreAlmacen('');
      } else if (tipo === 'marca' && nombreMarca) {
        if (editMarcaIndex !== null) {

          const marcaEditada = marcas[editMarcaIndex]

          const datosNuevosMarca = {
            id: marcaEditada.id,
            nombre: nombreMarca
          }

          await actualizarMarcaRequest(datosNuevosMarca);

          const updated = marcas.map((item, idx) =>
            idx === editMarcaIndex ? { ...item, nombre: nombreMarca } : item
          );
          setMarcas(updated);
          setEditMarcaIndex(null);
        } else {
          const dato3 = {
            nombre: nombreMarca
          }
          await crearMarcaRequest(dato3)
          console.log(dato3)
          setMarcas([...marcas, { id: idMarca, nombre: nombreMarca }]);
          setIdMarca(idMarca + 1);
        }
        setNombreMarca('');
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleEdit = (index, tipo) => {
    if (tipo === 'categoria') {
      setNombreCategoria(categorias[index].nombre);
      setEditCategoriaIndex(index);
    } else if (tipo === 'almacen') {
      setNombreAlmacen(almacenes[index].descripcion);
      setEditAlmacenIndex(index);
    } else if (tipo === 'marca') {
      setNombreMarca(marcas[index].nombre);
      setEditMarcaIndex(index);
    }
  };
  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCategorias, resMarcas, resAlmacenes] = await Promise.all([
          obtenerCategoriaRequest(),
          obtenerMarcaRequest(),
          obtenerAlmacenRequest()
        ]);
        setCategorias(resCategorias.data); 
        setMarcas(resMarcas.data);
        setAlmacenes(resAlmacenes.data);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
  
    cargarDatos();
  }, []);


  return (
    <div>
      {/* Sección Categoría */}
      <div className="boxSection">
        <form onSubmit={(e) => handleFormSubmit(e, 'categoria')}>
          <div className="caracteristicasConteinet">
            <h1>Registrar Nueva Categoría</h1>
            <div className="form-group">
              <label htmlFor="categoriaInput">Nombre Categoría</label>
              <input
                type="text"
                className="form-control"
                id="categoriaInput"
                value={nombreCategoria}
                onChange={(e) => setNombreCategoria(e.target.value)}
                placeholder="Ej: Bebidas, Muebles..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {editCategoriaIndex !== null ? 'Actualizar' : 'Registrar'}
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setMostrarCategorias(!mostrarCategorias)}
            >
              {mostrarCategorias ? 'Ocultar Categorías' : 'Listar Categorías'}
            </button>
          </div>
        </form>
        {mostrarCategorias && (
          <div className="tablaCaract">
            <h1>Lista de Categorías</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>
                      <button id='butoneditCarac' className="btn btn-warning" onClick={() => handleEdit(index, 'categoria')}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sección Almacén */}
      <div className="boxSection">
        <form onSubmit={(e) => handleFormSubmit(e, 'almacen')}>
          <div className="caracteristicasConteinet">
            <h1>Registrar Nuevo Almacén</h1>
            <div className="form-group">
              <label htmlFor="almacenInput">Nombre Almacén</label>
              <input
                type="text"
                className="form-control"
                id="almacenInput"
                value={nombreAlmacen}
                onChange={(e) => setNombreAlmacen(e.target.value)}
                placeholder="Ej: Central, Secundario..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editAlmacenIndex !== null ? 'Actualizar' : 'Registrar'}
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setMostrarAlmacenes(!mostrarAlmacenes)}
            >
              {mostrarAlmacenes ? 'Ocultar Almacenes' : 'Listar Almacenes'}
            </button>
          </div>
        </form>

        {mostrarAlmacenes && (
          <div className="tablaCaract">
            <h1>Lista de Almacenes</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {almacenes.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.descripcion}</td>
                    <td>
                      <button id='butoneditCarac' className="btn btn-warning" onClick={() => handleEdit(index, 'almacen')}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Sección Marca */}
      <div className="boxSection">
        <form onSubmit={(e) => handleFormSubmit(e, 'marca')}>
          <div className="caracteristicasConteinet">
            <h1>Registrar Nueva Marca</h1>
            <div className="form-group">
              <label htmlFor="marcaInput">Nombre Marca</label>
              <input
                type="text"
                className="form-control"
                id="marcaInput"
                value={nombreMarca}
                onChange={(e) => setNombreMarca(e.target.value)}
                placeholder="Ej: Coca-Cola, LG..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editMarcaIndex !== null ? 'Actualizar' : 'Registrar'}
            </button>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setMostrarMarcas(!mostrarMarcas)}
            >
              {mostrarMarcas ? 'Ocultar Marcas' : 'Listar Marcas'}
            </button>
          </div>
        </form>

        {mostrarMarcas && (
          <div className="tablaCaract">
            <h1>Lista de Marcas</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcas.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nombre}</td>
                    <td>
                      <button id='butoneditCarac' className="btn btn-warning" onClick={() => handleEdit(index, 'marca')}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriaProductPage;
