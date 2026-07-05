import { useMemo, useState } from "react";

/**
 * Espera:
 * [
 *  {
 *    id,
 *    medicamento,
 *    dosis,
 *    hora,
 *    estado
 *  }
 * ]
 */

export default function NotificationBell({ recordatorios = [] }) {

    const [open, setOpen] = useState(false);

    const proximasAlertas = useMemo(() => {
        const ahora = new Date();

        return recordatorios
            .filter(r => r.estado !== "tomado")
            .map(r => {
                const [h, m] = r.hora.split(":");
                const fecha = new Date();
                fecha.setHours(Number(h), Number(m), 0, 0);
                return { ...r, fecha };
            })
            .filter(r => {
                const diff = r.fecha - ahora;
                // alertas dentro de los próximos 60 minutos
                return diff > 0 && diff <= 60 * 60 * 1000;
            })
            .sort((a, b) => a.fecha - b.fecha);
    }, [recordatorios]);

    return (
        <div className="relative">
            {/* Botón campana */}
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition"
            >
                🔔

                {proximasAlertas.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {proximasAlertas.length}
                    </span>
                )}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg z-50">
                    <div className="p-3 border-b font-semibold">
                        Notificaciones
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {proximasAlertas.length === 0 ? (
                            <p className="p-3 text-sm text-gray-500">
                                No hay alertas próximas
                            </p>
                        ) : (
                            proximasAlertas.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-3 border-b hover:bg-gray-50"
                                >
                                    <p className="font-semibold text-sm">
                                        {item.medicamento}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Dosis: {item.dosis}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        🕒 {item.hora}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}