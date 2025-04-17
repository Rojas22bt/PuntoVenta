import { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { v4 as uuidv4 } from 'uuid'; // Necesitas instalar esto: npm install uuid

const AddProductForm = () => {
  const { addToCart } = useCart();
  const [nombre, setName] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
//   const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !precio || !cantidad) return;

    const newProduct = {
      id: uuidv4(),
      nombre: nombre,
      precio: parseFloat(precio),
      cantidad: cantidad
    };

    addToCart(newProduct);
    setName('');
    setPrecio('');
    setCantidad('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h3>Agregar Producto</h3>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        step="0.01"
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
      />
      <button type="submit">Agregar al carrito</button>
    </form>
  );
};

export default AddProductForm;