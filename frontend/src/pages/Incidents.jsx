import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaShieldAlt } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SeverityBadge from "../components/SeverityBadge";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import incidentService from "../services/incidentService";
import { useAuth } from "../context/AuthContext";

function Incidents() {
    const { isAdmin } = useAuth();
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [severity, setSeverity] = useState("");
    const [status, setStatus] = useState("");
    const [deleting, setDeleting] = useState(null);

    useEffect(() => { load(); }, []);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await incidentService.getAllIncidents({ page: 0, size: 100, sortBy: "id" });
            const d = res.data;
            setIncidents(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load incidents");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Neutralize this incident record?")) return;
        setDeleting(id);
        try {
            await incidentService.deleteIncident(id);
            setIncidents((prev) => prev.filter((i) => i.id !== id));
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        } finally {
            setDeleting(null);
        }
    };

    const filtered = incidents.filter((i) => {
        if (search && !(i.title || "").toLowerCase().includes(search.toLowerCase())) return false;
        if (severity && (i.severity || "").toUpperCase() !== severity) return false;
        if (status && (i.status || "").toUpperCase() !== status) return false;
        return true;
    };

    return (
        <MainLayout title="Incident Queue" subtitle={`${filtered.length} signals in scope`}>
            <div className="soc-card mb-3">
                <div className="soc-card-body">
                    <div className="row g-2 align-items-center">
                        <div className="col-md-4">
                            <div className="position-relative">
                                <FaSearch className="position-absolute" style={{ left: "12px", top: "12px", color: "var(--soc-muted)" }} />
                                <input className="form-control ps-5" placeholder="Hunt by title..."
                                    value={search} onChange={(e) => setSearch(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                                <option value="">Severity: all</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                                <option value="CRITICAL">CRITICAL</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Status: all</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="RESOLVED">RESOLVED</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                        <div className="col-md-2 d-grid">
                            <Link to="/incidents/new" className="btn btn-primary"><FaPlus className="me-1" /> File</Link>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? <div className="soc-card"><LoadingSpinner message="Scanning incident feed..." /></div> :
                error ? <div className="alert alert-danger">{error}</div> : (
                    <div className="soc-card">
                        <div className="soc-table-wrap table-responsive">
                            <table className="table soc-table table-hover">
                                <thead>
                                    <tr><th>ID</th><th>TITLE</th><th>SEVERITY</th><th>STATUS</th><th>CATEGORY</th><th className="text-end">ACTIONS</th></tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan="6">
                                            <div className="soc-empty">
                                                <FaShieldAlt />
                                                <div>Nothing matches this hunt. Adjust filters.</div>
                                            </div>
                                        </td></tr>
                                    ) : filtered.map((i) => (
                                        <tr key={i.id} className={`soc-row-${(i.severity || "LOW").toUpperCase()}`}>
                                            <td className="text-muted">#{i.id}</td>
                                            <td><Link to={`/incidents/${i.id}`}>{i.title}</Link></td>
                                            <td><SeverityBadge severity={i.severity} /></td>
                                            <td><StatusBadge status={i.status} /></td>
                                            <td className="text-muted">{i.category || "—"}</td>
                                            <td className="text-end text-nowrap">
                                                <Link to={`/incidents/${i.id}`} className="btn btn-sm btn-outline-primary me-1"><FaEye /></Link>
                                                {isAdmin && (
                                                    <>
                                                        <Link to={`/incidents/${i.id}/edit`} className="btn btn-sm btn-outline-primary me-1"><FaEdit /></Link>
                                                        <button className="btn btn-sm btn-outline-danger"
                                                            disabled={deleting === i.id}
                                                            onClick={() => handleDelete(i.id)}><FaTrash /></button>
                                                    </>
                                                )}
                                            </td>
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

export default Incidents;
