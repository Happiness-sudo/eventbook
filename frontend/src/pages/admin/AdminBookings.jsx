// admin page
import { useState } from "react";

function AdminBookings() {
  const [bookings] = useState([
    { id: 1, event: "Wedding", vendor: "DJ Mo", status: "pending" },
    { id: 2, event: "Birthday", vendor: "PhotoPro", status: "accepted" }
  ]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Bookings</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Event</th>
            <th>Vendor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.event}</td>
              <td>{b.vendor}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;