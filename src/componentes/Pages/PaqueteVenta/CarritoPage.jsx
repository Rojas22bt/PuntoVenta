import { useCart } from "../../../context/CartContext";

const CartList = () => {
    const { cartItems, removeFromCart, clearCart, cartTotal, updateQuantity } = useCart();

    if (cartItems.length === 0) {
        return <p>El carrito está vacío.</p>;
    }

    return (
        <div style={{ padding: '1rem', border: '1px solid #ccc', marginTop: '1rem' }}>
            <h3>Carrito</h3>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                        <label htmlFor="ProductCart">{item.nombre}</label>
                        <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, e.target.value)}
                        />

                        <label htmlFor="PrecioCart">{item.precio}</label>
                        <label htmlFor="subTotal">{Number(item.quantity) * Number(item.precio)}</label>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            style={{ marginLeft: '1rem' }}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
            <p><strong>Total:</strong> ${cartTotal.toFixed(2)}</p>
            <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    );
};

export default CartList;