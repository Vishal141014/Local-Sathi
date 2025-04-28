import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const user = JSON.parse(userInfo);
        console.log('Already logged in user:', user);
        
        // Redirect based on role
        if (user.role === 'admin') {
          console.log('Redirecting to admin dashboard');
          navigate('/admin-dashboard');
        } else {
          console.log('Redirecting to user dashboard');
          navigate('/user-dashboard');
        }
      } catch (error) {
        console.error('Error parsing userInfo:', error);
        localStorage.removeItem('userInfo');
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email });
      const { data } = await axios.post('/api/auth/login', {
        email,
        password,
      });

      console.log('Login response:', data);
      
      if (!data.user || !data.user.role) {
        console.error('Missing user role in response:', data);
        toast.error('Login response missing user role information');
        setLoading(false);
        return;
      }

      // Store the complete user info including the token
      const userToStore = {
        ...data.user,
        token: data.token
      };
      
      console.log('Storing user data:', userToStore);
      localStorage.setItem('userInfo', JSON.stringify(userToStore));
      
      // Redirect based on user role
      if (data.user.role === 'admin') {
        console.log('Redirecting admin to admin dashboard');
        navigate('/admin-dashboard');
      } else {
        console.log('Redirecting user to user dashboard');
        navigate('/user-dashboard');
      }
      
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        
        toast.error(
          error.response.data.message || 'Login failed. Please check your credentials.'
        );
      } else if (error.request) {
        console.error('Request error:', error.request);
        toast.error('Network error. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <ToastContainer position="top-right" />
      
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-light rounded-lg shadow-xl overflow-hidden max-w-md w-full">
          <div className="bg-pink py-6 px-8">
            <h2 className="text-2xl font-bold text-light text-center">Welcome Back!</h2>
            <p className="text-light text-center mt-2 opacity-90">Sign in to access your account</p>
          </div>
          
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-dark font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-dark font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-pink focus:ring-pink border-gray rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray">
                    Remember me
                  </label>
                </div>
                
                <div>
                  <a href="#" className="font-medium text-sm text-pink hover:text-pink-700">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-2 bg-pink text-light rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-dark text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-pink hover:text-pink-700">
                  Sign up here <FaArrowRight className="inline-block ml-1" size={12} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LoginPage; 