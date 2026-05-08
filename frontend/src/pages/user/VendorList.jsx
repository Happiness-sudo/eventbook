import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVendors } from "../../services/api";
import VendorCard from "../../components/VendorCard";

const VendorList = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const categories = ["", "DJ", "Florist", "Photographer", "Catering", "Planner"];

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getVendors();
        const jsonVendors = res.data || [];

        const localRaw = localStorage.getItem("vendors");
        const localVendors = localRaw ? JSON.parse(localRaw) : [];

        setVendors([...jsonVendors, ...localVendors]);
      } catch (err) {
        try {
          const localRaw = localStorage.getItem("vendors");
          const localVendors = localRaw ? JSON.parse(localRaw) : [];
          if (localVendors.length > 0) {
            setVendors(localVendors);
          } else {
            setError("Could not load vendors. Please try again.");
          }
        } catch {
          setError("Could not load vendors. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const filteredVendors = category
    ? vendors.filter(
        (v) => v.category?.toLowerCase() === category.toLowerCase()
      )
    : vendors;

  const handleVendorClick = (vendor) => {
    navigate(`/vendors/${vendor.id}`);
  };

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Browse Vendors</h1>
          <p style={S.sub}>
            {filteredVendors.length}{" "}
            {filteredVendors.length === 1 ? "vendor" : "vendors"} available
          </p>
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={S.select}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c || "All Categories"}
            </option>
          ))}
        </select>
      </div>
      {loading && <p style={S.message}>Loading vendors...</p>}
      {error && <div style={S.error}>{error}</div>}
      {!loading && !error && filteredVendors.length === 0 && (
        <p style={S.message}>No vendors found in this category.</p>
      )}
      {!loading && !error && filteredVendors.length > 0 && (
        <div style={S.grid}>
          {filteredVendors.map((v) => (
            <VendorCard key={v.id} vendor={v} onView={handleVendorClick} />
          ))}
        </div>
      )}
    </div>
  );
};

const S = {
  page: { minHeight: "100vh", background: "var(--bg)", padding: "40px 32px", fontFamily: "system-ui, sans-serif" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" },
  title: { fontFamily: "var(--font-head)", fontSize: "32px", fontWeight: 800, color: "var(--text)", margin: 0 },
  sub: { fontSize: "13px", color: "var(--muted)", marginTop: "4px" },
  select: { padding: "10px 14px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minWidth: "180px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" },
  message: { fontSize: "15px", color: "var(--muted)", textAlign: "center", padding: "60px 0" },
  error: { fontSize: "13px", color: "#FF3D9A", background: "rgba(255,61,154,.1)", border: "1px solid rgba(255,61,154,.3)", padding: "12px 16px", borderRadius: "12px", marginBottom: "20px" },
};

export default VendorList;