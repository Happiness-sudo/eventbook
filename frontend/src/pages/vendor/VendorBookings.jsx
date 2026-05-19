import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const VendorBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const getToken = () => {
    const direct = localStorage.getItem("token");
    if (direct) return direct;
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    return userObj.token || null;
  };

  const loadBookings = async () => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/bookings/vendor`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setBookings([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleAction = async (bookingId, newStatus) => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Could not update booking");
        return;
      }

      loadBookings();
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div style={S.page}>
      <div style={S.container}>
        <Link to="/vendor/dashboard" style={S.backBtn}>← Back to Dashboard</Link>

        <h1 style={S.title}>Booking Requests</h1>
        <p style={S.subtitle}>Manage incoming booking requests from customers.</p>

        <div style={S.filterRow}>
          {["all", "pending", "accepted", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{ ...S.filterBtn, ...(filter === f ? S.filterBtnActive : {}) }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={S.empty}>Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div style={S.empty}>No {filter === "all" ? "" : filter} bookings yet.</div>
        ) : (
          <div style={S.bookingList}>
            {filtered.map((b) => (
              <div key={b.id} style={S.bookingCard}>
                <div style={S.bookingHeader}>
                  <div>
                    <div style={S.bookingName}>{b.customer_name || "Customer"}</div>
                    <div style={S.bookingMeta}>
                      {b.customer_email && <span>{b.customer_email} • </span>}
                      Event: {formatDate(b.event_date)} • KES {(b.amount || 0).toLocaleString()}
                    </div>
                  </div>
                  <div
                    style={{
                      ...S.badge,
                      ...(b.status === "pending" ? S.badgePending : {}),
                      ...(b.status === "accepted" ? S.badgeAccepted : {}),
                      ...(b.status === "rejected" ? S.badgeRejected : {}),
                    }}
                  >
                    {b.status}
                  </div>
                </div>

                {b.message && <div style={S.bookingMessage}>"{b.message}"</div>}

                {b.status === "pending" && (
                  <div style={S.bookingActions}>
                    <button onClick={() => handleAction(b.id, "rejected")} style={S.rejectBtn}>
                      Reject
                    </button>
                    <button onClick={() => handleAction(b.id, "accepted")} style={S.approveBtn}>
                      Accept →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const S = {
  page: { minHeight: "100vh", background: "var(--bg)", padding: "40px 20px" },
  container: { maxWidth: "900px", margin: "0 auto" },
  backBtn: { display: "inline-block", padding: "10px 18px", borderRadius: "100px", border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--text)", textDecoration: "none", fontSize: "13px", fontWeight: 600, marginBottom: "20px" },
  title: { fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--text)", marginBottom: "6px" },
  subtitle: { fontSize: "14px", color: "var(--muted)", marginBottom: "24px" },
  filterRow: { display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" },
  filterBtn: { padding: "8px 16px", borderRadius: "100px", border: "1px solid var(--border)", background: "var(--card-bg)", color: "var(--muted)", fontWeight: 600, fontSize: "13px", cursor: "pointer" },
  filterBtnActive: { background: "linear-gradient(135deg,#FF3D9A,#FF6B35)", color: "#fff", border: "none" },
  empty: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "40px", textAlign: "center", color: "var(--muted)", fontSize: "14px" },
  bookingList: { display: "flex", flexDirection: "column", gap: "12px" },
  bookingCard: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" },
  bookingHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", marginBottom: "8px" },
  bookingName: { fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" },
  bookingMeta: { fontSize: "13px", color: "var(--muted)" },
  bookingMessage: { fontSize: "13px", color: "var(--text)", fontStyle: "italic", padding: "10px 14px", background: "var(--input-bg)", borderRadius: "10px", margin: "10px 0" },
  badge: { padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", flexShrink: 0 },
  badgePending: { background: "rgba(255,193,7,0.15)", color: "#FFC107" },
  badgeAccepted: { background: "rgba(76,175,80,0.15)", color: "#4CAF50" },
  badgeRejected: { background: "rgba(244,67,54,0.15)", color: "#F44336" },
  bookingActions: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" },
  approveBtn: { padding: "10px 20px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg,#FF3D9A,#FF6B35)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
  rejectBtn: { padding: "10px 20px", borderRadius: "100px", border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontWeight: 600, fontSize: "13px", cursor: "pointer" },
};

export default VendorBookings;