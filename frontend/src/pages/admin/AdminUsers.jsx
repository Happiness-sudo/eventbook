// admin page
import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // temporary mock data
    setUsers([
      { id: 1, name: "Happiness", email: "happy@mail.com" },
      { id: 2, name: "John", email: "john@mail.com" }
    ]);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;