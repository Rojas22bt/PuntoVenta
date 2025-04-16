import React, { useState, useEffect } from 'react';
import '../../Css/FacturacionPage.css';

function FacturacionPage() {
  const [productos, setProductos] = useState([
    { nombre: 'Ejemplo Producto', precio: 100, cantidad: 2 },
    { nombre: 'Otro Producto', precio: 50, cantidad: 3 }
  ]);

  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0]; // yyyy-mm-dd
    setFecha(fechaFormateada);
  }, []);

  const eliminarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const calcularTotal = () => {
    return productos.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
  };

  return (
    <div className='conteinerFacturacion'>
      <div className='boxFacturacion'>
        <h1>Facturación</h1>
        <div className='datosFacturacion'>
          <div className="mb-3">
            <label>Nombre:</label>
            <input type="text" className="form-control" />
          </div>
          <div className="mb-3">
            <label>NIT:</label>
            <input type="number" className="form-control" />
          </div>
          <div className="mb-3">
            <label>Fecha:</label>
            <input type="date" className="form-control" value={fecha} readOnly />
          </div>
        </div>
      </div>

      <div className='boxTabla'>
        <h2 className='pedido'>Tu pedido:</h2>
        <div className='tablaScroll'>
          <table className='tablaFacturacion'>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>SubTotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.nombre}</td>
                  <td>{prod.precio}</td>
                  <td>{prod.cantidad}</td>
                  <td>{prod.precio * prod.cantidad}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => eliminarProducto(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="filaFinal">
          <a href="/facturacion/tarjet" className="btn btn-primary btnTarjeta">
            Pagar con Tarjeta
          </a>
          <div className="totalFinal">
            <label>Total:</label>
            <input type="text" readOnly className="inputTotal" value={calcularTotal()} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacturacionPage;
