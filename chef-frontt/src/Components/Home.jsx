import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css";
import Image1 from "../assets/home-img1.png";
import Image2 from "../assets/Home-img2.png";
import Image3 from "../assets/Home-img3.png";
import Image4 from "../assets/Home-img5.png";
import DefaultChefImage from "../assets/Chef.png";
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const chefId = localStorage.setItem('chefId');
    axios.get('http://localhost:8080/getAllChefs')
      .then(response => {
        setChefs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching chefs:', error);
        setError('Failed to load chefs. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="header-spacing"></div>
      <h1>Hire a Chef. Relax & Enjoy the Moment</h1>
      <p>"Skip the kitchen stress. Book professional chefs for your events in just a few clicks."</p>
      <button className="book-btn" onClick={() => navigate("/findchef")}>Book Your Chef!</button>
      
      <div className="images">
        <img src={Image1} alt="Chef" />
        <img src={Image2} alt="Kitchen" />
        <img src={Image4} alt="Cooking" />
        <img src={Image3} alt="Chopping" />
      </div>
      
      <h2>Top Rated Chefs in your area!</h2>
      {loading && <p className="loading">Loading chefs...</p>}
      {error && <p className="error">{error}</p>}
      {chefs.length === 0 && !loading && !error && <p className="no-chefs">No chefs available at the moment.</p>}
      <div className="chef-list">
        {chefs.map((chef) => (
          <div className="chef-card" key={chef.firstName}>
            <img src={DefaultChefImage} alt={chef.firstName} className="chef-avatar" />
            <h3>{chef.firstName}</h3>
            <p>Specialty: {chef.speciality}</p>
            <p>Experience: {chef.experience} years</p>
          </div>
        ))}
      </div>
      <br />
      <br />
      <Footer/>
    </div>
  );
};

export default Home;
