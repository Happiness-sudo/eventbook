import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const API_URL = "http://localhost:5000";

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

  // Find the JWT token in localStorage
  const getToken = () => {
    const direct = localStorage.getItem("token");
    if (direct) return direct;

    const userObj = JSON.parse(localStorage.getItem("user") || "{}");
    return userObj.token || null;
  };

  useEffect(() => {
    fetch(`${API_URL}/api/vendors/${id}`)
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

    const token = getToken();

    if (!token) {
      setBookingStatus("Please log in to book a vendor.");
      navigate("/login");
      return;
    }

    try {
      const booking = {
        vendor_id: vendor.id,
        event_date: bookingDate,
        message,
      };

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(booking),
      });

      const data = await res.json();

      if (!res.ok) {
        setBookingStatus(data.error || "Could not send booking. Try again.");
        return;
      }

      setBookingStatus("Booking sent! The vendor will review it.");
      setShowForm(false);
      setBookingDate("");
      setMessage("");
    } catch (err) {
      setBookingStatus("Could not reach the server. Try again.");
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
        <Link to="/vendors" style={S.backBtn}>← Back to Vendors</Link>
        <div style={S.error}>{error}</div>
      </div>
    );

  // Backend returns businessName + priceRange from get_vendor_by_id,
  // but to_dict elsewhere uses name + price — handle both
  const vendorName = vendor.businessName || vendor.name || "";
  const vendorPrice = vendor.priceRange ?? vendor.price ?? 0;

  return (
    <div style={S.page}>
      <Link to="/vendors" style={S.backBtn}>← Back to Vendors</Link>

      <div style={S.card}>
        {vendor.image && (
          <img src={vendor.image} alt={vendorName} style={S.image} />
        )}
        <div style={S.body}>
          <div style={S.category}>{vendor.category}</div>
          <h1 style={S.title}>{vendorName}</h1>
          <p style={S.location}>📍 {vendor.location || "Kenya"}</p>

          <div style={S.metaRow}>
            <span style={S.rating}>⭐ {vendor.rating?.toFixed(1) || "0.0"}</span>
            <span style={S.price}>
              KES {Number(vendorPrice).toLocaleString()}
            </span>
          </div>

          <p style={S.description}>
            {vendor.description ||
              "Professional services for your special events."}
          </p>

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