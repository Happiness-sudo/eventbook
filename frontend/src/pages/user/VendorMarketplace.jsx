import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorCard from "../../components/VendorCard";

function VendorMarketplace() {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data) => setVendors(data))
      .catch((err) => console.error("Error fetching vendors:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleViewVendor = (vendor) => {
    navigate(`/vendors/${vendor.id}`);
  };

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

  const filteredVendors = vendors
    .map((vendor, index) => {
      return {
        ...vendor,
        name: kenyanNames[index] || vendor.name,
        image_url: eventImages[index] || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500",
        price: mockPrices[index] || 20000,
        rating: mockRatings[index] || 4.2
      };
    })
    .filter((vendor) => {
      return vendor.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Vendors</h1>

      <input
        type="text"
        placeholder="Search Kenyan vendors (e.g. DJ, Sauti, Mwangi)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      {loading ? (
        <p style={styles.empty}>Loading vendors...</p>
      ) : filteredVendors.length === 0 ? (
        <p style={styles.empty}>
          No vendors found matching "{searchTerm}"
        </p>
      ) : (
        <div style={styles.grid}>
          {filteredVendors.map((vendor) => (
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
    marginBottom: "20px",
    color: "var(--text)",
  },
  searchInput: {
    width: "100%",
    maxWidth: "500px",
    padding: "14px 18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.4)",
    color: "white",
    fontSize: "16px",
    marginBottom: "35px",
    outline: "none",
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