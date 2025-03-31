import React, { useEffect, useState } from "react";
import "./AdminHome.css";

const AdminHome = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    loadPendingChefs();
  }, []);

  const loadPendingChefs = () => {
    fetch("http://localhost:8080/all")
      .then((response) => response.json())
      .then((data) => setChefs(data))
      .catch((error) => console.error("Error:", error));
  };

  const acceptChef = (id) => {
    fetch(`http://localhost:8080/accept/${id}`, {
      method: "POST",
    })
      .then((response) => response.text())
      .then(() => {
        alert("Chef accepted!");
        loadPendingChefs();
      })
      .catch((error) => console.error("Error:", error));
  };

  const rejectChef = (id) => {
    fetch(`http://localhost:8080/reject/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then(() => {
        alert("Chef rejected!");
        loadPendingChefs();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="admin-container">
      <h2>Pending Chef Signup Requests</h2>
      <table className="vendor-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Speciality</th>
            <th>Experience</th>
            <th>Hourly Rate</th>
            <th>Certificate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {chefs.map((chef) => (
            <tr key={chef.chefId}>
              <td>{chef.firstName}</td>
              <td>{chef.lastName}</td>
              <td>{chef.email}</td>
              <td>{chef.phoneNumber}</td>
              <td>{chef.speciality}</td>
              <td>{chef.experience} years</td>
              <td>${chef.hourlyRate}/hr</td>
              <td>
                <a href={chef.certificateLink} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td>
                <button className="accept-btn" onClick={() => acceptChef(chef.chefId)}>
                  Accept
                </button>
                <button className="reject-btn" onClick={() => rejectChef(chef.chefId)}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome