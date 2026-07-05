import api from "./api";

const listar = async () => {
    const response = await api.get("/historial");
    return response.data;
};

const obtener = async (id) => {
    const response = await api.get(`/historial/${id}`);
    return response.data;
};

const crear = async (historial) => {
    const response = await api.post("/historial", historial);
    return response.data;
};

const actualizar = async (id, historial) => {
    const response = await api.put(`/historial/${id}`, historial);
    return response.data;
};

const eliminar = async (id) => {
    await api.delete(`/historial/${id}`);
};

export default {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
};