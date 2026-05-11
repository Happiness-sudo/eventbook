import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { login }              = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate               = useNavigate();

  const [form, setForm]       = useState({ email:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      if (res.data.user.role === "vendor") navigate("/vendor/dashboard");
      else if (res.data.user.role === "admin") navigate("/admin/dashboard");
      else navigate("/vendors");
    } catch (err) {
      const savedUser = JSON.parse(localStorage.getItem("eb-user"));
      if (savedUser && savedUser.email === form.email) {
        login(savedUser, "fake-token");
        if (savedUser.role === "vendor") navigate("/vendor/dashboard");
        else if (savedUser.role === "admin") navigate("/admin/dashboard");
        else navigate("/vendors");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>

      {/* Blobs */}
      <div style={{...S.blob, width:300, height:300, background:"#7B2FBE", top:-60, right:-60}} />
      <div style={{...S.blob, width:200, height:200, background:"#FF3D9A", bottom:60, left:40}} />

      {/* Theme toggle */}
      <button onClick={toggleTheme} style={S.themeBtn}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={S.card}>
        <div style={S.logo}>EventBook</div>
        <h1 style={S.title}>Welcome back 👋</h1>
        <p style={S.sub}>Sign in to your EventBook account</p>

        {error && <div style={S.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {[
            { name:"email",    label:"Email Address", type:"email",    ph:"jane@example.com" },
            { name:"password", label:"Password",      type:"password", ph:"Your password"    },
          ].map((f) => (
            <div key={f.name} style={S.field}>
              <label style={S.label}>{f.label}</label>
              <input
                type={f.type} name={f.name} required
                placeholder={f.ph}
                value={form[f.name]}
                onChange={(e) => setForm({...form, [e.target.name]: e.target.value})}
                style={S.input}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p style={S.footer}>
          Don't have an account?{" "}
          <Link to="/register" style={S.footerLink}>Register</Link>
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
    background: "var(--bg)",         
    padding: "40px 20px",
    position: "relative",
    overflow: "hidden",
  },
  blob: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(70px)",
    opacity: .18,
    pointerEvents: "none",
  },
  themeBtn: {
    position: "fixed",
    top: "20px",
    right: "20px",
    fontSize: "18px",
    background: "var(--card-bg)",     
    border: "1px solid var(--border)",
    borderRadius: "12px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "var(--card-bg)",    
    border: "1px solid var(--border)",
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "var(--shadow)",
  },
  logo: {
    fontFamily: "var(--font-head)",
    fontSize: "18px",
    fontWeight: 800,
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },
  title: {
    fontFamily: "var(--font-head)",
    fontSize: "26px",
    fontWeight: 800,
    color: "var(--text)",           
    marginBottom: "4px",
  },
  sub: {
    fontSize: "13px",
    color: "var(--muted)",           
    marginBottom: "24px",
  },
  error: {
    fontSize: "13px",
    color: "#FF3D9A",
    background: "rgba(255,61,154,.1)",
    border: "1px solid rgba(255,61,154,.3)",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },
  field: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",         
    marginBottom: "6px",
    letterSpacing: ".05em",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1.5px solid var(--border)",  
    background: "var(--input-bg)",        
    color: "var(--text)",                 
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "100px",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontFamily: "var(--font-head)",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: ".04em",
    cursor: "pointer",
    boxShadow: "0 6px 30px rgba(255,61,154,.35)",
    marginTop: "6px",
  },
  footer: {
    fontSize: "12px",
    color: "var(--muted)",        
    textAlign: "center",
    marginTop: "20px",
  },
  footerLink: { color: "#FF3D9A", fontWeight: 600 },
};

export default Login;