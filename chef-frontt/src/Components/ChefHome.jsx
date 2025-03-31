import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../assets/Home-img5.png";

const ChefHome = () => {
  const navigate = useNavigate();
  const [chef, setChef] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedChef, setUpdatedChef] = useState({});
  const chefId = sessionStorage.getItem("UserId");

  useEffect(() => {
    fetch(`http://localhost:8080/getChef/${chefId}`)
      .then((response) => response.json())
      .then((data) => {
        setChef(data);
        setUpdatedChef(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [chefId]);

  const handleUpdate = async () => {
    try {
      await axios.post(`http://localhost:8080/updateChef/${chefId}`, updatedChef);
      setChef(updatedChef);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating chef details:", error);
    }
  };

  if (!chef) return <p>Loading...</p>;

  return (
    <div style={{ marginTop: "80px", display: "flex", justifyContent: "center", alignItems: "center", height: "90vh" }}>
      <div
        className="profile-card"
        style={{
          background: "#FFC107",
          padding: "40px",
          borderRadius: "10px",
          width: "100vh",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <h1 style={{ fontSize: "50px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>Know Your Chef</h1>
        <h2 style={{ fontSize: "40px", textAlign: "center" }}>👨‍🍳 {chef.firstName} {chef.lastName}</h2>
        <p style={{ fontSize: "30px", textAlign: "center" }}><strong>Email:</strong> {chef.email}</p>
        <p style={{ fontSize: "30px", textAlign: "center" }}><strong>Phone:</strong> {chef.phoneNumber}</p>
        <p style={{ fontSize: "30px", textAlign: "center" }}><strong>Specialty:</strong> {chef.speciality}</p>
        <p style={{ fontSize: "30px", textAlign: "center" }}><strong>Experience:</strong> {chef.experience} years</p>
        <p style={{ fontSize: "30px", textAlign: "center" }}><strong>Hourly Rate:</strong> ${chef.hourlyRate}/hr</p>
        <button
          onClick={() => setIsEditing(true)}
          style={{ marginTop: "20px", padding: "10px 20px", background: "#FF5722", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}
        >
          Update Profile
        </button>

        {isEditing && (
          <div style={{
            position: "absolute", width:"400px" ,top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white",
            padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", zIndex: 1000
          }}>
            <h2>Edit Profile</h2>
            <input type="text" value={updatedChef.firstName} onChange={(e) => setUpdatedChef({...updatedChef, firstName: e.target.value})} />
            <input type="text" value={updatedChef.lastName} onChange={(e) => setUpdatedChef({...updatedChef, lastName: e.target.value})} />
            <input type="email" value={updatedChef.email} onChange={(e) => setUpdatedChef({...updatedChef, email: e.target.value})} />
            <input type="text" value={updatedChef.phoneNumber} onChange={(e) => setUpdatedChef({...updatedChef, phoneNumber: e.target.value})} />
            <input type="text" value={updatedChef.speciality} onChange={(e) => setUpdatedChef({...updatedChef, speciality: e.target.value})} />
            <input type="number" value={updatedChef.experience} onChange={(e) => setUpdatedChef({...updatedChef, experience: e.target.value})} />
            <input type="number" value={updatedChef.hourlyRate} onChange={(e) => setUpdatedChef({...updatedChef, hourlyRate: e.target.value})} />
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        )}
      </div>
      <div className="chef-image" style={{ width: "100vh", height: "100vh", marginLeft: "20px", borderRadius: "10px", overflow: "hidden" }}>
        <img src={Image} alt="Chef" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
};

export default ChefHome;