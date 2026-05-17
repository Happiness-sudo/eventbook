import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const VendorProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/vendors/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((data) => {
        setVendor(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Vendor not found.");
        setLoading(false);
      });
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    setBookingStatus("");

    try {
      const booking = {
        vendorId: vendor.id,
        userId: user?.id || 1,
        userName: user?.name || "Guest",
        eventDate: bookingDate,
        message,
        amount: vendor.price || 0,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (!res.ok) throw new Error("Failed");

      setBookingStatus("✅ Booking sent! The vendor will review it.");
      setShowForm(false);
      setBookingDate("");
      setMessage("");
    } catch (err) {
      setBookingStatus("Could not send booking. Try again.");
    }
  };

  if (loading)
    return (
      <div style={S.page}>
        <div style={S.loading}>Loading vendor...</div>
      </div>
    );

  if (error)
    return (
      <div style={S.page}>
        <Link to="/api/vendors" style={S.backBtn}>← Back to Vendors</Link>
        <div style={S.error}>{error}</div>
      </div>
    );

  return (
    <div style={S.page}>
      <Link to="/api/vendors" style={S.backBtn}>← Back to Vendors</Link>

      <div style={S.card}>
        {vendor.image && (
          <img src={vendor.image} alt={vendor.name} style={S.image} />
        )}
        <div style={S.body}>
          <div style={S.category}>{vendor.category}</div>
          <h1 style={S.title}>{vendor.name}</h1>
          <p style={S.location}>📍 {vendor.location || "Kenya"}</p>

          <div style={S.metaRow}>
            <span style={S.rating}>⭐ {vendor.rating?.toFixed(1) || "0.0"}</span>
            <span style={S.price}>
              KES {(vendor.price || 0).toLocaleString()}
            </span>
          </div>

          <p style={S.description}>
            {vendor.description ||
              "Professional services for your special events."}
          </p>

          {vendor.services && vendor.services.length > 0 && (
            <>
              <div style={S.label}>Services Offered</div>
              <ul style={S.serviceList}>
                {vendor.services.map((s, i) => (
                  <li key={i} style={S.serviceItem}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {bookingStatus && <div style={S.statusMsg}>{bookingStatus}</div>}

          {!showForm ? (
            <button onClick={() => setShowForm(true)} style={S.bookBtn}>
              Book This Vendor →
            </button>
          ) : (
            <form onSubmit={handleBook} style={S.form}>
              <div style={S.field}>
                <label style={S.label}>Event Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  style={S.input}
                />
              </div>
              <div style={S.field}>
                <label style={S.label}>Message to Vendor</label>
                <textarea
                  placeholder="Tell them about your event..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  style={{ ...S.input, minHeight: "80px" }}
                />
              </div>
              <div style={S.formActions}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={S.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" style={S.bookBtn}>
                  Send Booking →
                </button>
              </div>
            </form>
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
    padding: "24px 20px 60px",
  },
  backBtn: {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "100px",
    border: "1px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "20px",
  },
  loading: {
    color: "var(--muted)",
    fontSize: "14px",
    textAlign: "center",
    padding: "60px",
  },
  error: {
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    color: "#FF3D9A",
    padding: "16px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: 600,
  },
  card: {
    maxWidth: "720px",
    margin: "0 auto",
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "var(--shadow)",
  },
  image: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    display: "block",
  },
  body: {
    padding: "32px",
  },
  category: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#FF3D9A",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "28px",
    fontWeight: 800,
    color: "var(--text)",
    marginBottom: "6px",
  },
  location: {
    fontSize: "14px",
    color: "var(--muted)",
    marginBottom: "16px",
  },
  metaRow: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "20px",
  },
  rating: {
    fontSize: "14px",
    fontWeight: 600,
    color: "var(--text)",
  },
  price: {
    fontFamily: "var(--font-head)",
    fontSize: "20px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    fontSize: "14px",
    color: "var(--muted)",
    lineHeight: 1.6,
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
  },
  serviceList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 24px",
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  serviceItem: {
    padding: "6px 14px",
    borderRadius: "100px",
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
    fontSize: "12px",
    color: "var(--text)",
  },
  statusMsg: {
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    color: "#FF3D9A",
    padding: "10px 14px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "16px",
  },
  bookBtn: {
    padding: "14px 28px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
  cancelBtn: {
    padding: "14px 28px",
    borderRadius: "100px",
    border: "1px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
  form: {
    background: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "24px",
    marginTop: "12px",
  },
  field: {
    marginBottom: "16px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--card-bg)",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
};

export default VendorProfile;