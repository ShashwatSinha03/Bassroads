import React from 'react';
import Products from './Products';
import productsData from '../data/products.json';

const Explore = () => {
  const allProducts = productsData.products.slice(0, 9);

  return (
    <div className="explore-page">
      <Products products={allProducts} />
    </div>
  );
};

export default Explore;