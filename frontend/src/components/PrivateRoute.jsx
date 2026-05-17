import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)",
    }}>
      <span style={{
        fontFamily: "var(--font-head)",
        fontSize: "13px",
        color: "var(--muted)",
        letterSpacing: ".12em",
      }}>
        LOADING...
      </span>
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    if (user.role === "vendor") return <Navigate to="/vendor/dashboard" replace />;
    if (user.role === "admin")  return <Navigate to="/admin/dashboard"  replace />;
    return <Navigate to="/api/vendors" replace />;
  }

  return children;
};

export default PrivateRoute;