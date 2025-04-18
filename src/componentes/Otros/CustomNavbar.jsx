import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CustomNavbar = () => {
  const { user, handleLogout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" collapseOnSelect>
      <Container>
        {/* Logo / Marca */}
        <Navbar.Brand as={Link} to="/">
          Mi App
        </Navbar.Brand>

        {/* Botón para móviles */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido colapsable */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">


            {user ? (
              <Nav.Link as={Link} to="/catalogo-productos">
                Catálogo
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/catalogo-productos">
              Comentarios
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo-productos">
              Nuestra Calificacion
            </Nav.Link>

            {/* Dropdown de categorías */}
            {/* <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/celulares">
                Celulares
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/computadoras">
                Computadoras
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>

          {/* Sección derecha */}
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/dasboard/perfil-usuario">
                  Perfil <i className="bi bi-person-fill text-white ms-1"></i>
                </Nav.Link>

                {user.estado && (
                  <Nav.Link as={Link} to="/carrito">
                    🛒 Carrito
                  </Nav.Link>
                )}
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
