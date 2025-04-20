import React, { useState } from 'react';
import './Categories.css';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Headphones');
  const categories = ['Headphones', 'Earphones', 'TWS', 'Speakers', 'Sound-Bars', 'Accessories'];

  return (
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
  );
};

export default Categories;