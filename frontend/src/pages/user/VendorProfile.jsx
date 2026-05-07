import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVendorById } from "../../services/api";

const VendorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVendor = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getVendorById(id);
        setVendor(res.data);
      } catch (err) {
        setError("Could not load vendor. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
  }, [id]);

  const handleBook = () => {
    alert(`Booking flow for ${vendor?.name} - coming soon!`);
  };

  if (loading) {
    return (
      <div style={S.page}>
        <p style={S.message}>Loading vendor details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={S.page}>
        <button style={S.backBtn} onClick={() => navigate("/vendors")}>
          ← Back to Vendors
        </button>
        <div style={S.error}>{error}</div>
      </div>
    );
  }

  if (!vendor) return null;

  const formattedPrice = Number(vendor.price).toLocaleString();

  return (
    <div style={S.page}>
      <button style={S.backBtn} onClick={() => navigate("/vendors")}>
        ← Back to Vendors
      </button>

      <div style={S.card}>
        <img
          src={vendor.image || "https://via.placeholder.com/800x400?text=No+Image"}
          alt={vendor.name}
          style={S.heroImage}
        />

        <div style={S.body}>
          <span style={S.category}>{vendor.category}</span>
          <h1 style={S.name}>{vendor.name}</h1>

          <div style={S.metaRow}>
            <span style={S.meta}>{vendor.location}</span>
            <span style={S.meta}>★ {vendor.rating} / 5</span>
          </div>

          <p style={S.description}>{vendor.description}</p>

          <div style={S.priceBox}>
            <div>
              <p style={S.priceLabel}>Starting from</p>
              <p style={S.price}>KES {formattedPrice}</p>
            </div>
            <button style={S.bookBtn} onClick={handleBook}>
              Book Now →
            </button>
          </div>
        </div>
      </div>
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
  backBtn: {
    background: "transparent",
    border: "1px solid var(--border)",
    color: "var(--text)",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    marginBottom: "20px",
  },
  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    overflow: "hidden",
    maxWidth: "800px",
    margin: "0 auto",
    boxShadow: "var(--shadow)",
  },
  heroImage: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
    background: "var(--input-bg)",
  },
  body: { padding: "32px" },
  category: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#FF3D9A",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  name: {
    fontFamily: "var(--font-head)",
    fontSize: "28px",
    fontWeight: 800,
    color: "var(--text)",
    margin: "8px 0 16px",
  },
  metaRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  meta: {
    fontSize: "14px",
    color: "var(--muted)",
    fontWeight: 500,
  },
  description: {
    fontSize: "14px",
    color: "var(--text)",
    lineHeight: 1.6,
    marginBottom: "24px",
  },
  priceBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "1px solid var(--border)",
    flexWrap: "wrap",
    gap: "16px",
  },
  priceLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  price: {
    fontSize: "24px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "4px 0 0",
  },
  bookBtn: {
    padding: "14px 28px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  message: {
    fontSize: "15px",
    color: "var(--muted)",
    textAlign: "center",
    padding: "60px 0",
  },
  error: {
    fontSize: "13px",
    color: "#FF3D9A",
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px",
    maxWidth: "600px",
  },
};

export default VendorProfile;