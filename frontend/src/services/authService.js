import api from './api'

export async function login(correo, contrasena) {
  const { data } = await api.post('/auth/login', {
    correo,
    contrasena
  })

  // guardar token (IMPORTANTE)
  localStorage.setItem('token', data.token)

  return data
}

export async function registrar(payload) {
  const { data } = await api.post('/auth/registro', payload)
  return data
}