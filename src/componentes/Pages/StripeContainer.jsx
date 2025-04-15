// StripeContainer.jsx
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PagoTarjeta from './PagoTarjeta';

// remplazar el la key publica
// enstripe.com
const stripePromise = loadStripe('pk_test_51REGd5QYkk3lyoESI3GdesJOPv7XDJJgWkYDknpo8BXVPCcj6nWSOu60LpjiWZ5YBEXPFfV4ZQP0DLLVvnq9pcDY00fUkpT4G3');

const Stripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <PagoTarjeta />
    </Elements>
  );
};

export default Stripe;
