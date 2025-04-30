import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard'; // Verify this path exists
import './Products.css'; // Verify this file exists

const Products = ({ products }) => {
  // Add error boundary
  if (!products) return <div>Loading products...</div>;
  
  return (
    <div className="products-grid">
      {products.map((product) => (
        <Link 
          to={`/product/${product.id}`} 
          key={product.id}
          className="product-link"
        >
          {/* Ensure ProductCard component exists */}
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default Products;