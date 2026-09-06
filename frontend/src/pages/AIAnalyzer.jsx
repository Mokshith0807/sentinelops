import { useState } from "react";
import { FaRobot } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SeverityBadge from "../components/SeverityBadge";
import aiService from "../services/aiService";

function AIAnalyzer() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalyze = async (e) => {
        e.preventDefault();
        setError("");
        setResult(null);
        if (!title.trim() || !description.trim()) { setError("Title and description are required"); return; }
        setLoading(true);
        try {
            const res = await aiService.analyze({ title, description });
            setResult(res.data);
        } catch (err) {
            const status = err.response?.status;
            if (status === 429) setError("AI rate limit exceeded. Please retry shortly.");
            else if (status === 503) setError("AI service temporarily unavailable. Please retry shortly.");
            else setError(err.response?.data?.message || "Analysis failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout title="AI Threat Analyzer" subtitle="Gemini-powered severity verdicts">
            <div className="row">
                <div className="col-lg-5 mb-3">
                    <div className="soc-card">
                        <div className="soc-card-header"><h5><FaRobot className="me-2" />SIGNAL INPUT</h5></div>
                        <div className="soc-card-body">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleAnalyze}>
                                <div className="mb-3">
                                    <label className="form-label">TITLE *</label>
                                    <input className="form-control" value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g. Ransomware outbreak on file server" required disabled={loading} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">DESCRIPTION *</label>
                                    <textarea className="form-control" rows="6" value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Indicators, affected assets, timeline..." required disabled={loading} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                                    {loading ? "Consulting Gemini..." : "Run analysis →"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 mb-3">
                    <div className="soc-card">
                        <div className="soc-card-header"><h5>VERDICT</h5>{result && <SeverityBadge severity={result.severity} />}</div>
                        <div className="soc-card-body">
                            {loading && <div className="text-center py-5"><div className="spinner-border" style={{ color: "var(--soc-neon)" }} /><p className="text-muted mt-2 small">Correlating threat intel...</p></div>}
                            {!loading && !result && <div className="soc-empty"><FaRobot /><div>Feed a signal to receive severity, analysis & response guidance.</div></div>}
                            {result && (
                                <>
                                    <div className="soc-result-card"><h6>SEVERITY ASSESSMENT</h6><p><SeverityBadge severity={result.severity} /></p></div>
                                    <div className="soc-result-card"><h6>THREAT ANALYSIS</h6><p>{result.analysis}</p></div>
                                    <div className="soc-result-card"><h6>RESPONSE GUIDANCE</h6><p>{result.recommendation}</p></div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default AIAnalyzer;
