import React from 'react'
import '../Css/ComputadorasPage.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ComputadorasPage() {
    return (
        <div className='ComputadorasContenedor'>

            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators" id='indicador'>
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
            <div className='Contenedor'>
                <h1>Computadoras</h1>
                <div className='search-computadoras'>
                    <input type="text" className="search-input" placeholder="Buscar Computadoras" />
                </div>
                <button className='AdquiereComputadora' id='buttonsito'>
                    Adquiere tu Computadora
                </button>

            </div>

            <div className='ContenedorMarcas'>
                <div class="card" id="card">
                    <div class="content">
                        <img src="fondo1.jpg" alt="" />
                        <span>Dell</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="Registro.jpg" alt="" />
                        <span>Mac Bocks</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="fondo1.jpg" alt="" />
                        <span>HP</span>
                    </div>
                </div>

            </div>
            <h2>DELL</h2>
            <div className='ContenedorMarcas'>
                
                <div class="card" id="card">
                    <div class="content">
                        <img src="fondo1.jpg" alt="" />
                        <span>Dell 1</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="Registro.jpg" alt="" />
                        <span>Dell 1</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="fondo1.jpg" alt="" />
                        <span>Dell 1</span>
                    </div>
                </div>

            </div>
            <h2>Mac Bock Pro</h2>
            <div className='ContenedorMarcas'>
                
                <div class="card" id="card">
                    <div class="content">
                        <img src="fondo1.jpg" alt="" />
                        <span>Mac Bock Pro 1</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="Registro.jpg" alt="" />
                        <span>Mac Bock Prol 1</span>
                    </div>
                </div>
                <div class="card" id="card">
                    <div class="content">
                    <img src="fondo1.jpg" alt="" />
                        <span>Mac Bock Pro 1</span>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default ComputadorasPage