import React from 'react';
import Footer from './Footer';
import './Support.css';

const Support = () => {
  return (
    <div className="support-page">
      <div className="support-content">
        <h1>Customer Support</h1>
        <div className="support-section">
          <h2>Contact Options</h2>
          <p>Email: support@bassroads.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Live Chat: Available 24/7</p>
        </div>
        <div className="support-section">
          <h2>FAQs</h2>
          {/* Add FAQ content */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;