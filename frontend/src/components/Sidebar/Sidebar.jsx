import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {

    const { cerrarSesion } = useAuth();

    return (

        <aside className="sidebar">

            <div>

                <h2 className="logo">
                    💊 MediAdherencia
                </h2>

            </div>

            <nav className="menu">

                <NavLink to="/dashboard">
                    🏠 Inicio
                </NavLink>

                <NavLink to="/medicamentos">
                    💊 Medicamentos
                </NavLink>

                <NavLink to="/recordatorios">
                    ⏰ Recordatorios
                </NavLink>

                <NavLink to="/historial">
                    📋 Historial
                </NavLink>

                <NavLink to="/perfil">
                    👤 Perfil
                </NavLink>

            </nav>

            <button
                className="logout"
                onClick={cerrarSesion}
            >
                🚪 Cerrar sesión
            </button>

        </aside>

    );

}