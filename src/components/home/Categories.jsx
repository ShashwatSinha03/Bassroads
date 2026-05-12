import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, AudioLines, Speaker, Disc3 } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';
import { categories } from '../../data/products';

const iconMap = {
  headphones: Headphones,
  earphones: Headphones,
  speakers: Speaker,
  soundbars: AudioLines,
  tws: Headphones,
  dacs: Disc3,
};

const Categories = () => {
  const { theme } = useThemeStore();

  return (
    <section className={`py-16 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            Shop by Category
          </h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Explore our wide range of audio products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const Icon = iconMap[category.id] || Headphones;
            return (
              <Link
                key={category.id}
                to={`/explore?category=${category.id}`}
                className={`group relative p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-[#1A1A1A] hover:bg-[#2A2A2A]'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-[#632C38] ${
                    theme === 'dark' ? 'bg-[#2A2A2A] text-[#632C38] group-hover:text-white' : 'bg-gray-200 text-[#632C38] group-hover:text-white'
                  }`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                    {category.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;