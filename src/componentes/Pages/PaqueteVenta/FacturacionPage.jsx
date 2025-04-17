import React, { useState, useEffect } from 'react';
import '../../Css/FacturacionPage.css';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

function FacturacionPage() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();

  const [fecha, setFecha] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0]; // yyyy-mm-dd
    setFecha(fechaFormateada);
  }, []);

  if (!user) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Cargando datos de usuario...</p>
      </div>
    );
  }

  return (
    <div className='conteinerFacturacion'>
      <div className='boxFacturacion'>
        <h1>Facturación</h1>
        <div className='datosFacturacion'>
          <div className="mb-3">
            <label>Nombre:</label>
            <input type="text" className="form-control" value={user.nombre} disabled />
          </div>
          <div className="mb-3">
            <label>Tipo de Documento</label>
            <select name="documento" id="todavia" className="form-control">
              <option value="">Seleccione...</option>
              {user.documentos.map((doc, index) => (
                <option key={index} value={doc.documento__descripcion}>
                  {doc.documento__descripcion}
                </option>
              ))}
            </select>
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
                <th>ID</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((prod, index) => (
                <tr key={index}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>${prod.precio}</td>
                  <td>{prod.quantity}</td>
                  <td>${(prod.precio * prod.quantity).toFixed(2)}</td>
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
            <input
              type="text"
              readOnly
              className="inputTotal"
              value={`$${cartTotal.toFixed(2)}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacturacionPage;
