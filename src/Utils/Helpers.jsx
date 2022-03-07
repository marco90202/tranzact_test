import Axios from 'axios'

export function get(endpoint = null, headers = null, fn) {
    if (endpoint === null) return

    Axios.get(endpoint, {
        headers: headers
    })
        .then(r => fn(r.status, r.data))
        .catch(er => {
            if (er.response.status === 401) {
                console.log('401(Unathorized)')
                window.location = '/'
            }
            if (typeof er.response === 'undefined') return fn(500, { error: 'Error de conexion' })
            return fn(er.response.status, er.response)
        })

}