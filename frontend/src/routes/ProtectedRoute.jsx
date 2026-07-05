import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, rolesPermitidos }) {
  const { usuario, cargando } = useAuth()

  if (cargando) {
    return <div className="pantalla-carga">Cargando…</div>
  }

  if (!usuario) {
    return <Navigate to="/login" replace />
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
