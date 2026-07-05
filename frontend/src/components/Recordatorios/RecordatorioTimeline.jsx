import { useMemo } from "react";

/**
 * Espera un array tipo:
 * [
 *  {
 *    id: 1,
 *    medicamento: "Paracetamol",
 *    dosis: "500mg",
 *    hora: "08:00",
 *    estado: "pendiente" | "tomado" | "omitido"
 *  }
 * ]
 */

export default function RecordatorioTimeline({ recordatorios = [] }) {

    // Ordenar por hora (sin mutar el original)
    const ordenados = useMemo(() => {
        return [...recordatorios].sort((a, b) =>
            a.hora.localeCompare(b.hora)
        );
    }, [recordatorios]);

    const getEstadoColor = (estado) => {
        switch (estado) {
            case "tomado":
                return "bg-green-100 text-green-700 border-green-300";
            case "omitido":
                return "bg-red-100 text-red-700 border-red-300";
            default:
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
        }
    };

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">
                🕒 Agenda del día
            </h2>

            <div className="space-y-3 relative border-l border-gray-200 pl-4">
                {ordenados.length === 0 ? (
                    <p className="text-gray-500 text-sm">
                        No hay recordatorios para hoy
                    </p>
                ) : (
                    ordenados.map((item) => (
                        <div key={item.id} className="relative">
                            {/* Punto de la línea */}
                            <div className="absolute -left-[9px] top-2 w-3 h-3 rounded-full bg-blue-500" />

                            <div className={`p-3 rounded-lg border ${getEstadoColor(item.estado)}`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">
                                        {item.medicamento}
                                    </span>
                                    <span className="text-sm">
                                        {item.hora}
                                    </span>
                                </div>

                                <p className="text-sm mt-1">
                                    Dosis: {item.dosis}
                                </p>

                                <p className="text-xs mt-1 capitalize">
                                    Estado: {item.estado}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}