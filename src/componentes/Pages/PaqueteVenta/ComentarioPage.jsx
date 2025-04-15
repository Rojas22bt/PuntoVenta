import React from 'react'
import '../../Css/ComentarioPage.css'

function ComentarioPage() {
    return (
        <div className='ComentarioConteiner'>
            <div className='comentarioCard'>
                <h3 className='hazComentario'>Pedido Realizado</h3>

                <div className="mb-3">
                    <label>Haz un Comentario:</label>
                    <textarea
                        className="form-control comentarioInput"
                        rows="4"
                        placeholder="Escribe tu comentario aquí..."
                    ></textarea>
                </div>

                <div className='buttonComentario'>
                    <button type="submit" className="btn btn-primary w-50">Enviar Comentario</button>
                </div>
            </div>
        </div>
    )
}

export default ComentarioPage
