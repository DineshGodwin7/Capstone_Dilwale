import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";

const ChefBookings = () => {
  const [bookings, setBookings] = useState([]);
  const chefId = sessionStorage.getItem("UserId");

  useEffect(() => {
    if (chefId) {
      fetchChefBookings();
    }
  }, [chefId]);

  const fetchChefBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getChefBookings/${chefId}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching chef bookings:", error);
    }
  };

  return (
    <div style={{padding: "20px", textAlign: "center" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>🍽️ Your Bookings</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", justifyContent: "center" }}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={index}
              style={{
                background: "#FFC107",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                textAlign: "left",
                width:"500px"
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>📍 {booking.location}</h3>
              <p>
                <FaCalendarAlt /> <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <FaClock /> <strong>Time:</strong> {booking.arrivalTime}
              </p>
              <p>
                <FaUsers /> <strong>Guests:</strong> {booking.noOfPeople}
              </p>
              <p>
                <strong>Duration:</strong> {booking.duration} hours
              </p>
              <p>
                <strong>Event Type:</strong> {booking.eventType}
              </p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default ChefBookings;