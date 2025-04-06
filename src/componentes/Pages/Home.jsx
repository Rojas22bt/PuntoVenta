import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../Css/Home.css';

const Home = () => {
  const imagesCelulares = [
    { src: 'fondo1.jpg', name: 'Celular 1' },
    { src: 'fondo1.jpg', name: 'Celular 2' },
    { src: 'fondo1.jpg', name: 'Celular 3' },
  ];

  const imagesComputadoras = [
    { src: 'fondo1.jpg', name: 'Computadora 1' },
    { src: 'fondo1.jpg', name: 'Computadora 2' },
    { src: 'fondo1.jpg', name: 'Computadora 3' },
  ];

  return (
    <div className='home_fondo'>
      <div className='home_fondoG'>
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="fondo1.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="fondo1.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="fondo1.jpg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>


        <div className='search-container'>
           <h1 className='home_titulo'>Scrum Stack</h1>
          <input type="text" className="search-input" placeholder="Buscar Producto" />
        </div>
 

        <div className='section'>

          <h3 className='section-title'>Celulares</h3>
          <p className='home_titulo2'>Aquí puedes encontrar una variedad de celulares de última generación.</p>
          <div className='home-image-container'>
            {imagesCelulares.map((image, index) => (
              <div key={index} className='image-wrapper'>
                <img
                  src={image.src}
                  alt={`Celular ${index + 1}`}
                  className='imageComCel'
                />
                <p className='image-name'>{image.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='section'>
          <h3 className='section-title'>Computadoras</h3>
          <p className='home_titulo2'>Explora nuestra selección de computadoras y laptops para todos los gustos.</p>
          <div className='home-image-container'>
            {imagesComputadoras.map((image, index) => (
              <div key={index} className='image-wrapper'>
                <img
                  src={image.src}
                  alt={`Computadora ${index + 1}`}
                  className='imageComCel'
                />
                <p className='image-name'>{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className='footer'>
        <p>Scrum Track</p>
        <p>Descripción: Esta es una tienda online de componentes tecnológicos.</p>
      </footer>
    </div>
  );
}

export default Home;