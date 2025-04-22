import React from 'react';
import './Speaker.css';
import sp from '../assets/sb1.jpg';
import sp1 from '../assets/sb2.jpg';

const Prod3 = () => {
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
          <h3 className="overlay-text">SOUNDBARS</h3>
        </div>
      </div>
    </div>
  );
};

export default Prod3;