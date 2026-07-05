import { useEffect, useState } from "react";
import medicamentoService from "../../services/medicamentoService";
import recordatorioService from "../../services/recordatorioService";
import "./RecordatorioForm.css";

export default function RecordatorioForm({
    recordatorio,
    onSuccess
}) {

    const [medicamentos, setMedicamentos] = useState([]);

    const [form, setForm] = useState({
        medicamentoId: "",
        hora: "",
        diasSemana: "",
        fechaInicio: "",
        fechaFin: "",
        activo: true
    });

    useEffect(() => {
        cargarMedicamentos();
    }, []);

    useEffect(() => {

        if (recordatorio) {

            setForm({
                medicamentoId: recordatorio.medicamentoId,
                hora: recordatorio.hora,
                diasSemana: recordatorio.diasSemana,
                fechaInicio: recordatorio.fechaInicio,
                fechaFin: recordatorio.fechaFin || "",
                activo: recordatorio.activo
            });

        } else {

            setForm({
                medicamentoId: "",
                hora: "",
                diasSemana: "",
                fechaInicio: "",
                fechaFin: "",
                activo: true
            });

        }

    }, [recordatorio]);

    const cargarMedicamentos = async () => {

        try {

            const data = await medicamentoService.listar();
            setMedicamentos(data);

        } catch (error) {

            console.error(error);

        }

    };

    const cambiar = (e) => {

        const { name, value, checked, type } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox"
                ? checked
                : value
        });

    };

    const guardar = async (e) => {

        e.preventDefault();

        try {

            const datos = {
                ...form,
                medicamentoId: Number(form.medicamentoId),
                fechaFin: form.fechaFin || null
            };

            if (recordatorio) {

                await recordatorioService.actualizar(
                    recordatorio.id,
                    datos
                );

                alert("Recordatorio actualizado correctamente");

            } else {

                await recordatorioService.crear(datos);

                alert("Recordatorio creado correctamente");

            }

            onSuccess?.();

        } catch (error) {

            console.error(error);

            alert("No se pudo guardar el recordatorio");

        }

    };

    return (

        <form
            className="recordatorio-form"
            onSubmit={guardar}
        >

            <div className="form-grid">

                <div className="form-group">
                    <label>Medicamento</label>

                    <select
                        name="medicamentoId"
                        value={form.medicamentoId}
                        onChange={cambiar}
                        required
                    >

                        <option value="">
                            Seleccione...
                        </option>

                        {medicamentos.map((m) => (

                            <option
                                key={m.id}
                                value={m.id}
                            >
                                {m.nombre}
                            </option>

                        ))}

                    </select>

                </div>

                <div className="form-group">

                    <label>Hora</label>

                    <input
                        type="time"
                        name="hora"
                        value={form.hora}
                        onChange={cambiar}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Días de la semana</label>

                    <input
                        type="text"
                        name="diasSemana"
                        value={form.diasSemana}
                        onChange={cambiar}
                        placeholder="LUNES,MARTES..."
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Fecha inicio</label>

                    <input
                        type="date"
                        name="fechaInicio"
                        value={form.fechaInicio}
                        onChange={cambiar}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Fecha fin</label>

                    <input
                        type="date"
                        name="fechaFin"
                        value={form.fechaFin}
                        onChange={cambiar}
                    />

                </div>

                <div className="form-group">

                    <label>Estado</label>

                    <label className="check-group">

                        <input
                            type="checkbox"
                            name="activo"
                            checked={form.activo}
                            onChange={cambiar}
                        />

                        <span>Recordatorio activo</span>

                    </label>

                </div>

            </div>

            <button
                type="submit"
                className="btn-guardar"
            >
                {recordatorio
                    ? "Actualizar Recordatorio"
                    : "Guardar Recordatorio"}
            </button>

        </form>

    );

}