import { useState, useEffect } from 'react';

const BookingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/vendor/requests');
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await fetch(`/api/vendor/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: action })
      });
      setRequests(requests.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Booking Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests.</p>
      ) : (
        <div className="space-y-3">
          {requests.map(req => (
            <div key={req.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{req.userName}</p>
                <p className="text-sm text-gray-600">{req.date} - {req.message}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleAction(req.id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded">Accept</button>
                <button onClick={() => handleAction(req.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingRequests;
