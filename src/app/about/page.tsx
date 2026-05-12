'use client';

import React from 'react';
import Image from 'next/image';
import { Headphones, Award, Users, Truck } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';

export default function AboutPage() {
  const { theme } = useThemeStore();

  const stats = [
    { label: 'Products', value: '30+' },
    { label: 'Customers', value: '10K+' },
    { label: 'Brands', value: '15+' },
    { label: 'Years', value: '5+' },
  ];

  const values = [
    { icon: Headphones, title: 'Premium Quality', desc: 'We curate only the best audio equipment from top brands' },
    { icon: Award, title: 'Expert Selection', desc: 'Our team tests every product to ensure optimal performance' },
    { icon: Users, title: 'Customer First', desc: 'Your satisfaction is our top priority' },
    { icon: Truck, title: 'Fast Delivery', desc: 'Quick and reliable shipping across India' },
  ];

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`}>
              About Us
            </p>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              Your Destination for Premium Audio
            </h1>
            <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              BassRoads is your trusted destination for high-quality audio equipment. 
              We bring you the latest in headphones, speakers, earbuds, and soundbars 
              from the world's leading brands.
            </p>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              Founded with a passion for music and technology, we strive to provide 
              our customers with an exceptional shopping experience and products that 
              elevate their audio journey.
            </p>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
              alt="Premium Audio"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`text-center p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}
            >
              <p className={`text-3xl font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                {stat.value}
              </p>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className={`text-2xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            Why Choose BassRoads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}
              >
                <value.icon className={`w-10 h-10 mb-4 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`} />
                <h3 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}