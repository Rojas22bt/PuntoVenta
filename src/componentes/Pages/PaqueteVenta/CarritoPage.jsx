import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import '../../Css/Carrito.css';
import { useNavigate } from "react-router-dom";

const CartList = () => {

    const navigate = useNavigate();

    const { cartItems, removeFromCart, clearCart, cartTotal, updateQuantity } = useCart();
    const [mostrarRecomendaciones, setMostrarRecomendaciones] = useState(true);

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

                        {/* 🧺 Productos */}
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

                        {/* 🎁 Ofertas */}
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

            {mostrarRecomendaciones && (
                <div className="recomendaciones">
                    <h3>🧠 Te puede interesar</h3>
                    <p>Aquí puedes mostrar productos relacionados o más vendidos.</p>
                </div>
            )}
        </div>
    );
};

export default CartList;
