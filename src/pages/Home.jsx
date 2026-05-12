import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import useThemeStore from '../store/useThemeStore';

const Home = () => {
  const { theme } = useThemeStore();

  return (
    <div className={theme === 'dark' ? 'bg-[#0A0A0A] min-h-screen' : 'bg-white min-h-screen'}>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default Home;