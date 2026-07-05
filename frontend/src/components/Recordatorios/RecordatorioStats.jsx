import "./RecordatorioStats.css";

export default function RecordatorioStats({
    total,
    activos,
    hoy,
    proximo
}) {

    return (

        <div className="stats-grid">

            <div className="stat-card primary">

                <div className="icon">
                    💊
                </div>

                <div>

                    <span>Próxima dosis</span>

                    <h2>{proximo || "--:--"}</h2>

                </div>

            </div>

            <div className="stat-card">

                <div className="icon">
                    📅
                </div>

                <div>

                    <span>Total</span>

                    <h2>{total}</h2>

                </div>

            </div>

            <div className="stat-card">

                <div className="icon">
                    🟢
                </div>

                <div>

                    <span>Activos</span>

                    <h2>{activos}</h2>

                </div>

            </div>

            <div className="stat-card">

                <div className="icon">
                    ⏰
                </div>

                <div>

                    <span>Hoy</span>

                    <h2>{hoy}</h2>

                </div>

            </div>

        </div>

    );

}