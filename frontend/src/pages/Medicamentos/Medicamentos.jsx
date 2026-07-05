import { useEffect, useState } from "react";
import medicamentoService from "../../services/medicamentoService";

export default function Medicamentos() {

    const [medicamentos, setMedicamentos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [editando, setEditando] = useState(null);

    const [guardando, setGuardando] = useState(false);

    // 🔎 FILTROS
    const [search, setSearch] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("todos");
    const [filtroActivo, setFiltroActivo] = useState("todos");

    const [form, setForm] = useState({
        pacienteId: 1,
        nombre: "",
        categoria: "",
        dosis: "",
        frecuencia: "",
        instrucciones: "",
        activo: true
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        cargarMedicamentos();
    }, []);

    const cargarMedicamentos = async () => {
        try {
            const data = await medicamentoService.listar();
            setMedicamentos(data);
        } catch (error) {
            console.error(error);
            alert("No se pudieron cargar los medicamentos");
        } finally {
            setCargando(false);
        }
    };

    const abrirNuevo = () => {
        setEditando(null);
        setErrors({});
        setForm({
            pacienteId: 1,
            nombre: "",
            categoria: "",
            dosis: "",
            frecuencia: "",
            instrucciones: "",
            activo: true
        });
        setOpenModal(true);
    };

    const abrirEditar = (med) => {
        setEditando(med);
        setErrors({});
        setForm(med);
        setOpenModal(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const validar = () => {
        let nuevosErrores = {};

        if (!form.nombre?.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
        if (!form.categoria?.trim()) nuevosErrores.categoria = "La categoría es obligatoria";
        if (!form.dosis?.trim()) nuevosErrores.dosis = "La dosis es obligatoria";
        if (!form.frecuencia?.trim()) nuevosErrores.frecuencia = "La frecuencia es obligatoria";
        if (!form.instrucciones?.trim()) nuevosErrores.instrucciones = "Las instrucciones son obligatorias";

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const guardar = async (e) => {
        e.preventDefault();

        if (!validar()) return;

        setGuardando(true);

        try {
            if (editando) {
                await medicamentoService.actualizar(editando.id, form);
            } else {
                await medicamentoService.crear(form);
            }

            setOpenModal(false);
            cargarMedicamentos();

        } catch (error) {
            console.error(error);
            alert("Error al guardar medicamento");
        } finally {
            setGuardando(false);
        }
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar medicamento?")) return;

        try {
            await medicamentoService.eliminar(id);
            cargarMedicamentos();
        } catch (error) {
            console.error(error);
            alert("Error al eliminar");
        }
    };

    if (cargando) {
        return <div style={{ padding: "30px" }}><h2>Cargando medicamentos...</h2></div>;
    }

    // 🔎 FILTRO PRINCIPAL
    const medicamentosFiltrados = medicamentos.filter((m) => {

        const matchSearch =
            m.nombre.toLowerCase().includes(search.toLowerCase());

        const matchCategoria =
            filtroCategoria === "todos" || m.categoria === filtroCategoria;

        const matchActivo =
            filtroActivo === "todos" ||
            (filtroActivo === "activos" && m.activo) ||
            (filtroActivo === "inactivos" && !m.activo);

        return matchSearch && matchCategoria && matchActivo;
    });

    return (
        <div style={{ padding: "30px" }}>

            {/* HEADER */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <h1>Medicamentos</h1>

                <button onClick={abrirNuevo} style={btnPrimary}>
                    + Nuevo medicamento
                </button>
            </div>

            {/* 🔎 DASHBOARD FILTROS */}
            <div style={filtroBox}>

                <input
                    placeholder="Buscar medicamento..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={input}
                />

                <select
                    value={filtroCategoria}
                    onChange={(e) => setFiltroCategoria(e.target.value)}
                    style={input}
                >
                    <option value="todos">Todas las categorías</option>
                    <option value="analgésico">Analgésico</option>
                    <option value="antibiótico">Antibiótico</option>
                    <option value="antiinflamatorio">Antiinflamatorio</option>
                </select>

                <select
                    value={filtroActivo}
                    onChange={(e) => setFiltroActivo(e.target.value)}
                    style={input}
                >
                    <option value="todos">Todos</option>
                    <option value="activos">Activos</option>
                    <option value="inactivos">Inactivos</option>
                </select>

            </div>

            {/* TABLE */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Paciente</th>
                        <th style={th}>Nombre</th>
                        <th style={th}>Categoría</th>
                        <th style={th}>Dosis</th>
                        <th style={th}>Frecuencia</th>
                        <th style={th}>Activo</th>
                        <th style={th}>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {medicamentosFiltrados.map((m) => (
                        <tr key={m.id}>
                            <td style={td}>{m.id}</td>
                            <td style={td}>{m.pacienteId}</td>
                            <td style={td}>{m.nombre}</td>
                            <td style={td}>{m.categoria}</td>
                            <td style={td}>{m.dosis}</td>
                            <td style={td}>{m.frecuencia}</td>
                            <td style={td}>{m.activo ? "Sí" : "No"}</td>

                            <td style={td}>
                                <button onClick={() => abrirEditar(m)} style={btnEdit}>
                                    Editar
                                </button>

                                <button onClick={() => eliminar(m.id)} style={btnDelete}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL (igual que el tuyo) */}
            {openModal && (
                <div style={modalBg}>
                    <div style={modalBox}>
                        <h2>{editando ? "Editar" : "Nuevo"} medicamento</h2>

                        <form onSubmit={guardar}>
                            <input name="nombre" value={form.nombre} onChange={handleChange} style={input} placeholder="Nombre" />
                            {errors.nombre && <p style={errorText}>{errors.nombre}</p>}

                            <input name="categoria" value={form.categoria} onChange={handleChange} style={input} placeholder="Categoría" />
                            {errors.categoria && <p style={errorText}>{errors.categoria}</p>}

                            <input name="dosis" value={form.dosis} onChange={handleChange} style={input} placeholder="Dosis" />
                            {errors.dosis && <p style={errorText}>{errors.dosis}</p>}

                            <input name="frecuencia" value={form.frecuencia} onChange={handleChange} style={input} placeholder="Frecuencia" />
                            {errors.frecuencia && <p style={errorText}>{errors.frecuencia}</p>}

                            <input name="instrucciones" value={form.instrucciones} onChange={handleChange} style={input} placeholder="Instrucciones" />
                            {errors.instrucciones && <p style={errorText}>{errors.instrucciones}</p>}

                            <label>
                                <input type="checkbox" name="activo" checked={form.activo} onChange={handleChange} />
                                Activo
                            </label>

                            <div style={{ marginTop: "15px" }}>
                                <button type="submit" disabled={guardando} style={btnPrimary}>
                                    {guardando ? "Guardando..." : "Guardar"}
                                </button>

                                <button type="button" onClick={() => setOpenModal(false)} style={btnSecondary}>
                                    Cancelar
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}

/* ================= STYLES ================= */

const filtroBox = {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
};

const tableStyle = { width: "100%", borderCollapse: "collapse", backgroundColor: "white" };

const th = { backgroundColor: "#2563eb", color: "white", padding: "12px", border: "1px solid #ddd" };

const td = { padding: "12px", border: "1px solid #ddd", textAlign: "center" };

const btnPrimary = { backgroundColor: "#2563eb", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px" };

const btnEdit = { background: "#f59e0b", color: "white", marginRight: "10px", padding: "6px 10px", border: "none", borderRadius: "6px" };

const btnDelete = { background: "#dc2626", color: "white", padding: "6px 10px", border: "none", borderRadius: "6px" };

const btnSecondary = { marginLeft: "10px", padding: "10px 15px", borderRadius: "8px", border: "1px solid #ccc" };

const input = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc" };

const errorText = { color: "red", fontSize: "12px" };

const modalBg = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const modalBox = { background: "white", padding: "20px", borderRadius: "10px", width: "400px" };