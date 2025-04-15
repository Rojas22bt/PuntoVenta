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

    //-------------------------TODOS DE CATEGORIAS PRODUCTOS-----------------//
  
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

   // https://web-production-ab6a3.up.railway.app/api/inventario/obtener-almacen
export const obtenerMarcaRequest = () => {
    return instance.get('/inventario/obtener-marca',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const obtenerCategoriaRequest = () =>{
    return instance.get('/inventario/obtener-categoria',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const obtenerAlmacenRequest = () =>{
    return instance.get('/inventario/obtener-almacen',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}
   
export const actualizarMarcaRequest = data => instance.patch('/inventario/actualizar-marca',
    data,{
        headers: {
            'Content-Type': 'application/json',
          },  
    }
)
export const actualizarCategoriaRequest = data => instance.patch('/inventario/actualizar-categoria',
    data,{
        headers: {
            'Content-Type': 'application/json',
          },  
    }
)
export const actualizarAlmacenRequest = data => instance.patch('/inventario/actualizar-almacen',
    data,{
        headers: {
            'Content-Type': 'application/json',
          },  
    }
)