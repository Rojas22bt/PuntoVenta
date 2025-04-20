import FadeContent from './FadeContent';
import '../Css/Home.css';
import { useEffect, useState } from 'react';

const Home = () => {
  // Supongamos que el promedio de calificación es 4.2
  // ✅ Llamar al backend para obtener calificaciones (sin login)

  const [calificacion, setCalificacion] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetch("https://web-production-ab6a3.up.railway.app/api/usuario/obtener-comentario")
      .then(response => response.json())
      .then(data => {
        console.log("✅ Comentarios obtenidos:", data);
        setComentarios(data);
      })
      .catch(error => {
        console.error("❌ Error al obtener comentarios:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://web-production-ab6a3.up.railway.app/api/usuario/obtener-calificacion ")
      .then(response => response.json())
      .then(data => {
        console.log("✅ Calificaciones obtenidas:", data);
        setCalificacion(data);
      })
      .catch(error => {
        console.error("❌ Error al obtener calificaciones:", error);
      });
  }, []);

  const handleRating = (value) => {
    setRating(value);
    setSubmitted(true);
    console.log("Calificación seleccionada:", value);
  };

  const handleSubmit = async () => {
    const payload = {
      usuario_id: 1, // usa el ID que necesites
      numero: rating
    };

    try {
      const res = await fetch("https://web-production-ab6a3.up.railway.app/api/usuario/obtener-calificacion ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log("✅ Calificación enviada correctamente.");
        navigate("/gracias"); // redirige después de enviar
      } else {
        console.error("❌ Error al enviar calificación");
      }
    } catch (error) {
      console.error("❌ Error de red:", error);
    }
  };
  const promedio =
    calificacion.length > 0
      ? calificacion.reduce((acc, item) => acc + parseFloat(item.numero), 0) / calificacion.length
      : 0;


  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="estrella">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="estrella">☆</span>); // Puedes usar una media estrella si prefieres
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="estrella vacia">★</span>);
    }

    return stars;
  };

  return (
    <FadeContent blur={true} duration={2000} easing="ease-out" initialOpacity={0}>
      <h1 className='titleSobreNosotros'>¿Quiénes Somos?</h1>
      <div className="zona-personal">
        <div className="tarjeta-personal">
          <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1745165542/IMG_44422_beldm7.jpg" alt="Imagen de Joan" className="imagen-personal" />
          <h3 className="nombre-personal">Grupo Frontera</h3>
          <p>
            Presentamos productos tecnológicos como celulares, computadoras y accesorios para las mismas.
            Nuestra página es interactiva con el cliente, tiene funciones recomendadas y búsqueda avanzada con IA.
          </p>
        </div>
      </div>

      {/* Apartado de calificación */}
      <div className="zona-personal">
        <div className="tarjeta-personal">
          <h3 className="nombre-personal">Promedio de Calificaciones</h3>
          <div>
            <p><strong>Promedio total:</strong> {promedio.toFixed(2)} / 5</p>
            <div className="calificacion-estrellas">{renderStars(promedio)}</div>
          </div>
        </div>
      </div>
      <div className='zona-personal'>
      <div className="tarjeta-personal">
        <h3 className="nombre-personal">Comentarios</h3>
        <div className="comentario-usuario">
          {comentarios.length > 0 ? (
            comentarios?.map((item, index) => (
              <div key={index} className="comentario">
                <p><strong>{item.usuario_nombre ?? 'Anónimo'}:</strong> {item.descripcion}</p>
              </div>
            ))
          ) : (
            <p>No hay comentarios disponibles.</p>
          )}
          </div>
        </div>
      </div>



      <div>
      </div>
    </FadeContent>


  );
};

export default Home;