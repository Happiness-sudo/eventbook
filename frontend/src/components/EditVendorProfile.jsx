import { useState } from "react";

function EditVendorProfile() {
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

    existingVendors.push(formData);

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
  };

  return (
    <div style={styles.container}>
      <h1>Create Vendor Profile</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
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
          placeholder="Service Type"
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

        <button type="submit" style={styles.button}>
          Save Profile
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  textarea: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    minHeight: "120px",
  },
  button: {
    padding: "14px",
    background: "#ff4d6d",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default EditVendorProfile;