import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyEvents } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../../components/StatusBadge";

const MyEvents = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getMyEvents();
        const userId = user?.id || 1;
        const myEvents = res.data.filter((e) => e.userId === userId);
        setEvents(myEvents);
      } catch (err) {
        setError("Could not load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>My Events</h1>
          <p style={S.sub}>
            {events.length} {events.length === 1 ? "event" : "events"}
          </p>
        </div>
        <button style={S.createBtn} onClick={() => navigate("/events/new")}>
          + New Event
        </button>
      </div>

      {loading && <p style={S.message}>Loading your events...</p>}

      {error && <div style={S.error}>{error}</div>}

      {!loading && !error && events.length === 0 && (
        <div style={S.emptyCard}>
          <p style={S.emptyTitle}>No events yet</p>
          <p style={S.emptySub}>
            Create your first event to start finding the right vendors.
          </p>
          <button style={S.createBtn} onClick={() => navigate("/events/new")}>
            Create Your First Event →
          </button>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div style={S.list}>
          {events.map((e) => (
            <div key={e.id} style={S.eventCard}>
              <div style={S.eventInfo}>
                <h3 style={S.eventTitle}>{e.title}</h3>
                <div style={S.metaRow}>
                  <span style={S.meta}>{formatDate(e.date)}</span>
                  {e.location && (
                    <>
                      <span style={S.dot}>•</span>
                      <span style={S.meta}>{e.location}</span>
                    </>
                  )}
                  {e.budget > 0 && (
                    <>
                      <span style={S.dot}>•</span>
                      <span style={S.meta}>
                        KES {Number(e.budget).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>
                {e.description && (
                  <p style={S.description}>{e.description}</p>
                )}
              </div>
              <StatusBadge status={e.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    padding: "40px 32px",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "16px",
    maxWidth: "800px",
    margin: "0 auto 32px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "32px",
    fontWeight: 800,
    color: "var(--text)",
    margin: 0,
  },
  sub: {
    fontSize: "13px",
    color: "var(--muted)",
    marginTop: "4px",
  },
  createBtn: {
    padding: "10px 20px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  eventCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    boxShadow: "var(--shadow)",
  },
  eventInfo: { flex: 1 },
  eventTitle: {
    fontFamily: "var(--font-head)",
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text)",
    margin: "0 0 8px",
  },
  metaRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: "12px",
  },
  meta: {
    fontSize: "13px",
    color: "var(--muted)",
    fontWeight: 500,
  },
  dot: {
    color: "var(--muted)",
    fontSize: "13px",
  },
  description: {
    fontSize: "13px",
    color: "var(--text)",
    lineHeight: 1.5,
    margin: 0,
    opacity: 0.85,
  },
  message: {
    fontSize: "15px",
    color: "var(--muted)",
    textAlign: "center",
    padding: "60px 0",
  },
  emptyCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    padding: "60px 32px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto",
    boxShadow: "var(--shadow)",
  },
  emptyTitle: {
    fontFamily: "var(--font-head)",
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text)",
    margin: "0 0 8px",
  },
  emptySub: {
    fontSize: "14px",
    color: "var(--muted)",
    marginBottom: "24px",
    lineHeight: 1.5,
  },
  error: {
    fontSize: "13px",
    color: "#FF3D9A",
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    padding: "12px 16px",
    borderRadius: "12px",
    maxWidth: "800px",
    margin: "0 auto 20px",
  },
};

export default MyEvents;