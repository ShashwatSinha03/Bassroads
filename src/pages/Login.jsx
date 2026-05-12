import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import useThemeStore from '../store/useThemeStore';
import useUserStore from '../store/useUserStore';

const Login = () => {
  const { theme } = useThemeStore();
  const { login } = useUserStore();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (isLogin) {
      if (formData.email && formData.password) {
        login({ name: formData.email.split('@')[0], email: formData.email });
        navigate('/');
      }
    } else {
      if (formData.name && formData.email && formData.password) {
        login({ name: formData.name, email: formData.email });
        navigate('/');
      }
    }
  };

  return (
    <div className={`min-h-screen pt-20 flex items-center justify-center ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md px-4 py-8">
        <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-[#1A1A1A]' : 'bg-white'} shadow-xl`}>
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#01172F] flex items-center justify-center">
                <span className="text-white font-bold text-2xl">B</span>
              </div>
            </Link>
            <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#01172F]'}`}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
              {isLogin ? 'Sign in to continue' : 'Join BassRoads today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-gray-50 border-gray-200'
                    } focus:outline-none focus:border-[#632C38]`}
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-gray-50 border-gray-200'
                  } focus:outline-none focus:border-[#632C38]`}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border ${
                    theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-gray-50 border-gray-200'
                  } focus:outline-none focus:border-[#632C38]`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      theme === 'dark' ? 'bg-[#0A0A0A] border-gray-700 text-white' : 'bg-gray-50 border-gray-200'
                    } focus:outline-none focus:border-[#632C38]`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-[#632C38] hover:underline">
                  Forgot password?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#01172F] text-white font-bold rounded-xl hover:bg-[#632C38] transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-2 text-[#632C38] font-medium hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;