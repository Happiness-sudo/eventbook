import { useNavigate } from "react-router-dom";
import VendorCard from "../../components/VendorCard";

function VendorMarketplace() {
  const navigate = useNavigate();

  const vendors =
    JSON.parse(localStorage.getItem("vendors")) || [];

  const handleViewVendor = (vendor) => {
    navigate(`/vendors/${vendor.id}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Vendors</h1>

      {vendors.length === 0 ? (
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
  },

  title: {
    fontSize: "32px",
    marginBottom: "30px",
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