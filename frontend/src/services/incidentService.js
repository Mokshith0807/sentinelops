import api from "../api/api";

const getAllIncidents = (params) => api.get("/incidents", { params });
const getById = (id) => api.get(`/incidents/${id}`);
const createIncident = (incident) => api.post("/incidents", incident);
const updateIncident = (id, incident) => api.put(`/incidents/${id}`, incident);
const deleteIncident = (id) => api.delete(`/incidents/${id}`);

export default {
    getAllIncidents,
    getById,
    createIncident,
    updateIncident,
    deleteIncident,
};
