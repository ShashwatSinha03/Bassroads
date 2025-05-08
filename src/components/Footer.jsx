import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../assets/br_logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="Bassroads Logo" className="footer-logo-img" />
            <span className="footer-logo-text">BASSROADS</span>
          </Link>
          <p className="footer-tagline">Elevating Sound Experiences</p>
        </div>

        <div className="footer-links">
          <h4 className="footer-heading">Quick Links</h4>
          <Link to="/support" className="footer-link">Support</Link>
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/contact" className="footer-link">Contact</Link>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Connect With Us</h4>
          <p className="footer-contact-info">support@bassroads.com</p>
          <p className="footer-contact-info">+91 98765 43210</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Bassroads. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;