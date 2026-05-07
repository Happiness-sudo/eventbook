import { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings from API
    const fetchBookings = async () => {
      try {
        const res = await fetch('/api/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map(booking => (
            <div key={booking.id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{booking.vendorName}</h3>
              <p className="text-sm text-gray-600">Date: {booking.date}</p>
              <p className="text-sm">Status: <span className={`font-medium ${booking.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'}`}>{booking.status}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
