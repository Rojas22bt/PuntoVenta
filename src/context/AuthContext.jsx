import { createContext, useState, useContext, useEffect } from "react";
import {
  loginRequest,
  obtenerUsuariosRequest,
  obtenerRolesRequest,
  obtenerAlmacenRequest,
  obtenerCategoriaRequest,
  obtenerMarcaRequest,
  obtenerProductoRequest,
  obtenerProductoAdmiRequest,
  obtenerOfertaRequest,
  obtenerOferAdmitaRequest
} from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const [ofertasAdmi, setOfertasAdmi] = useState([]);
  const [productosAdmi, setProductosAdmi] = useState([]);

  const signin = async (credentials) => {
    try {
      const res = await loginRequest(credentials);
      const { access, refresh } = res.data.token;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setUser(res.data.usuario);
    } catch (err) {
      console.error("Error en el login:", err.response?.data || err.message);
      throw err;
    }
  };

  const cargarDatos = async () => {
    try {
      const uss = await obtenerUsuariosRequest();
      const ross = await obtenerRolesRequest();
      const [resCategorias, resMarcas, resAlmacenes,resOferta] = await Promise.all([
        obtenerCategoriaRequest(),
        obtenerMarcaRequest(),
        obtenerAlmacenRequest(),
        obtenerOfertaRequest(),
      ]);

      setUsuarios(uss.data);
      setRoles(ross.data);
      setCategorias(resCategorias.data);
      setMarcas(resMarcas.data);
      setAlmacenes(resAlmacenes.data);
      console.log(resOferta.data)
      setOfertas(resOferta.data)
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  };

  const cargarProductosAdmi = async () => {
    try {
      const res = await obtenerProductoAdmiRequest();
      const ofer = await obtenerOferAdmitaRequest();
      setOfertasAdmi(ofer.data)
      setProductosAdmi(res.data);
    } catch (err) {
      console.error("Error al cargar productosAdmi:", err);
    }
  };

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductoRequest();
      setProductos(res.data);
    } catch (err) {
      console.error("Error al cargar productos:", err);
    }
  };

  const recargarUsuarios = async () => {
    try {
      const uss = await obtenerUsuariosRequest();
      setUsuarios(uss.data);
    } catch (err) {
      console.error("Error al recargar usuarios:", err);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");
      const savedUser = localStorage.getItem("usuario");

      if (!access || !refresh || !savedUser) {
        setLoading(false);
        navigate('/login')
        return;
      }

      try {
        setUser(JSON.parse(savedUser));
        cargarDatos();
        recargarUsuarios();
        cargarProductos();
        cargarProductosAdmi();
      } catch (err) {
        console.error("Error al cargar usuario desde localStorage", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signin,
        user,
        loading,
        cargarDatos,
        cargarProductos,
        recargarUsuarios,
        cargarProductosAdmi,
        ofertasAdmi,
        ofertas,
        productosAdmi,
        usuarios,
        roles,
        marcas,
        almacenes,
        categorias,
        productos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
