// admin page
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <p>Manage users, vendors, and bookings from here.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/vendors">Vendors</Link>
        <Link to="/admin/bookings">Bookings</Link>
      </div>
    </div>
  );
}

export default AdminDashboard;