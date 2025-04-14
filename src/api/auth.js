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