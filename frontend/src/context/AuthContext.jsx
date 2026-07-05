import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'
import * as profileService from '../services/profileService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('adherencia_usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adherencia_token')

    if (!token) {
      setCargando(false)
      return
    }

    profileService
      .obtenerPerfil()
      .then((perfil) => {
        setUsuario(perfil)
        localStorage.setItem('adherencia_usuario', JSON.stringify(perfil))
      })
      .catch(() => {
        localStorage.removeItem('adherencia_token')
        localStorage.removeItem('adherencia_usuario')
        setUsuario(null)
      })
      .finally(() => setCargando(false))
  }, [])

  async function iniciarSesion(correo, contrasena) {
    const data = await authService.login(correo, contrasena)

    localStorage.setItem('adherencia_token', data.token)

    // 👇 ahora obtenemos perfil real desde backend
    const perfil = await profileService.obtenerPerfil()

    localStorage.setItem('adherencia_usuario', JSON.stringify(perfil))
    setUsuario(perfil)

    return perfil
  }

  function cerrarSesion() {
    localStorage.removeItem('adherencia_token')
    localStorage.removeItem('adherencia_usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{
      usuario,
      setUsuario,
      cargando,
      iniciarSesion,
      cerrarSesion
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider')
  return ctx
}