function StatusBadge({ status }) {
    const s = (status || "").toUpperCase();
    const color =
        s === "OPEN" ? "bg-danger"
        : s === "IN_PROGRESS" ? "bg-warning text-dark"
        : s === "RESOLVED" || s === "CLOSED" ? "bg-success"
        : "bg-secondary";
    return <span className={`badge ${color}`}>{s || "—"}</span>;
}

export default StatusBadge;
