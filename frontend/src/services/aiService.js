import api from "../api/api";

const ask = (prompt) => api.get("/ai/ask", { params: { prompt } });
const analyze = (data) => api.post("/ai/analyze", data);

export default { ask, analyze };
