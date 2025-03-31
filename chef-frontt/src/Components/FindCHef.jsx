import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FindChef.css";
import defaultChefImage from "../assets/Chef.png";
import { useNavigate } from "react-router-dom";

const FindChef = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAllChefs")
      .then((response) => {
        setChefs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching chefs:", error);
        setError("Failed to load chefs. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="find-chef-container">
      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate("/home")}>
        ⬅ Back
      </button>

      <h1>Find A Chef</h1>

      {loading && <p className="loading">Loading chefs...</p>}
      {error && <p className="error">{error}</p>}
      {chefs.length === 0 && !loading && !error && <p>No chefs available.</p>}

      <div className="chef-grid">
        {chefs.map((chef, index) => (
          <div className="chef-card" key={index}>
            <img src={defaultChefImage} alt="Chef" className="chef-avatar" />
            <h3>{chef.firstName}</h3>
            <p>{chef.speciality}</p>
            <p>⭐ {chef.experience} years</p>
            <button className="view-profile-btn" onClick={() => navigate(`/viewProfile/${chef.chefId}`)}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindChef;
