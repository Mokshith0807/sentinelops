import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
    return (
        <div className="soc-auth-bg" style={{ gridTemplateColumns: "1fr" }}>
            <div className="soc-auth-form-wrap">
                <div className="text-center soc-fade">
                    <FaExclamationTriangle style={{ fontSize: "3rem", color: "var(--soc-neon)" }} />
                    <h1 className="display-1 fw-bold text-white mt-3">404</h1>
                    <p className="lead text-muted">Signal lost — this sector doesn't exist.</p>
                    <Link to="/dashboard" className="btn btn-primary mt-2">Return to command →</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
