function StatusBadge({ status }) {
  const colors = {
    pending: {
      text: "#FF6B35",
      bg: "rgba(255,107,53,.12)",
      border: "rgba(255,107,53,.3)",
    },
    confirmed: {
      text: "#06D6A0",
      bg: "rgba(6,214,160,.12)",
      border: "rgba(6,214,160,.3)",
    },
    cancelled: {
      text: "#3b82f6",
      bg: "rgba(255,61,154,.12)",
      border: "rgba(255,61,154,.3)",
    },
    completed: {
      text: "#4361EE",
      bg: "rgba(67,97,238,.12)",
      border: "rgba(67,97,238,.3)",
    },
  };

  const key = status ? status.toLowerCase() : "pending";
  const c = colors[key] || colors.pending;

  const badgeStyle = {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "100px",
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: c.text,
    background: c.bg,
    border: `1px solid ${c.border}`,
  };

  return <span style={badgeStyle}>{status || "pending"}</span>;
}

export default StatusBadge;