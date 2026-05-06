import { Link, useNavigate } from "react-router-dom";

// swap for real import once AuthContext is on main:
// import { useAuth } from "../context/AuthContext";
const useAuth = () => ({ user: null, logout: () => {} });

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px",
    background: "#fff",
    borderBottom: "1px solid #e5e4e7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    fontFamily: "system-ui, sans-serif",
  };

  const brandStyle = {
    fontSize: "22px",
    fontWeight: 700,
    color: "#aa3bff",
    textDecoration: "none",
    letterSpacing: "-0.5px",
  };

  const linksContainer = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  };

  const linkStyle = {
    color: "#08060d",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
  };

  const buttonBase = {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    fontFamily: "inherit",
  };

  const primaryBtn = { ...buttonBase, background: "#aa3bff", color: "#fff" };
  const secondaryBtn = {
    ...buttonBase,
    background: "transparent",
    color: "#08060d",
    border: "1px solid #e5e4e7",
  };

  const greetingStyle = {
    fontSize: "14px",
    color: "#6b6375",
    fontWeight: 500,
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={brandStyle}>EventBook</Link>

      <div style={linksContainer}>
        <Link to="/vendors" style={linkStyle}>Browse Vendors</Link>

        {user?.role === "user" && (
          <>
            <Link to="/events/new" style={linkStyle}>Create Event</Link>
            <Link to="/my-events" style={linkStyle}>My Events</Link>
            <Link to="/my-bookings" style={linkStyle}>My Bookings</Link>
          </>
        )}

        {user?.role === "vendor" && (
          <Link to="/vendor/dashboard" style={linkStyle}>Vendor Dashboard</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin/dashboard" style={linkStyle}>Admin Dashboard</Link>
        )}
      </div>

      <div style={linksContainer}>
        {!user ? (
          <>
            <Link to="/login"><button style={secondaryBtn}>Login</button></Link>
            <Link to="/register"><button style={primaryBtn}>Register</button></Link>
          </>
        ) : (
          <>
            <span style={greetingStyle}>Hi, {user.name || "User"}</span>
            <button style={secondaryBtn} onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;