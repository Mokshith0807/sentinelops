const COLORS = {
    critical: "#f87171",
    high: "#fbbf24",
    medium: "#22d3ee",
    low: "#94a3b8",
};

function SeverityChart({ data = {} }) {
    const c = Number(data.criticalIncidents) || 0;
    const h = Number(data.highIncidents) || 0;
    const m = Number(data.mediumIncidents) || 0;
    const l = Number(data.lowIncidents) || 0;
    const total = c + h + m + l;

    const R = 54;
    const CIRC = 2 * Math.PI * R;
    const segs = [
        { v: c, color: COLORS.critical, label: "Critical" },
        { v: h, color: COLORS.high, label: "High" },
        { v: m, color: COLORS.medium, label: "Medium" },
        { v: l, color: COLORS.low, label: "Low" },
    ];

    let offset = 25;
    const max = Math.max(total, 1);

    const pct = (v) => (total === 0 ? 0 : Math.round((v / total) * 100));

    return (
        <div className="d-flex align-items-center gap-4 flex-wrap">
            <div className="soc-donut">
                <svg viewBox="0 0 140 140" width="150" height="150">
                    <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="16" />
                    {total > 0 && segs.map((s, i) => {
                        if (!s.v) return null;
                        const frac = s.v / max;
                        const el = (
                            <circle
                                key={i}
                                cx="70" cy="70" r={R} fill="none"
                                stroke={s.color} strokeWidth="16"
                                strokeDasharray={`${frac * CIRC} ${CIRC}`}
                                strokeDashoffset={-offset * CIRC / 100 + CIRC * 0.25}
                                strokeLinecap="butt"
                                className="soc-donut-seg"
                            />
                        );
                        offset += frac * 100;
                        return el;
                    })}
                    <text x="70" y="66" textAnchor="middle" className="soc-donut-total">{total}</text>
                    <text x="70" y="84" textAnchor="middle" className="soc-donut-label">SIGNALS</text>
                </svg>
            </div>
            <div className="flex-grow-1" style={{ minWidth: "180px" }}>
                {segs.map((s, i) => (
                    <div key={i} className="mb-2">
                        <div className="d-flex justify-content-between small mb-1">
                            <span style={{ color: "var(--soc-text)" }}>
                                <span className="soc-dot" style={{ background: s.color }} /> {s.label}
                            </span>
                            <span className="text-muted">{s.v} · {pct(s.v)}%</span>
                        </div>
                        <div className="soc-bar">
                            <div className="soc-bar-fill" style={{ width: `${pct(s.v)}%`, background: s.color }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SeverityChart;
