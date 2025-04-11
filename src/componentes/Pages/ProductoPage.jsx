import React, { useState, useRef } from 'react';
import '../Css/ProductoPage.css';

const ProductoPage = () => {
    const [productos, setProductos] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        Nombre: '',
        Precio: '',
        Stock: '',
        Modelo: '',
        Marca: '',
        Categoria: '',
        Almacen: '',
        Estado: '',
        Imagen: '' // Nuevo campo para la imagen
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
                setNuevoProducto({ ...nuevoProducto, Imagen: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedProductos = [...productos];
            updatedProductos[editIndex] = nuevoProducto;
            setProductos(updatedProductos);
        } else {
            setProductos([...productos, { ...nuevoProducto, productoID: productos.length + 1 }]);
        }
        setNuevoProducto({
            Nombre: '',
            Modelo: '',
            Marca: '',
            Categoria: '',
            Stock: '',
            Precio: '',
            Almacen: '',
            Estado: '',
            Imagen: '' // Reiniciar el campo de imagen
        });
        setEditIndex(null);
        
        // Restablecer el input de archivo
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // Esto restablece el campo de archivo
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

    return (
        <div className="producto-container">
            <h1>{editIndex !== null ? 'Editar Producto' : 'Agregar Producto'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Nombre">Nombre</label>
                    <input type="text" name="Nombre" value={nuevoProducto.Nombre} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Modelo">Modelo</label>
                    <input type="text" name="Modelo" value={nuevoProducto.Modelo} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Marca">Marca</label>
                    <select name="Marca" value={nuevoProducto.Marca} onChange={handleInputChange} className='form-control' required>
                        <option value="">Selecciona una Marca</option>
                        <option value="Quipus">Quipus</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Categoria">Categoría</label>
                    <select name="Categoria" value={nuevoProducto.Categoria} onChange={handleInputChange} className='form-control' required>
                        <option value="">Selecciona una categoría</option>
                        <option value="Electrónica">Electr</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Stock">Stock</label>
                    <input type="number" name="Stock" value={nuevoProducto.Stock} onChange={handleInputChange} className='form-control' required />
                </div>
                               <div className="form-group">
                    <label htmlFor="Precio">Precio</label>
                    <input type="number" name="Precio" value={nuevoProducto.Precio} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Almacen">Almacén</label>
                    <select name="Almacen" value={nuevoProducto.Almacen} onChange={handleInputChange} className='form-control' required>
                        <option value="">Selecciona un Almacén</option>
                        <option value="Almacén A">Almacén A</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Estado">Estado</label>
                    <select name="Estado" value={nuevoProducto.Estado} onChange={handleInputChange} className='form-control' required>
                        <option value="">Estado</option>
                        <option value="Disponible">Disponible</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Imagen">Imagen</label>
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
                        <tbody>
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