// Login.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://eventbook-08sq.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      login(data.user, data.token);

      if (data.user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/vendors");
      }
    } catch (err) {
      setError("Server error. Make sure backend is running.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h1 style={styles.logo}>EventBook</h1>

          <h2 style={styles.title}>Welcome Back</h2>

          <p style={styles.subtitle}>Login to continue</p>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />

            <button
              type="submit"
              style={styles.button}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={styles.footer}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundImage: "url('/auth-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(0,0,0,0.8)",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  logo: {
    color: "#2563eb",
    marginBottom: "10px",
    fontSize: "40px",
    fontWeight: "bold",
    textAlign: "center",
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "white",
    textAlign: "center",
  },

  subtitle: {
    color: "#b4b4c7",
    marginBottom: "25px",
    textAlign: "center",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.1)",
    color: "white",
    fontSize: "15px",
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footer: {
    marginTop: "20px",
    textAlign: "center",
    color: "#b4b4c7",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
  },

  error: {
    background: "rgba(255,0,0,0.2)",
    color: "#ff8080",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default Login;