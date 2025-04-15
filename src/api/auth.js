import { data } from "react-router-dom";
import instance from "./axios";

const tiempoEspera = 10000;

export const loginRequest = data => instance.post(`/usuario/login`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials:true
})

export const registerClienteRequest = (data) => instance.post(`/usuario/registro`,data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})


export const obtenerBitacoraRequest = () => {
    return instance.get(`/usuario/bitacora`, {
        withCredentials: true,
        timeout: tiempoEspera
    })}

export const obtenerUsuariosRequest = () => {
    return instance.get('/usuario',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const obtenerRolesRequest = () => {
    return instance.get('/usuario/roles',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}


export const actualizarUsuario = data =>
    instance.patch(`/usuario/actualizar`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
export const crearMarcaRequest = data => instance.post ('/inventario/marca',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})
export const crearCategoriaRequest = data => instance.post ('/inventario/categoria',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})
export const crearAlmacenRequest = data => instance.post ('/inventario/almacen',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})
    '/inventario/marca'

    