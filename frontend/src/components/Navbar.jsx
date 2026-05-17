import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>EventBook</h1>

      <div style={styles.links}>
        {/* ONLY SHOW AFTER LOGIN */}
        {user && (
          <>
            <Link to="/vendors" style={styles.link}>
              Browse Vendors
            </Link>

            {user.role === "vendor" && (
              <Link
                to="/vendor/dashboard"
                style={styles.link}
              >
                Vendor Dashboard
              </Link>
            )}
          </>
        )}
      </div>

      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.user}>
              Hi, {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={styles.logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>

            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    background: "#140021",
    borderBottom: "1px solid #2d1b45",
  },

  logo: {
    color: "#ff2e88",
    fontSize: "32px",
    fontWeight: "800",
  },

  links: {
    display: "flex",
    gap: "20px",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  },

  user: {
    color: "#ccc",
  },

  logout: {
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    background: "#ff2e88",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Navbar;