import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShieldAlt, FaBolt, FaRobot, FaClipboardList, FaLock } from "react-icons/fa";
import authService from "../services/authService";
import { useAuth } from "../context/AuthContext";

function getErrorMessage(error, fallback) {
    if (error.response?.data?.errors) {
        return Object.values(error.response.data.errors).join(", ");
    }
    return error.response?.data?.message || error.response?.data?.error || fallback;
}

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await authService.login({ email, password });
            const token = response.data?.token;
            if (!token) {
                setError(response.data?.message || "Login failed: no token received");
                return;
            }
            login(token, { username: response.data?.username, email: response.data?.email || email, role: response.data?.role });
            navigate("/dashboard");
        } catch (err) {
            setError(getErrorMessage(err, "Login failed. Check credentials."));
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
                <h1>SENTINELOPS LITE</h1>
                <p>Cyber incident command center — triage threats, analyze with Gemini AI, and keep a tamper-proof audit trail.</p>
                <ul className="soc-auth-points">
                    <li><FaBolt /> Real-time incident triage & severity tracking</li>
                    <li><FaRobot /> Gemini-powered threat analysis & assistant</li>
                    <li><FaClipboardList /> ADMIN audit trail for every action</li>
                    <li><FaLock /> JWT-secured, role-based access control</li>
                </ul>
            </div>
            <div className="soc-auth-form-wrap">
                <div className="soc-auth-card">
                    <div className="card-body p-4">
                        <h3 className="text-white mb-1">
                            <FaShieldAlt className="me-2" style={{ color: "var(--soc-neon)" }} />
                            Welcome back
                        </h3>
                        <p className="text-muted mb-4 small">Sign in to your SOC console</p>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label">EMAIL</label>
                                <input type="email" className="form-control" value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="soc@sentinelops.local" required disabled={loading} />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">PASSWORD</label>
                                <input type="password" className="form-control" value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••" required disabled={loading} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
                                {loading ? "Authenticating..." : "Enter SOC →"}
                            </button>
                        </form>
                        <p className="text-center mt-3 mb-0 small text-muted">
                            No account? <Link to="/register">Request access</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
