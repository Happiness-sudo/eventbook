import { useState } from "react";

function EditVendorProfile() {

  const [form, setForm] = useState({

    businessName: "",

    category: "",

    location: "",

    priceRange: "",

    image: "",

    description: "",

  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/vendors",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),

        }
      );

      const data = await response.json();

      alert(data.message);

    } catch (error) {

      alert("Server error");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Create Vendor Profile
        </h1>

        <p style={styles.subtitle}>
          Add your business details
        </p>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            name="businessName"
            placeholder="Business Name"
            value={form.businessName}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="priceRange"
            placeholder="Price Range"
            value={form.priceRange}
            onChange={handleChange}
            required
          />

          <input
            style={styles.input}
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          />

          <textarea
            style={styles.textarea}
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button
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

    background: "#050014",

    padding: "40px 20px",

  },

  card: {

    width: "100%",

    maxWidth: "650px",

    background: "rgba(255,255,255,0.03)",

    border: "1px solid rgba(255,255,255,0.08)",

    borderRadius: "24px",

    padding: "40px",

  },

  title: {

    fontSize: "42px",

    marginBottom: "10px",

    fontWeight: "700",

  },

  subtitle: {

    color: "#aaa",

    marginBottom: "30px",

  },

  input: {

    width: "100%",

    padding: "16px",

    marginBottom: "18px",

    borderRadius: "12px",

    border: "1px solid rgba(255,255,255,0.1)",

    background: "#0f001f",

    color: "white",

    fontSize: "15px",

  },

  textarea: {

    width: "100%",

    padding: "16px",

    minHeight: "140px",

    marginBottom: "18px",

    borderRadius: "12px",

    border: "1px solid rgba(255,255,255,0.1)",

    background: "#0f001f",

    color: "white",

    fontSize: "15px",

  },

  button: {

    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "999px",

    background:
      "linear-gradient(90deg,#ff0080,#ff5e00)",

    color: "white",

    fontSize: "16px",

    fontWeight: "700",

    cursor: "pointer",

  },

};

export default EditVendorProfile;