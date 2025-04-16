import React, { useState, useRef } from 'react';
import '../../Css/MercaderiaPage.css';
import { useAuth } from '../../../context/AuthContext';

function MercaderiaPage() {
    const { productos } = useAuth();

    const [mercaderias, setmercaderias] = useState([]);
    const [busquedaID, setBusquedaID] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    const [nuevaMercaderia, setnuevaMercaderia] = useState({
        Fecha: '',
        NroFactura: '',
        CodAutorizacion: '',
        Imagen: ''
    });

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

    const handleEditarProducto = (index, campo, valor) => {
        const actualizados = [...mercaderias];
        actualizados[index][campo] = valor;
        setmercaderias(actualizados);
    };

    const handleEliminarProducto = (index) => {
        const actualizados = mercaderias.filter((_, i) => i !== index);
        setmercaderias(actualizados);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const detalleFinal = mercaderias.map(p => ({
            producto_id: p.id,
            cantidad: parseInt(p.cantidad),
            precio_compra: parseFloat(p.precioCosto)
        }));

        const dataFinal = {
            ...nuevaMercaderia,
            detalle: detalleFinal
        };

        console.log("📝 Datos para guardar:", dataFinal);

        alert("Mercadería lista para enviar. Mira consola.");

        setmercaderias([]);
        setnuevaMercaderia({
            Fecha: '',
            NroFactura: '',
            CodAutorizacion: '',
            Imagen: ''
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const agregarProductoDesdeBusqueda = (prod) => {
        const yaExiste = mercaderias.some(p => p.id === prod.id);
        if (yaExiste) {
            alert("Este producto ya fue agregado.");
            return;
        }
        setmercaderias([
            ...mercaderias,
            {
                ...prod,
                cantidad: 1,
                precioCosto: 0
            }
        ]);
        setBusquedaID('');
        setBusquedaNombre('');
        setResultadosBusqueda([]);
    };

    return (
        <div className="mercaderia-container">
            <h1>Registrar Mercadería</h1>
            <form onSubmit={handleSubmit} className='form-Mercaderia'>
                <div className='ApartadoRegister'>
                    <div className="form-group">
                        <label>Fecha</label>
                        <input type="date" name="Fecha" value={nuevaMercaderia.Fecha} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Nro. Factura</label>
                        <input type="number" name="NroFactura" value={nuevaMercaderia.NroFactura} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Código de Autorización</label>
                        <input type="text" name="CodAutorizacion" value={nuevaMercaderia.CodAutorizacion} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Imagen de la Factura</label>
                        <input type="file" name="Imagen" accept="image/*" onChange={handleImageChange} className='form-control' required ref={fileInputRef} />
                    </div>
                </div>

                <div className='BuscarProducto'>
                    <label>BUSCAR PRODUCTO</label>
                    <div className='buscarP'>
                        <div>
                            <label>Código</label>
                            <input
                                type="number"
                                value={busquedaID}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setBusquedaID(value);
                                    setBusquedaNombre('');
                                    if (value === '') {
                                        setResultadosBusqueda([]);
                                        return;
                                    }
                                    const resultados = productos.filter(p =>
                                        p.id.toString().startsWith(value)
                                    );
                                    setResultadosBusqueda(resultados);
                                }}
                                className='form-control'
                            />
                        </div>
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={busquedaNombre}
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase();
                                    setBusquedaNombre(value);
                                    setBusquedaID('');
                                    if (value === '') {
                                        setResultadosBusqueda([]);
                                        return;
                                    }
                                    const resultados = productos.filter(p =>
                                        p.nombre.toLowerCase().includes(value)
                                    );
                                    setResultadosBusqueda(resultados);
                                }}
                                className='form-control'
                            />
                        </div>
                    </div>

                    {/* Sugerencias dinámicas */}
                    {resultadosBusqueda.length > 0 && (
                        <ul className="list-group mt-2">
                            {resultadosBusqueda.map((prod) => (
                                <li
                                    key={prod.id}
                                    className="list-group-item list-group-item-action"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => agregarProductoDesdeBusqueda(prod)}
                                >
                                    {prod.id} - {prod.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="table-responsive mt-4">
                    <label>Lista de Productos</label>
                    <table className="mercaderia-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Producto</th>
                                <th>Precio Compra</th>
                                <th>Cantidad</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mercaderias.map((producto, index) => (
                                <tr key={producto.id}>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>
                                        <input
                                            className='inputProducto'
                                            type="number"
                                            value={producto.precioCosto}
                                            onChange={(e) => handleEditarProducto(index, 'precioCosto', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            className='inputProducto'
                                            type="number"
                                            value={producto.cantidad}
                                            onChange={(e) => handleEditarProducto(index, 'cantidad', e.target.value)}
                                        />
                                    </td>
                                    <td>
                                        <button type="button" onClick={() => handleEliminarProducto(index)} className="btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="text-center mt-4">
                    <button type="submit" className="btn btn-primary">Registrar Mercadería</button>
                </div>
            </form>
        </div>
    );
}

export default MercaderiaPage;
