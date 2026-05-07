import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Register = () => {
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // REAL API
      const res = await registerUser(form);
      const user = res.data.user;

      login(user, res.data.token);

      if (user.role === "vendor") {
        navigate("/vendor/profile/edit");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendors");
      }

    } catch (err) {
      // FALLBACK (no backend)
      const fakeUser = {
        name: form.name,
        email: form.email,
        role: form.role,
      };

      login(fakeUser, "fake-token");

      if (fakeUser.role === "vendor") {
        navigate("/vendor/profile/edit");
      } else if (fakeUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendors");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <div style={{ ...S.blob, width: 320, height: 320, background: "#4361EE", top: -80, right: -60 }} />
      <div style={{ ...S.blob, width: 200, height: 200, background: "#FF3D9A", bottom: 80, right: 200 }} />
      <div style={{ ...S.blob, width: 160, height: 160, background: "#06D6A0", bottom: -40, left: 80 }} />

      <button onClick={toggleTheme} style={S.themeBtn}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>

      <div style={S.card}>
        <div style={S.logo}>EventBook</div>
        <h1 style={S.title}>Create account 🎉</h1>
        <p style={S.sub}>Join EventBook and start planning</p>

        {error && <div style={S.error}>{error}</div>}

        <p style={S.roleLabel}>I am a</p>

        <div style={S.roleRow}>
          {[
            { val: "user", label: "Event Organizer" },
            { val: "vendor", label: "Vendor / Provider" },
          ].map((r) => (
            <button
              key={r.val}
              type="button"
              onClick={() => setForm({ ...form, role: r.val })}
              style={{
                ...S.roleBtn,
                ...(form.role === r.val ? S.roleBtnActive : {}),
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {[
            { name: "name", label: "Full name", type: "text", ph: "Jane Mwangi" },
            { name: "email", label: "Email address", type: "email", ph: "jane@example.com" },
            { name: "password", label: "Password", type: "password", ph: "Min. 8 characters" },
          ].map((f) => (
            <div key={f.name} style={S.field}>
              <label style={S.label}>{f.label}</label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.ph}
                required
                value={form[f.name]}
                onChange={(e) =>
                  setForm({ ...form, [e.target.name]: e.target.value })
                }
                style={S.input}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} style={S.btn}>
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        <p style={S.footer}>
          Already have an account?{" "}
          <Link to="/login" style={S.footerLink}>
            Sign in
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
    background: "var(--bg)",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
  },
  blob: {
    position: "absolute",
    borderRadius: "50%",
    filter: "blur(70px)",
    opacity: 0.18,
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
    borderRadius: "24px",
    padding: "40px",
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
  roleLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    marginBottom: "8px",
    textTransform: "uppercase",
  },
  roleRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "20px",
  },
  roleBtn: {
    padding: "12px",
    borderRadius: "14px",
    border: "1px solid var(--border)",
    background: "transparent",
    color: "var(--muted)",
    cursor: "pointer",
  },
  roleBtnActive: {
    background: "rgba(255,61,154,.15)",
    borderColor: "#FF3D9A",
    color: "var(--text)",
  },
  field: { marginBottom: "16px" },
  label: {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "var(--muted)",
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
    background: "var(--input-bg)",
    color: "var(--text)",
  },
  btn: {
    width: "100%",
    padding: "14px",
    borderRadius: "100px",
    border: "none",
    background: "linear-gradient(135deg,#FF3D9A,#FF6B35)",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },
  footer: {
    fontSize: "12px",
    color: "var(--muted)",
    textAlign: "center",
    marginTop: "20px",
  },
  footerLink: {
    color: "#FF3D9A",
    fontWeight: 600,
  },
};

export default Register;