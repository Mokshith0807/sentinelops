import CountUp from "./CountUp";

function StatCard({ title, value, color = "primary", icon, delay = 0 }) {
    return (
        <div className="col-md-3 col-sm-6 mb-3">
            <div className={`card soc-stat soc-stat-${color}`} style={{ animationDelay: `${delay}s` }}>
                <div className="card-body">
                    <div className="soc-stat-top">
                        <div className="soc-stat-icon">{icon}</div>
                    </div>
                    <p className="soc-stat-label">{title}</p>
                    <h2 className="soc-stat-value"><CountUp value={value} /></h2>
                </div>
            </div>
        </div>
    );
}

export default StatCard;
