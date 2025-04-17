import React, { useState } from 'react';
import Fuse from 'fuse.js';
import dotenv from 'dotenv';


const apiKey = import.meta.env.VITE_OPENAI_KEY;

async function interpretarInstruccion(texto) {

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Eres un asistente de tienda online. Responde SOLO en JSON.
Las acciones pueden ser:
- "agregar" → para añadir productos al carrito
- "filtrar" → para mostrar productos por nombre
- "categoria" → para mostrar por categoría

Ejemplos:
"agrega iphone" → { "accion": "agregar", "productos": ["iphone"] }
"mostrar productos samsung y huawei" → { "accion": "filtrar", "productos": ["samsung", "huawei"] }
"filtrar por categoría computadoras" → { "accion": "categoria", "categoria": "computadoras" }`
          },
          {
            role: "user",
            content: texto
          }
        ],
        temperature: 0.4
      })
    });

    const data = await response.json();
    const mensaje = data.choices?.[0]?.message?.content;
    return JSON.parse(mensaje);
  } catch (error) {
    console.error("❌ Error al interpretar:", error);
    return null;
  }
}

const VoiceSearch = ({ productos, setBusqueda, setFiltrados, agregarAlCarrito, setMensaje }) => {
  const [grabando, setGrabando] = useState(false);

  const handleVoiceInput = async () => {
    if (grabando) return;
    setGrabando(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', blob, 'audio.webm');
        formData.append('model', 'whisper-1');

        setMensaje("🎧 Transcribiendo voz...");

        const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`
          },
          body: formData
        });

        if (response.status === 429) {
          setMensaje("🚫 Límite alcanzado. Intenta más tarde.");
          setGrabando(false);
          return;
        }

        const data = await response.json();
        const texto = data?.text?.toLowerCase?.()?.trim();

        if (!texto) {
          setMensaje("❌ No se pudo entender.");
          setGrabando(false);
          return;
        }

        console.log("🧠 Texto reconocido:", texto);
        setMensaje("🤖 Interpretando instrucción...");

        const resultado = await interpretarInstruccion(texto);

        if (!resultado) {
          setMensaje("❌ No se pudo interpretar.");
          setGrabando(false);
          return;
        }

        // 📚 Mapeo de categorías (ajústalas según tu backend)
        const categoriasMap = {
          "telefonos": 1,
          "teléfonos": 1,
          "celulares": 1,
          "computadoras": 2,
          "laptops": 2,
          "ordenadores": 2,
          "accesorios": 3
        };

        // 🔎 Configurar búsqueda difusa
        const fuse = new Fuse(productos, {
          keys: ['nombre'],
          threshold: 0.4
        });

        // 🛒 AGREGAR
        if (resultado.accion === "agregar") {
          const nombre = resultado.productos[0];
          const encontrado = fuse.search(nombre);
          if (encontrado.length > 0) {
            const producto = encontrado[0].item;
            agregarAlCarrito(producto);
            setMensaje(`🛒 "${producto.nombre}" añadido al carrito`);
          } else {
            setMensaje(`❌ No se encontró: "${nombre}"`);
          }
        }

        // 📦 FILTRAR POR PRODUCTO
        else if (resultado.accion === "filtrar") {
          const coincidencias = resultado.productos.flatMap(nombre => {
            const res = fuse.search(nombre);
            return res.map(r => r.item);
          });

          setBusqueda(texto);
          setFiltrados(coincidencias);

          if (coincidencias.length === 0) {
            setMensaje("🔍 No se encontraron productos.");
          } else {
            setMensaje(`✅ Mostrando productos: ${resultado.productos.join(", ")}`);
          }
        }

        // 🗂️ FILTRAR POR CATEGORÍA
        else if (resultado.accion === "categoria") {
          const categoriaSolicitada = resultado.categoria.toLowerCase();
          const categoriaId = categoriasMap[categoriaSolicitada];

          if (!categoriaId) {
            setMensaje(`❌ Categoría no reconocida: "${categoriaSolicitada}"`);
          } else {
            const filtrados = productos.filter(p => p.categoria === categoriaId);
            setBusqueda(`categoría: ${categoriaSolicitada}`);
            setFiltrados(filtrados);
            setMensaje(`📂 Mostrando categoría "${categoriaSolicitada}"`);
          }
        }

        else {
          setMensaje("⚠️ Acción no reconocida.");
        }

        setTimeout(() => setMensaje(''), 3000);
        setGrabando(false);
      };

      mediaRecorder.start();
      setMensaje("🎤 Escuchando...");
      setTimeout(() => {
        mediaRecorder.stop();
        setMensaje("⏳ Procesando...");
      }, 5000);
    } catch (error) {
      console.error("🎙️ Error con micrófono:", error);
      setMensaje("❌ Error al acceder al micrófono.");
      setGrabando(false);
    }
  };

  return (
    <button
      onClick={handleVoiceInput}
      className="btn-mic"
      disabled={grabando}
    >
      {grabando ? '🎙️ Grabando...' : '🎤 Hablar'}
    </button>
  );
};

export default VoiceSearch;
