import React, { useState, useRef } from 'react';
import '../../Css/ProductoPage.css';
import { useAuth } from '../../../context/AuthContext';
import { crearProductoRequest, actualizarProductoRequest } from '../../../api/auth';

const ProductoPage = () => {
    const { marcas, categorias, almacenes, cargarProductos, productos } = useAuth();

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: '',
        stock: '',
        modelo: '',
        marca: '',
        categoria: '',
        almacen: '',
        estado: '',
        imagen: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const [loading, setLoading] = useState(false); // Estado para el loading
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevoProducto({ ...nuevoProducto, imagen: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Iniciar loading
        try {
            if (editIndex !== null) {
                const updatedProductos = [...productos];
                updatedProductos[editIndex] = nuevoProducto;
                console.log(updatedProductos);
                setProductos(updatedProductos);
            } else {
                const datos = {
                    nombre: nuevoProducto.nombre,
                    modelo: nuevoProducto.modelo,
                    stock: Number(nuevoProducto.stock),
                    precio: Number(nuevoProducto.precio),
                    estado: nuevoProducto.estado === "true",
                    url: "https://fakeimg.pl/250x100/",
                    almacen: Number(nuevoProducto.almacen),
                    categoria: Number(nuevoProducto.categoria),
                    marca: Number(nuevoProducto.marca)
                };
                await crearProductoRequest(datos);
                setProductos([...productos, { ...nuevoProducto, productoID: productos.length + 1 }]);
            }
            setNuevoProducto({
                nombre: '',
                modelo: '',
                marca: '',
                categoria: '',
                stock: '',
                precio: '',
                almacen: '',
                estado: '',
                imagen: ''
            });
            setEditIndex(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Finalizar loading
        }
    };

    const handleEdit = (index) => {
        setNuevoProducto(productos[index]);
        setEditIndex(index);
    };

    const handleListProductos = async () => {
        setLoading(true); // Iniciar loading
        try {
            await cargarProductos();
            if (productos.length > 0) {
                alert("Productos existentes: " + productos.map(producto => producto.productoID).join(", "));
            } else {
                alert("No hay Productos existentes.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Finalizar loading
        }
    };

    return (
        <div className="producto-container">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner">
                        <span className="spinner-grow spinner-grow-lg" aria-hidden="true"></span>
                        <span role="status">Loading...</span>
                    </div>
                </div>
            )}
            <form className='form-container' onSubmit={handleSubmit}>
                <h1>{editIndex !== null ? 'Editar Producto' : 'Agregar Producto'}</h1>

                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="nombre" value={nuevoProducto.nombre} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Modelo">Modelo</label>
                    <input type="text" name="modelo" value={nuevoProducto.modelo} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Marca">Marca</label>
                    <select
                        name="marca"
                        value={nuevoProducto.marca}
                        onChange={handleInputChange}
                        className='form-control'
                        required
                    >
                        <option value="">Selecciona una Marca</option>
                        {marcas.map((mar) => (
                            <option key={mar.id} value={mar.id}>
                                {mar.nombre}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="Categoria">Categoría</label>
                    <select
                        name="categoria"
                        value={nuevoProducto.categoria}
                        onChange={handleInputChange}
                        className='form-control'
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Stock">Stock</label>
                    <input type="number" name="stock" value={nuevoProducto.stock} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Precio">Precio</label>
                    <input type="number" name="precio" value={nuevoProducto.precio} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Almacen">Almacén</label>
                    <select
                        name="almacen"
                        value={nuevoProducto.almacen}
                        onChange={handleInputChange}
                        className='form-control'
                        required
                    >
                        <option value="">Selecciona un Almacén</option>
                        {almacenes.map((alma) => (
                            <option key={alma.id} value={alma.id}>
                                {alma.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Estado">Estado</label>
                    <select name="estado" value={nuevoProducto.estado} onChange={handleInputChange} className='form-control' required>
                        <option value="">Estado</option>
                        <option value="true">Disponible</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="imagen">Imagen</label>
                    <input
                        type="file"
                        name="Imagen"
                        accept="image/*"
                        onChange={handleImageChange}
                        className='form-control'
                        required
                        ref={fileInputRef} // Asignar la referencia aquí
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        {editIndex !== null ? 'Actualizar Producto' : 'Agregar Producto'}
                    </button>
                </div>
            </form>

            <div className="text-center mt-3">
                <button onClick={handleListProductos} className="btn btn-primary" disabled={loading}>
                    'Listar Productos Existentes'
                </button>
            </div>
            <div className='form-containe'>
                <h1>Lista de Productos</h1>
                <div className="table-responsive">
                    <table className="producto-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Modelo</th>
                                <th>Marca</th>
                                <th>Categoría</th>
                                <th>Stock</th>
                                <th>Precio</th>
                                <th>Almacén</th>
                                <th>Estado</th>
                                <th>Imagen</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.length > 0 ? (
                                productos.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.modelo}</td>
                                        <td>{producto.marca}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.stock}</td>
                                        <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                        <td>{producto.almacen}</td>
                                        <td>{producto.estado}</td>
                                        <td>
                                            <img
                                                src={producto.url}
                                                alt={producto.nombre}
                                                onClick={() => handleImageClick(producto.url)}
                                                style={{ width: '50px', height: 'auto', cursor: 'pointer' }}
                                            />
                                        </td>
                                        <td>
                                            <button onClick={() => handleEdit(index)} className="btn btn-warning">Editar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No se encontraron registros de productos.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showImage && (
                <div className="modal" onClick={handleCloseImage}>
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseImage}>&times;</span>
                        <img src={showImage} alt="Producto" className="large-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductoPage;