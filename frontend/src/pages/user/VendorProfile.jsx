import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const VendorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const vendors =
      JSON.parse(localStorage.getItem("vendors")) || [];

    const foundVendor = vendors.find(
      (v) => String(v.id) === String(id)
    );

    if (foundVendor) {
      setVendor(foundVendor);
    } else {
      setError("Vendor not found.");
    }

    setLoading(false);
  }, [id]);

  const handleBook = async () => {
    if (!bookingName || !bookingEmail) {
      alert("Please enter your name and email.");
      return;
    }

    setSending(true);

    try {
      await emailjs.send(
        "service_x5lvidl",
        "template_eb0ilye",
        {
          user_name: bookingName,
          user_email: bookingEmail,
          vendor_name: vendor.name,
          vendor_service:
            vendor.service || vendor.category,
          vendor_location: vendor.location,
          vendor_price: vendor.price,
        },
        "zOnChD6Ty4Bvo1O24"
      );

      const existingBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      const newBooking = {
        id: Date.now().toString(),
        customerName: bookingName,
        customerEmail: bookingEmail,
        vendorId: vendor.id,
        vendorName: vendor.name,
        service:
          vendor.service || vendor.category,
        price: vendor.price,
        location: vendor.location,
        status: "Pending",
      };

      localStorage.setItem(
        "bookings",
        JSON.stringify([
          ...existingBookings,
          newBooking,
        ])
      );

      alert(
        "Booking successful! Confirmation email sent."
      );

      setBookingName("");
      setBookingEmail("");
    } catch (err) {
      console.error(err);

      alert(
        "Booking saved, but email failed."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={S.page}>
        <p style={S.message}>
          Loading vendor details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={S.page}>
        <button
          style={S.backBtn}
          onClick={() => navigate("/vendors")}
        >
          ← Back to Vendors
        </button>

        <div style={S.error}>
          {error}
        </div>
      </div>
    );
  }

  if (!vendor) return null;

  const formattedPrice = Number(
    vendor.price
  ).toLocaleString();

  return (
    <div style={S.page}>
      <button
        style={S.backBtn}
        onClick={() => navigate("/vendors")}
      >
        ← Back to Vendors
      </button>

      <div style={S.card}>
        <img
          src={
            vendor.image ||
            "https://via.placeholder.com/800x400?text=No+Image"
          }
          alt={vendor.name}
          style={S.heroImage}
        />

        <div style={S.body}>
          <span style={S.category}>
            {vendor.category ||
              vendor.service}
          </span>

          <h1 style={S.name}>
            {vendor.name}
          </h1>

          <div style={S.metaRow}>
            <span style={S.meta}>
              {vendor.location}
            </span>

            <span style={S.meta}>
              ★ {vendor.rating || 5} / 5
            </span>
          </div>

          <p style={S.description}>
            {vendor.description}
          </p>

          <div style={S.priceBox}>
            <div>
              <p style={S.priceLabel}>
                Starting from
              </p>

              <p style={S.price}>
                KES {formattedPrice}
              </p>
            </div>

            <div style={S.bookingBox}>
              <input
                type="text"
                placeholder="Your Name"
                value={bookingName}
                onChange={(e) =>
                  setBookingName(
                    e.target.value
                  )
                }
                style={S.input}
              />

              <input
                type="email"
                placeholder="Your Email"
                value={bookingEmail}
                onChange={(e) =>
                  setBookingEmail(
                    e.target.value
                  )
                }
                style={S.input}
              />

              <button
                style={S.bookBtn}
                onClick={handleBook}
                disabled={sending}
              >
                {sending
                  ? "Sending..."
                  : "Book Now →"}
              </button>
            </div>
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
    marginBottom: "20px",
  },

  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    overflow: "hidden",
    maxWidth: "900px",
    margin: "0 auto",
    boxShadow: "var(--shadow)",
  },

  heroImage: {
    width: "100%",
    height: "320px",
    objectFit: "cover",
  },

  body: {
    padding: "32px",
  },

  category: {
    fontSize: "11px",
    fontWeight: 700,
    color: "#FF3D9A",
    textTransform: "uppercase",
  },

  name: {
    fontSize: "30px",
    fontWeight: 800,
    color: "var(--text)",
    margin: "10px 0",
  },

  metaRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },

  meta: {
    fontSize: "14px",
    color: "var(--muted)",
  },

  description: {
    fontSize: "15px",
    lineHeight: 1.7,
    color: "var(--text)",
    marginBottom: "24px",
  },

  priceBox: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    borderTop: "1px solid var(--border)",
    paddingTop: "24px",
  },

  priceLabel: {
    fontSize: "12px",
    color: "var(--muted)",
    textTransform: "uppercase",
  },

  price: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#FF3D9A",
  },

  bookingBox: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
    fontSize: "14px",
  },

  bookBtn: {
    padding: "14px 28px",
    borderRadius: "100px",
    border: "none",
    background:
      "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },

  message: {
    textAlign: "center",
    color: "var(--muted)",
    padding: "60px 0",
  },

  error: {
    color: "#FF3D9A",
    background: "rgba(255,61,154,.1)",
    padding: "14px",
    borderRadius: "12px",
    maxWidth: "500px",
  },
};

export default VendorProfile;