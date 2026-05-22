// Register.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://eventbook-08sq.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      if (data.user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/vendors");
      }

    } catch (err) {
      setError(
        "Server error. Make sure backend is running on port 5000"
      );
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.logo}>
          EventBook
        </h1>

        <h2 style={styles.title}>
          Create Account
        </h2>

        <p style={styles.subtitle}>
          Join EventBook today
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <div style={styles.roleContainer}>

          <button
            type="button"
            onClick={() => setRole("user")}
            style={{
              ...styles.roleButton,
              background:
                role === "user"
                  ? "#2563eb"
                  : "transparent",
            }}
          >
            Event Organizer
          </button>

          <button
            type="button"
            onClick={() => setRole("vendor")}
            style={{
              ...styles.roleButton,
              background:
                role === "vendor"
                  ? "#2563eb"
                  : "transparent",
            }}
          >
            Vendor
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
            required
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </button>

        </form>

        <p style={styles.footer}>
          Already have an account?{" "}

          <Link
            to="/login"
            style={styles.link}
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(0,0,0,0.7)",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
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

  roleContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  roleButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
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
    background: "rgba(255,0,0,0.15)",
    color: "#ff8080",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
    textAlign: "center",
  },
};

export default Register;