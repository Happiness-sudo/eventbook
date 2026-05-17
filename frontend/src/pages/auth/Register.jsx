import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser(form);

      const user = res.data.user;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/login");
      }

    } catch (err) {
      setError(
        err?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
        />

        <input
          name="password"
          placeholder="password"
          type="password"
          onChange={handleChange}
        />

        <select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="vendor">Vendor</option>
        </select>

        <button disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;