import React from 'react';
import './Earph.css';
import sp from '../assets/ep1.jpg';
import sp1 from '../assets/ep2.jpg';

const Prod4 = () => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img 
          src={sp} 
          alt="Product Default" 
          className="default-image"
        />
        <img 
          src={sp1} 
          alt="Product Hover" 
          className="hover-image"
        />
        <div className="image-overlay">
          <h3 className="overlay-text">EARPHONES</h3>
        </div>
      </div>
    </div>
  );
};

export default Prod4;