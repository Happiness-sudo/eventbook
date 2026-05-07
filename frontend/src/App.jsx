import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminBookings from "./pages/admin/AdminBookings";

import VendorDashboard from "./pages/vendor/VendorDashboard";
import MyBookings from "./pages/user/MyBookings";
import VendorMarketplace from "./pages/user/VendorMarketplace";
import BookingRequests from "./components/BookingRequests";
import EditVendorProfile from "./components/EditVendorProfile";
import ManageServices from "./components/ManageServices";

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

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/vendors" element={<AdminVendors />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />

            {/* Vendor Routes */}
            <Route
              path="/vendor/dashboard"
              element={<VendorDashboard />}
            />

            <Route
              path="/vendor/bookings"
              element={<BookingRequests />}
            />

            <Route
              path="/vendor/profile/edit"
              element={<EditVendorProfile />}
            />

            <Route
              path="/vendor/services"
              element={<ManageServices />}
            />

            {/* User Routes */}
           <Route
                path="/vendors"
                element={<VendorMarketplace />}
            />

            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/login" replace />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;