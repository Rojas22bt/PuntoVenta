import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./componentes/Pages/Home";
import LoginPage from "./componentes/Pages/LoginPage";
import CustomNavbar from "./componentes/Otros/CustomNavbar";
import BitacoraPage from "./componentes/Pages/BitacoraPage";
import RegisterClientPage from "./componentes/Pages/RegisterClientPage";
import CategoriaProductPage from "./componentes/Pages/CategoriaProductPage";

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
      </Routes>
    </>
  )
}
export default App
