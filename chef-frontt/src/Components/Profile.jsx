import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaUsers, FaUserEdit } from "react-icons/fa";
import "./Profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const userId = sessionStorage.getItem("UserId");

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchUserBookings();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/userDetails/${userId}`);
      sessionStorage.setItem("firstName", response.data.firstName);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchUserBookings = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/userBookings/${userId}`);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>👋 Welcome, {sessionStorage.getItem("firstName") || "User"}!</h2>
        <p>Check your inbox for booking details or receipt.</p>
        <h3>{sessionStorage.getItem("firstName") || "User"} S</h3>
        <button className="edit-btn">
          <FaUserEdit /> Edit Profile
        </button>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <button>📅 Book Now</button>
        <button>⭐ Rate Chef</button>
        <button>🛠️ Support</button>
      </div>

      {/* <div className="bookings-section">
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              <h4>Chef {booking.chefName}</h4>
              <p>
                <FaMapMarkerAlt /> {booking.location} | {booking.cuisine} | 📅 {booking.date}
              </p>
              <p>
                <FaClock /> {booking.time} | <FaUsers /> {booking.guests} Guests
              </p>
              <p className={booking.status.toLowerCase()}>{booking.status}</p>
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div> */}
    </div>
  );
};

export default ProfilePage;
