import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Context */
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

/* Components */
import Navbar from "./components/Navbar";

/* Pages */
import Home from "./pages/home";

/* Auth */
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

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* User */}
            <Route
              path="/vendors"
              element={<VendorMarketplace />}
            />

            {/* Vendor */}
            <Route
              path="/vendor/profile/edit"
              element={<EditVendorProfile />}
            />

          </Routes>

        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;