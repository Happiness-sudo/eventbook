import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try backend first
      const res = await loginUser(form);

      login(res.data.user, res.data.token);

      if (res.data.user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendors");
      }
    } catch (err) {
      // Fallback to locally registered account
      const savedUser = JSON.parse(localStorage.getItem("eb-user"));

      if (
        savedUser &&
        savedUser.email === form.email
      ) {
        login(savedUser, "fake-token");

        if (savedUser.role === "vendor") {
          navigate("/vendor/dashboard");
        } else if (savedUser.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/vendors");
        }
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <button onClick={toggleTheme} style={S.themeBtn}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={S.card}>
        <div style={S.logo}>EventBook</div>
        <h1 style={S.title}>Welcome back 👋</h1>
        <p style={S.sub}>Sign in to your EventBook account</p>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={S.field}>
            <label style={S.label}>Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              style={S.input}
            />
          </div>

          <div style={S.field}>
            <label style={S.label}>Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              style={S.input}
            />
          </div>

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={S.footer}>
          Don’t have an account?{" "}
          <Link to="/register" style={S.footerLink}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0d0221",
    padding: "40px",
  },
  themeBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "10px",
    cursor: "pointer",
  },
  card: {
    background: "#111",
    padding: "40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    color: "#fff",
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  sub: {
    marginBottom: "20px",
    color: "#aaa",
  },
  error: {
    color: "red",
    marginBottom: "15px",
  },
  field: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #333",
  },
  btn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#ff3d9a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
  },
  footerLink: {
    color: "#ff3d9a",
  },
};

export default Login;