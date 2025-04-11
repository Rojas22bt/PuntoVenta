import React, { useState, useRef } from 'react';
import '../Css/OfertasPage.css';

function OfertasPage() {
    const [ofertas, setofertas] = useState([]);
    const [nuevaOferta, setnuevaOferta] = useState({
        Descripcion: '',
        FechaI: '',
        FechaF: '',
        Precio: '',
        Estado: '',
        Imagen: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [showImage, setShowImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setnuevaOferta({ ...nuevaOferta, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setnuevaOferta({ ...nuevaOferta, Imagen: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación de fechas
        if (nuevaOferta.FechaF < nuevaOferta.FechaI) {
            alert("La fecha final no puede ser anterior a la fecha de inicio.");
            return;
        }

        // Validación de precio
        if (Number(nuevaOferta.Precio) <= 0) {
            alert("El precio debe ser mayor a cero.");
            return;
        }

        if (editIndex !== null) {
            const updatedofertas = [...ofertas];
            updatedofertas[editIndex] = nuevaOferta;
            setofertas(updatedofertas);
        } else {
            setofertas([...ofertas, { ...nuevaOferta, ofertaID: ofertas.length + 1 }]);
        }

        setnuevaOferta({
            Descripcion: '',
            FechaI: '',
            FechaF: '',
            Precio: '',
            Estado: '',
            Imagen: ''
        });
        setEditIndex(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const handleEdit = (index) => {
        setnuevaOferta(ofertas[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedofertas = ofertas.filter((_, i) => i !== index);
        setofertas(updatedofertas);
    };

    const handleImageClick = (imagen) => {
        setShowImage(imagen);
    };

    const handleCloseImage = () => {
        setShowImage(null);
    };

    const handleListOfertas = () => {
        if (ofertas.length > 0) {
            console.log("Ofertas existentes:", ofertas);
            alert("Ofertas existentes: " + ofertas.map(oferta => oferta.Descripcion).join(", "));
        } else {
            alert("No hay ofertas existentes.");
        }
    };

    return (
        <div className="mercaderia-container">
            <h1>{editIndex !== null ? 'Editar mercadería' : 'Agregar mercadería'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Descripcion">Descripción</label>
                    <input type="text" name="Descripcion" value={nuevaOferta.Descripcion} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="FechaI">Fecha Inicio</label>
                    <input type="date" name="FechaI" value={nuevaOferta.FechaI} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="FechaF">Fecha Final</label>
                    <input type="date" name="FechaF" value={nuevaOferta.FechaF} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Precio">Precio</label>
                    <input type="number" name="Precio" value={nuevaOferta.Precio} onChange={handleInputChange} className='form-control' required />
                </div>
                <div className="form-group">
                    <label htmlFor="Estado">Estado</label>
                    <select name="Estado" value={nuevaOferta.Estado} onChange={handleInputChange} className='form-control' required>
                        <option value="">Selecciona un estado</option>
                        <option value="Disponible">Disponible</option>
                        <option value="No Disponible">No Disponible</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Imagen">Imagen de la Oferta</label>
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
                        {editIndex !== null ? 'Actualizar Mercadería' : 'Agregar Mercadería'}
                    </button>
                </div>
            </form>
            <div className="text-center mt-3">
                <button onClick={handleListOfertas} className="btn btn-primary">
                    Listar Ofertas Existentes
                </button>
            </div>

            <div>
                <h1>Lista de Ofertas</h1>
                <div className="table-responsive">
                    <table className="mercaderia-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descripción</th>
                                <th>Fecha Inicio</th>
                                <th>Fecha Final</th>
                                <th>Precio</th>
                                <th>Estado</th>
                                <th>Imagen</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ofertas.length > 0 ? (
                                ofertas.map((oferta, index) => (
                                    <tr key={oferta.ofertaID}>
                                        <td>{oferta.ofertaID}</td>
                                        <td>{oferta.Descripcion}</td>
                                        <td>{oferta.FechaI}</td>
                                        <td>{oferta.FechaF}</td>
                                        <td>{oferta.Precio}</td>
                                        <td>{oferta.Estado}</td>
                                        <td>
                                            <img
                                                src={oferta.Imagen}
                                                alt={oferta.Descripcion}
                                                onClick={() => handleImageClick(oferta.Imagen)}
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
                                    <td colSpan="8">No se encontraron registros de ofertas.</td>
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
                        <img src={showImage} alt="oferta" className="large-image" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default OfertasPage;
