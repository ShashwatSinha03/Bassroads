import React, { useState, useEffect } from 'react';
import Products from './Products';
import productsData from '../data/products.json';
import './Categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Available categories
  const categories = [
    'Featured',
    'Headphones',
    'Earphones',
    'TWS',
    'Speakers',
    'Soundbars',
    'Accessories'
  ];

  useEffect(() => {
    if (selectedCategory === 'Featured') {
      // Shuffle array and pick first 3 elements
      const shuffledProducts = [...productsData.products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setFilteredProducts(shuffledProducts);
    } else {
      const filtered = productsData.products.filter(
        product => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory]);

  return (
    <div className="categories-container">
      <div className="categories-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <Products products={filteredProducts} />
      
      {filteredProducts.length === 0 && (
        <div className="no-products">
          No products found in {selectedCategory} category
        </div>
      )}
    </div>
  );
};

export default Categories;