import "./StatCard.css";

export default function StatCard({ titulo, valor, icono }) {

    return (

        <div className="stat-card">

            <div className="stat-icono">
                {icono}
            </div>

            <h2>{valor}</h2>

            <p>{titulo}</p>

        </div>

    );

}