import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const ChefSignup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    speciality: "",
    certificateLink: "",
    hourlyRate: "",
    experience: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/chefSignReq", formData);
      setMessage({ type: "success", text: "Your request is pending for admin verification." });
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data || "Signup failed" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Chef Signup</h2>
        {message && <p className={`message ${message.type}`}>{message.text}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
          <input type="text" name="speciality" placeholder="Speciality" onChange={handleChange} required />
          <input type="text" name="certificateLink" placeholder="Certificate Link" onChange={handleChange} required />
          <input type="number" name="hourlyRate" placeholder="Hourly Rate" onChange={handleChange} required />
          <input type="number" name="experience" placeholder="Experience (Years)" onChange={handleChange} required />
          <button type="submit" className="signup-btn">Sign Up</button>
          <button
            type="button"
            className="signup-btn chef-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up as a User
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChefSignup;
