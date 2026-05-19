import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Wraps any page that should require login.
// Pass `role="vendor"` (or "user", "admin") to restrict further.
function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in → send to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → send home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;