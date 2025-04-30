import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Display from './components/Display';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Explore from './components/Explore';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Categories />
                <Display />
              </>
            } 
          />

          {/* Explore Route - Shows all products */}
          <Route 
            path="/explore" 
            element={<Explore />} 
          />

          {/* Product Details Route */}
          <Route 
            path="/product/:id" 
            element={<ProductDetails />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;