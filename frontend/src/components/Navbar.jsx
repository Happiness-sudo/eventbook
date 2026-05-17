import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={S.nav}>
      <Link to="/" style={S.brand}>EventBook</Link>

      <div style={S.links}>
        <Link to="/vendors" style={S.link}>Browse Vendors</Link>

        {user?.role === "user" && (
          <>
            <Link to="/create-event" style={S.link}>Create Event</Link>
            <Link to="/my-events" style={S.link}>My Events</Link>
            <Link to="/my-bookings" style={S.link}>My Bookings</Link>
          </>
        )}

        {user?.role === "vendor" && (
          <Link to="/vendor/dashboard" style={S.link}>Vendor Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/dashboard" style={S.link}>Admin Dashboard</Link>
        )}
      </div>

      <div style={S.right}>
        {!user ? (
          <>
            <Link to="/login" style={S.linkBtn}>Login</Link>
            <Link to="/register" style={S.primaryBtn}>Register</Link>
          </>
        ) : (
          <>
            <span style={S.greeting}>Hi, {user.name || "User"}</span>
            <button style={S.linkBtn} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

const S = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    background: "var(--card-bg)",
    borderBottom: "1px solid var(--border)",
    fontFamily: "system-ui, sans-serif",
  },
  brand: {
    fontFamily: "var(--font-head)",
    fontSize: "20px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  },
  link: {
    color: "var(--text)",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  right: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  linkBtn: {
    padding: "8px 16px",
    borderRadius: "100px",
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--text)",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    textDecoration: "none",
    display: "inline-block",
  },
  primaryBtn: {
    padding: "8px 18px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
  },
  greeting: {
    fontSize: "13px",
    color: "var(--muted)",
    fontWeight: 600,
  },
};

export default Navbar;
