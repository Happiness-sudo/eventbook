import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminBookings from "./pages/admin/AdminBookings";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Default */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/vendors" element={<AdminVendors />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />

            {/* Vendor placeholder */}
            <Route
              path="/vendor/dashboard"
              element={
                <div style={{ padding: "40px", color: "white" }}>
                  <h1>Vendor Dashboard</h1>
                  <p>Your vendor UI will go here.</p>
                </div>
              }
            />

            {/* User placeholder */}
            <Route
              path="/vendors"
              element={
                <div style={{ padding: "40px", color: "white" }}>
                  <h1>Vendors Page</h1>
                  <p>User marketplace goes here.</p>
                </div>
              }
            />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;