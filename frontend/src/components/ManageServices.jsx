import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ManageServices = () => {
  const { user } = useAuth();
  const storageKey = `services_${user?.id || "guest"}`;

  const [services, setServices] = useState(() => {
    const stored = localStorage.getItem(storageKey);
    return stored
      ? JSON.parse(stored)
      : ["DJ Services", "Sound System", "Lighting"];
  });
  const [newService, setNewService] = useState("");

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(services));
  }, [services, storageKey]);

  const handleAdd = () => {
    if (newService.trim()) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const handleRemove = (target) => {
    setServices(services.filter((s) => s !== target));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div style={S.page}>
      <div style={S.container}>
        <div style={S.header}>
          <h1 style={S.title}>Manage Services 🛠️</h1>
          <p style={S.sub}>Add or remove the services you offer to clients</p>
        </div>

        <div style={S.card}>
          <label style={S.label}>Add a New Service</label>
          <div style={S.inputRow}>
            <input
              type="text"
              placeholder="e.g. Wedding Photography"
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyPress={handleKeyPress}
              style={S.input}
            />
            <button onClick={handleAdd} style={S.addBtn}>
              + Add
            </button>
          </div>

          <div style={S.divider} />

          <label style={S.label}>Your Services ({services.length})</label>
          {services.length === 0 ? (
            <div style={S.empty}>No services yet. Add your first above.</div>
          ) : (
            <ul style={S.list}>
              {services.map((service, idx) => (
                <li key={idx} style={S.listItem}>
                  <span style={S.serviceName}>{service}</span>
                  <button
                    onClick={() => handleRemove(service)}
                    style={S.removeBtn}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "720px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "24px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "28px",
    fontWeight: 800,
    color: "var(--text)",
    marginBottom: "6px",
  },
  sub: {
    fontSize: "14px",
    color: "var(--muted)",
  },
  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "var(--shadow)",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "10px",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: "14px",
    outline: "none",
  },
  addBtn: {
    padding: "12px 24px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#3b82f6,#FF6B35)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  divider: {
    height: "1px",
    background: "var(--border)",
    margin: "28px 0",
  },
  empty: {
    fontSize: "14px",
    color: "var(--muted)",
    textAlign: "center",
    padding: "24px",
    background: "var(--input-bg)",
    borderRadius: "12px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    borderRadius: "12px",
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
  },
  serviceName: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text)",
  },
  removeBtn: {
    padding: "6px 14px",
    borderRadius: "100px",
    border: "1px solid #3b82f6",
    background: "transparent",
    color: "#3b82f6",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default ManageServices;