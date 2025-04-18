// context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitializing, setIsInitializing] = useState(true);


  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (e) {
        console.error("Error al parsear carrito", e);
        setCartItems([]);
      }
    }
    setIsInitializing(false); // ✅ Marcar que ya terminó la carga
  }, []);
  

  useEffect(() => {
    if (!isInitializing) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isInitializing]);
  

  // Agregar producto (con id obligatorio)
  const addToCart = (nuevoItem) => {
    setCartItems((prevItems) => {
      const itemExistente = prevItems.find(
        (item) => item.id === nuevoItem.id && item.tipo === nuevoItem.tipo
      );
      if (itemExistente) {
        return prevItems.map((item) =>
          item.id === nuevoItem.id && item.tipo === nuevoItem.tipo
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...nuevoItem, quantity: 1 }];
      }
    });
  };
  

  const removeFromCart = (id, tipo) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.tipo === tipo))
    );
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id, tipo, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.tipo === tipo
          ? { ...item, quantity: Number(quantity) }
          : item
      )
    );
  };
  

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
