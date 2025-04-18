import React, { useState, useRef } from 'react';
import '../../Css/OfertasPage.css';
import { useAuth } from '../../../context/AuthContext';
// import { crearOfertaRequest } // ← aquí deberías importar tu función real para enviar la oferta
import { crearOfertaRequest } from '../../../api/auth';

function OfertasPage() {
    const { productos } = useAuth();

    const [mercaderias, setMercaderias] = useState([]);
    const [busquedaID, setBusquedaID] = useState('');
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    const [nuevaOferta, setNuevaOferta] = useState({
        descripcion:'',
        fecha_inicio: '',
        fecha_fin: '',
        precio_oferta: '',
        estado: '',
        imagen: ''
    });

    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaOferta({ ...nuevaOferta, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaOferta({ ...nuevaOferta, imagen: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditarProducto = (index, campo, valor) => {
        const actualizados = [...mercaderias];
        actualizados[index][campo] = valor;
        setMercaderias(actualizados);
    };

    const handleEliminarProducto = (index) => {
        const actualizados = mercaderias.filter((_, i) => i !== index);
        setMercaderias(actualizados);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productos = mercaderias.map(p => ({
                id: p.id,
                cantidad: parseInt(p.cantidad)
            }));

            const dataFinal = {
                descripcion: nuevaOferta.descripcion,
                fecha_inicio: nuevaOferta.fecha_inicio,
                fecha_final: nuevaOferta.fecha_fin,
                precio: nuevaOferta.precio_oferta,
                estado: nuevaOferta.estado === "true",
                url: "https://res.cloudinary.com/ddltlpsy1/image/upload/v1744775266/IPhone-X-Download-PNG-Image_bqnpel.png",
                productos: productos
            };

            console.log("🧾 Enviando oferta:", dataFinal);
            await crearOfertaRequest(dataFinal);

            alert("✅ Oferta registrada");

            setMercaderias([]);
            setNuevaOferta({
                descripcion:'',
                fecha_inicio: '',
                fecha_fin: '',
                precio_oferta: '',
                estado: '',
                imagen: ''
            });

            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (err) {
            console.error("❌ Error al registrar oferta:", err);
        }
    };

    const agregarProductoDesdeBusqueda = (prod) => {
        const yaExiste = mercaderias.some(p => p.id === prod.id);
        if (yaExiste) {
            alert("Este producto ya fue agregado.");
            return;
        }
        setMercaderias([
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
            <h1>NUEVA OFERTA</h1>
            <form onSubmit={handleSubmit} className='form-Mercaderia'>
                <div className='ApartadoRegister'>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <input type="text" name="descripcion" value={nuevaOferta.descripcion} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Fecha Inicio</label>
                        <input type="date" name="fecha_inicio" value={nuevaOferta.fecha_inicio} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Fecha Fin</label>
                        <input type="date" name="fecha_fin" value={nuevaOferta.fecha_fin} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Precio Oferta</label>
                        <input type="number" name="precio_oferta" value={nuevaOferta.precio_oferta} onChange={handleInputChange} className='form-control' required />
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select name="estado" value={nuevaOferta.estado} onChange={handleInputChange} className='form-control' required>
                            <option value="">Seleccione el estado</option>
                            <option value="true">Disponible</option>
                            <option value="false">Deshabilitar</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Imagen de la Oferta</label>
                        <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} className='form-control' ref={fileInputRef} required />
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
                                    if (value === '') return setResultadosBusqueda([]);
                                    const resultados = productos.filter(p => p.id.toString().startsWith(value));
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
                                    if (value === '') return setResultadosBusqueda([]);
                                    const resultados = productos.filter(p => p.nombre.toLowerCase().includes(value));
                                    setResultadosBusqueda(resultados);
                                }}
                                className='form-control'
                            />
                        </div>
                    </div>

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
                    <button type="submit" className="btn btn-primary">Registrar Oferta</button>
                </div>
            </form>
        </div>
    );
}

export default OfertasPage;
