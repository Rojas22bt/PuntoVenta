import React, { useState } from "react";
import "./SidebarPage.css"

import {
  AiOutlineLeft,
  AiOutlineHome,
  AiOutlineApartment,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineAnalytics, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {



  const { logout, handleLogout } = useAuth(); // Usa el método logout
  const navigate = useNavigate(); // Hook para redirección

  // Estado para manejar dropdowns
  const [isPaquete1Open, setIsPaquete1Open] = useState(false);
  const [isPaquete2Open, setIsPaquete2Open] = useState(false);
  const [isPaquete30pen, setIsPaquete30pen] = useState(false);
  const [isPaquete40pen, setIsPaquete40pen] = useState(false);

  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const bit = {
    UsuarioID: null,
    message: ''

  };

  const Logout = () => {
    try {
      handleLogout(); // Llama a logout del contexto
      window.location.href = "/login"; // Redirige al login después de cerrar sesión
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={`sidebar-container ${sidebarOpen ? "open" : "closed"}`}>
      <button className="sidebar-button" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="logo-content">
        <div className="img-content">
          {/* Si no necesitas el logo, puedes eliminar esta parte */}
          {/* <img src={logo} alt="logo_licoreria_bunker" /> */}
        </div>
        <h2>{sidebarOpen ? "" : ""}</h2>
      </div>

      {/* Paquete 1 - Adm. Usuario */}
      <div
        className="link-container"
        onClick={() => setIsPaquete1Open(!isPaquete1Open)}
      >
        <h3 className="dropdown-label">
          {sidebarOpen ? "Usuario" : "U"}
        </h3>

      </div>
      {isPaquete1Open &&
        enlaceUsuario.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

      <div className="divider"></div>

      {/* Paquete 2 - Adm. Invent. */}
      <div
        className="link-container"
        onClick={() => setIsPaquete2Open(!isPaquete2Open)}
      >
        <h3 className="dropdown-label">
          {sidebarOpen ? "Inventario" : "I"}
        </h3>
      </div>
      {isPaquete2Open &&
        enlaceInventario.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))}

      <div className="divider"></div>

      {/* Paquete 3 - Ventas (vacío por ahora) */}
      <div className="link-container" onClick={() => setIsPaquete40pen(!isPaquete40pen)}>
        <h3 className="dropdown-label">
          {sidebarOpen ? "Venta" : "V"}
        </h3>
      </div>
      {
        isPaquete40pen &&
        enlaceVenta.map(({ label, icon, to }) => (
          <div className="link-container" key={label}>
            <NavLink
              to={to}
              className={({ isActive }) => `links${isActive ? " active" : ""}`}
            >
              <div className="link-icon">{icon}</div>
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          </div>
        ))
      }
      <div className="divider"></div>

      {/*  salirrrrrr */}
      <div className="link-container">
        <button onClick={Logout} className="links">
          <div className="link-icon"><MdLogout /></div>
          {sidebarOpen && <span>Salir</span>}
        </button>
      </div>

      <div className="divider"></div>
    </div >
  );
};

const enlaceUsuario = [
  {
    label: "Bitacora",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/bitacora", // Corregido a "dashboard"
  },
  {
    label: "Usuarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/usuarios", // Corregido a "dashboard"
  },
  {
    label: "Permisos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/privilegio", // Corregido a "dashboard"
  },
  {
    label: "Registro",
    icon: <AiOutlineApartment />,
    to: "/dasboard/register", // Corregido a "dashboard"
  },
  {
    label: "Historial del Cliente",
    icon: <AiOutlineApartment />,
    to: "/dasboard/historialcliente", // Corregido a "dashboard"
  },
];

const enlaceInventario = [
  {
    label: "Productos",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/producto", // Corregido a "dashboard"
  },
  {
    label: "Mercaderia",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/mercaderia", // Corregido a "dashboard"
  },
  {
    label: "Caracteristicas",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/caracteristicas-productos", // Corregido a "dashboard"
  },
  {
    label: "Ofertas",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/oferta", // Corregido a "dashboard"
  },

];

const enlaceVenta = [
  {
    label: "Comprobantes",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/comprobante",
  },
  {
    label: "Comentarios",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/comentarios",
  },
  {
    label: "Calificaciones",
    icon: <MdOutlineAnalytics />,
    to: "/dasboard/calificaciones",
  }
]
