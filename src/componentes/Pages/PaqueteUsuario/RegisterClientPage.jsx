import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerClienteRequest } from '../../../api/auth'
import '../../Css/RegisterClientPage.css'

const RegisterClientPage = () => {
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
    telefono: Yup.string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(7, "Debe tener al menos 7 dígitos")
      .required("El teléfono es obligatorio"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("La contraseña es obligatoria"),
    date: Yup.date().required("La fecha es obligatoria"),
    genero: Yup.string().required("El género es obligatorio"),
    nit: Yup.string(),
    ci: Yup.string(),
  }).test(
    "al-menos-un-documento",
    "Debe ingresar al menos NIT o CI",
    (values) => {
      return values?.nit?.trim() || values?.ci?.trim();;
    }
  )

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
      telefono: "",
      password: "",
      date: "",
      genero: "",
      nit: "",
      ci: ""
    },
    validationSchema,
    onSubmit: async (values) => {

      const docs = [];
      if (values.nit) docs.push({ id: 2, numero: values.nit });
      if (values.ci) docs.push({ id: 1, numero: values.ci });

      const data = {
        nombre: values.nombre,
        correo: values.email,
        telefono: values.telefono,
        fecha_nacimiento: values.date,
        sexo: values.genero,
        estado: true,
        password: values.password,
        rol: 2,
        documentos: docs
      }

      console.log(data)
      try {
        await registerClienteRequest(data)
        alert("✅ Usuario registrado correctamente si")
      } catch (error) {
        console.error("Error en el registro:", error)
        alert("❌ Error de conexión con el servidor")
      }
    }

  })

  return (
    <div className="contenedorRegister">
      <div className="cardRegister">
        <h2 className='text-primary'>Registro de Cliente</h2>
        <form onSubmit={formik.handleSubmit} className="formulario">
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              id='inpt'
              onChange={formik.handleChange}
              value={formik.values.nombre}
            />
            {formik.errors.nombre && <div className="text-danger">{formik.errors.nombre}</div>}
          </div>


          <label>Agregar Almenos un documento</label>
          <div className="mb-3">
            <label>NIT</label>
            <input
              type="number"
              name="nit"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.nit}
            />
          </div>

          <div className="mb-3">
            <label>CI</label>
            <input
              type="number"
              name="ci"
              className="form-control"
              onChange={formik.handleChange}
              value={formik.values.ci}
            />
             {formik.errors.nombre && <div className="text-danger">{formik.errors.nombre}</div>}
          </div>





          <div className="mb-3">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id='inpt'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
          </div>

          <div className="mb-3">
            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              id='inpt'
              onChange={formik.handleChange}
              value={formik.values.telefono}
            />
            {formik.errors.telefono && <div className="text-danger">{formik.errors.telefono}</div>}
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id='inpt'
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
          </div>

          <div className="mb-3">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="date"
              className="form-control"
              id='inpt'
              onChange={formik.handleChange}
              value={formik.values.date}
            />
            {formik.errors.date && <div className="text-danger">{formik.errors.date}</div>}
          </div>

          <div className="mb-2">
            <label>Género</label>
            <div className="d-flex gap-3">
              <div className="form-check">
                <input
                  type="radio"
                  name="genero"
                  value="F"
                  onChange={formik.handleChange}
                  checked={formik.values.genero === "F"}
                  className="form-check-input"
                  id="generoF"
                />
                <label htmlFor="generoF" className="form-check-label">Femenino</label>
              </div>

              <div className="form-check">
                <input
                  type="radio"
                  name="genero"
                  value="M"
                  onChange={formik.handleChange}
                  checked={formik.values.genero === "M"}
                  className="form-check-input"
                  id="generoM"
                />
                <label htmlFor="generoM" className="form-check-label">Masculino</label>
              </div>
            </div>
            {formik.errors.genero && <div className="text-danger">{formik.errors.genero}</div>}
          </div>

          <button type="submit" className="btn btn-success w-100">Registrar</button>
        </form>
      </div>
    </div>
  )
}

export default RegisterClientPage
