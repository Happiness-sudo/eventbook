import { useState, useEffect } from 'react';

const VendorDashboard = () => {
  const [stats, setStats] = useState({ bookings: 0, revenue: 0, rating: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/vendor/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.bookings}</div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">${stats.revenue}</div>
          <div className="text-gray-600">Revenue</div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold">{stats.rating} ★</div>
          <div className="text-gray-600">Rating</div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
