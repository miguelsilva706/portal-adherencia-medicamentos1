import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Medicamentos from './pages/Medicamentos/Medicamentos.jsx'
import Recordatorios from './pages/Recordatorios/Recordatorios.jsx'
import Historial from './pages/Historial/Historial.jsx'
import Perfil from './pages/Usuario/Perfil.jsx'
import Configuracion from './pages/Usuario/Configuracion.jsx'
import PanelCuidador from './pages/Usuario/PanelCuidador.jsx'
import Usuarios from './pages/Usuario/Usuarios.jsx'
import Reportes from './pages/Usuario/Reportes.jsx'
import Layout from './components/Layout/Layout.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        import Dashboard from "./pages/Dashboard/Dashboard";
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/recordatorios" element={<Recordatorios />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/configuracion" element={<Configuracion />} />
        <Route
          path="/panel-cuidador"
          element={
            <ProtectedRoute rolesPermitidos={['CUIDADOR', 'ADMINISTRADOR']}>
              <PanelCuidador />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuarios"
          element={
            <ProtectedRoute rolesPermitidos={['ADMINISTRADOR']}>
              <Usuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reportes"
          element={
            <ProtectedRoute rolesPermitidos={['ADMINISTRADOR']}>
              <Reportes />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}