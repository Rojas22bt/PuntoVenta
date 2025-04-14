import instance from "./axios";

const tiempoEspera = 10000;

export const loginRequest = data => instance.post(`/usuario/login`,data,{
    headers: {
        "Content-Type": "application/json"
      },
    withCredentials:true
})
