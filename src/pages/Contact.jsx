import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import useThemeStore from '../store/useThemeStore';

const Contact = () => {
  const { theme } = useThemeStore();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+91 98765 43210', desc: 'Mon-Sat, 9am-6pm' },
    { icon: Mail, label: 'Email', value: 'support@bassroads.com', desc: 'We reply within 24hrs' },
    { icon: MapPin, label: 'Address', value: '123 Audio Street, Mumbai', desc: 'India 400001' },
  ];

  return (
    <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
            Get in Touch
          </h1>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {contactInfo.map((info) => (
            <div
              key={info.label}
              className={`p-6 rounded-2xl text-center ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                theme === 'dark' ? 'bg-[#2A2A2A]' : 'bg-gray-200'
              }`}>
                <info.icon className={`w-6 h-6 ${theme === 'dark' ? 'text-[#632C38]' : 'text-[#632C38]'}`} />
              </div>
              <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                {info.label}
              </h3>
              <p className={`font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {info.value}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                {info.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-gray-50'}`}>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
                  Message Sent!
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  We'll get back to you soon.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-white border-gray-200'
                    } focus:outline-none focus:border-[#632C38]`}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-white border-gray-200'
                    } focus:outline-none focus:border-[#632C38]`}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-white border-gray-200'
                    } focus:outline-none focus:border-[#632C38]`}
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#01172F] text-white font-bold rounded-xl hover:bg-[#632C38] transition-colors"
                >
                  Send Message
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;