import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import * as profileService from '../../services/profileService'
import './Perfil.css'

export default function Perfil() {
  const { usuario, setUsuario } = useAuth()

  const [form, setForm] = useState({
    nombreCompleto: '',
    telefono: ''
  })

  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    if (usuario) {
      setForm({
        nombreCompleto: usuario.nombreCompleto || '',
        telefono: usuario.telefono || ''
      })
    }
  }, [usuario])

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMensaje('')

    try {
      const actualizado = await profileService.actualizarPerfil(form)

      setUsuario(actualizado)

      localStorage.setItem(
        'adherencia_usuario',
        JSON.stringify(actualizado)
      )

      setMensaje('Perfil actualizado correctamente ✔')
    } catch (err) {
      setMensaje(err.response?.data?.mensaje || 'Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  if (!usuario) return <p>Cargando...</p>

  return (
    <div className="perfil-container">
      <h2 className="perfil-title">Mi perfil</h2>

      <form className="perfil-form" onSubmit={handleSubmit}>
        <div className="perfil-field">
          <label>Nombre completo</label>
          <input
            name="nombreCompleto"
            value={form.nombreCompleto}
            onChange={handleChange}
          />
        </div>

        <div className="perfil-field">
          <label>Teléfono</label>
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <button className="perfil-btn" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>

        {mensaje && <div className="perfil-msg">{mensaje}</div>}
      </form>
    </div>
  )
}