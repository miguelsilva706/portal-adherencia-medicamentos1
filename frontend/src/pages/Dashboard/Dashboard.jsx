import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";
import UpcomingMedications from "../../components/dashboard/UpcomingMedications";
import RecentActivity from "../../components/dashboard/RecentActivity";
import "./Dashboard.css";

export default function Dashboard() {

    const { usuario } = useAuth();

    return (

        <>

            <h1>
                ¡Bienvenido, {usuario?.nombreCompleto}! 👋
            </h1>

            <p className="dashboard-subtitulo">
                Aquí puedes consultar el estado de tu tratamiento.
            </p>

            <div className="estadisticas">

                <StatCard
                    titulo="Medicamentos"
                    valor="12"
                    icono="💊"
                />

                <StatCard
                    titulo="Pendientes"
                    valor="3"
                    icono="⏰"
                />

                <StatCard
                    titulo="Adherencia"
                    valor="96%"
                    icono="📈"
                />

                <StatCard
                    titulo="Alertas"
                    valor="2"
                    icono="🔔"
                />

            </div>

            <UpcomingMedications />

            <RecentActivity />

        </>

    );

}