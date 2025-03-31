import React from "react";
import { useNavigate } from "react-router-dom";
import "./AboutUs.css";
import foodImage from "../assets/Aboutus.png"; // Replace with actual image path

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅</button>
      <h1>About Us</h1>

      <div className="about-content">
        <div className="about-text">
          <p>
            At <strong>Chef At Demand</strong>, we believe that great food has the power to bring people together. 
            Our mission is to revolutionize the way people experience home dining by offering an easy and 
            accessible way to book talented chefs for any occasion. Whether you're planning an intimate dinner, 
            a special celebration, or a large event, <strong>Chef At Demand</strong> connects you with professional 
            chefs who will craft personalized, unforgettable culinary experiences right in your home.
          </p>

          <h2>Our Story</h2>
          <p>
            Chef At Demand was founded with a simple idea: to make high-quality, restaurant-style dining accessible 
            to everyone, no matter the occasion. After years of frustration with the limitations of traditional catering 
            services, we envisioned a platform where people could hire top-notch chefs for customized experiences – 
            on their terms.
          </p>
          <p>
            We began by gathering a talented network of chefs who share our passion for creating memorable meals. 
            From seasoned professionals to rising culinary stars, each chef brings their own unique style and expertise, 
            ensuring that you’ll always find the perfect match for your event.
          </p>

          <h2>Our Vision</h2>
          <p>
            We want to make hiring a personal chef as easy as booking a ride or ordering dinner. We believe that 
            food should be an experience – not just something you eat. Our goal is to empower users to create the 
            dining experience they’ve always dreamed of, right in the comfort of their own home.
          </p>
          <p>
            With ChefConnect, you're not just booking a chef – you’re booking a moment. Whether it’s a family gathering, 
            a birthday, a wedding, or just a casual dinner with friends, our chefs are here to make every meal an occasion.
          </p>

          <h2>Why Chef At Demand?</h2>
          <ul>
            <li><strong>Professional Chefs:</strong> All our chefs are experienced, vetted, and skilled in a variety of cuisines.</li>
            <li><strong>Flexibility:</strong> You can book a chef by the hour, making it easy to plan a meal that fits your schedule and budget.</li>
            <li><strong>Personalized Service:</strong> Our chefs work with you to create a menu tailored to your preferences, dietary needs, and special requests.</li>
            <li><strong>Convenience:</strong> No need to leave your home! Book a chef for any event and enjoy world-class cuisine in the comfort of your own space.</li>
            <li><strong>Trust & Safety:</strong> We ensure all chefs undergo background checks and are committed to the highest standards of hygiene and professionalism.</li>
          </ul>
        </div>

        <div className="about-image">
          <img src={foodImage} alt="Delicious food prepared by chef" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
