import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewAllBookings.css";

const ViewAllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllBookings")
      .then((response) => {
        console.log("Fetched bookings:", response.data);
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!Array.isArray(bookings) || bookings.length === 0)
    return <p className="no-data">No bookings available.</p>;

  return (
    <div className="bookings-container">
      <h2>All Bookings</h2>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.bookingId} className="booking-card">
            <h3>Booking ID: {booking.bookingId}</h3>
            <p><strong>Chef ID:</strong> {booking.chefId}</p>
            <p><strong>User ID:</strong> {booking.userId}</p>
            <p><strong>Duration:</strong> {booking.duration} hours</p>
            <p><strong>Location:</strong> {booking.location}</p>
            <p><strong>Event Type:</strong> {booking.eventType}</p>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>No. of People:</strong> {booking.noOfPeople}</p>
            <p><strong>Arrival Time:</strong> {booking.arrivalTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllBookings;
