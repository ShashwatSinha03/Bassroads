import React, { useState, useEffect } from 'react';
import './Hero.css';
import V1 from '../assets/V1.jpg';
import V2 from '../assets/V2.jpg';
import V3 from '../assets/V3.jpg';
import V4 from '../assets/V4.jpg';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [V1, V2, V3, V4];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % slides.length);
  };

  return (
    <div className="hero-container">
      <div className="slider-wrapper" 
           style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((image, index) => (
          <div className="slide" key={index}>
            <img 
              src={image} 
              alt={`Slide ${index + 1}`} 
              className="slide-image" 
            />
          </div>
        ))}
      </div>

      <button className="arrow prev" onClick={handlePrev}>&#10094;</button>
      <button className="arrow next" onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default Hero;