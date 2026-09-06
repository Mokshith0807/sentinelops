import { useState } from "react";

export const SEVERITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
export const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
export const CATEGORIES = ["Malware", "Phishing", "Network", "Endpoint", "Data Breach", "Insider", "Other"];

function IncidentForm({ initial = {}, loading, error, submitLabel, onSubmit }) {
    const [form, setForm] = useState({
        title: initial.title || "",
        description: initial.description || "",
        location: initial.location || "",
        category: initial.category || "",
        severity: initial.severity || "LOW",
        status: initial.status || "OPEN",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label className="form-label">Title *</label>
                <input name="title" className="form-control" value={form.title}
                    onChange={handleChange} required disabled={loading} />
            </div>
            <div className="mb-3">
                <label className="form-label">Description *</label>
                <textarea name="description" className="form-control" rows="4" value={form.description}
                    onChange={handleChange} required disabled={loading} />
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Location</label>
                    <input name="location" className="form-control" value={form.location}
                        onChange={handleChange} disabled={loading} />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select name="category" className="form-select" value={form.category}
                        onChange={handleChange} disabled={loading}>
                        <option value="">Select...</option>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Severity *</label>
                    <select name="severity" className="form-select" value={form.severity}
                        onChange={handleChange} disabled={loading}>
                        {SEVERITIES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Status *</label>
                    <select name="status" className="form-select" value={form.status}
                        onChange={handleChange} disabled={loading}>
                        {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : submitLabel}
            </button>
        </form>
    );
}

export default IncidentForm;
