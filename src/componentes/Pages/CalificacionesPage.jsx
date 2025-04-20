import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // para redirigir
import '../Css/CalificacionesPage.css';
import { crearCalificacionRequest } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';

function CalificacionesPage() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleRating = (value) => {
    setRating(value);
    setSubmitted(true);
  };

  const handleSubmit = async () => {
    if (rating === 0) return alert("Selecciona una calificación antes de guardar.");

    const payload = {
      usuario: user.id,
      numero: rating,
    };


    try {
      const response = await crearCalificacionRequest(payload);

      if (response.data.mensaje) {
          alert(response.data.mensaje)
          navigate("/dasboard/perfil-usuario"); 
      } else {
        console.error("❌ Error al enviar calificación.");
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
    }
  };

  return (
    <div className="rating-container">
      <h2>¿Cómo calificaría nuestro servicio?</h2>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= rating ? 'selected' : ''}`}
            onClick={() => handleRating(value)}
          >
            ★
          </span>
        ))}
      </div>

      {submitted && (
        <>
          <p className="thanks-message">
            Gracias por su clasificación, la tomaremos en cuenta.
          </p>
          <button className="save-button" onClick={handleSubmit}>
            Guardar Calificación
          </button>
        </>
      )}
    </div>
  );
}

export default CalificacionesPage;
