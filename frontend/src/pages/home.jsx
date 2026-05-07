import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>EventBook 🎉</h1>

        <p style={styles.text}>
          Welcome to EventBook — your all-in-one platform to find vendors,
          book services, and manage events easily.
        </p>

        <div style={styles.buttons}>
          <Link to="/login" style={styles.login}>
            Login
          </Link>

          <Link to="/register" style={styles.register}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    color: "white",
  },

  card: {
    width: "400px",
    padding: "40px",
    borderRadius: "16px",
    background: "#111827",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "20px",
  },

  text: {
    fontSize: "14px",
    color: "#cbd5e1",
    marginBottom: "30px",
  },

  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },

  login: {
    padding: "10px 20px",
    border: "1px solid white",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
  },

  register: {
    padding: "10px 20px",
    background: "#ff4d6d",
    borderRadius: "8px",
    color: "white",
    textDecoration: "none",
  },
};