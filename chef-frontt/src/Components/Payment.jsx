import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state;
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleConfirmPayment = async () => {
    try {
      const response = await axios.post("http://localhost:8080/book", bookingData);
      setMessage(response.data.message);
      setIsError(false);
      
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Payment failed:", error);
      setMessage("Payment failed. Try again.");
      setIsError(true);
    }
  };

  return (
    <div className="payment-container">
      <h2>Confirm Booking</h2>
      <p><strong>Location:</strong> {bookingData.location}</p>
      <p><strong>Event Type:</strong> {bookingData.eventType}</p>
      <p><strong>Date:</strong> {bookingData.date}</p>
      <p><strong>Duration:</strong> {bookingData.duration} hours</p>
      <p><strong>People:</strong> {bookingData.noOfPeople}</p>
      <p><strong>Arrival Time:</strong> {bookingData.arrivalTime}</p>
      <h3>Total Payment: ${bookingData.totalPayment}</h3>
      
      <button onClick={handleConfirmPayment}>Confirm Payment</button>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      {message && <p className={isError ? "error-message" : "success-message"}>{message}</p>}
    </div>
  );
};

export default PaymentPage;
