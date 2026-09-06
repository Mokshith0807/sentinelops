import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShieldAlt, FaBolt, FaRobot, FaClipboardList, FaLock } from "react-icons/fa";
import authService from "../services/authService";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        if (form.username.length < 3) { setError("Username must be at least 3 characters"); return; }
        if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
        setLoading(true);
        try {
            await authService.register(form);
            setSuccess("Operator provisioned. Redirecting to login...");
            setTimeout(() => navigate("/login"), 1400);
        } catch (err) {
            const data = err.response?.data;
            setError(data?.errors ? Object.values(data.errors).join(", ")
                : data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="soc-auth-bg">
            <div className="soc-auth-hero">
                <span className="soc-orb soc-orb-1" />
                <span className="soc-orb soc-orb-2" />
                <span className="soc-orb soc-orb-3" />
                <div className="soc-radar">
                    <div className="soc-radar-sweep" />
                    <div className="soc-radar-core" />
                </div>
                <h1>JOIN THE WATCH</h1>
                <p>New operators are provisioned with the ENGINEER role. An ADMIN can elevate privileges after verification.</p>
                <ul className="soc-auth-points">
                    <li><FaBolt /> File & triage security incidents</li>
                    <li><FaRobot /> AI-assisted severity analysis</li>
                    <li><FaLock /> BCrypt-hashed credentials, JWT sessions</li>
                    <li><FaClipboardList /> Every action audited</li>
                </ul>
            </div>
            <div className="soc-auth-form-wrap">
                <div className="soc-auth-card">
                    <div className="card-body p-4">
                        <h3 className="text-white mb-1">
                            <FaShieldAlt className="me-2" style={{ color: "var(--soc-neon)" }} />
                            Request access
                        </h3>
                        <p className="text-muted mb-4 small">Provisioned as ENGINEER by default</p>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">CALLSIGN (USERNAME)</label>
                                <input name="username" className="form-control" value={form.username}
                                    onChange={handleChange} placeholder="e.g. nightwatch"
                                    required minLength={3} maxLength={30} disabled={loading} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">EMAIL</label>
                                <input name="email" type="email" className="form-control" value={form.email}
                                    onChange={handleChange} placeholder="you@company.com" required disabled={loading} />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">PASSWORD</label>
                                <input name="password" type="password" className="form-control" value={form.password}
                                    onChange={handleChange} placeholder="Min. 6 characters" required minLength={6} disabled={loading} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                                {loading ? "Provisioning..." : "Create operator →"}
                            </button>
                        </form>
                        <p className="text-center mt-3 mb-0 small text-muted">
                            Already cleared? <Link to="/login">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
