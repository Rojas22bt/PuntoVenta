import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto más fácilmente
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Agregar producto
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar carrito
  const clearCart = () => setCartItems([]);

  // Total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: quantity === "" ? "" : Math.max(1, Number(quantity)),
            }
          : item
      )
    );
  };
  
  

  return (
    <CartContext.Provider
      value={{ cartItems, 
        addToCart,
         removeFromCart, 
         clearCart, 
         cartTotal,
         updateQuantity,
        }}
    >
      {children}
    </CartContext.Provider>
  );
};