import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorCard from "../../components/VendorCard";

function VendorMarketplace() {
  const navigate = useNavigate();

  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetch('http://localhost:5000/vendors') 
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => setVendors(data))
    .catch((err) => console.error("Error fetching vendors:", err));
}, []);

  const handleViewVendor = (vendor) => {
    navigate(`/vendors/${vendor.id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Vendors</h1>

      {loading ? (
        <p style={styles.empty}>Loading vendors...</p>
      ) : vendors.length === 0 ? (
        <p style={styles.empty}>
          No vendors available yet.
        </p>
      ) : (
        <div style={styles.grid}>
          {vendors.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onView={handleViewVendor}
            />
          ))}
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
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
    color: "var(--text)",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
  },

  empty: {
    color: "#aaa",
    marginTop: "20px",
  },
};

export default VendorMarketplace;