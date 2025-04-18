import React, { useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QIewwDhm58X9ebvL2b9ZGx2AxItSBgRuWMyPxDu88d4rV5fI8XDJUe43PVGcLvOwNIWtTYBcEZM8J4nl9JDiESg005uydqNOc");

const cardStyle = {
  style: {
    base: {
      color: "#2c3e50",
      fontFamily: "'Roboto', sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      iconColor: "#5469d4",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#e74c3c",
      iconColor: "#e74c3c"
    }
  }
};

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (typeof total !== "number" || total <= 0) {
      alert("⚠️ Total no válido");
      return;
    }

    setLoading(true);

    try {
        console.log(total)
      const res = await fetch("https://web-production-ab6a3.up.railway.app/api/venta/crear-pago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total })
      });

      const data = await res.json();

      if (!data.clientSecret) {
        alert("❌ No se pudo obtener clientSecret");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });

      if (result.error) {
        alert("❌ Error al pagar: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        alert("✅ ¡Pago exitoso!");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error inesperado.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "420px", margin: "0 auto" }}>
      <div style={{
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        background: "linear-gradient(145deg, #ffffff, #f2f2f2)",
        marginBottom: "1.5rem"
      }}>
        <h3 style={{ marginBottom: "1rem", fontWeight: 500, color: "#2c3e50" }}>💳 Ingresa tus datos de tarjeta</h3>
        <CardElement options={cardStyle} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 112, 243, 0.2)",
          transition: "all 0.3s ease"
        }}
        onMouseOver={e => e.target.style.backgroundColor = "#0051a8"}
        onMouseOut={e => e.target.style.backgroundColor = "#0070f3"}
      >
        {loading ? "Procesando..." : "Pagar"}
      </button>
    </form>
  );
};

const StripePayment = ({ total }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm total={total} />
  </Elements>
);

export default StripePayment;
