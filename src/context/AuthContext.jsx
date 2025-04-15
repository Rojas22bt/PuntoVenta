import { createContext , useState, useContext, useEffect } from "react";
import { loginRequest,obtenerUsuariosRequest,obtenerRolesRequest,
        obtenerAlmacenRequest, obtenerCategoriaRequest, obtenerMarcaRequest
 } from "../api/auth";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AusthProvider = ({ children }) =>{

    const [ user, setUser ] = useState([]);
    const [ loading, setLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [almacenes, setAlmacenes] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const signin = async ( user ) =>{
        try {
            const res = await loginRequest(user);
            console.log(res.data.usuario)
            setUser(res.data.usuario);
            // localStorage.setItem('token', res.data.token);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        const cargarDatos = async () => {
          try {
            const [resCategorias, resMarcas, resAlmacenes] = await Promise.all([
              obtenerCategoriaRequest(),
              obtenerMarcaRequest(),
              obtenerAlmacenRequest()
            ]);
            setCategorias(resCategorias.data); 
            setMarcas(resMarcas.data);
            setAlmacenes(resAlmacenes.data);
          } catch (error) {
            console.error('Error al cargar datos:', error);
          }
        };
      
        cargarDatos();
      }, []);
    

    const cargarDatos = async() =>{
        try {
            const uss = await obtenerUsuariosRequest();
            const ross = await obtenerRolesRequest();
            setUsuarios(uss.data)
            setRoles(ross.data)
            const [resCategorias, resMarcas, resAlmacenes] = await Promise.all([
                obtenerCategoriaRequest(),
                obtenerMarcaRequest(),
                obtenerAlmacenRequest()
              ]);
              setCategorias(resCategorias.data); 
              setMarcas(resMarcas.data);
              setAlmacenes(resAlmacenes.data);
        } catch (err) {
            throw err;
        }
    }

    const recargarUsuarios = async() => {
        try {
            const uss = await obtenerUsuariosRequest();
            setUsuarios(uss.data)
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        async function checklogin() {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const res = await vericarToken(token);
                if (!res.dat) {
                    setLoading(false);
                    return;
                }
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
    
        }

        checklogin();
    }, []);

    return (
        <AuthContext.Provider value={{
            signin,
            cargarDatos,
            user,
            roles,
            recargarUsuarios,
            marcas,
            almacenes,
            categorias,
            usuarios
        }}>
            { children }
        </AuthContext.Provider>
    );


};