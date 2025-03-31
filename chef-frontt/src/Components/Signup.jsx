import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    createPassword: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|.*\.in)$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!validatePhoneNumber(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Invalid phone number. Must be a 10-digit Indian number.";
    }

    if (!validateEmail(formData.email)) {
      validationErrors.email = "Invalid email. Must be @gmail.com or end with .in";
    }

    if (formData.createPassword !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      validationErrors.agreeToTerms = "You must agree to the terms and conditions.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post("http://localhost:8080/register", formData);
      setMessage({ type: "success", text: response.data });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data || "Registration failed" });
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>
        {message && <p className={`message ${message.type}`}>{message.text}</p>}
        <form onSubmit={handleSubmit}>
          <div className="name-group">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          {errors.email && <p className="error-text">{errors.email}</p>}
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
          {errors.phoneNumber && <p className="error-text">{errors.phoneNumber}</p>}
          <input type="password" name="createPassword" placeholder="Create Password" value={formData.createPassword} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          <div className="terms">
            <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} required />
            <span>
              I agree to the <Link to="/terms">Terms and Conditions</Link>
            </span>
          </div>
          {errors.agreeToTerms && <p className="error-text">{errors.agreeToTerms}</p>}
          <button type="submit" className="signup-btn">Sign Up</button>
          <button type="button" className="signup-btn chef-signup-btn" onClick={() => navigate("/chefsignup")}>
            Sign Up as a Chef
          </button>
          <p className="signin-text">
            Already a user? <Link to="/">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
