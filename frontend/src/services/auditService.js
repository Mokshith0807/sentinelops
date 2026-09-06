import api from "../api/api";

const getAll = () => api.get("/audit");

export default { getAll };
