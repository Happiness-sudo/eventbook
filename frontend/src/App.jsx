import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

/* Components */
import Navbar from "./components/Navbar";

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
import EditVendorProfile from "./components/EditVendorProfile";

// Simple 404 page
const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/vendors">Go to Vendors</a>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vendors" element={<VendorMarketplace />} />
            <Route path="/vendors/:id" element={<VendorProfile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-events" element={<MyEvents />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/profile/edit" element={<EditVendorProfile />} />
            {/* 404 catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
