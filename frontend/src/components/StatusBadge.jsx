function StatusBadge({ status }) {
  const colors = {
    pending: { background: "#fff4e5", color: "#b76e00" },
    confirmed: { background: "#e8f5e9", color: "#2e7d32" },
    cancelled: { background: "#ffebee", color: "#c62828" },
    completed: { background: "#e3f2fd", color: "#1565c0" },
  };

  const key = status ? status.toLowerCase() : "pending";
  const colorStyle = colors[key] || colors.pending;

  const badgeStyle = {
    ...colorStyle,
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "capitalize",
  };

  return <span style={badgeStyle}>{status || "pending"}</span>;
}

export default StatusBadge;