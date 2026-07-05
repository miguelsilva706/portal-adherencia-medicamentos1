import api from "./api";

const listar = async () => {
    const response = await api.get("/recordatorios");
    return response.data;
};

const crear = async (recordatorio) => {
    const response = await api.post("/recordatorios", recordatorio);
    return response.data;
};

const actualizar = async (id, recordatorio) => {
    const response = await api.put(`/recordatorios/${id}`, recordatorio);
    return response.data;
};

const eliminar = async (id) => {
    await api.delete(`/recordatorios/${id}`);
};

export default {
    listar,
    crear,
    actualizar,
    eliminar
};