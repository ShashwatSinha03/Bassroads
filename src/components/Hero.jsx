import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // GIF URLs from Giphy
  const slides = [
    'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTQzY2ZiNm9rZzU0YjJiNmhzYWwxaGVuZm12azlhenZnYWk0ejkwaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cqOXwcMkDbtgk/giphy.gif',
    'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXNpZGdrd2J3OW4xOHZ4cmhqMHA4amExNmlweHdhd3g5aDBxOXhqNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohzdYxNLpianF1jva/giphy.gif',
    'https://media.giphy.com/media/ZQ3nXIlmUT7DLgOSA4/giphy.gif?cid=ecf05e47r23ztshb1mi216ps1hfffc1xhnkwyqb31cysa3xy&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBoN2ZteGJ0dWxqdHlqdW42dzJ4azlrcWR1Ymd3OHY4aG1zN3R4YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iMiEYOTQ7WnIlQ6BXb/giphy.gif'
  ];

  // Keep the rest of the code exactly the same
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
        {slides.map((gifUrl, index) => (
          <div className="slide" key={index}>
            <img 
              src={gifUrl} 
              alt={`Promotional GIF ${index + 1}`} 
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