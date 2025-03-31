import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/testimonials">Reviews</a></li>
            <li><a href="/signup">Register</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Open From</h3>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: chef@company.com</p>
          <p>Phone: +91 9952120521</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
