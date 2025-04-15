import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../Css/PagoTarjeta.css'; 

const PagoTarjeta = () => {
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

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2>Realizar Pago</h2>
        <CardElement className="card-element" />
        <button type="submit" className="btn btn-outline-primary" disabled={!stripe || loading}>
          {loading ? 'Procesando...' : 'Pagar'}
        </button>
        {error && <div className="mensaje-error">{error}</div>}
        {success && <div className="mensaje-exito">¡Pago procesado con éxito!</div>}
      </form>
    </div>
  );
};

export default PagoTarjeta;
