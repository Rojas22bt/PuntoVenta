import React, { useState, useEffect} from "react";
import { Sidebar } from "../Sidebar/SidebarPage.jsx";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { HomeDas } from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext.jsx";
import ProtectedRoute from "../../protected/ProtectedRoute.jsx";

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
import SinAcceso from "../Pages/SinAcceso.jsx";

import "./Homed.css"

export const Homed = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAuth();
  const [esperandoAuth, setEsperandoAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setEsperandoAuth(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!user && !esperandoAuth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`containe12 ${sidebarOpen ? "active12" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="content-container">
        <Routes>
          <Route path="/homeda" element={<HomeDas />} />
          <Route
            path="/bitacora"
            element={
              <ProtectedRoute permisoRequerido="ver ventana bitácora">
                <BitacoraPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/usuarios"
            element={
              <ProtectedRoute permisoRequerido="ver ventana usuarios">
                <UsuarioPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/privilegio"
            element={
              <ProtectedRoute permisoRequerido="ver ventana permisos">
                <PrivilegioPage  />
              </ProtectedRoute>
            }
          />

          <Route
            path="/historialcliente"
            element={
              <ProtectedRoute permisoRequerido="ver ventana historial de cliente">
                <HistorialClientePage  />
              </ProtectedRoute>
            }
          />

          <Route
            path="/producto"
            element={
              <ProtectedRoute permisoRequerido="ver ventana productos">
                <ProductoPage  />
              </ProtectedRoute>
            }
          />

          <Route
            path="/mercaderia"
            element={
              <ProtectedRoute permisoRequerido="ver ventana mercadería">
                <MercaderiaPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/caracteristicas-productos"
            element={
              <ProtectedRoute permisoRequerido="ver ventana características">
                <CategoriaProductPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/oferta"
            element={
              <ProtectedRoute permisoRequerido="ver ventana ofertas">
                <OfertasPage  />
              </ProtectedRoute>
            }
          />

          <Route path="/register" element={<RegisterClientPage />} />
          <Route path="/comentarios" element={<ComentarioPage />} />
          <Route path="/perfil-usuario" element={<PerfilUsuarioPage />} />
          <Route path="/sin-acceso" element={<SinAcceso />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
