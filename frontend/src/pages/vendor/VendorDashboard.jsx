import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    revenue: 0,
    rating: 0,
  });
  const [pendingBookings, setPendingBookings] = useState([]);

  const getToken = () => {
    const direct = localStorage.getItem("token");
    if (direct) return direct;
    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    return userObj.token || null;
  };

  const loadData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const profileRes = await fetch(`${API_URL}/api/vendors/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let vendorRating = 0;
      if (profileRes.ok) {
        const profile = await profileRes.json();
        vendorRating = profile.rating || 0;
      }

      const bookingsRes = await fetch(`${API_URL}/api/bookings/vendor`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!bookingsRes.ok) return;

      const bookings = await bookingsRes.json();

      const total = bookings.length;
      const revenue = bookings
        .filter((b) => b.status === "accepted")
        .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);
      const pending = bookings.filter((b) => b.status === "pending");

      setStats({ totalBookings: total, revenue, rating: vendorRating });
      setPendingBookings(pending);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    loadData();
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

      loadData();
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

  return (
    <div style={S.page}>
      <div style={S.container}>
        <div style={S.header}>
          <h1 style={S.title}>Welcome back, {user?.name || "Vendor"}</h1>
        </div>

        <div style={S.statsGrid}>
          <div style={S.statCard}>
            <div style={S.statLabel}>Total Bookings</div>
            <div style={S.statValue}>{stats.totalBookings}</div>
            <div style={S.statHint}>All-time bookings received</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Revenue</div>
            <div style={{ ...S.statValue, ...S.gradientText }}>
              KES {stats.revenue.toLocaleString()}
            </div>
            <div style={S.statHint}>From accepted bookings</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Rating</div>
            <div style={S.statValue}>{stats.rating.toFixed(1)}</div>
            <div style={S.statHint}>Average customer rating</div>
          </div>
        </div>

        {pendingBookings.length > 0 && (
          <>
            <h2 style={S.sectionTitle}>
              Pending Bookings ({pendingBookings.length})
            </h2>
            <div style={S.bookingList}>
              {pendingBookings.slice(0, 3).map((b) => (
                <div key={b.id} style={S.bookingCard}>
                  <div style={S.bookingHeader}>
                    <div>
                      <div style={S.bookingName}>
                        {b.customer_name || "Customer"}
                      </div>
                      <div style={S.bookingMeta}>
                        Event: {formatDate(b.event_date)} • KES{" "}
                        {(b.amount || 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  {b.message && (
                    <div style={S.bookingMessage}>"{b.message}"</div>
                  )}
                  <div style={S.bookingActions}>
                    <button onClick={() => handleAction(b.id, "rejected")} style={S.rejectBtn}>
                      Reject
                    </button>
                    <button onClick={() => handleAction(b.id, "accepted")} style={S.approveBtn}>
                      Accept →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 style={S.sectionTitle}>Quick Actions</h2>
        <div style={S.actionsGrid}>
          <Link to="/vendor/bookings" style={S.actionCard}>
            <div style={S.actionLabel}>Booking Requests</div>
            <div style={S.actionHint}>View all incoming bookings</div>
          </Link>
          <Link to="/vendor/profile/edit" style={S.actionCard}>
            <div style={S.actionLabel}>Edit Profile</div>
            <div style={S.actionHint}>Update your business details</div>
          </Link>
          <Link to="/vendors" style={S.actionCard}>
            <div style={S.actionLabel}>Browse Marketplace</div>
            <div style={S.actionHint}>See other vendors</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const S = {
  page: { minHeight: "100vh", background: "var(--bg)", padding: "40px 20px" },
  container: { maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "32px" },
  title: { fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--text)", marginBottom: "6px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" },
  statCard: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "28px", boxShadow: "var(--shadow)" },
  statLabel: { fontSize: "11px", fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "12px" },
  statValue: { fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--text)", marginBottom: "8px" },
  gradientText: { background: "linear-gradient(135deg,#3b82f6,#FF6B35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  statHint: { fontSize: "12px", color: "var(--muted)" },
  sectionTitle: { fontFamily: "var(--font-head)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "16px" },
  bookingList: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" },
  bookingCard: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" },
  bookingHeader: { marginBottom: "8px" },
  bookingName: { fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" },
  bookingMeta: { fontSize: "13px", color: "var(--muted)" },
  bookingMessage: { fontSize: "13px", color: "var(--text)", fontStyle: "italic", padding: "10px 14px", background: "var(--input-bg)", borderRadius: "10px", margin: "10px 0" },
  bookingActions: { display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" },
  approveBtn: { padding: "10px 20px", borderRadius: "100px", border: "none", background: "linear-gradient(135deg,#3b82f6,#FF6B35)", color: "#fff", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
  rejectBtn: { padding: "10px 20px", borderRadius: "100px", border: "1px solid var(--border)", background: "transparent", color: "var(--text)", fontWeight: 600, fontSize: "13px", cursor: "pointer" },
  actionsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" },
  actionCard: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "24px", textDecoration: "none", display: "block" },
  actionLabel: { fontFamily: "var(--font-head)", fontSize: "16px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" },
  actionHint: { fontSize: "12px", color: "var(--muted)" },
};

export default VendorDashboard;