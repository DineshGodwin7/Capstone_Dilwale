import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "../assets/profile.png";

const ViewProfile = () => {
  const { chefId } = useParams();
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/getChef/${chefId}`)
      .then((response) => response.json())
      .then((data) => setChef(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [chefId]);

  if (!chef) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      {/* Profile Details */}
      <div
        className="profile-card"
        style={{
          background: "#FFC107",
          padding: "40px",
          borderRadius: "10px",
          width: "70vh",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
          Know Your Chef
        </h1>

        <h2 style={{ fontSize: "28px", textAlign: "center" }}>👨‍🍳 {chef.firstName} {chef.lastName}</h2>
        <p><strong>Email:</strong> {chef.email}</p>
        <p><strong>Phone:</strong> {chef.phoneNumber}</p>
        <p><strong>Specialty:</strong> {chef.speciality}</p>
        <p><strong>Experience:</strong> {chef.experience} years</p>
        <p><strong>Hourly Rate:</strong> ${chef.hourlyRate}/hr</p>
        {chef.certificateLink && (
          <p>
            <strong>Certificate:</strong>{" "}
            <a href={chef.certificateLink} target="_blank" rel="noopener noreferrer">
              View Certificate
            </a>
          </p>
        )}

        {/* Book Now Button */}
        <button
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            background: "#FF5722",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            alignSelf: "center"
          }}
          onClick={() => navigate(`/booknow`, { state: { chefId: chef.chefId, hourlyRate: chef.hourlyRate } })}>
          Book Now
        </button>

        {/* Back Button Below Book Now */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            alignSelf: "center"
          }}
        >
          Back
        </button>
      </div>

      {/* Chef Image - Same Size as Details */}
      <div
        className="chef-image"
        style={{
          width: "70vh",
          height: "70vh",
          marginLeft: "20px",
          borderRadius: "10px",
          overflow: "hidden"
        }}
      >
        <img
          src={Image}
          alt="Chef"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default ViewProfile;
