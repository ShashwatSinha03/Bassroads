import React from 'react';
import './Headph.css';
import sp from '../assets/hp1.jpg';
import sp1 from '../assets/hp2.jpg';

const ProductCard = () => {
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
          <h3 className="overlay-text">SPEAKERS</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;