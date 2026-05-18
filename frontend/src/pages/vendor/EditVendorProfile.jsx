import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

function EditVendorProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Try to find the JWT token in localStorage under common names
  const getToken = () => {
    const direct = localStorage.getItem("token");
    if (direct) return direct;

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user.token || null;
  };

  // Load existing profile when the page opens
  useEffect(() => {
    const loadProfile = async () => {
      const token = getToken();

      if (!token) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/vendors/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setForm({
            name: data.name || "",
            category: data.category || "",
            location: data.location || "",
            price: data.price || "",
            image: data.image || "",
            description: data.description || "",
          });
        }
      } catch (err) {
        console.log("Could not load existing profile:", err);
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = getToken();

    if (!token) {
      alert("Please log in first.");
      navigate("/login");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/vendors/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save profile");
        return;
      }

      alert("Profile saved successfully!");
      navigate("/vendor/dashboard");
    } catch (error) {
      console.log("Error:", error);
      alert("Could not reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={styles.page}>
        <p style={{ color: "white" }}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.blob1}></div>
      <div style={styles.blob2}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>Edit Vendor Profile ✨</h1>

        <p style={styles.subtitle}>
          Update your business details so event organizers can discover and book you.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Business Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="category"
            placeholder="Category (DJ, Catering, Photography...)"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="number"
            name="price"
            placeholder="Price (e.g. 5000)"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Describe your business..."
            value={form.description}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#050014,#120024,#1f0038)",
    padding: "40px 20px",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },
  blob1: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "#ff0080",
    borderRadius: "50%",
    filter: "blur(120px)",
    top: "-50px",
    right: "-50px",
    opacity: 0.25,
  },
  blob2: {
    position: "absolute",
    width: "250px",
    height: "250px",
    background: "#4361EE",
    borderRadius: "50%",
    filter: "blur(120px)",
    bottom: "-50px",
    left: "-50px",
    opacity: 0.25,
  },
  card: {
    width: "100%",
    maxWidth: "680px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "28px",
    padding: "45px",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
  },
  title: {
    fontSize: "40px",
    marginBottom: "10px",
    fontWeight: "800",
    background: "linear-gradient(90deg,#ff0080,#ff7b00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    color: "#cfcfcf",
    marginBottom: "30px",
    fontSize: "15px",
    lineHeight: 1.6,
  },
  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "16px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "16px",
    marginBottom: "18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.04)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "16px",
    border: "none",
    borderRadius: "999px",
    background: "linear-gradient(90deg,#ff0080,#ff5e00)",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(255,94,0,0.35)",
  },
};

export default EditVendorProfile;