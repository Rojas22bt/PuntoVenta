import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { jsPDF } from 'jspdf';
import '../Css/PagoTarjeta.css';

const PagoTarjeta = ({ nombreCliente = 'Cliente Ejemplo', nit = '1234567', productos = [], fecha = new Date().toISOString().split('T')[0], total = 0 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe no está cargado aún.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setSuccess(false);
    } else {
      console.log('Método de pago:', paymentMethod);
      setError(null);
      setSuccess(true);
    }

    setLoading(false);
  };

  const imprimirComprobante = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Comprobante de Compra", 70, 20);

    doc.setFontSize(12);
    doc.text(`Nombre: ${nombreCliente}`, 14, 30);
    doc.text(`NIT: ${nit}`, 14, 38);
    doc.text(`Fecha: ${fecha}`, 14, 46);

    let y = 60;
    doc.text("Producto", 14, y);
    doc.text("Precio", 80, y);
    doc.text("Cantidad", 110, y);
    doc.text("Subtotal", 150, y);
    y += 10;

    productos.forEach(prod => {
      doc.text(prod.nombre, 14, y);
      doc.text(`${prod.precio}`, 80, y);
      doc.text(`${prod.cantidad}`, 110, y);
      doc.text(`${prod.precio * prod.cantidad}`, 150, y);
      y += 10;
    });

    y += 10;
    doc.setFontSize(14);
    doc.text(`Total: ${total}`, 14, y);

    doc.save('comprobante.pdf');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Realizar Pago</h2>
        <CardElement className="card-element" />
        <button type="submit" className="btn btn-outline-primary" disabled={!stripe || loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>

        {error && <div className="mensaje-error">{error}</div>}

        {success && (
          <div className="mensaje-exito">
            <p>¡Pago procesado con éxito!</p>
          
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={imprimirComprobante}
              >
                Imprimir Comprobante
              </button>
            
          </div>

        )}

      </form>
    </div>
  );
};

export default PagoTarjeta;
