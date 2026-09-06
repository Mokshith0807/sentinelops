import { useAuth } from "../context/AuthContext";

function Topbar({ title = "Security Operations Center", subtitle = "Real-time threat monitoring" }) {
    const today = new Date().toLocaleDateString(undefined, {
        weekday: "short", month: "short", day: "numeric",
    });

    return (
        <div className="soc-topbar">
            <div>
                <h4>{title}</h4>
                <div className="soc-topbar-sub">
                    <span className="soc-live-dot" />
                    {subtitle} &nbsp;·&nbsp; {today}
                </div>
            </div>
            <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success">SYSTEM NOMINAL</span>
            </div>
        </div>
    );
}

export default Topbar;
