import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Css/LoginPage.css'
import { useAuth } from '../../../context/AuthContext';

const LoginPage = () => {

    const { signin } = useAuth();

    // Validación con Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Correo inválido")
            .required("El correo es obligatorio"),
        password: Yup.string()
            .min(6, "La contraseña debe tener al menos 6 caracteres")
            .required("La contraseña es obligatoria"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
              const datos = {
                correo: values.email,
                password: values.password
              };
          
              console.log(datos);
          
              const response = await signin(datos); // Esto ya devuelve la respuesta
          
              // ✅ Si llegaste aquí, todo fue bien
              alert("✅ Login Exitoso");
          
            } catch (error) {
              console.error("❌ Error en el login:", error);
          
              const mensaje =
                error?.response?.data?.message || "Error de conexión con el servidor";
          
              alert("❌ " + mensaje);
            }
        }  
    });


    return (
        <div className="contenedorLogin">
            <div className='contenedorformulario'>
                <h2 className='text-primary'>Iniciar Sesión</h2>
                <form onSubmit={formik.handleSubmit} className='formulario'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && (
                            <div className="text-danger">{formik.errors.email}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && (
                            <div className="text-danger">{formik.errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-outline-success">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
