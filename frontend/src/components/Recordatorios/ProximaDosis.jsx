import { useMemo } from "react";

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

export default function ProximaDosis({ recordatorios = [] }) {

    const ahora = new Date();

    const proxima = useMemo(() => {
        const pendientes = recordatorios
            .filter(r => r.estado !== "tomado")
            .map(r => {
                const [h, m] = r.hora.split(":");
                const fecha = new Date();
                fecha.setHours(Number(h), Number(m), 0, 0);
                return { ...r, fecha };
            })
            .filter(r => r.fecha >= ahora)
            .sort((a, b) => a.fecha - b.fecha);

        return pendientes[0] || null;
    }, [recordatorios]);

    const calcularTiempoRestante = (fecha) => {
        const diff = fecha - new Date();

        if (diff <= 0) return "Ahora";

        const horas = Math.floor(diff / (1000 * 60 * 60));
        const minutos = Math.floor((diff / (1000 * 60)) % 60);

        if (horas > 0) return `en ${horas}h ${minutos}m`;
        return `en ${minutos}m`;
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-3">
                💊 Próxima dosis
            </h2>

            {!proxima ? (
                <p className="text-sm opacity-90">
                    No hay dosis pendientes por hoy
                </p>
            ) : (
                <div>
                    <p className="text-xl font-bold">
                        {proxima.medicamento}
                    </p>

                    <p className="text-sm opacity-90">
                        Dosis: {proxima.dosis}
                    </p>

                    <p className="mt-2 text-sm">
                        🕒 {proxima.hora} — {calcularTiempoRestante(proxima.fecha)}
                    </p>
                </div>
            )}
        </div>
    );
}