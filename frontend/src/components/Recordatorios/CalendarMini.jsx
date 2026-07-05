import { useMemo } from "react";

/**
 * Espera:
 * [
 *  {
 *    id,
 *    medicamento,
 *    fecha: "2026-07-03", // formato YYYY-MM-DD
 *    hora,
 *    estado
 *  }
 * ]
 */

export default function CalendarMini({ recordatorios = [] }) {

    const hoy = new Date();

    const diasDelMes = useMemo(() => {
        const year = hoy.getFullYear();
        const month = hoy.getMonth();

        const totalDias = new Date(year, month + 1, 0).getDate();

        return Array.from({ length: totalDias }, (_, i) => {
            const dia = i + 1;
            const fecha = `${year}-${String(month + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

            const eventos = recordatorios.filter(r => r.fecha === fecha);

            return {
                dia,
                fecha,
                cantidad: eventos.length
            };
        });
    }, [recordatorios]);

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">
                📅 Calendario de Recordatorios
            </h2>

            <div className="grid grid-cols-7 gap-2 text-center text-xs">
                {["D", "L", "M", "M", "J", "V", "S"].map((d, idx) => (
                    <div key={idx} className="font-semibold text-gray-500">
                        {d}
                    </div>
                ))}

                {diasDelMes.map((d) => (
                    <div
                        key={d.fecha}
                        className={`
                            p-2 rounded-lg border text-xs relative
                            ${d.cantidad > 0 ? "bg-blue-50 border-blue-200" : "bg-gray-50"}
                        `}
                    >
                        <span className="font-medium">{d.dia}</span>

                        {d.cantidad > 0 && (
                            <span className="absolute bottom-1 right-1 text-[10px] bg-blue-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                {d.cantidad}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}