import { useState } from "react";
import medicamentoService from "../../services/medicamentoService";

export default function MedicamentoForm({ onClose, onSuccess }) {

    const [form, setForm] = useState({
        pacienteId: "",
        nombre: "",
        categoria: "",
        dosis: "",
        frecuencia: "",
        instrucciones: "",
        activo: true
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await medicamentoService.crear(form);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al crear medicamento");
        }
    };

    return (
        <div className="modal-overlay">

            <div className="modal">

                <h2>Nuevo Medicamento</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="pacienteId"
                        placeholder="ID Paciente"
                        value={form.pacienteId}
                        onChange={handleChange}
                    />

                    <input
                        name="nombre"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={handleChange}
                    />

                    <input
                        name="categoria"
                        placeholder="Categoría"
                        value={form.categoria}
                        onChange={handleChange}
                    />

                    <input
                        name="dosis"
                        placeholder="Dosis"
                        value={form.dosis}
                        onChange={handleChange}
                    />

                    <input
                        name="frecuencia"
                        placeholder="Frecuencia"
                        value={form.frecuencia}
                        onChange={handleChange}
                    />

                    <input
                        name="instrucciones"
                        placeholder="Instrucciones"
                        value={form.instrucciones}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Guardar
                    </button>

                    <button type="button" onClick={onClose}>
                        Cancelar
                    </button>

                </form>

            </div>

        </div>
    );
}