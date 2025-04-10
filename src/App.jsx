import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./componentes/Pages/Home";
import LoginPage from "./componentes/Pages/LoginPage";
import CustomNavbar from "./componentes/Otros/CustomNavbar";
import BitacoraPage from "./componentes/Pages/BitacoraPage";
import RegisterClientPage from "./componentes/Pages/RegisterClientPage";
import CategoriaProductPage from "./componentes/Pages/CategoriaProductPage";
import UsuarioPage from "./componentes/Pages/UsuarioPage";
import PrivilegioPage from "./componentes/Pages/PrivilegioPage";

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
        <Route path="/privilegios" element={<PrivilegioPage/>}/>
      </Routes>
    </>
  )
}
export default App
