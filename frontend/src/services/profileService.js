import api from './api'

export async function obtenerPerfil() {
  const { data } = await api.get('/usuarios/me')
  return data
}

export async function actualizarPerfil(payload) {
  const { data } = await api.put('/usuarios/me', payload)
  return data
}