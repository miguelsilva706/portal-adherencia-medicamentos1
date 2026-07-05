export default function RecordatorioFiltro({ vista, setVista }) {
    return (
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
            <button
                onClick={() => setVista("dia")}
                className={`px-3 py-1 rounded-md text-sm transition ${
                    vista === "dia" ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
            >
                Día
            </button>

            <button
                onClick={() => setVista("semana")}
                className={`px-3 py-1 rounded-md text-sm transition ${
                    vista === "semana" ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
            >
                Semana
            </button>

            <button
                onClick={() => setVista("mes")}
                className={`px-3 py-1 rounded-md text-sm transition ${
                    vista === "mes" ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
            >
                Mes
            </button>
        </div>
    );
}