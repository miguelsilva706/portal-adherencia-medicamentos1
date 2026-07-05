import { useEffect, useMemo, useState } from "react";
import RecordatorioModal from "../../components/Recordatorios/RecordatorioModal";
import RecordatorioForm from "../../components/Recordatorios/RecordatorioForm";
import recordatorioService from "../../services/recordatorioService";
import RecordatorioStats from "../../components/Recordatorios/RecordatorioStats";
import historialService from "../../services/historialService";

export default function Recordatorios() {
    const [recordatorios, setRecordatorios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [registrando, setRegistrando] = useState({});

    const [modalAbierto, setModalAbierto] = useState(false);
    const [recordatorioEditar, setRecordatorioEditar] = useState(null);

    // 1. CARGA INICIAL (Corregido el cierre del useEffect)
    useEffect(() => {
        cargarRecordatorios();
    }, []);

    // 2. LOGICA DE REGISTRO DE ADHERENCIA (Arreglado y optimizado)
    const registrarHistorial = async (recordatorio, estado) => {
        if (registrando[recordatorio.id]) return;

        try {
            setRegistrando(prev => ({
                ...prev,
                [recordatorio.id]: true
            }));

            await historialService.crear({
                recordatorioId: recordatorio.id,
                medicamentoId: recordatorio.medicamentoId,
                estado,
                observacion: ""
            });

            alert(`Registro marcado como ${estado}.`);
            
            // Opcional: Si quieres que el botón vuelva a habilitarse tras el éxito, 
            // puedes pasar el estado a false aquí. Si quieres dejarlo bloqueado, bórralo.
            setRegistrando(prev => ({
                ...prev,
                [recordatorio.id]: false
            }));

        } catch (error) {
            console.error(error);
            alert("No se pudo registrar la adherencia.");
            setRegistrando(prev => ({
                ...prev,
                [recordatorio.id]: false
            }));
        }
    };

    // 3. OBTENER DATOS DEL SERVICIO
    const cargarRecordatorios = async () => {
        try {
            const data = await recordatorioService.listar();
            setRecordatorios(data);
        } catch (error) {
            console.error(error);
            alert("No se pudieron cargar los recordatorios");
        } finally {
            setCargando(false);
        }
    };

    // 4. FILTRADO EN MEMORIA
    const filtrados = useMemo(() => {
        return recordatorios.filter((r) =>
            r.medicamentoNombre
                ?.toLowerCase()
                .includes(busqueda.toLowerCase())
        );
    }, [recordatorios, busqueda]);

    if (cargando) {
        return (
            <div style={{ padding: 30 }}>
                <h2>Cargando recordatorios...</h2>
            </div>
        );
    }

    return (
        <div style={contenedor}>
            <div style={header}>
                <div>
                    <h1 style={{ margin: 0 }}>Recordatorios</h1>
                    <p style={{ color: "#64748b" }}>
                        Gestiona todas las dosis programadas
                    </p>
                </div>

                <button
                    style={botonNuevo}
                    onClick={() => {
                        setRecordatorioEditar(null);
                        setModalAbierto(true);
                    }}
                >
                    + Nuevo Recordatorio
                </button>
            </div>

            <input
                type="text"
                placeholder="Buscar medicamento..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={input}
            />

            <RecordatorioStats
                total={recordatorios.length}
                activos={recordatorios.filter(r => r.activo).length}
                hoy={recordatorios.filter(r => r.activo).length}
                proximo={
                    recordatorios.length > 0
                        ? [...recordatorios].sort((a, b) => a.hora.localeCompare(b.hora))[0].hora
                        : "--:--"
                }
            />

            <div style={grid}>
                {filtrados.length === 0 ? (
                    <div
                        style={{
                            gridColumn: "1 / -1",
                            background: "white",
                            padding: 40,
                            borderRadius: 15,
                            textAlign: "center",
                            color: "#64748b"
                        }}
                    >
                        No existen recordatorios registrados.
                    </div>
                ) : (
                    filtrados.map((recordatorio) => (
                        <div key={recordatorio.id} style={card}>
                            <h3>💊 {recordatorio.medicamentoNombre}</h3>
                            <p><strong>Hora:</strong> {recordatorio.hora}</p>
                            <p><strong>Días:</strong> {recordatorio.diasSemana}</p>
                            <p><strong>Inicio:</strong> {recordatorio.fechaInicio}</p>
                            <p><strong>Fin:</strong> {recordatorio.fechaFin || "-"}</p>
                            <p>
                                <strong>Estado:</strong>{" "}
                                {recordatorio.activo ? "🟢 Activo" : "🔴 Inactivo"}
                            </p>

                            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
                                <button
                                    style={registrando[recordatorio.id] ? btnRegistrado : btnTomado}
                                    disabled={registrando[recordatorio.id]}
                                    onClick={() => registrarHistorial(recordatorio, "TOMADO")}
                                >
                                    {registrando[recordatorio.id] ? "✔ Registrado" : "✅ Tomado"}
                                </button>

                                <button
                                    style={registrando[recordatorio.id] ? btnRegistrado : btnRetrasado}
                                    disabled={registrando[recordatorio.id]}
                                    onClick={() => registrarHistorial(recordatorio, "RETRASADO")}
                                >
                                    {registrando[recordatorio.id] ? "✔ Registrado" : "⏰ Retrasado"}
                                </button>

                                <button
                                    style={registrando[recordatorio.id] ? btnRegistrado : btnOmitido}
                                    disabled={registrando[recordatorio.id]}
                                    onClick={() => registrarHistorial(recordatorio, "OMITIDO")}
                                >
                                    {registrando[recordatorio.id] ? "✔ Registrado" : "❌ Omitido"}
                                </button>

                                <button
                                    style={btnEditar}
                                    onClick={() => {
                                        setRecordatorioEditar(recordatorio);
                                        setModalAbierto(true);
                                    }}
                                >
                                    Editar
                                </button>

                                <button
                                    style={btnEliminar}
                                    onClick={async () => {
                                        const confirmar = window.confirm(
                                            `¿Deseas eliminar el recordatorio de "${recordatorio.medicamentoNombre}"?`
                                        );
                                        if (!confirmar) return;

                                        try {
                                            await recordatorioService.eliminar(recordatorio.id);
                                            await cargarRecordatorios();
                                            alert("Recordatorio eliminado correctamente.");
                                        } catch (error) {
                                            console.error(error);
                                            alert("No se pudo eliminar.");
                                        }
                                    }}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <RecordatorioModal
                abierto={modalAbierto}
                titulo={recordatorioEditar ? "Editar Recordatorio" : "Nuevo Recordatorio"}
                onClose={() => {
                    setModalAbierto(false);
                    setRecordatorioEditar(null);
                }}
            >
                <RecordatorioForm
                    recordatorio={recordatorioEditar}
                    onSuccess={() => {
                        setModalAbierto(false);
                        setRecordatorioEditar(null);
                        cargarRecordatorios();
                    }}
                />
            </RecordatorioModal>
        </div>
    );
}

// --- OBJETOS DE ESTILOS ---
const contenedor = { padding: 30, background: "#f4f7fb", minHeight: "100vh" };
const header = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 };
const botonNuevo = { background: "#2563eb", color: "white", border: "none", borderRadius: 10, padding: "12px 20px", cursor: "pointer", fontWeight: "bold" };
const input = { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 25 };
const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 20 };
const card = { background: "white", borderRadius: 15, padding: 20, boxShadow: "0 5px 15px rgba(0,0,0,.08)" };

const btnTomado = { flex: 1, background: "#22c55e", color: "white", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer" };
const btnRetrasado = { flex: 1, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer" };
const btnOmitido = { flex: 1, background: "#ef4444", color: "white", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer" };

// Aquí agregué tu nuevo estilo solicitado:
const btnRegistrado = {
    flex: 1,
    background: "#9ca3af",
    color: "white",
    border: "none",
    borderRadius: 8, // Lo bajé a 8 para mantener la coherencia visual con tus otros botones de la card
    padding: "10px",
    cursor: "not-allowed",
    fontWeight: "600",
    fontSize: 14,
    opacity: 0.8
};

const btnEditar = { flex: 1, background: "#f59e0b", color: "white", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer" };
const btnEliminar = { flex: 1, background: "#dc2626", color: "white", border: "none", borderRadius: 8, padding: "10px", cursor: "pointer" };