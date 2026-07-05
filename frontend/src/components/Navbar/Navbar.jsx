import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {

    const { usuario } = useAuth();

    return (

        <header className="navbar">

            <div>

                <h2>Dashboard</h2>

                <p className="navbar-subtitulo">
                    Portal de Adherencia a Medicamentos
                </p>

            </div>

            <div className="navbar-usuario">

                <div className="navbar-avatar">
                    {usuario?.nombreCompleto?.charAt(0)}
                </div>

                <div>

                    <strong>
                        {usuario?.nombreCompleto}
                    </strong>

                    <p>
                        {usuario?.rol}
                    </p>

                </div>

            </div>

        </header>

    )

}