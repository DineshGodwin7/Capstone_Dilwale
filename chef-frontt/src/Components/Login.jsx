import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", formData);

      if (response.data.Status === "Success") {
        sessionStorage.setItem("Token", response.data.Token);
        sessionStorage.setItem("UserId", response.data.UserId);
        sessionStorage.setItem("Email", response.data.Email);
        sessionStorage.setItem("Role", response.data.Role);
        sessionStorage.setItem("Username", response.data.Username);

        setMessage({ type: "success", text: "Login successful! Redirecting..." });

        setTimeout(() => {
          if (response.data.Role === "Admin") navigate("/adminhome");
          else if (response.data.Role === "Chef") navigate("/chefhome");
          else if (response.data.Role === "User") navigate("/home");
        }, 1000);
      } else {
        setMessage({ type: "error", text: response.data.User });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Login failed" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {message && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
