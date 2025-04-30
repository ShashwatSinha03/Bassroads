import React from "react";
import "./ProductCard.css"

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img className="image" src={product.image} alt={product.title}/>
      <h3 className="card-title" >{product.title}</h3>
      <p className="card-description" >{product.description}</p>
      <p className="card-price" ><strong>₹{product.price}</strong></p>
    </div>
  );
};

export default ProductCard;