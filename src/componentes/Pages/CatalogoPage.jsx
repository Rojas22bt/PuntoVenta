import React from 'react'
import '../Css/CatalogoPage.css'
import { AiOutlineClose } from 'react-icons/ai';

function CatalogoPage() {
  return (
    <div className='CatalogoConteiner'>
      <div className="form-group">
        <label htmlFor="modelo">Buscar tu Producto</label>
        <input type="text" name="modelo" placeholder="Escribe el nombre del producto" className="form-control" id='BuscadorCatalogo'/>
      </div>
      <div className="f">
        <div className="Img1"></div>
        <div className="Img1"></div>
        <div className="Img1"></div>
      </div>

      <div id="carouselExampleFade" class="carousel slide carousel-fade">
        <div class="carousel-inner">
          <h1 class="display-1">Ofertas</h1>
          <div class="carousel-item active">
            <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744853633/ihpones_12s_c4ukqo.png" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844534/Iphones_12s_jtwqmz.png" class="d-block w-100" alt="..." />
          </div>
          <div class="carousel-item">
            <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844535/Iphones_X_eooxvj.png" class="d-block w-100" alt="..." />
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h1 class="display-1">Celulares</h1>
      <div className='CatalogoV'>
        <div className="CatProducto">
          <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844548/Iphone_11_pro_max_aisxfw.png" alt="CatProducto" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844530/Iphone_13_pro_v7z62g.png" alt="CatProducto 2" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="https://res.cloudinary.com/ddltlpsy1/image/upload/v1744844548/Iphone_11_pro_max_aisxfw.png" alt="CatProducto 3" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="fondo1.jpg" alt="CatProducto 3" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>

      </div> <h1 class="display-1">Computadoras</h1>
      <div className='CatalogoV'>
        <div className="CatProducto">
          <img src="fondo1.jpg" alt="CatProducto 1" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="fondo1.jpg" alt="CatProducto 2" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="fondo1.jpg" alt="CatProducto 3" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
        <div className="CatProducto">
          <img src="fondo1.jpg" alt="CatProducto 3" className="CatProducto-img" />
          <div className="CatProducto-footer">
            <h3 className="CatProducto-nombre">CatProducto</h3>
            <span className="CatProducto-precio">$999</span>
            <button className="btn-mas">+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CatalogoPage