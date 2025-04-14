import React, { useState, useEffect } from 'react';
import '../../Css/HistorialClientePage.css';

function HistorialClientePage() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [historial, setHistorial] = useState([]);
    const [mostrarTabla, setMostrarTabla] = useState(false);
    const [desde, setDesde] = useState('');
    const [hasta, setHasta] = useState('');


    useEffect(() => {
        const fetchNombreUsuario = async () => {
            try {
                const response = await fetch('/api/usuario');
                const data = await response.json();
                setNombreUsuario(data.nombre);
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
            }
        };

        fetchNombreUsuario();
    }, []);

    const listarHistorial = () => {
        const datos = [
            { fecha: '2026-10-01', documento: '123456', tipo: 'CI', montoTotal: 100 },
            { fecha: '2025-10-02', documento: '654321', tipo: 'NIT', montoTotal: 200 },
            { fecha: '2024-11-10', documento: '789012', tipo: 'CI', montoTotal: 300 },
        ];
    
        // Convertimos las fechas
        const desdeFecha = desde ? new Date(desde) : null;
        const hastaFecha = hasta ? new Date(hasta) : null;
    
        const historialFiltrado = datos.filter(item => {
            const fechaItem = new Date(item.fecha);
            if (desdeFecha && fechaItem < desdeFecha) return false;
            if (hastaFecha && fechaItem > hastaFecha) return false;
            return true;
        });
    
        setHistorial(historialFiltrado);
        setMostrarTabla(true);
    };
    
    return (
        <div className='historialConteiner'>
            <h1>Historial del Cliente: {nombreUsuario}</h1>
            <div className="input-group">
                <div className="mb-3">
                    <label>Desde: </label>
                    <input
                        type="date"
                        name="desde"
                        className="form-control"
                        value={desde}
                        onChange={(e) => setDesde(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Hasta: </label>
                    <input
                        type="date"
                        name="hasta"
                        className="form-control"
                        value={hasta}
                        onChange={(e) => setHasta(e.target.value)}
                    />
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-primary" onClick={listarHistorial}>
                        Listar Historial
                    </button>
                </div>
            </div>

            {mostrarTabla && (
                <div className='historial-table'>
                    <table className="table-historial">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Documento</th>
                                <th>Tipo</th>
                                <th>Monto Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.fecha}</td>
                                    <td>{item.documento}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.montoTotal}</td>
                                    <td>
                                        <button id='VerImprimir' className="btn btn-secondary no-border">
                                            Ver/Imprimir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default HistorialClientePage;
