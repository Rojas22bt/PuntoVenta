import React, { useState } from 'react';
import '../../Css/ComentarioPage.css';
import { crearComentarioRequest } from '../../../api/auth';
import { useAuth } from '../../../context/AuthContext';

function ComentarioPage() {
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { user } = useAuth();

  // Simula un usuario fijo por ahora
  const usuario_id = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      usuario: Number(usuario_id),
      descripcion,
    };

    try {
      const res = await crearComentarioRequest(payload);
      if (res.data.mensaje) {
        setMensaje("✅ Comentario enviado con éxito.");
        setDescripcion('');
      } else {
        const errorData = await res.json();
        setMensaje("❌ Error al enviar comentario: " + (errorData.detail || "Intenta nuevamente."));
      }
    } catch (err) {
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className='ComentarioConteiner'>
      <div className='comentarioCard'>
        <h3 className='hazComentario'>Realiza un Comentario</h3>

        <div className="mb-3">
          <label>Haz un Comentario:</label>
          <textarea
            className="form-control comentarioInput"
            rows="4"
            placeholder="Escribe tu comentario aquí..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className='buttonComentario'>
          <button onClick={handleSubmit} className="btn btn-primary w-50">Enviar Comentario</button>
        </div>

        {mensaje && (
          <div className="alert alert-info mt-3" role="alert">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default ComentarioPage;
