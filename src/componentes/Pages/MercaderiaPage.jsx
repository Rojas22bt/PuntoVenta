import React, { useState, useRef } from 'react';
import '../Css/MercaderiaPage.css';

function MercaderiaPage() {
    const [mercaderias, setmercaderias] = useState([]);
    const [nuevaMercaderia, setnuevaMercaderia] = useState({
        Fecha: '',
        Cantidad: '',
        CodAutorizacion: '',
        NroFactura: '',
        IDProducto: '',
        Producto: '',
        PrecioCompra: '',
        Estado: '',
        Imagen: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnuevaMercaderia({ ...nuevaMercaderia, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setnuevaMercaderia({ ...nuevaMercaderia, Imagen: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedmercaderias = [...mercaderias];
            updatedmercaderias[editIndex] = nuevaMercaderia;
            setmercaderias(updatedmercaderias);
        } else {
            setmercaderias([...mercaderias, { ...nuevaMercaderia, productoID: mercaderias.length + 1 }]);
        }
        setnuevaMercaderia({
            Fecha: '',
            NroFactura: '',
            IDProducto: '',
            Producto: '',
            CodAutorizacion: '',
            Cantidad: '',
            PrecioCompra: '',
            Estado: '',
            Imagen: ''
        });
        setEditIndex(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleEdit = (index) => {
        setnuevaMercaderia(mercaderias[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedmercaderias = mercaderias.filter((_, i) => i !== index);
        setmercaderias(updatedmercaderias);
    };

    const handleImageClick = (imagen) => {
        setShowImage(imagen);
    };

    const handleCloseImage = () => {
        setShowImage(null);
    };

    return (
        <div className="mercaderia-container">
            <h1>{editIndex !== null ? 'Editar mercaderia' : 'Agregar mercaderia'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Fecha">Fecha</label>
                    <input type="date" name="Fecha" value={nuevaMercaderia.Fecha} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="NroFactura">Numero de la Factura</label>
                    <input type="number" name="NroFactura" value={nuevaMercaderia.NroFactura} onChange={handleInputChange} className='form-control' required min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="IDProducto">ID Producto</label>
                    <input type="number" name="IDProducto" value={nuevaMercaderia.IDProducto} onChange={handleInputChange} className='form-control' required min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="Producto">Nombre Producto</label>
                    <input type="text" name="Producto" value={nuevaMercaderia.Producto} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="CodAutorizacion">Codigo de Autorización</label>
                    <input type="text" name="CodAutorizacion" value={nuevaMercaderia.CodAutorizacion} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Cantidad">Cantidad</label>
                    <input type="number" name="Cantidad" value={nuevaMercaderia.Cantidad} onChange={handleInputChange} className='form-control' required min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="PrecioCompra">Precio Compra</label>
                    <input type="number" name="PrecioCompra" value={nuevaMercaderia.PrecioCompra} onChange={handleInputChange} className='form-control' required min="0" />
                </div>
                <div className="form-group">
                    <label htmlFor="Estado">Estado</label>
                    <select name="Estado" value={nuevaMercaderia.Estado} onChange={handleInputChange} className='form-control' required>
                        <option value="">Selecciona un estado</option>
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Imagen">Imagen de la Factura</label>
                    <input 
                        type="file" 
                        name="Imagen" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className='form-control' 
                        required 
                        ref={fileInputRef} 
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary" id='btnMerca'>
                        {editIndex !== null ? 'Actualizar Mercaderia' : 'Agregar Mercaderia'}
                    </button>
                </div>
            </form>
            <div>
                <h1>Lista de mercaderias</h1>
                <div className="table-responsive">
                    <table className="mercaderia-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Nro Factura</th>
                                <th>ID Producto</th>
                                <th>Producto</th>
                                <th>Cod. Autorizacion</th>
                                <th>Cantidad</th>
                                <th>Precio Compra</th>
                                <th>Estado</th>
                                <th>Imagen</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mercaderias.length > 0 ? (
                                mercaderias.map((producto, index) => (
                                    <tr key={producto.productoID}>
                                        <td>{producto.productoID}</td>
                                        <td>{producto.Fecha}</td>
                                        <td>{producto.NroFactura}</td>
                                        <td>{producto.IDProducto}</td>
                                        <td>{producto.Producto}</td>
                                        <td>{producto.CodAutorizacion}</td>
                                        <td>{producto.Cantidad}</td>
                                        <td>{producto.PrecioCompra}</td>
                                        <td>{producto.Estado}</td>
                                        <td>
                                            <img
                                                src={producto.Imagen}
                                                alt={producto.Fecha}
                                                onClick={() => handleImageClick(producto.Imagen)}
                                                style={{ width: '50px', height: 'auto', cursor: 'pointer' }} 
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
                                    <td colSpan="11">No se encontraron registros de mercaderias.</td>
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

export default MercaderiaPage;