import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const users =
        JSON.parse(localStorage.getItem("eventbook-users")) || [];

      const existingUser = users.find(
        (u) => u.email === form.email
      );

      if (existingUser) {
        setError("User already exists");
        setLoading(false);
        return;
      }

      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      users.push(newUser);

      localStorage.setItem(
        "eventbook-users",
        JSON.stringify(users)
      );

      localStorage.setItem(
        "eventbook-current-user",
        JSON.stringify(newUser)
      );

      if (newUser.role === "vendor") {
        navigate("/vendor/profile/edit");
      } else if (newUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/vendors");
      }

    } catch (err) {
      setError("Registration failed");
    }

    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h1 style={styles.logo}>EventBook</h1>

        <h2 style={styles.title}>Create Account</h2>

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
            onClick={() =>
              setForm({ ...form, role: "user" })
            }
            style={{
              ...styles.roleButton,
              background:
                form.role === "user"
                  ? "#ff1493"
                  : "transparent",
            }}
          >
            User
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({ ...form, role: "vendor" })
            }
            style={{
              ...styles.roleButton,
              background:
                form.role === "vendor"
                  ? "#ff1493"
                  : "transparent",
            }}
          >
            Vendor
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

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
            {loading
              ? "Creating account..."
              : "Register"}
          </button>

        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
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
    background:
      "linear-gradient(to bottom right, #050014, #140028)",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
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

export default Register;