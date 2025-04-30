import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = productsData.products.find(p => p.id === parseInt(id));

  const handleAddToCart = () => {
    // Add cart functionality
    console.log('Added to cart:', product.id);
  };

  const handleBuyNow = () => {
    // Add checkout functionality
    console.log('Buy now:', product.id);
  };

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
              <button className="cart-button" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-button" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
          
          <div className="product-meta-info">
            <span className="product-sku">SKU: {product.id}</span>
            <span className="product-category">Category: {product.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;