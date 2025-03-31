import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

const ContactPage = () => {
  const [contact, setContact] = useState({
    userId: sessionStorage.getItem("userId") || "", 
    name: "",
    eventType: "",
    chefName: "",
    rating: "",
    description: "",
  });

  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllContacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/contact", contact);
      setMessage(response.data);
      setContact({
        userId: sessionStorage.getItem("userId") || "", 
        name: "",
        eventType: "",
        chefName: "",
        rating: "",
        description: "",
      });
      fetchContacts();
    } catch (error) {
      console.error("Error submitting contact:", error);
      setMessage("Failed to submit.");
    }
  };

  return (
    <div>
      <div className="contact-container">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={contact.name} onChange={handleChange} required />
          <input type="text" name="eventType" placeholder="Event Type" value={contact.eventType} onChange={handleChange} required />
          <input type="text" name="chefName" placeholder="Chef Name" value={contact.chefName} onChange={handleChange} required />
          <input type="number" name="rating" placeholder="Rating (1-5)" value={contact.rating} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={contact.description} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      <div className="testimonials-container">
        <h3>Testimonials</h3>
        <div className="testimonials">
          {contacts.slice(0, 3).map((c, index) => (
            <div className="testimonial-card" key={index}>
              <p><strong>Name:</strong> {c.Name}</p>
              <p><strong>Chef Name:</strong> {c.ChefName}</p>
              <p><strong>Event:</strong> {c.Event}</p>
              <p><strong>Rating:</strong> {c.Rating}</p>
              <p><strong>Description:</strong> {c.Description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
