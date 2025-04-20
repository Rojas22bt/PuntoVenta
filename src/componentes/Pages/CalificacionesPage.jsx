import React, { useState } from 'react';
import '../Css/CalificacionesPage.css'

function CalificacionesPage () {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (value) => {
    setRating(value);
    setSubmitted(true);
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
        <p className="thanks-message">
          Gracias por su clasificación, la tomaremos en cuenta.
        </p>
      )}
    </div>
  );
}

export default CalificacionesPage;
