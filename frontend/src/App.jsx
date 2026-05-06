import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyBookings from './pages/user/MyBookings';
import VendorDashboard from './pages/vendor/VendorDashboard';

function App() {
  return (
    <Router>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex gap-4">
          <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
          <Link to="/vendor/dashboard" className="hover:underline">Vendor Dashboard</Link>
        </div>
      </nav>
      <div className="container mx-auto">
        <Routes>
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
