import React, { useState } from "react";
import  {Sidebar} from "../Sidebar/SidebarPage.jsx";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import   {HomeDas}  from "../Home/Homedas";
import { useAuth } from "../../context/AuthContext.jsx";

//--------------------Usuarios-------------//
import PerfilUsuarioPage from "../Pages/PaqueteUsuario/PerfilUsuarioPage.jsx";
//-------------------Servicios------------//


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
          <Route path="/perfilUsuario" element={<PerfilUsuarioPage />} />
          {/* <Route path="/perfiles" element={<PerfilDeUsuario />} />
          <Route path="/permisos" element={<PrivilegioPage />} />
          <Route path="/vehiculos" element={<VehiculosPage />} />
          <Route path="/galeriaVeh" element={<GaleriaVehiculosPage />} />
          <Route path="/regisChofer" element={<AsignacionChoferePage/>} />
          <Route path="*" element={<div>No encontrado</div>} /> */}
        </Routes>
        <Outlet />
      </div>
    </div>
  );
};
