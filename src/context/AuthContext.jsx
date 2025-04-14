import { createContext , useState, useContext, useEffect } from "react";


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

    const signin = async ( user ) =>{
        try {
            const res = await loginRequest(user);
            setUser(res.data.usuario);
            localStorage.setItem('token', res.data.token);
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
            user
        }}>
            { children }
        </AuthContext.Provider>
    );


};