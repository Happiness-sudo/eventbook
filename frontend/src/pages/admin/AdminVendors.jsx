// admin page
import { useState } from "react";

function AdminVendors() {
  const [vendors, setVendors] = useState([
    { id: 1, name: "DJ Mo", approved: false },
    { id: 2, name: "PhotoPro", approved: true }
  ]);

  const toggleApproval = (id) => {
    const updated = vendors.map((v) =>
      v.id === id ? { ...v, approved: !v.approved } : v
    );
    setVendors(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Vendors</h2>

      {vendors.map((vendor) => (
        <div key={vendor.id} style={{ marginBottom: "10px" }}>
          <span>{vendor.name}</span>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => toggleApproval(vendor.id)}
          >
            {vendor.approved ? "Unapprove" : "Approve"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminVendors;