import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import '../../Css/Carrito.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const apiKey = import.meta.env.VITE_OPENAI_KEY;

const CartList = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        removeFromCart,
        clearCart,
        cartTotal,
        updateQuantity,
        addToCart
    } = useCart();

    const [mostrarRecomendaciones, setMostrarRecomendaciones] = useState(true);
    const [productosSugeridos, setProductosSugeridos] = useState([]);
    const { productos } = useAuth();

    useEffect(() => {
        if (cartItems.length > 0 && productos.length > 0) {
            recomendarProductos(cartItems, productos).then((sugerencias) => {
                if (!Array.isArray(sugerencias)) {
                    console.warn("⚠️ Las sugerencias no son un array:", sugerencias);
                    return;
                }

                const sugeridos = sugerencias.filter(p =>
                    typeof p === 'object' && p.id && p.nombre && p.precio
                );

                setProductosSugeridos(sugeridos);
            });
        }
    }, [cartItems, productos]);

    async function recomendarProductos(carrito, catalogo) {
        const nombresCarrito = carrito.map(p => p.nombre || p.descripcion).join(', ');
        const nombresCatalogo = catalogo.map(p =>
            `${p.id}: ${p.nombre}, precio: $${p.precio}, imagen: ${p.url}`
          ).join(', ');
        const prompt = `
Tengo este carrito con los siguientes productos: ${nombresCarrito}.

Del siguiente catálogo general (formato: id, nombre, precio y url de imagen): ${nombresCatalogo},

Recomiéndame productos que sean compatibles o complementarios con los del carrito.

Devuélveme un arreglo JSON con los mismos objetos del catálogo que recomiendas.
Ejemplo:
[
  {
    "id": 1,
    "nombre": "Cargador USB",
    "precio": 25.5,
    "url": "https://res.cloudinary.com/..."
  }
]
`;


        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });

        const data = await response.json();
        const texto = data.choices?.[0]?.message?.content;

        try {
            const parsed = typeof texto === 'string' ? JSON.parse(texto) : texto;

            if (Array.isArray(parsed.recomendaciones)) {
                return parsed.recomendaciones;
            }

            if (Array.isArray(parsed)) {
                return parsed;
            }

            console.warn("⚠️ Estructura inesperada en respuesta:", parsed);
            return [];
        } catch (e) {
            console.error("❌ GPT no devolvió un JSON válido:", texto);
            return [];
        }
    }

    if (cartItems.length === 0) {
        return <p className="carrito-vacio">El carrito está vacío.</p>;
    }

    return (
        <div className="contenedorCarrito">
            <div className="carritoForm">
                <h2>🛒 Carrito de Compras</h2>
                <div className="productoForm">
                    <ul className="listaProductos">
                        <li className="encabezado">
                            <span>Producto</span>
                            <span>Cantidad</span>
                            <span>Precio</span>
                            <span>Acciones</span>
                        </li>

                        {cartItems.filter(item => item.tipo === 'producto').map((item) => (
                            <li key={`producto-${item.id}`} className="filaProducto">
                                <span>{item.nombre}</span>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, item.tipo, e.target.value)}
                                />
                                <span>${item.precio}</span>
                                <button onClick={() => removeFromCart(item.id, item.tipo)}>Eliminar</button>
                            </li>
                        ))}

                        {cartItems.filter(item => item.tipo === 'oferta').length > 0 && (
                            <>
                                <li className="encabezado" style={{ marginTop: '30px' }}>
                                    <span>Oferta</span>
                                    <span>Cantidad</span>
                                    <span>Precio</span>
                                    <span>Acciones</span>
                                </li>
                                {cartItems.filter(item => item.tipo === 'oferta').map((item) => (
                                    <li key={`oferta-${item.id}`} className="filaProducto">
                                        <span>{item.descripcion}</span>
                                        <input
                                            type="number"
                                            min={1}
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, item.tipo, e.target.value)}
                                        />
                                        <span>${item.precio}</span>
                                        <button onClick={() => removeFromCart(item.id, item.tipo)}>Eliminar</button>
                                    </li>
                                ))}
                            </>
                        )}
                    </ul>
                </div>
                <div className="footerCarrito">
                    <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>
                    <button className="btnVaciar" onClick={clearCart}>🧹 Vaciar carrito</button>
                    <button className="btnPagar" onClick={() => navigate('/facturacion')}>💳 Seguir con el pago</button>
                </div>
            </div>

            {mostrarRecomendaciones && productosSugeridos.length > 0 && (
                <div className="recomendaciones">
                <h3>🧠 Te puede interesar</h3>
                <ul>
                  {productosSugeridos.map(p => (
                    <li key={p.id}>
                      <div className="sugerencia-card">
                        <img src={p.url} alt={p.nombre} className="sugerencia-img" />
                        <div className="sugerencia-info">
                          <p><strong>{p.nombre}</strong></p>
                          <p>${p.precio}</p>
                          <button onClick={() => addToCart({
                            id: p.id,
                            nombre: p.nombre,
                            precio: p.precio,
                            tipo: 'producto',
                            quantity: 1,
                            url: p.url
                          })}>
                            Agregar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>              
            )}
        </div>
    );
};

export default CartList;
