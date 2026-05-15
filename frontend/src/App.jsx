import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";

/* HOME */
import Home from "./pages/home";

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
import VendorList from "./pages/user/VendorList";
import VendorProfile from "./pages/user/VendorProfile";
import MyBookings from "./pages/user/MyBookings";
import CreateEvent from "./pages/user/CreateEvent";
import MyEvents from "./pages/user/MyEvents";

/* PROTECTED ROUTE */
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* AUTH */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/vendors"
              element={
                <ProtectedRoute>
                  <AdminVendors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute>
                  <AdminBookings />
                </ProtectedRoute>
              }
            />

            {/* VENDOR ROUTES */}
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendor/bookings"
              element={
                <ProtectedRoute>
                  <BookingRequests />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendor/profile/edit"
              element={
                <ProtectedRoute>
                  <EditVendorProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendor/services"
              element={
                <ProtectedRoute>
                  <ManageServices />
                </ProtectedRoute>
              }
            />

            {/* USER ROUTES */}
            <Route
              path="/vendors"
              element={
                <ProtectedRoute>
                  <VendorList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/vendors/:id"
              element={
                <ProtectedRoute>
                  <VendorProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <MyBookings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-event"
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-events"
              element={
                <ProtectedRoute>
                  <MyEvents />
                </ProtectedRoute>
              }
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