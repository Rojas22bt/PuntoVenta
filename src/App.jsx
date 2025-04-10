import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./componentes/Pages/Home";
import LoginPage from "./componentes/Pages/LoginPage";
import CustomNavbar from "./componentes/Otros/CustomNavbar";
import BitacoraPage from "./componentes/Pages/BitacoraPage";
import RegisterClientPage from "./componentes/Pages/RegisterClientPage";
import CategoriaProductPage from "./componentes/Pages/CategoriaProductPage";
import UsuarioPage from "./componentes/Pages/UsuarioPage";
import ProductoPage from "./componentes/Pages/ProductoPage";
import PrivilegioPage from "./componentes/Pages/PrivilegioPage";
import MercaderiaPage from "./componentes/Pages/MercaderiaPage";
import FacturacionPage from "./componentes/Pages/FacturacionPage";
import OfertasPage from "./componentes/Pages/OfertasPage";

function App() {

  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  )
}

function Main() {
  return(
    <>
      <CustomNavbar/>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/bitacora" element={<BitacoraPage/>}/>
        <Route path="/register" element={<RegisterClientPage/>}/>
        <Route path="/categoriaproductos" element={<CategoriaProductPage/>}/>
        <Route path="/usuarios" element={<UsuarioPage/>}/>
        <Route path="/producto" element={<ProductoPage/>}/>
        <Route path="/privilegio" element={<PrivilegioPage/>}/>
        <Route path="/mercaderia" element={<MercaderiaPage/>}/>
        <Route path="/facturacion" element={<FacturacionPage/>}/>
        <Route path="/oferta" element={<OfertasPage/>}/>
      </Routes>
    </>
  )
}
export default App
