import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar.jsx'
import Navbar from '../Navbar/Navbar.jsx'
import './Layout.css'

export default function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-contenido">
        <Navbar />
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
