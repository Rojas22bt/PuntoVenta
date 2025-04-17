import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom"; 

const CustomNavbar = () => {
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
            <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/catalogo-productos">
              Catalogo
            </Nav.Link>

            {/* Dropdown (opcional) */}
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/celulares">
                Celulares
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/computadoras">
                Computadoras
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* Elementos alineados a la derecha (login, carrito) */}
          <Nav>
            <Nav.Link as={Link} to="/login">
              Iniciar Sesión
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Registrarse
            </Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              🛒 Carrito
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;