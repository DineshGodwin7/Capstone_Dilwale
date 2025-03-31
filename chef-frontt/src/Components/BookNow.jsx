// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./BookingForm.css";

// const BookingForm = () => {
//   const navigate = useNavigate();
//   const userId = sessionStorage.getItem("UserId");
//   const location = useLocation();
//   const chefId = location.state?.chefId || "";

//   const [formData, setFormData] = useState({
//     user: userId || "",
//     chefId: chefId || "",
//     duration: "",
//     location: "",
//     eventType: "",
//     date: "",
//     noOfPeople: "",
//     arrivalTime: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId || !chefId) {
//       alert("User or Chef ID not found. Please log in again.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:8080/book", formData);
//       alert(response.data.message);
//       navigate("/");
//     } catch (error) {
//       console.error("Booking failed:", error);
//       alert("Booking failed. Try again.");
//     }
//   };

//   return (
//     <div className="booking-container">
//       <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
//       <h2>Book a Chef</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="number" name="duration" placeholder="Duration (hours)" onChange={handleChange} required />
//         <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
//         <input type="text" name="eventType" placeholder="Event Type" onChange={handleChange} required />
//         <input type="date" name="date" onChange={handleChange} required />
//         <input type="number" name="noOfPeople" placeholder="Number of People" onChange={handleChange} required />
//         <input type="time" name="arrivalTime" onChange={handleChange} required />
//         <button type="submit">Book Now</button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingForm.css";

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem("UserId");
  const chefId = location.state?.chefId || "";
  const hourlyRate = location.state?.hourlyRate || 0;

  const [formData, setFormData] = useState({
    user: userId || "",
    chefId: chefId || "",
    duration: "",
    location: "",
    eventType: "",
    date: "",
    noOfPeople: "",
    arrivalTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.duration) {
      alert("Please enter the duration.");
      return;
    }
    const totalPayment = formData.duration * hourlyRate;
    navigate("/payment", { state: { ...formData, totalPayment } });
  };

  return (
    <div className="booking-container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      <h2>Book a Chef</h2>
      <form>
        <input type="number" name="duration" placeholder="Duration (hours)" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="text" name="eventType" placeholder="Event Type" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="number" name="noOfPeople" placeholder="Number of People" onChange={handleChange} required />
        <input type="time" name="arrivalTime" onChange={handleChange} required />
        <button type="button" onClick={handleNext}>Next</button>
      </form>
    </div>
  );
};

export default BookingForm;

