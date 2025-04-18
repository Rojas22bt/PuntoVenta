import React, { useState } from "react";
import  {Sidebar} from "../Sidebar/SidebarPage.jsx";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import   {HomeDas}  from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext.jsx";

//--------------------Usuarios-------------//
import BitacoraPage from "../Pages/PaqueteUsuario/BitacoraPage.jsx";
import UsuarioPage from "../Pages/PaqueteUsuario/UsuarioPage.jsx";
import PrivilegioPage from "../Pages/PaqueteUsuario/PrivilegioPage.jsx";
import RegisterClientPage from "../Pages/PaqueteUsuario/RegisterClientPage.jsx";
import HistorialClientePage from "../Pages/PaqueteUsuario/HistorialClientePage.jsx";
import PerfilUsuarioPage from "../Pages/PaqueteUsuario/PerfilUsuarioPage.jsx";

//-------------------Inventario------------//
import ProductoPage from "../Pages/PaqueteInventario/ProductoPage.jsx";
import MercaderiaPage from "../Pages/PaqueteInventario/MercaderiaPage.jsx";
import CategoriaProductPage from "../Pages/PaqueteInventario/CaracteristicasPage.jsx";
import OfertasPage from "../Pages/PaqueteInventario/OfertasPage.jsx";

//-------------------Venta-----------------//
import ComentarioPage from "../Pages/PaqueteVenta/ComentarioPage.jsx";

import "./Homed.css"

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="content-container">
        <Routes>
          <Route path="/homeda" element={<HomeDas />} />
          <Route path="/bitacora" element={<BitacoraPage />} />
          <Route path="/usuarios" element={<UsuarioPage />} />
          <Route path="/register" element={<RegisterClientPage />} />
          <Route path="/privilegio" element={<PrivilegioPage/>} />
          <Route path="/historialcliente" element={<HistorialClientePage />} />
          <Route path="/producto" element={<ProductoPage />} />
          <Route path="/mercaderia" element={<MercaderiaPage />} />
          <Route path="/caracteristicas-productos" element={<CategoriaProductPage />} />
          <Route path="/oferta" element={<OfertasPage />} />
          <Route path="/comentarios" element={<ComentarioPage />} />
          <Route path="/perfil-usuario" element={<PerfilUsuarioPage/>} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
