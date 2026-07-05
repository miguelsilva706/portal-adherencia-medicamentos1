import api from "./api";

const URL = "/medicamentos";

const listar = async () => {
    const response = await api.get(URL);
    return response.data;
};

const obtener = async (id) => {
    const response = await api.get(`${URL}/${id}`);
    return response.data;
};

const crear = async (medicamento) => {
    const response = await api.post(URL, medicamento);
    return response.data;
};

const actualizar = async (id, medicamento) => {
    const response = await api.put(`${URL}/${id}`, medicamento);
    return response.data;
};

const eliminar = async (id) => {
    await api.delete(`${URL}/${id}`);
};

export default {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
};