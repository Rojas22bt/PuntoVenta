import React, { useState, useEffect } from 'react';
import '../../Css/FacturacionPage.css';
import StripePayment from '../PagoStripe';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

function FacturacionPage() {
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();

  const [fecha, setFecha] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');

  useEffect(() => {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0];
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

  // Dividir carrito en productos y ofertas
  const productos = cartItems.filter(item => item.tipo === 'producto');
  const ofertas = cartItems.filter(item => item.tipo === 'oferta');

  // Armar JSON para enviar al backend
  const construirPayload = () => ({
    factura: {
      nit: "12345678",
      razon_social: user.nombre,
      fecha_emision: fecha,
      total: cartTotal
    },
    transaccion: {
      detalle: "Pago con tarjeta",
      metodo_pago: 2 // puedes adaptarlo según tu sistema
    },
    nota_venta: {
      descripcion: "Venta realizada en tienda central",
      usuario: user.id
    },
    productos: productos.map(p => ({
      id: p.id,
      cantidad: p.quantity
    })),
    ofertas: ofertas.map(o => ({
      id: o.id,
      cantidad: o.quantity
    }))
  });

  const handleEnviar = () => {
    const payload = construirPayload();
    console.log("📦 Payload a enviar:", payload);
    // Aquí podrías usar fetch/axios para enviarlo a tu backend:
    // await enviarFactura(payload);
  };

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
            <select
              name="documento"
              className="form-control"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
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
        <h2 className='pedido'>Productos:</h2>
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
              {productos.map((prod, index) => (
                <tr key={`producto-${index}`}>
                  <td>{prod.id}</td>
                  <td>{prod.nombre}</td>
                  <td>${parseFloat(prod.precio).toFixed(2)}</td>
                  <td>{prod.quantity}</td>
                  <td>${(prod.precio * prod.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {ofertas.length > 0 && (
          <>
            <h2 className='pedido mt-4'>Ofertas:</h2>
            <div className='tablaScroll'>
              <table className='tablaFacturacion'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Oferta</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ofertas.map((oferta, index) => (
                    <tr key={`oferta-${index}`}>
                      <td>{oferta.id}</td>
                      <td>{oferta.descripcion}</td>
                      <td>${parseFloat(oferta.precio).toFixed(2)}</td>
                      <td>{oferta.quantity}</td>
                      <td>${(oferta.precio * oferta.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="filaFinal">
        <StripePayment total={cartTotal} onPagoExitoso={handleEnviar} />
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
