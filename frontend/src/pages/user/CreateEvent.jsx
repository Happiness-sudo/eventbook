import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { createEvent } from "../../services/api";

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    eventType: "",
    date: "",
    location: "",
    budget: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const eventData = {
        ...form,
        budget: Number(form.budget) || 0,
        userId: user?.id || 1,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      await createEvent(eventData);
      navigate("/my-events");
    } catch (err) {
      setError("Could not create event. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logo}>EventBook</div>
        <h1 style={S.title}>Create Event 🎯</h1>
        <p style={S.sub}>Tell us about your event so we can help you find vendors</p>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { name: "title", label: "Event Title", type: "text", ph: "Sarah's Wedding" },
            { name: "date", label: "Event Date", type: "date", ph: "" },
            { name: "location", label: "Location", type: "text", ph: "Nairobi" },
            { name: "budget", label: "Budget (KES)", type: "number", ph: "50000" },
          ].map((f) => (
            <div key={f.name} style={S.field}>
              <label style={S.label}>{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.ph}
                required={f.name !== "budget"}
                value={form[f.name]}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                style={S.input}
              />
            </div>
          ))}

          <div style={S.field}>
            <label style={S.label}>Event Type</label>
            <select
              name="eventType"
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              style={S.input}
              required
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Graduation">Graduation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={S.field}>
            <label style={S.label}>Description</label>
            <textarea
              name="description"
              placeholder="Tell us more about your event..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              style={{ ...S.input, minHeight: "100px", resize: "vertical" }}
            />
          </div>

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? "Creating..." : "Create Event →"}
          </button>
        </form>
      </div>
    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg)",
    padding: "40px 20px",
  },
  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    padding: "40px",
    width: "100%",
    maxWidth: "520px",
    boxShadow: "var(--shadow)",
  },
  logo: {
    fontFamily: "var(--font-head)",
    fontSize: "18px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "26px",
    fontWeight: 800,
    color: "var(--text)",
    marginBottom: "4px",
  },
  sub: {
    fontSize: "13px",
    color: "var(--muted)",
    marginBottom: "24px",
  },
  error: {
    fontSize: "13px",
    color: "#FF3D9A",
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  field: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: "14px",
    marginTop: "8px",
  },
};

export default CreateEvent;