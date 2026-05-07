import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    revenue: 0,
    rating: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const bookingsRes = await fetch(
          `http://localhost:5000/bookings?vendorId=${user?.id || ""}`
        );
        const bookings = await bookingsRes.json();

        const total = bookings.length;
        const revenue = bookings
          .filter((b) => b.status === "confirmed" || b.status === "completed")
          .reduce((sum, b) => sum + (Number(b.amount) || 0), 0);

        const vendorsRes = await fetch(
          `http://localhost:5000/vendors?userId=${user?.id || ""}`
        );
        const vendors = await vendorsRes.json();
        const rating = vendors[0]?.rating || 0;

        setStats({ totalBookings: total, revenue, rating });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    loadStats();
  }, [user]);

  return (
    <div style={S.page}>
      <div style={S.container}>
        <div style={S.header}>
          <h1 style={S.title}>Welcome back, {user?.name || "Vendor"} 👋</h1>
          <p style={S.sub}>Here's how your business is doing today</p>
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
            <div style={S.statHint}>From confirmed bookings</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Rating</div>
            <div style={S.statValue}>⭐ {stats.rating.toFixed(1)}</div>
            <div style={S.statHint}>Average customer rating</div>
          </div>
        </div>

        <h2 style={S.sectionTitle}>Quick Actions</h2>
        <div style={S.actionsGrid}>
          <Link to="/vendor/bookings" style={S.actionCard}>
            <div style={S.actionIcon}></div>
            <div style={S.actionLabel}>Booking Requests</div>
            <div style={S.actionHint}>View incoming bookings</div>
          </Link>
          <Link to="/vendor/profile/edit" style={S.actionCard}>
            <div style={S.actionIcon}></div>
            <div style={S.actionLabel}>Edit Profile</div>
            <div style={S.actionHint}>Update your details</div>
          </Link>
          <Link to="/vendor/services" style={S.actionCard}>
            <div style={S.actionIcon}></div>
            <div style={S.actionLabel}>Manage Services</div>
            <div style={S.actionHint}>Add or remove offerings</div>
          </Link>
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "32px",
    fontWeight: 800,
    color: "var(--text)",
    marginBottom: "6px",
  },
  sub: {
    fontSize: "14px",
    color: "var(--muted)",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  statCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "var(--shadow)",
  },
  statLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
  },
  statValue: {
    fontFamily: "var(--font-head)",
    fontSize: "32px",
    fontWeight: 800,
    color: "var(--text)",
    marginBottom: "8px",
  },
  gradientText: {
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  statHint: {
    fontSize: "12px",
    color: "var(--muted)",
  },
  sectionTitle: {
    fontFamily: "var(--font-head)",
    fontSize: "20px",
    fontWeight: 700,
    color: "var(--text)",
    marginBottom: "16px",
  },
  actionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  actionCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "24px",
    textDecoration: "none",
    display: "block",
  },
  actionIcon: {
    fontSize: "28px",
    marginBottom: "12px",
  },
  actionLabel: {
    fontFamily: "var(--font-head)",
    fontSize: "16px",
    fontWeight: 700,
    color: "var(--text)",
    marginBottom: "4px",
  },
  actionHint: {
    fontSize: "12px",
    color: "var(--muted)",
  },
};

export default VendorDashboard;