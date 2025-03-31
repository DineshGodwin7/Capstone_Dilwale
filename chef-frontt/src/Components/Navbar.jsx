import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaBars, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const name = sessionStorage.getItem("Username");
  const userid = sessionStorage.getItem("UserId");
  const role = sessionStorage.getItem("Role");

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".sidebar") && !e.target.closest(".menu-icon")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Chef At Demand" className="logo" />
        <span className="brand-name">Chef At Demand</span>
      </div>

      <div className="search-container">
        <FaBars className="menu-icon" onClick={() => setIsOpen(!isOpen)} />
        <input type="text" placeholder="Search For Chef" />
        <FaSearch className="search-icon" />
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {role === "User" && (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/findchef">Find A Chef</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        )}

        {role === "Admin" && (
          <>
            <li><Link to="/adminhome">Admin Dashboard</Link></li>
            <li><Link to="/manageusers">Manage Users</Link></li>
            <li><Link to="/managechefs">Manage Chefs</Link></li>
            <li><Link to="/getAllBookings">View All Bookings</Link></li>
          </>
        )}

        {role === "Chef" && (
          <>
            <li><Link to="/chefhome">Chef Dashboard</Link></li>
            <li><Link to="/chefmybookings">My Orders</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </>
        )}
      </ul>

      <div className="user-section">
        {userid ? (
          <>
            <Link to="/profile">
  <FaUserCircle size={24} style={{ cursor: "pointer", color: "black" }} />
</Link>
            <span className="username">Hi, {name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to={"/signup"} className="login-btn">
  Login/Sign Up
</Link>

        )}
      </div>
    </nav>
  );
};

export default Navbar;
