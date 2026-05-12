import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useThemeStore from '../../store/useThemeStore';

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme } = useThemeStore();

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1920&h=1080&fit=crop",
      title: "Premium Sound",
      subtitle: "Experience music like never before",
      cta: "Shop Now",
      link: "/explore",
    },
    {
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1920&h=1080&fit=crop",
      title: "Wireless Freedom",
      subtitle: "Cut the cord, keep the quality",
      cta: "Explore TWS",
      link: "/explore?category=tws",
    },
    {
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1920&h=1080&fit=crop",
      title: "Home Audio",
      subtitle: "Transform your living space",
      cta: "View Speakers",
      link: "/explore?category=speakers",
    },
    {
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1920&h=1080&fit=crop",
      title: "Pro Audio",
      subtitle: "For creators and professionals",
      cta: "Shop DACs",
      link: "/explore?category=dacs",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[85vh] min-h-[600px] overflow-hidden mt-16 md:mt-20">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      >
        <source
          src="https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
          type="video/mp4"
        />
      </video>

      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent' : 'bg-gradient-to-t from-white via-white/50 to-transparent'}`} />

      <div className="relative h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={slides[activeIndex].image}
              alt={slides[activeIndex].title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-r from-[#0A0A0A]/80' : 'bg-gradient-to-r from-white/80'}`} />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`}
              >
                Welcome to BassRoads
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-4xl md:text-6xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-[#01172F]'
                }`}
              >
                {slides[activeIndex].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`text-lg md:text-xl mb-8 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {slides[activeIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to={slides[activeIndex].link}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#01172F] text-white font-medium rounded-full hover:bg-[#632C38] transition-colors"
                >
                  {slides[activeIndex].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex
                    ? 'bg-[#632C38] w-8'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;