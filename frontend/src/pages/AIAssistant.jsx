import { useState } from "react";
import { FaComments, FaPaperPlane } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import aiService from "../services/aiService";

function AIAssistant() {
    const [prompt, setPrompt] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSend = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        const q = prompt.trim();
        setPrompt("");
        setError("");
        setLoading(true);
        setHistory((h) => [...h, { role: "user", text: q }]);
        try {
            const res = await aiService.ask(q);
            setHistory((h) => [...h, { role: "ai", text: res.data?.response || "No response" }]);
        } catch (err) {
            const status = err.response?.status;
            const msg = status === 429 ? "Rate limit exceeded. Retry shortly."
                : status === 503 ? "AI temporarily unavailable. Retry shortly."
                : err.response?.data?.message || "Request failed";
            setError(msg);
            setHistory((h) => [...h, { role: "ai", text: "Error: " + msg }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout title="AI Assistant" subtitle="Ask anything cyber — powered by Gemini">
            <div className="soc-card" style={{ maxWidth: "860px" }}>
                <div className="soc-card-header"><h5><FaComments className="me-2" />THREAT DESK COMMS</h5></div>
                <div className="soc-card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="soc-chat mb-3">
                        {history.length === 0 && <div className="soc-empty"><FaComments /><div>Open a channel — e.g. “How do I contain a phishing breach?”</div></div>}
                        {history.map((m, idx) => (
                            <div key={idx} className={`soc-msg ${m.role === "user" ? "soc-msg-user" : "soc-msg-ai"}`}>
                                <strong>{m.role === "user" ? "You" : "Sentinel AI"}:</strong>
                                <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
                            </div>
                        ))}
                        {loading && <p className="text-muted small">Sentinel AI is thinking...</p>}
                    </div>
                    <form onSubmit={handleSend} className="d-flex gap-2">
                        <input className="form-control" value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask about threats, response playbooks, CVEs..." disabled={loading} />
                        <button type="submit" className="btn btn-primary px-4" disabled={loading || !prompt.trim()}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default AIAssistant;
