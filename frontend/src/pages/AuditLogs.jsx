import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import auditService from "../services/auditService";

function AuditLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { load(); }, []);

    const load = async () => {
        setLoading(true);
        try {
            const res = await auditService.getAll();
            setLogs(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setError(err.response?.status === 403 ? "Access denied: ADMIN only"
                : err.response?.data?.message || "Failed to load audit logs");
        } finally {
            setLoading(false);
        }
    };

    const actionColor = (a) =>
        a === "CREATED" ? "bg-success" : a === "DELETED" ? "bg-danger" : "bg-info";

    return (
        <MainLayout title="Audit Trail" subtitle="Tamper-evident action log · ADMIN only">
            {loading ? <div className="soc-card"><LoadingSpinner message="Rewinding audit tape..." /></div> :
                error ? <div className="alert alert-danger">{error}</div> : (
                    <div className="soc-card">
                        <div className="soc-card-header"><h5><FaClipboardList className="me-2" />{logs.length} RECORDED ACTIONS</h5></div>
                        <div className="soc-table-wrap table-responsive">
                            <table className="table soc-table table-hover">
                                <thead>
                                    <tr><th>ID</th><th>ACTION</th><th>OPERATOR</th><th>SIGNAL</th><th>TIMESTAMP</th></tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr><td colSpan="5"><div className="soc-empty"><FaClipboardList /><div>Silence on the tape — no actions recorded yet.</div></div></td></tr>
                                    ) : logs.map((l) => (
                                        <tr key={l.id}>
                                            <td className="text-muted">#{l.id}</td>
                                            <td><span className={`badge ${actionColor(l.action)}`}>{l.action}</span></td>
                                            <td className="fw-semibold">{l.username}</td>
                                            <td className="text-muted">{l.incident?.id ? `#${l.incident.id} ${l.incident.title || ""}` : "—"}</td>
                                            <td className="text-muted small">{l.createdAt ? new Date(l.createdAt).toLocaleString() : "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
        </MainLayout>
    );
}

export default AuditLogs;
