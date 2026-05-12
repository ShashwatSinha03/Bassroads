'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/useThemeStore';
import { categories, products } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function HomePage() {
  const { theme } = useThemeStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

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

  const featuredProducts = products.slice(0, 8);

  return (
    <div className={theme === 'dark' ? 'bg-[#0A0A0A] min-h-screen' : 'bg-white min-h-screen'}>
      <div className="relative h-[85vh] min-h-[600px] overflow-hidden mt-16 md:mt-20">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`} />

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
              <Image
                src={slides[activeIndex].image}
                alt={slides[activeIndex].title}
                fill
                className="object-cover"
                priority
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
                    href={slides[activeIndex].link}
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

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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

      <section className={`py-16 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${category.id}`}
                className={`group p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-[#1A1A1A] hover:bg-[#2A2A2A]'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#632C38] ${
                    theme === 'dark' ? 'bg-[#2A2A2A] text-[#632C38] group-hover:text-white' : 'bg-gray-200 text-[#632C38] group-hover:text-white'
                  }`}>
                    <span className="text-2xl">🎧</span>
                  </div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-16 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                Featured Products
              </h2>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Handpicked by our audio experts
              </p>
            </div>
            <Link
              href="/explore"
              className="hidden md:flex items-center gap-2 text-[#632C38] font-medium hover:gap-3 transition-all"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}