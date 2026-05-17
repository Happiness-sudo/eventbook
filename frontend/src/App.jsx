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
import EditVendorProfile from "./components/EditVendorProfile";

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
            <Route path="/vendor/profile/edit" element={<EditVendorProfile />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;