import { NavLink, useNavigate } from "react-router-dom";
import {
    FaShieldAlt, FaTachometerAlt, FaExclamationTriangle,
    FaPlusCircle, FaRobot, FaComments, FaClipboardList, FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkClass = ({ isActive }) =>
        `nav-link soc-link ${isActive ? "active" : ""}`;

    const initial = (user?.username || user?.email || "S").charAt(0).toUpperCase();

    return (
        <div className="soc-sidebar">
            <div className="soc-brand">
                <div className="soc-brand-mark"><FaShieldAlt /></div>
                <div>
                    <div className="soc-brand-name">SENTINELOPS</div>
                    <div className="soc-brand-sub">LITE SOC</div>
                </div>
            </div>

            <div className="soc-nav-label">MONITOR</div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className={linkClass} to="/dashboard">
                        <FaTachometerAlt /> <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={linkClass} to="/incidents">
                        <FaExclamationTriangle /> <span>Incidents</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={linkClass} to="/incidents/new">
                        <FaPlusCircle /> <span>New Incident</span>
                    </NavLink>
                </li>
            </ul>

            <div className="soc-nav-label">INTELLIGENCE</div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink className={linkClass} to="/ai-analyzer">
                        <FaRobot /> <span>AI Analyzer</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={linkClass} to="/ai-assistant">
                        <FaComments /> <span>AI Assistant</span>
                    </NavLink>
                </li>
                {isAdmin && (
                    <li className="nav-item">
                        <NavLink className={linkClass} to="/audit-logs">
                            <FaClipboardList /> <span>Audit Logs</span>
                        </NavLink>
                    </li>
                )}
            </ul>

            <div className="soc-sidebar-foot">
                <div className="soc-threat-widget">
                    <div className="soc-threat-title">● LIVE FEED</div>
                    <div className="small text-muted">Sensors sweeping… all channels encrypted</div>
                </div>
                <div className="soc-user-chip">
                    <div className="soc-avatar">{initial}</div>
                    <div className="overflow-hidden">
                        <div className="text-white small fw-bold text-truncate">
                            {user?.username || user?.email || "Operator"}
                        </div>
                        <span className="badge bg-primary" style={{ fontSize: "0.6rem" }}>
                            {user?.role || "ENGINEER"}
                        </span>
                    </div>
                </div>
                <button className="btn btn-outline-light w-100 btn-sm" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
