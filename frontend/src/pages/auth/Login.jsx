import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/vendors");
      }

    } catch (err) {
      setError("Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;