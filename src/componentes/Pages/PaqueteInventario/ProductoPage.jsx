import React, { useState, useRef } from 'react';
import '../../Css/ProductoPage.css';
import { useAuth } from '../../../context/AuthContext';
import { crearProductoRequest, actualizarProductoRequest } from '../../../api/auth';
import Cloudinary from '../Cloudinary';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ProductoPage = () => {
    const { marcas, categorias, almacenes, cargarProductosAdmi, productosAdmi } = useAuth();
    const { message, handleFileChange, uploadImage } = Cloudinary();

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
                const updatedProductos = [...productosAdmi];
                updatedProductos[editIndex] = nuevoProducto;
                const datosNuevos = {
                    id: nuevoProducto.id,
                    nombre: nuevoProducto.nombre,
                    modelo: nuevoProducto.modelo,
                    precio: nuevoProducto.precio,
                    stock: nuevoProducto.stock,
                    estado: nuevoProducto.estado,
                    url: nuevoProducto.imagen || "https://fakeimg.pl/250x100/",
                    almacen: nuevoProducto.almacen,
                    categoria: nuevoProducto.categoria,
                    marca: nuevoProducto.marca
                }
                console.log(nuevoProducto);
                await actualizarProductoRequest(datosNuevos);
            } else {
                const datos = {
                    nombre: nuevoProducto.nombre,
                    modelo: nuevoProducto.modelo,
                    stock: Number(nuevoProducto.stock),
                    precio: Number(nuevoProducto.precio),
                    estado: nuevoProducto.estado === "true",
                    url: nuevoProducto.imagen || "https://fakeimg.pl/250x100/",
                    almacen: Number(nuevoProducto.almacen),
                    categoria: Number(nuevoProducto.categoria),
                    marca: Number(nuevoProducto.marca)
                };
                await crearProductoRequest(datos);
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
        setNuevoProducto(productosAdmi[index]);
        setEditIndex(index);
    };

    const handleListProductos = async () => {
        setLoading(true); // Iniciar loading
        try {
            await cargarProductosAdmi();
            if (productosAdmi.length > 0) {
                alert("Productos existentes: " + productosAdmi.map(producto => producto.productoID).join(", "));
            } else {
                alert("No hay Productos existentes.");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Finalizar loading
        }
    };
    const handleUploadImage = async () => {
        const url = await uploadImage();
        if (url) {
            setNuevoProducto(prev => ({ ...prev, imagen: url }));
        }
    };
    const generarPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Reporte de Productos", 70, 10);

        const columns = ["ID", "Nombre", "Modelo", "Marca", "Categoría", "Stock", "Precio", "Almacén", "Estado"];
        const rows = productosAdmi.map(prod => [
            prod.id,
            prod.nombre,
            prod.modelo,
            prod.marca,
            prod.categoria,
            prod.stock,
            `$${parseFloat(prod.precio).toFixed(2)}`,
            prod.almacen,
            prod.estado ? 'Activo' : 'Inactivo'
        ]);

        doc.autoTable({
            head: [columns],
            body: rows
        });

        doc.save('reporte_productos.pdf');
    };
    const generarExcel = () => {
        const data = productosAdmi.map(prod => ({
            ID: prod.id,
            Nombre: prod.nombre,
            Modelo: prod.modelo,
            Marca: prod.marca,
            Categoría: prod.categoria,
            Stock: prod.stock,
            Precio: parseFloat(prod.precio).toFixed(2),
            Almacén: prod.almacen,
            Estado: prod.estado ? 'Activo' : 'Inactivo'
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

        saveAs(blob, 'reporte_productos.xlsx');
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
                        <option value="false">Deshabilitar</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Selecciona una imagen</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                    />
                </div>

                <button className="btn btn-primary mt-2" type="button" onClick={handleUploadImage}>
                    Subir Imagen
                </button>

                {loading && <p>Cargando imagen...</p>}
                {message && <p>{message}</p>}

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        {editIndex !== null ? 'Actualizar Producto' : 'Agregar Producto'}
                    </button>
                </div>
            </form>

            <div className="text-center mt-3">
                <button onClick={handleListProductos} className="btn btn-primary" disabled={loading}>
                    Listar Productos Existentes
                </button>
                <button onClick={generarPDF} className="btn btn-danger" disabled={productosAdmi.length === 0}>
                    Descargar PDF
                </button>
                <button onClick={generarExcel} className="btn btn-success" disabled={productosAdmi.length === 0}>
                    Descargar Excel
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
                            {productosAdmi.length > 0 ? (
                                productosAdmi.map((producto, index) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.modelo}</td>
                                        <td>{producto.marca}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.stock}</td>
                                        <td>${parseFloat(producto.precio).toFixed(2)}</td>
                                        <td>{producto.almacen}</td>
                                        <td>{producto.estado ? 'Activo' : 'Inactivo'}</td>
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