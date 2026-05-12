import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageCircle, Image, Video } from 'lucide-react';
import useThemeStore from '../../store/useThemeStore';

const Footer = () => {
  const { theme } = useThemeStore();

  const footerLinks = {
    shop: [
      { name: 'Headphones', path: '/explore?category=headphones' },
      { name: 'Earphones', path: '/explore?category=earphones' },
      { name: 'Speakers', path: '/explore?category=speakers' },
      { name: 'Soundbars', path: '/explore?category=soundbars' },
      { name: 'TWS', path: '/explore?category=tws' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'FAQs', path: '/faq' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Warranty', path: '/warranty' },
    ],
  };

  const socialLinks = [
    { icon: MessageCircle, href: '#', label: 'Facebook' },
    { icon: Send, href: '#', label: 'Twitter' },
    { icon: Image, href: '#', label: 'Instagram' },
    { icon: Video, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className={`${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-[#01172F]'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#632C38] flex items-center justify-center">
                <span className="font-bold text-xl">B</span>
              </div>
              <span className="font-bold text-xl">BASSROADS</span>
            </div>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
              Your destination for premium audio equipment. Experience sound like never before.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-gray-400 hover:text-[#632C38] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors hover:text-[#632C38] ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm transition-colors hover:text-[#632C38] ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#632C38]" />
                <span>123 Audio Street, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-[#632C38]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-[#632C38]" />
                <span>support@bassroads.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-white/10'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
              © {new Date().getFullYear()} BassRoads. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className={`text-sm hover:text-[#632C38] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`text-sm hover:text-[#632C38] ${theme === 'dark' ? 'text-gray-400' : 'text-gray-300'}`}>
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;