import React from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ addToCart, handleBuyNow, products }) => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="not-found">Product not found</div>;

  return (
    <div className="product-details-container">
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-detail-image"
        />
      </div>
      
      <div className="product-info-content">
        <h1 className="product-main-title">{product.title}</h1>
        <p className="product-full-description">{product.description}</p>
        
        <div className="price-action-section">
          <div className="price-display">
            <span className="product-current-price">₹{product.price}</span>
            <div className="action-buttons">
              <button 
                className="cart-button" 
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
              <button 
                className="buy-button" 
                onClick={() => handleBuyNow(product)}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;