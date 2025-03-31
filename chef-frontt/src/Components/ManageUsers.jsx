import React, { useEffect, useState } from "react";
import "./ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8080/getAllUsers")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const deleteUser = (userId) => {
    fetch(`http://localhost:8080/deleteUser/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(() => {
        alert("User deleted successfully");
        fetchUsers();
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteUser(user.userId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;