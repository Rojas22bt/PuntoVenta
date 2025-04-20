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

export const crearProductoRequest = data => instance.post('/inventario/producto',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})

export const obtenerProductoRequest = () => {
    return instance.get('/inventario/obtener-productos-activos',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const obtenerProductoAdmiRequest = () => {
    return instance.get('/inventario/obtener-producto',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const actualizarProductoRequest = data => instance.patch('/inventario/actualizar-producto',
    data,{
        headers: {
            'Content-Type': 'application/json',
          },  
    }
)

export const crearMercaderiaRequest = data => instance.post('/inventario/mercaderia/crear',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})

export const crearOfertaRequest = data => instance.post('/venta/oferta/register',data,{
    headers:{
        "Content-Type" : "application/json"
    },
    withCredentials:true
})

export const obtenerOfertaRequest = data => {
    return instance.get('/venta/obtener-ofertas-activas',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}

export const obtenerOferAdmitaRequest = data => {
    return instance.get('/venta/obtener-ofertas',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}


export const obtenerHistotialCliente = data => instance.post('/venta/obtener-comprobante-usuario',data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const actualizarPermisosRequest = data => instance.post('/usuario/actualizar-permiso',data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const crearCalificacionRequest = data => instance.post('/usuario/calificacion',data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})
export const crearComentarioRequest = data => instance.post('/usuario/comentario',data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})
export const obtenerPermisos = () => {
    return instance.get('/usuario/permisos',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}
export const obtenerComentario = () => {
    return instance.get('/usuario/obtener-comentario',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}
export const obtenerCalificacion = () => {
    return instance.get('/usuario/obtener-calificacion',{
        withCredentials: true,
        timeout: tiempoEspera
    })
}
///------------venta--------/*
export const crearFacturacionRequest = data => instance.post('/venta/factura', data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export const crearBitacoraRequest = data => instance.post('/usuario/crear-bitacora', data,{
    headers:{
        "Content-Type": "application/json"
    },
    withCredentials: true
})



