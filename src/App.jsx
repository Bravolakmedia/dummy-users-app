import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=20")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div style={{ display: "flex", padding: "20px" }}>
      {/* User List */}
      <div style={{ flex: 1, borderRight: "1px solid #ddd", padding: "10px" }}>
        <h2>User List</h2>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            style={{
              cursor: "pointer",
              padding: "10px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <strong>{user.firstName} {user.lastName}</strong> <br />
            <span>{user.email}</span>
          </div>
        ))}
      </div>

      {/* Selected User Details */}
      <div style={{ flex: 1, padding: "10px" }}>
        <h2>User Details</h2>
        {selectedUser ? (
          <div>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
          </div>
        ) : (
          <p>Click on a user to see details</p>
        )}
      </div>
    </div>
  );
};

export default App;
