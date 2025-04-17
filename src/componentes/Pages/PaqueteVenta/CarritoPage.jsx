import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import '../../Css/Carrito.css';

const CartList = () => {
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
                        {cartItems.map((item) => (
                            <li key={item.id} className="filaProducto">
                                <span>{item.nombre}</span>
                                <input
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, e.target.value)}
                                />
                                <span>${item.precio}</span>
                                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footerCarrito">
                    <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>
                    <button className="btnVaciar" onClick={clearCart}>🧹 Vaciar carrito</button>
                    <button className="btnPagar" onClick={clearCart}>💳 Seguir con el pago</button>
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
