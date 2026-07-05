import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import './Login.css'

export default function Login() {
  const { usuario, iniciarSesion } = useAuth()
  const navigate = useNavigate()

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [recordarme, setRecordarme] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (usuario) {
    return <Navigate to="/dashboard" replace />
  }

  async function manejarEnvio(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await iniciarSesion(correo, contrasena)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.mensaje || 'No se pudo iniciar sesión. Verifica tus datos.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="login-pantalla">
      <div className="login-marca">
        <div className="login-logo">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 15l6-6" />
            <path d="M11 6l1-1a3 3 0 114 4l-1 1" />
            <path d="M13 18l-1 1a3 3 0 11-4-4l1-1" />
          </svg>
        </div>
        <h1>MediAdherencia</h1>
        <p>Portal de Adherencia a Medicamentos</p>
      </div>

      <form className="login-card" onSubmit={manejarEnvio}>
        <h2>Bienvenido de regreso</h2>
        <p className="login-subtexto">Ingresa tus credenciales para continuar</p>

        <label className="login-label" htmlFor="correo">Correo electrónico</label>
        <input
          id="correo"
          type="email"
          className="login-input"
          placeholder="nombre@correo.com"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label className="login-label" htmlFor="contrasena">Contraseña</label>
        <input
          id="contrasena"
          type="password"
          className="login-input"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <div className="login-fila-opciones">
          <label className="login-checkbox">
            <input
              type="checkbox"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
            />
            Recordarme
          </label>
          <a className="login-link" href="#">¿Olvidaste tu contraseña?</a>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button className="login-boton" type="submit" disabled={enviando}>
          {enviando ? 'Ingresando…' : 'Ingresar al portal'}
        </button>

        <p className="login-pie">
          ¿Necesitas acceso? <a href="#">Contacta a administrador</a>
        </p>
      </form>
    </div>
  )
}
