import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditVendorProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    service: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingVendors =
      JSON.parse(localStorage.getItem("vendors")) || [];

    const newVendor = {
      id: Date.now().toString(),
      name: formData.name,
      service: formData.service,
      category: formData.service,
      location: formData.location,
      price: Number(formData.price),
      image: formData.image,
      description: formData.description,
      rating: 5,
    };

    existingVendors.push(newVendor);

    localStorage.setItem(
      "vendors",
      JSON.stringify(existingVendors)
    );

    alert("Vendor profile created successfully!");

    setFormData({
      name: "",
      service: "",
      location: "",
      price: "",
      image: "",
      description: "",
    });

    navigate("/vendor/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Create Vendor Profile
        </h1>

        <p style={styles.subtitle}>
          Add your business details so event
          organizers can find and book you.
        </p>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >
          <input
            type="text"
            name="name"
            placeholder="Business Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="service"
            placeholder="Service Type (DJ, Catering, Photography...)"
            value={formData.service}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="number"
            name="price"
            placeholder="Price in KSh"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Describe your services"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />

          <button
            type="submit"
            style={styles.button}
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
  },

  card: {
    width: "100%",
    maxWidth: "650px",
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "var(--shadow)",
  },

  title: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "10px",
    color: "var(--text)",
  },

  subtitle: {
    fontSize: "14px",
    color: "var(--muted)",
    marginBottom: "30px",
    lineHeight: 1.6,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
    fontSize: "14px",
    outline: "none",
  },

  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
    minHeight: "140px",
    fontSize: "14px",
    outline: "none",
    resize: "vertical",
  },

  button: {
    padding: "15px",
    borderRadius: "100px",
    border: "none",
    background:
      "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "white",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default EditVendorProfile;