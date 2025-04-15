import React, { useState, useRef } from 'react';
import '../../Css/ProductoPage.css';
import { useAuth } from '../../../context/AuthContext';
import { crearProductoRequest } from '../../../api/auth';

const ProductoPage = () => {

    const { marcas, categorias, almacenes } = useAuth();

    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: '',
        stock: '',
        modelo: '',
        marca: '',
        categoria: '',
        almacen: '',
        estado: '',
        imagen: '' // Nuevo campo para la imagen
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showImage, setShowImage] = useState(null); // Estado para mostrar la imagen grande
    const fileInputRef = useRef(null); // Referencia para el input de archivo

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
        try {
            if (editIndex !== null) {
                const updatedProductos = [...productos];
                updatedProductos[editIndex] = nuevoProducto;
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

                }
                console.log(datos)
                await crearProductoRequest(datos)
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
                imagen: '' // Reiniciar el campo de imagen
            });
            setEditIndex(null);

            // Restablecer el input de archivo
            if (fileInputRef.current) {
                fileInputRef.current.value = null; // Esto restablece el campo de archivo
            }
        } catch (error) {

        }
    };

    const handleEdit = (index) => {
        setNuevoProducto(productos[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedProductos = productos.filter((_, i) => i !== index);
        setProductos(updatedProductos);
    };

    const handleImageClick = (imagen) => {
        setShowImage(imagen);
    };

    const handleCloseImage = () => {
        setShowImage(null);
    };
    const handleListProductos = () => {
        if (productos.length > 0) {
            console.log("Productos existentes:", productos);
            alert("Productos existentes: " + productos.map(producto => producto.productoID).join(", "));
        } else {
            alert("No hay Productos existentes.");
        }
    };
    return (
        <div className="producto-container">
            <h1>{editIndex !== null ? 'Editar Producto' : 'Agregar Producto'}</h1>
            <form onSubmit={handleSubmit}>
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
                <button onClick={handleListProductos} className="btn btn-primary">
                    Listar Productos Existentes
                </button>
            </div>
            <div>
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
                                <th>Imagen</th> {/* Nueva columna para la imagen */}
                                <th>Acción</th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {productos.length > 0 ? (
                                productos.map((producto, index) => (
                                    <tr key={producto.productoID}>
                                        <td>{producto.productoID}</td>
                                        <td>{producto.Nombre}</td>
                                        <td>{producto.Modelo}</td>
                                        <td>{producto.Marca}</td>
                                        <td>{producto.Categoria}</td>
                                        <td>{producto.Stock}</td>
                                        <td>${parseFloat(producto.Precio).toFixed(2)}</td>
                                        <td>{producto.Almacen}</td>
                                        <td>{producto.Estado}</td>
                                        <td>
                                            <img
                                                src={producto.Imagen}
                                                alt={producto.Nombre}
                                                onClick={() => handleImageClick(producto.Imagen)}
                                                style={{ width: '50px', height: 'auto', cursor: 'pointer' }} // Imagen pequeña
                                            />
                                               </td>
                                               <td>
                                            <button onClick={() => handleEdit(index)} className="btn btn-warning">Editar</button>
                                            <button onClick={() => handleDelete(index)} className="btn btn-danger">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="11">No se encontraron registros de productos.</td>
                                </tr>
                            )}
                        </tbody> */}
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