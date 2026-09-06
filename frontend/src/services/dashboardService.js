import api from "../api/api";

const getDashboard = () => api.get("/dashboard");

export default { getDashboard };
