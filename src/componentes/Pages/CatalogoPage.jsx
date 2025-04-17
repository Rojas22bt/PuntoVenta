import React, { useState, useMemo } from 'react';
import '../Css/CatalogoPage.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Fuse from 'fuse.js';
import VoiceSearch from './VoiceSearch';

function CatalogoPage() {
  const { productos } = useAuth();
  const { addToCart } = useCart();

  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const fuse = useMemo(() => new Fuse(productos, {
    keys: ['nombre'],
    threshold: 0.4
  }), [productos]);

  const normalizarTexto = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f.]/g, "").trim().toLowerCase();

  const handleBusqueda = (e) => {
    const valor = normalizarTexto(e.target.value);
    setBusqueda(valor);
    const resultado = fuse.search(valor).map(r => r.item);
    setFiltrados(resultado);
  };

  const agregarAlCarrito = (producto) => {
    addToCart(producto);
    setMensaje(`"${producto.nombre}" añadido al carrito`);
    setTimeout(() => setMensaje(''), 2000);
  };

  const renderProductos = (lista) => (
    <div className='CatalogoV'>
      {lista.map(producto => (
        <div className="CatProducto" key={producto.id}>
          <img src={producto.url} alt={producto.nombre} className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">{producto.nombre}</h3>
            <span className="CatProducto-precio">${producto.precio}</span>
            <button className="btn-mas" onClick={() => agregarAlCarrito(producto)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProductosPorCategoria = (categoriaId, titulo) => {
    const productosCategoria = productos.filter(p => p.categoria === categoriaId);
    if (productosCategoria.length === 0) return null;
    return (
      <>
        <h1 className="display-1">{titulo}</h1>
        {renderProductos(productosCategoria)}
      </>
    );
  };

  return (
    <div className='CatalogoConteiner'>
      {mensaje && <div className="alert alert-success mensaje-carrito">{mensaje}</div>}

      <div className="form-group" id='BuscadorCatalogo'>
        <label htmlFor="modelo">Busca tu Producto</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexDirection:'column' }}>
          <input
            type="text"
            name="modelo"
            placeholder="Nombre del producto"
            className="form-control"
            id='BuscadorCatalogoInput'
            value={busqueda}
            onChange={handleBusqueda}
            style={{minWidth:'250px'}}
          />
          <VoiceSearch
            productos={productos}
            setBusqueda={setBusqueda}
            setFiltrados={setFiltrados}
            agregarAlCarrito={agregarAlCarrito}
            setMensaje={setMensaje}
            normalizarTexto={normalizarTexto}
            fuse={fuse}
          />
        </div>
      </div>

      <div style={{ marginTop: '120px', width: '100%' }}>
        {busqueda ? (
          <>
            <h1 className="display-1">Resultados de búsqueda</h1>
            {filtrados.length > 0 ? renderProductos(filtrados) : <p>No se encontraron productos.</p>}
          </>
        ) : (
          <>
            <div className="f">
              <div className="Img1"></div>
              <div className="Img1"></div>
              <div className="Img1"></div>
            </div>

            <div id="carouselExampleFade" className="carousel slide carousel-fade">
              <div className="carousel-inner">
                <h1 className="display-1">Ofertas</h1>
                <div className="carousel-item active">
                  <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744853633/ihpones_12s_c4ukqo.png" className="d-block w-100" alt="Oferta 1" />
                </div>
                <div className="carousel-item">
                  <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844534/Iphones_12s_jtwqmz.png" className="d-block w-100" alt="Oferta 2" />
                </div>
                <div className="carousel-item">
                  <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844535/Iphones_X_eooxvj.png" className="d-block w-100" alt="Oferta 3" />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </div>

            {renderProductosPorCategoria(1, "Celulares")}
            {renderProductosPorCategoria(2, "Computadoras")}
            {renderProductosPorCategoria(3, "Accesorios")}
          </>
        )}
      </div>
    </div>
  );
}

export default CatalogoPage;
