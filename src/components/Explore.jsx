import React from 'react';
import Products from './Products';
import productsData from '../data/products.json';

const Explore = () => {
  const allProducts = productsData.products;

  return (
    <div className="explore-page">
      <Products products={allProducts} />
    </div>
  );
};

export default Explore;