import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Display from './components/Display';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Explore from './components/Explore';
import Support from './components/Support';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main className="main-content">
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

            {/* Support Route */}
            <Route 
              path="/support" 
              element={<Support />} 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;