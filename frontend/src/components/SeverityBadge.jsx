function SeverityBadge({ severity }) {
    const s = (severity || "").toUpperCase();
    const color =
        s === "CRITICAL" ? "bg-danger"
        : s === "HIGH" ? "bg-warning text-dark"
        : s === "MEDIUM" ? "bg-info text-dark"
        : "bg-secondary";
    return <span className={`badge ${color}`}>{s || "—"}</span>;
}

export default SeverityBadge;
