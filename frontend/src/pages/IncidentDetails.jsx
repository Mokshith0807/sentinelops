import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrash, FaMapMarkerAlt, FaTag, FaUser, FaClock } from "react-icons/fa";
import MainLayout from "../layouts/MainLayout";
import SeverityBadge from "../components/SeverityBadge";
import StatusBadge from "../components/StatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import incidentService from "../services/incidentService";
import { useAuth } from "../context/AuthContext";

function IncidentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => { load(); }, [id]);

    const load = async () => {
        setLoading(true);
        try {
            const res = await incidentService.getById(id);
            setIncident(res.data);
        } catch (err) {
            setError(err.response?.status === 404 ? "Signal not found"
                : err.response?.data?.message || "Failed to load incident");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Neutralize this incident record?")) return;
        try {
            await incidentService.deleteIncident(id);
            navigate("/incidents");
        } catch (err) {
            alert(err.response?.data?.message || "Delete failed");
        }
    };

    if (loading) return <MainLayout title="Signal Dossier" subtitle="Decrypting record..."><div className="soc-card"><LoadingSpinner /></div></MainLayout>;

    if (error) {
        return (
            <MainLayout title="Signal Dossier" subtitle="Record unavailable">
                <div className="alert alert-danger">{error}</div>
                <Link to="/incidents" className="btn btn-secondary">Back to queue</Link>
            </MainLayout>
        );
    }

    return (
        <MainLayout title={`Signal #${incident.id}`} subtitle={incident.title}>
            <div className="soc-card">
                <div className="soc-card-header flex-wrap gap-2">
                    <h5>{incident.title}</h5>
                    <div>
                        <SeverityBadge severity={incident.severity} />{" "}
                        <StatusBadge status={incident.status} />
                    </div>
                </div>
                <div className="soc-card-body">
                    <h6 style={{ fontSize: "0.7rem", letterSpacing: "2px", color: "var(--soc-neon)", fontWeight: 800 }}>FIELD REPORT</h6>
                    <p style={{ lineHeight: 1.7 }}>{incident.description}</p>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-2"><span className="text-muted small"><FaMapMarkerAlt className="me-1" /> LOCATION</span><div>{incident.location || "—"}</div></div>
                        <div className="col-md-6 mb-2"><span className="text-muted small"><FaTag className="me-1" /> CATEGORY</span><div>{incident.category || "—"}</div></div>
                        <div className="col-md-6 mb-2"><span className="text-muted small"><FaUser className="me-1" /> REPORTED BY</span><div>{incident.reportedBy?.username || incident.reportedBy?.email || "—"}</div></div>
                        <div className="col-md-6 mb-2"><span className="text-muted small"><FaClock className="me-1" /> LOGGED AT</span><div>{incident.createdAt ? new Date(incident.createdAt).toLocaleString() : "—"}</div></div>
                    </div>
                    <div className="mt-4 d-flex gap-2 flex-wrap">
                        <Link to="/incidents" className="btn btn-secondary"><FaArrowLeft className="me-1" /> Queue</Link>
                        {isAdmin && (
                            <>
                                <Link to={`/incidents/${id}/edit`} className="btn btn-primary"><FaEdit className="me-1" /> Edit</Link>
                                <button className="btn btn-danger" onClick={handleDelete}><FaTrash className="me-1" /> Neutralize</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

export default IncidentDetails;
