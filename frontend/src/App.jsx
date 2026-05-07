import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

/* HOME */
import Home from "./pages/home.jsx";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminBookings from "./pages/admin/AdminBookings";

/* VENDOR */
import VendorDashboard from "./pages/vendor/VendorDashboard";
import BookingRequests from "./components/BookingRequests";
import EditVendorProfile from "./components/EditVendorProfile";
import ManageServices from "./components/ManageServices";

/* USER */
import VendorMarketplace from "./pages/user/VendorMarketplace";
import VendorProfile from "./pages/user/VendorProfile";
import MyBookings from "./pages/user/MyBookings";
import CreateEvent from "./pages/user/CreateEvent";
import MyEvents from "./pages/user/MyEvents";

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/vendors" element={<AdminVendors />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />

            {/* VENDOR */}
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

            {/* USER */}
            <Route
              path="/vendors"
              element={<VendorMarketplace />}
            />

            <Route
              path="/vendors/:id"
              element={<VendorProfile />}
            />

            <Route
              path="/my-bookings"
              element={<MyBookings />}
            />

            <Route
              path="/create-event"
              element={<CreateEvent />}
            />

            <Route
              path="/my-events"
              element={<MyEvents />}
            />

            {/* FALLBACK */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
