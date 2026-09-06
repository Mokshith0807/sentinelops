import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import IncidentForm from "./IncidentForm";
import LoadingSpinner from "../components/LoadingSpinner";
import incidentService from "../services/incidentService";

function EditIncident() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [initial, setInitial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        incidentService.getById(id)
            .then((res) => setInitial(res.data))
            .catch((err) => setError(err.response?.data?.message || "Failed to load incident"))
            .finally(() => setLoading(false));
    }, [id]);

    const handleSubmit = async (form) => {
        setSaving(true);
        setError("");
        try {
            await incidentService.updateIncident(id, form);
            navigate(`/incidents/${id}`);
        } catch (err) {
            const data = err.response?.data;
            setError(data?.errors ? Object.values(data.errors).join(", ")
                : data?.message || "Failed to update incident");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <MainLayout title="Revise Signal" subtitle="Loading dossier..."><div className="soc-card"><LoadingSpinner /></div></MainLayout>;

    return (
        <MainLayout title={`Revise Signal #${id}`} subtitle="ADMIN only">
            <div className="soc-card" style={{ maxWidth: "760px" }}>
                <div className="soc-card-header"><h5>REVISE DOSSIER</h5></div>
                <div className="soc-card-body">
                    {initial
                        ? <IncidentForm key={initial.id} initial={initial} loading={saving} error={error} submitLabel="Commit changes →" onSubmit={handleSubmit} />
                        : <div className="alert alert-danger">{error}</div>}
                </div>
            </div>
        </MainLayout>
    );
}

export default EditIncident;
