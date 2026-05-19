import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VendorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const kenyanNames = [
    "DJ Joe Mfalme",
    "Sauti Sound Systems",
    "Nairobi Catering Experts",
    "Mwangi Photography",
    "Binti Decor & Events",
    "DJ Creme De La Creme",
    "Safari Lights & Stages",
    "Otieno Security & Protocol",
    "Coastal Bites Catering",
    "Wanjiku Luxury Wedding Planners"
  ];

  const eventImages = [
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555244162-803834f70033?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1487180142328-0c4e37023af5?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=500&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80"
  ];

  const mockPrices = [45000, 80000, 120000, 35000, 65000, 50000, 95000, 25000, 55000, 150000];
  const mockRatings = [4.9, 4.8, 4.7, 4.9, 4.6, 4.8, 4.7, 4.5, 4.6, 5.0];

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Vendor not found");
        return res.json();
      })
      .then((data) => {
        const index = parseInt(id) - 1;
        const localizedVendor = {
          ...data,
          name: kenyanNames[index] || data.name,
          image_url: eventImages[index] || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
          price: mockPrices[index] || 20000,
          rating: mockRatings[index] || 4.2
        };
        setVendor(localizedVendor);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus("");

    const bookingData = {
      vendor_id: parseInt(id),
      event_date: eventDate,
      message: message
    };

    fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Could not reach the server. Try again.");
        return res.json();
      })
      .then(() => {
        setBookingStatus("success");
        setTimeout(() => {
          setShowModal(false);
          setEventDate("");
          setMessage("");
          setBookingStatus("");
        }, 2000);
      })
      .catch((err) => {
        setBookingStatus("error");
        console.error(err);
      });
  };

  if (loading) return <div style={styles.container}>Loading profile...</div>;
  if (!vendor) return <div style={styles.container}>Vendor not found</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/vendors")} style={styles.backBtn}>
        ← Back to Vendors
      </button>
      
      <div style={styles.profileCard}>
        <img src={vendor.image_url} alt={vendor.name} style={styles.avatar} />
        <span style={styles.tag}>General</span>
        <h2 style={styles.name}>{vendor.name}</h2>
        <p style={styles.location}> Kenya</p>
        <p style={styles.desc}>Professional services for your special events.</p>
        
        <div style={styles.stats}>
          <span>★ {vendor.rating}</span>
          <span style={styles.price}>KES {vendor.price.toLocaleString()}</span>
        </div>

        <button onClick={() => setShowModal(true)} style={styles.bookBtn}>
          Book Now
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalTitle}>Book {vendor.name}</h3>
            
            {bookingStatus === "success" && (
              <p style={{ color: "#10b981", marginBottom: "15px" }}>Booking sent successfully!</p>
            )}
            {bookingStatus === "error" && (
              <p style={{ color: "#ef4444", marginBottom: "15px" }}>Could not reach the server. Try again.</p>
            )}

            <form onSubmit={handleBookingSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>EVENT DATE</label>
                <input 
                  type="date" 
                  required 
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  style={styles.input} 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>MESSAGE TO VENDOR</label>
                <textarea 
                  rows="4" 
                  required
                  placeholder="hey"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Send Booking →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    color: "white",
    minHeight: "100vh",
    background: "var(--bg)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  backBtn: {
    alignSelf: "flex-start",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  profileCard: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    padding: "30px",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
    boxShadow: "var(--shadow)"
  },
  avatar: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    borderRadius: "16px",
    marginBottom: "20px"
  },
  tag: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#3b82f6",
    textTransform: "uppercase"
  },
  name: {
    fontSize: "28px",
    margin: "10px 0 5px"
  },
  location: {
    color: "var(--muted)",
    fontSize: "14px",
    marginBottom: "15px"
  },
  desc: {
    fontSize: "16px",
    marginBottom: "25px"
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "20px",
    paddingTop: "20px",
    borderTop: "1px solid var(--border)",
    marginBottom: "25px"
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
    background: "linear-gradient(135deg,#3b82f6,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  bookBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #FF6B35)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modalContent: {
    background: "#18181b",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "24px",
    padding: "30px",
    width: "90%",
    maxWidth: "500px",
    color: "white"
  },
  modalTitle: {
    fontSize: "22px",
    marginBottom: "20px",
    fontWeight: "700"
  },
  formGroup: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left"
  },
  label: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#a1a1aa",
    marginBottom: "8px",
    letterSpacing: "0.5px"
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "15px",
    outline: "none"
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    resize: "none"
  },
  modalActions: {
    display: "flex",
    gap: "12px",
    marginTop: "10px"
  },
  cancelBtn: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "15px"
  },
  submitBtn: {
    flex: 2,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #FF6B35)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "15px"
  }
};

export default VendorProfile;