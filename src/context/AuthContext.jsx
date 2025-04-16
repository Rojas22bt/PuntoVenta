import { createContext, useState, useContext, useEffect } from "react";
import {
 loginRequest,
  obtenerUsuariosRequest,
  obtenerRolesRequest,
  obtenerAlmacenRequest,
  obtenerCategoriaRequest,
  obtenerMarcaRequest,
  obtenerProductoRequest
} from "../api/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [almacenes, setAlmacenes] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productos, setProductos] = useState([]);

  const signin = async (credentials) => {
    try {
        console.log(credentials);
      const datos = await loginRequest(credentials);
      confirm.log(datos.data)
      if (data.token.access && data.token.refresh) {
        localStorage.setItem("access", data.token.access);
        localStorage.setItem("refresh", data.token.refresh);
        setUser(data.usuario); // puedes hacer otra petición para obtener info del usuario si quieres
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (err) {
      throw err;
    }
  };

  const cargarDatos = async () => {
    try {
      const uss = await obtenerUsuariosRequest();
      const ross = await obtenerRolesRequest();
      const [resCategorias, resMarcas, resAlmacenes] = await Promise.all([
        obtenerCategoriaRequest(),
        obtenerMarcaRequest(),
        obtenerAlmacenRequest(),
      ]);

      setUsuarios(uss.data);
      setRoles(ross.data);
      setCategorias(resCategorias.data);
      setMarcas(resMarcas.data);
      setAlmacenes(resAlmacenes.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
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

  // Refrescar token si es necesario
  const refreshToken = async () => {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) return null;

    try {
      const res = await fetch("https://web-production-ab6a3.up.railway.app/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      const data = await res.json();

      if (res.ok && data.access) {
        localStorage.setItem("access", data.access);
        return data.access;
      } else {
        throw new Error("No se pudo refrescar el token");
      }
    } catch (error) {
      console.error("Error al refrescar token:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (!access && !refresh) {
        setLoading(false);
        return;
      }

      try {
        // Puedes agregar un endpoint en el backend para validar el token si lo necesitas
        const userData = await obtenerUsuariosRequest(); // o un endpoint /me si lo tienes
        setUser(userData.data);
      } catch (error) {
        // Si el access token falla, intenta refrescar
        const newAccess = await refreshToken();
        if (newAccess) {
          try {
            const userData = await obtenerUsuariosRequest();
            setUser(userData.data);
          } catch (err) {
            console.error(err);
          }
        } else {
          setUser(null);
        }
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
