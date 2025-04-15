import { createContext , useState, useContext, useEffect } from "react";
import { loginRequest,obtenerUsuariosRequest,obtenerRolesRequest } from "../api/auth";


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

    const signin = async ( user ) =>{
        try {
            const res = await loginRequest(user);
            console.log(res.data.usuario)
            setUser(res.data);
            // localStorage.setItem('token', res.data.token);
        } catch (err) {
            throw err;
        }
    }

    const cargarDatos = async() =>{
        try {
            const uss = await obtenerUsuariosRequest();
            const ross = await obtenerRolesRequest();
            setUsuarios(uss.data)
            setRoles(ross.data)
            console.log(ross.data)
            console.log(uss.data)
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
            usuarios
        }}>
            { children }
        </AuthContext.Provider>
    );


};