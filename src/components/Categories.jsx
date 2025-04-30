import React, { useState, useEffect } from 'react';
import './Categories.css';
import Products from './Products'; // Import your Products component
import productsData from '../data/products.json'; // Import your products data

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Headphones');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const categories = ['Headphones', 'Earphones', 'TWS', 'Speakers', 'Soundbars', 'Accessories'];

  useEffect(() => {
    // Filter products when category changes
    const filtered = productsData.products.filter(product => 
      product.category === selectedCategory
    );
    setFilteredProducts(filtered);
  }, [selectedCategory]);

  return (
    <div>
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-item ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <Products products={filteredProducts} />
      ) : (
        <div className="no-products-message">
          No products available in {selectedCategory} category
        </div>
      )}
    </div>
  );
};

export default Categories;