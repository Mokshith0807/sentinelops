import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import IncidentForm from "./IncidentForm";
import incidentService from "../services/incidentService";

function CreateIncident() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (form) => {
        setLoading(true);
        setError("");
        try {
            await incidentService.createIncident(form);
            navigate("/incidents");
        } catch (err) {
            const data = err.response?.data;
            setError(data?.errors ? Object.values(data.errors).join(", ")
                : data?.message || "Failed to file incident");
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout title="File Incident" subtitle="Log a new threat signal">
            <div className="soc-card" style={{ maxWidth: "760px" }}>
                <div className="soc-card-header"><h5>NEW SIGNAL INTAKE</h5></div>
                <div className="soc-card-body">
                    <IncidentForm loading={loading} error={error} submitLabel="File incident →" onSubmit={handleSubmit} />
                </div>
            </div>
        </MainLayout>
    );
}

export default CreateIncident;
