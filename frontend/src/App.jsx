import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";


/* Components */
import Navbar from "./components/Navbar";

/* Pages */
import Home from "./pages/home";

/* Auth */
/* HOME */
import Home from "./pages/home.jsx";

/* AUTH */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* User */
import VendorMarketplace from "./pages/user/VendorMarketplace";

/* Vendor */
import EditVendorProfile from "./components/EditVendorProfile";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>

          <Navbar />

          <Routes>


            {/* Home *
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* User */}
            <Route
              path="/vendors"
              element={<VendorMarketplace />}
            />

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
}

export default App;