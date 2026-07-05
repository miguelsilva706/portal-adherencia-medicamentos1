import React from 'react'
import './EnConstruccion.css'

export default function EnConstruccion({ titulo, descripcion, fase }) {
  return (
    <div className="en-construccion">
      <div className="en-construccion-icono">🛠️</div>
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <span className="en-construccion-badge">Se implementa en la {fase}</span>
    </div>
  )
}
