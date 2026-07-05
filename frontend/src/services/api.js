import axios from 'axios'

// En desarrollo, Vite hace proxy de /api hacia el backend (ver vite.config.js).
// En producción, Nginx enruta /api hacia el contenedor del backend.
const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adherencia_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adherencia_token')
      localStorage.removeItem('adherencia_usuario')
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
