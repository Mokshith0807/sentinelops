import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaLayerGroup, FaFolderOpen, FaSyncAlt, FaCheckDouble,
    FaFire, FaArrowUp, FaMinus, FaArrowDown, FaPlus, FaRobot, FaComments,
} from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import StatCard from "../components/StatCard";
import SeverityBadge from "../components/SeverityBadge";
import StatusBadge from "../components/StatusBadge";
import SeverityChart from "../components/SeverityChart";
import { StatSkeleton } from "../components/Skeleton";
import dashboardService from "../services/dashboardService";
import incidentService from "../services/incidentService";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { loadAll(); }, []);

    const loadAll = async () => {
        setLoading(true);
        setError("");
        try {
            const [dashRes, incRes] = await Promise.all([
                dashboardService.getDashboard(),
                incidentService.getAllIncidents({ page: 0, size: 8, sortBy: "id" }),
            ]);
            setDashboard(dashRes.data);
            const d = incRes.data;
            setIncidents(Array.isArray(d) ? d : Array.isArray(d?.content) ? d.content : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout title="Command Overview" subtitle="Live posture at a glance">
                <div className="soc-hero mb-4">
                    <h2>Establishing uplink...</h2>
                    <p>Pulling live telemetry from the SOC grid</p>
                </div>
                <div className="row">
                    <StatSkeleton /><StatSkeleton /><StatSkeleton /><StatSkeleton />
                </div>
                <div className="row">
                    <StatSkeleton /><StatSkeleton /><StatSkeleton /><StatSkeleton />
                </div>
            </MainLayout>
        );
    }

    const total = dashboard?.totalIncidents || 0;
    const hot = (dashboard?.criticalIncidents || 0) + (dashboard?.highIncidents || 0);
    const threatPct = total === 0 ? 0 : Math.min(100, Math.round((hot / total) * 100));
    const posture = (dashboard?.criticalIncidents || 0) > 0 ? "ELEVATED" : threatPct > 40 ? "GUARDED" : "STABLE";

    return (
        <MainLayout title="Command Overview" subtitle="Live posture at a glance">
            {error && <div className="alert alert-danger">{error} <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => loadAll()}>Retry</button></div>}

            <div className="soc-hero mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div style={{ minWidth: "220px" }}>
                        <h2>Threat posture: {posture}</h2>
                        <p>{dashboard?.openIncidents || 0} open · {dashboard?.inProgressIncidents || 0} in progress · {dashboard?.resolvedIncidents || 0} resolved across {total} tracked incidents</p>
                    </div>
                    <div style={{ minWidth: "220px", flex: "1", maxWidth: "360px" }}>
                        <div className="d-flex justify-content-between small mb-1">
                            <span className="text-muted">HEAT INDEX</span>
                            <span className="text-white fw-bold">{threatPct}%</span>
                        </div>
                        <div className="soc-meter"><div className="soc-meter-fill" style={{ width: `${threatPct}%` }} /></div>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/incidents/new" className="btn btn-primary btn-sm"><FaPlus className="me-1" /> New incident</Link>
                        <Link to="/ai-analyzer" className="btn btn-outline-primary btn-sm"><FaRobot className="me-1" /> Analyze</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                <StatCard title="TOTAL TRACKED" value={dashboard?.totalIncidents} color="primary" icon={<FaLayerGroup />} delay={0} />
                <StatCard title="OPEN" value={dashboard?.openIncidents} color="warning" icon={<FaFolderOpen />} delay={0.05} />
                <StatCard title="IN PROGRESS" value={dashboard?.inProgressIncidents} color="info" icon={<FaSyncAlt />} delay={0.1} />
                <StatCard title="RESOLVED" value={dashboard?.resolvedIncidents} color="success" icon={<FaCheckDouble />} delay={0.15} />
            </div>
            <div className="row">
                <StatCard title="CRITICAL" value={dashboard?.criticalIncidents} color="danger" icon={<FaFire />} delay={0.2} />
                <StatCard title="HIGH" value={dashboard?.highIncidents} color="warning" icon={<FaArrowUp />} delay={0.25} />
                <StatCard title="MEDIUM" value={dashboard?.mediumIncidents} color="info" icon={<FaMinus />} delay={0.3} />
                <StatCard title="LOW" value={dashboard?.lowIncidents} color="secondary" icon={<FaArrowDown />} delay={0.35} />
            </div>

            <div className="row mt-1">
                <div className="col-lg-8 mb-3">
                    <div className="soc-card">
                        <div className="soc-card-header">
                            <h5>LATEST SIGNALS</h5>
                            <Link to="/incidents" className="btn btn-sm btn-outline-primary">View all →</Link>
                        </div>
                        <div className="soc-table-wrap table-responsive">
                            <table className="table soc-table table-hover">
                                <thead>
                                    <tr><th>TITLE</th><th>SEVERITY</th><th>STATUS</th><th>CATEGORY</th></tr>
                                </thead>
                                <tbody>
                                    {incidents.length === 0 ? (
                                        <tr><td colSpan="4"><div className="soc-empty">No signals on the wire. File the first incident.</div></td></tr>
                                    ) : incidents.slice(0, 8).map((i) => (
                                        <tr key={i.id} className={`soc-row-${(i.severity || "LOW").toUpperCase()}`}>
                                            <td><Link to={`/incidents/${i.id}`}>{i.title}</Link></td>
                                            <td><SeverityBadge severity={i.severity} /></td>
                                            <td><StatusBadge status={i.status} /></td>
                                            <td className="text-muted">{i.category || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 mb-3">
                    <div className="soc-card mb-3">
                        <div className="soc-card-header"><h5>SEVERITY MIX</h5></div>
                        <div className="soc-card-body">
                            <SeverityChart data={dashboard} />
                        </div>
                    </div>
                    <div className="soc-card mb-3">
                        <div className="soc-card-header"><h5>RAPID RESPONSE</h5></div>
                        <div className="soc-card-body d-grid gap-2">
                            <Link to="/incidents/new" className="btn btn-primary"><FaPlus className="me-1" /> File incident</Link>
                            <Link to="/ai-analyzer" className="btn btn-outline-primary"><FaRobot className="me-1" /> AI Analyzer</Link>
                            <Link to="/ai-assistant" className="btn btn-outline-primary"><FaComments className="me-1" /> Ask assistant</Link>
                        </div>
                    </div>
                    <div className="soc-card">
                        <div className="soc-card-header"><h5>ENGINE STATUS</h5></div>
                        <div className="soc-card-body">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted small">Detection pipeline</span>
                                <span className="badge bg-success">ONLINE</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="text-muted small">Gemini AI link</span>
                                <span className="badge bg-success">LINKED</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted small">Audit trail</span>
                                <span className="badge bg-success">RECORDING</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default Dashboard;
