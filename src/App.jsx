import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./componentes/Pages/Home";
import LoginPage from "./componentes/Pages/PaqueteUsuario/LoginPage";
import CustomNavbar from "./componentes/Otros/CustomNavbar";
import BitacoraPage from "./componentes/Pages/PaqueteUsuario/BitacoraPage";
import RegisterClientPage from "./componentes/Pages/PaqueteUsuario/RegisterClientPage";
import CaracteristicasPage from "./componentes/Pages/PaqueteInventario/CaracteristicasPage";
import UsuarioPage from "./componentes/Pages/PaqueteUsuario/UsuarioPage";
import ProductoPage from "./componentes/Pages/PaqueteInventario/ProductoPage";
import PrivilegioPage from "./componentes/Pages/PaqueteUsuario/PrivilegioPage";
import MercaderiaPage from "./componentes/Pages/PaqueteInventario/MercaderiaPage";
import FacturacionPage from "./componentes/Pages/PaqueteVenta/FacturacionPage";
import OfertasPage from "./componentes/Pages/PaqueteInventario/OfertasPage";
import ComputadorasPage from "./componentes/Pages/ComputadorasPage";
import CelularesPage from "./componentes/Pages/CelularesPage";
import { AuthProvider } from "./context/AuthContext";
import HistorialClientePage from "./componentes/Pages/PaqueteUsuario/HistorialClientePage";
import PerfilUsuarioPage from "./componentes/Pages/PaqueteUsuario/PerfilUsuarioPage";
import ComentarioPage from "./componentes/Pages/PaqueteVenta/ComentarioPage";
import StripeContainer from "./componentes/Pages/StripeContainer";

import { Homed } from "./componentes/Homed/Homed";
import CatalogoPage from "./componentes/Pages/CatalogoPage";
import { CartProvider } from "./context/CartContext";
import CartList from "./componentes/Pages/PaqueteVenta/CarritoPage";
import AddProductForm from "./componentes/Pages/PaqueteVenta/PruebaPage";
import CalificacionesPage from "./componentes/Pages/CalificacionesPage";
import SinAcceso from "./componentes/Pages/SinAcceso";

function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>

  )
}

function Main() {
  return (
    <>
      <CustomNavbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bitacora" element={<BitacoraPage />} />
        <Route path="/register" element={<RegisterClientPage />} />
        <Route path="/CaracteristicasPage" element={<CaracteristicasPage />} />
        <Route path="/usuarios" element={<UsuarioPage />} />
        <Route path="/producto" element={<ProductoPage />} />
        <Route path="/privilegio" element={<PrivilegioPage />} />
        <Route path="/mercaderia" element={<MercaderiaPage />} />
        <Route path="/facturacion" element={<FacturacionPage />} />
        <Route path="/oferta" element={<OfertasPage />} />
        <Route path="/computadoras" element={<ComputadorasPage />} />
        <Route path="/celulares" element={<CelularesPage />} />
        <Route path="/facturacion/tarjet" element={<StripeContainer />} />
        <Route path="/historialcliente" element={<HistorialClientePage />} />
        <Route path="/perfilUsuario" element={<PerfilUsuarioPage />} />
        <Route path="/comentario" element={<ComentarioPage />} />
        <Route path="/catalogo-productos" element={<CatalogoPage />} />
        <Route path="/dasboard/*" element={<Homed />} />
        <Route path="/carrito" element={<CartList />} />
        <Route path="/prueba" element={<AddProductForm />} />
        <Route path="/calificacion" element={<CalificacionesPage />} />
        <Route path="/sinacceso" element={<SinAcceso />} />

      </Routes>
    </>
  )
}
export default App
