import React from 'react';
import '../Css/CatalogoPage.css';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function CatalogoPage() {
  const { productos } = useAuth();
  const { addToCart } = useCart();

  const renderProductosPorCategoria = (categoriaId, titulo) => (
    <>
      <h1 className="display-1">{titulo}</h1>
      <div className='CatalogoV'>
        {productos
          .filter(p => p.categoria === categoriaId)
          .map(producto => (
            <div className="CatProducto" key={producto.id}>
              <img src={producto.url} alt={producto.nombre} className="CatProducto-img" />
              <div className="CatProducto-footer">
                <h3 className="CatProducto-nombre">{producto.nombre}</h3>
                <span className="CatProducto-precio">${producto.precio}</span>
                <button
                  className="btn-mas"
                  onClick={() => addToCart({
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio
                  })}                  
                >
                  +
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );

  return (
    <div className='CatalogoConteiner'>
      <div className="form-group" id='BuscadorCatalogo'>
        <label htmlFor="modelo">Busca tu Producto</label>
        <input type="text" name="modelo" placeholder="Nombre del producto" className="form-control" id='BuscadorCatalogoInput' />
      </div>

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
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {renderProductosPorCategoria(1, "Celulares")}
      {renderProductosPorCategoria(2, "Computadoras")}
      {renderProductosPorCategoria(3, "Accesorios")}
    </div>
  );
}

export default CatalogoPage;
