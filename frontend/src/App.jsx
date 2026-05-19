import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

/* Components */
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Home from "./pages/home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VendorMarketplace from "./pages/user/VendorMarketplace";
import VendorProfile from "./pages/user/VendorProfile";
import MyBookings from "./pages/user/MyBookings";
import MyEvents from "./pages/user/MyEvents";
import CreateEvent from "./pages/user/CreateEvent";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import EditVendorProfile from "./pages/vendor/EditVendorProfile";
import VendorBookings from "./pages/vendor/VendorBookings";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go Home</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Login required for everyone */}
            <Route path="/vendors" element={
              <ProtectedRoute><VendorMarketplace /></ProtectedRoute>
            } />
            <Route path="/vendors/:id" element={
              <ProtectedRoute><VendorProfile /></ProtectedRoute>
            } />

            {/* Customer-only routes */}
            <Route path="/my-bookings" element={
              <ProtectedRoute role="user"><MyBookings /></ProtectedRoute>
            } />
            <Route path="/my-events" element={
              <ProtectedRoute role="user"><MyEvents /></ProtectedRoute>
            } />
            <Route path="/create-event" element={
              <ProtectedRoute role="user"><CreateEvent /></ProtectedRoute>
            } />

            {/* Vendor-only routes */}
            <Route path="/vendor/dashboard" element={
              <ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>
            } />
            <Route path="/vendor/profile/edit" element={
              <ProtectedRoute role="vendor"><EditVendorProfile /></ProtectedRoute>
            } />
            <Route path="/vendor/bookings" element={
              <ProtectedRoute role="vendor"><VendorBookings /></ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;