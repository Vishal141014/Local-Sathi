import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBuilding, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [businessType, setBusinessType] = useState('retail');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Validate phone number
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    setLoading(true);
    console.log('Submitting registration form...');

    try {
      console.log('Sending registration request with data:', {
        name, email, phone, businessName, address, businessType
      });
      
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
        phone,
        businessName,
        address,
        businessType
      });

      console.log('Registration successful:', data);
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || 'Invalid input data';
        } else if (error.response.status === 409) {
          errorMessage = 'Email already exists. Please use a different email.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your connection.';
      }
      
      toast.error(errorMessage);
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
          <div className="bg-teal py-6 px-8">
            <h2 className="text-2xl font-bold text-dark text-center">Create an Account</h2>
            <p className="text-dark text-center mt-2 opacity-90">Join Local Sathi and grow your business</p>
          </div>
          
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-dark font-medium mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
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
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-dark font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="+91 9999999999"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="businessName" className="block text-dark font-medium mb-2">Business Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-gray" />
                  </div>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Your Business Name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-dark font-medium mb-2">Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBuilding className="text-gray" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="Your Business Address"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="businessType" className="block text-dark font-medium mb-2">Business Type</label>
                <select
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                >
                  <option value="retail">Retail</option>
                  <option value="service">Service</option>
                  <option value="manufacturing">Manufacturing</option>
                </select>
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
                    minLength="6"
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-dark font-medium mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength="6"
                    className="w-full pl-10 pr-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center px-4 py-2 bg-teal text-dark font-medium rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal"
                >
                  {loading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-dark text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-teal hover:text-teal-700">
                  Sign in here <FaArrowRight className="inline-block ml-1" size={12} />
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

export default SignupPage; 