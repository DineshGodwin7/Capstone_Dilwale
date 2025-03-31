import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageChefs.css";

const ManageChefs = () => {
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    loadChefs();
  }, []);

  const loadChefs = () => {
    axios
      .get("http://localhost:8080/getAllChefs")
      .then((response) => setChefs(response.data))
      .catch((error) => console.error("Error fetching chefs:", error));
  };

  const deleteChef = (chefId) => {
    axios
      .delete(`http://localhost:8080/deleteChef/${chefId}`)
      .then(() => {
        alert("Chef deleted successfully");
        loadChefs();
      })
      .catch((error) => console.error("Error deleting chef:", error));
  };

  return (
    <div className="manage-chefs-container">
      <h2>Manage Chefs</h2>
      <table className="chefs-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Speciality</th>
            <th>Hourly Rate</th>
            <th>Experience</th>
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
              <td>{chef.hourlyRate}</td>
              <td>{chef.experience}</td>
              <td>
                <button className="delete-btn" onClick={() => deleteChef(chef.chefId)}>
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

export default ManageChefs;