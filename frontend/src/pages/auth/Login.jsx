import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const users =
        JSON.parse(localStorage.getItem("eventbook-users")) || [];

      const foundUser = users.find(
        (u) =>
          u.email === form.email &&
          u.password === form.password
      );

      if (!foundUser) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "eventbook-current-user",
        JSON.stringify(foundUser)
      );

      if (foundUser.role === "vendor") {
        navigate("/vendor/profile/edit");
      } else if (foundUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendors");
      }

    } catch (err) {
      setError("Login failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.logo}>EventBook</h1>

        <h2 style={styles.title}>Welcome Back</h2>

        <p style={styles.subtitle}>
          Login to continue
        </p>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
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
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
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
    background:
      "linear-gradient(to bottom right, #050014, #140028)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "rgba(255,255,255,0.06)",
    padding: "40px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },

  logo: {
    color: "#ff1493",
    marginBottom: "10px",
    fontSize: "40px",
    fontWeight: "bold",
  },

  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#b4b4c7",
    marginBottom: "25px",
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
    background: "#ff1493",
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
    color: "#ff1493",
    textDecoration: "none",
  },

  error: {
    background: "rgba(255,0,0,0.15)",
    color: "#ff8080",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};

export default Login;