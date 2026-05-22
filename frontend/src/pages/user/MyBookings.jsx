import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://eventbook-08sq.onrender.com";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/bookings`, {
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
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

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
        <h1 style={S.title}>My Bookings</h1>
        <p style={S.subtitle}>Your booking history with various vendors.</p>

        {loading ? (
          <div style={S.empty}>Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={S.empty}>
            You haven't booked any vendors yet.{" "}
            <Link to="/vendors" style={S.link}>Browse vendors</Link> to get started.
          </div>
        ) : (
          <div style={S.list}>
            {bookings.map((b) => (
              <div key={b.id} style={S.card}>
                <div style={S.cardContent}>
                  {b.vendor_image && (
                    <img src={b.vendor_image} alt={b.vendor_name} style={S.image} />
                  )}
                  <div style={S.info}>
                    <div style={S.category}>{b.vendor_category || "Vendor"}</div>
                    <h3 style={S.vendorName}>{b.vendor_name}</h3>
                    <div style={S.meta}>
                      Event: {formatDate(b.event_date)} • KES{" "}
                      {(b.amount || 0).toLocaleString()}
                    </div>
                    {b.message && (
                      <div style={S.message}>"{b.message}"</div>
                    )}
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
  title: { fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--text)", marginBottom: "6px" },
  subtitle: { fontSize: "14px", color: "var(--muted)", marginBottom: "24px" },
  empty: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "40px", textAlign: "center", color: "var(--muted)", fontSize: "14px" },
  link: { color: "#3b82f6", textDecoration: "none", fontWeight: 600 },
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  card: { background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "20px" },
  cardContent: { display: "flex", gap: "16px", alignItems: "flex-start" },
  image: { width: "80px", height: "80px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 },
  info: { flex: 1 },
  category: { fontSize: "11px", fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" },
  vendorName: { fontFamily: "var(--font-head)", fontSize: "18px", fontWeight: 700, color: "var(--text)", marginBottom: "4px", marginTop: 0 },
  meta: { fontSize: "13px", color: "var(--muted)", marginBottom: "8px" },
  message: { fontSize: "13px", color: "var(--text)", fontStyle: "italic", padding: "8px 12px", background: "var(--input-bg)", borderRadius: "10px", marginTop: "8px" },
  badge: { padding: "4px 12px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", flexShrink: 0, alignSelf: "flex-start" },
  badgePending: { background: "rgba(255,193,7,0.15)", color: "#FFC107" },
  badgeAccepted: { background: "rgba(76,175,80,0.15)", color: "#4CAF50" },
  badgeRejected: { background: "rgba(244,67,54,0.15)", color: "#F44336" },
};

export default MyBookings;