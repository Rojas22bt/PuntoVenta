import { Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, permisoRequerido }) => {
    const { user } = useAuth();
    const [esperandoAuth, setEsperandoAuth] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEsperandoAuth(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (esperandoAuth || !user) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>Cargando permisos...</p>
            </div>
        );
    }

    const tienePermiso = user.permisos?.includes(permisoRequerido);

    return tienePermiso ? children : <Navigate to="/dasboard/sin-acceso" replace />;
};

export default ProtectedRoute;

// 🔵 Estilos en línea (CSS-in-JS)
const styles = {
    loaderContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    spinner: {
        width: "60px",
        height: "60px",
        border: "6px solid #ccc",
        borderTop: "6px solid #4b9ce2",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
    },
    text: {
        marginTop: "20px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
    },
};

// ✅ Agregamos keyframes manualmente al documento
const styleSheet = document.styleSheets[0];
const keyframes =
    `@keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
