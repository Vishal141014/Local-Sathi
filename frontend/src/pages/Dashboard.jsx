import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaRobot, FaChartLine, FaCreditCard, FaCog, FaSignOutAlt, FaPlus, FaEllipsisH, FaCheck, FaTimes, FaCalendarAlt, FaExclamationTriangle, FaExternalLinkAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SiTelegram } from 'react-icons/si';

const Dashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('overview');
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [supportQuery, setSupportQuery] = useState('');
  const [supportCategory, setSupportCategory] = useState('technical');
  const [sendingSupport, setSendingSupport] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) {
      console.log('No user info found, redirecting to login');
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userInfoStr);
      console.log('User info in Dashboard:', parsedUser);
      
      // Verify we have a user with data
      if (!parsedUser || !parsedUser.id) {
        console.error('Invalid user data in localStorage:', parsedUser);
        localStorage.removeItem('userInfo');
        navigate('/login');
        return;
      }
      
      setUserInfo(parsedUser);
      
      // Redirect admin users to admin dashboard
      if (parsedUser.role === 'admin') {
        console.log('Admin user detected, redirecting to admin dashboard');
        navigate('/admin-dashboard');
        return;
      }
      
      fetchSubscriptionData();
    } catch (error) {
      console.error('Error parsing user info:', error);
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  }, [navigate]);
  
  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      
      // Get the active subscription for the current user
      const { data } = await api.get('/subscriptions/active');
      
      console.log('Subscription data:', data);
      setSubscription(data);
    } catch (error) {
      console.error('Error fetching subscription data:', error);
      if (error.response && error.response.status === 401) {
        // Unauthorized - token might be invalid
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('userInfo');
        navigate('/login');
      } else {
        toast.error('Failed to load subscription details');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };
  
  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    if (!supportQuery.trim()) {
      toast.error('Please enter your query');
      return;
    }
    
    setSendingSupport(true);
    try {
      // You can implement the actual API call when the backend is ready
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Support query submitted successfully. We will get back to you soon.');
      setSupportQuery('');
    } catch (error) {
      console.error('Error submitting support query:', error);
      toast.error('Failed to submit your query. Please try again.');
    } finally {
      setSendingSupport(false);
    }
  };
  
  // Dummy data for demonstration
  const userData = {
    name: userInfo?.name || 'User',
    business: userInfo?.businessName || 'Your Business',
    plan: subscription?.plan || 'Free',
    nextBillingDate: subscription?.nextBillingDate || 'N/A',
    isActive: subscription?.isActive || false,
    expiryDate: subscription?.expiryDate || 'N/A',
    messagesUsed: 238,
    messagesTotal: 500,
    chatbots: [
      {
        id: 1,
        name: 'Restaurant Menu Bot',
        platform: 'WhatsApp',
        status: 'active',
        messages: 145,
        languages: ['English', 'Hindi']
      },
      {
        id: 2,
        name: 'Booking Assistant',
        platform: 'Telegram',
        status: 'active',
        messages: 93,
        languages: ['English']
      }
    ],
    recentConversations: [
      {
        id: 1,
        customer: '+91 98765 43210',
        preview: 'I want to book a table for 4 people tonight at 8pm.',
        time: '2 hours ago',
        platform: 'WhatsApp'
      },
      {
        id: 2,
        customer: '+91 87654 32109',
        preview: 'Do you have any vegetarian options on the menu?',
        time: '4 hours ago',
        platform: 'Telegram'
      },
      {
        id: 3,
        customer: '+91 76543 21098',
        preview: 'What are your opening hours on Sundays?',
        time: '1 day ago',
        platform: 'WhatsApp'
      }
    ]
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'overview':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-dark">Dashboard Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-light rounded-lg shadow-lg p-6 border-l-4 border-pink">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray">Current Plan</p>
                      <h3 className="text-xl font-semibold text-dark">{userData.plan}</h3>
                    </div>
                    <span className={`px-2 py-1 ${userData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs rounded-full`}>
                      {userData.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray mb-1">Next Billing Date</p>
                  <p className="font-medium text-dark flex items-center">
                    <FaCalendarAlt className="mr-2 text-pink" /> {userData.nextBillingDate}
                  </p>
                  
                  <div className="mt-4 bg-cream p-3 rounded-md">
                    <h4 className="font-medium text-dark mb-2">Plan Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm">
                        <FaCheck className="text-green-500 mr-2" /> 
                        <span>Telegram Integration</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <FaCheck className="text-green-500 mr-2" /> 
                        <span>Multilanguage Support</span>
                      </li>
                      {userData.plan === 'Premium' || userData.plan === 'Business' ? (
                        <li className="flex items-center text-sm">
                          <FaCheck className="text-green-500 mr-2" /> 
                          <span>WhatsApp Integration</span>
                        </li>
                      ) : (
                        <li className="flex items-center text-sm text-gray-400">
                          <FaTimes className="text-red-500 mr-2" /> 
                          <span>WhatsApp Integration</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="mt-4">
                    <Link 
                      to="/pricing" 
                      className="text-pink hover:text-pink-700 text-sm font-medium"
                    >
                      Upgrade Plan
                    </Link>
                  </div>
                </div>
                
                <div className="bg-light rounded-lg shadow-lg p-6 border-l-4 border-teal">
                  <p className="text-sm text-gray mb-2">Message Usage</p>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-dark">{userData.messagesUsed} / {userData.messagesTotal}</h3>
                    <span className="text-sm text-gray">Messages</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-teal h-2.5 rounded-full" 
                      style={{ width: `${(userData.messagesUsed / userData.messagesTotal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm text-gray">
                    {userData.messagesTotal - userData.messagesUsed} messages remaining this month
                  </p>
                  
                  {userData.messagesUsed / userData.messagesTotal > 0.8 && (
                    <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-md">
                      <div className="flex items-start">
                        <FaExclamationTriangle className="text-yellow-500 mt-0.5 mr-2" />
                        <p className="text-sm text-yellow-700">
                          You're approaching your message limit. Consider upgrading your plan for uninterrupted service.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Link 
                      to="/pricing" 
                      className="text-teal hover:text-teal-700 text-sm font-medium"
                    >
                      Increase Message Limit
                    </Link>
                  </div>
                </div>
                
                <div className="bg-light rounded-lg shadow-lg p-6 border-l-4 border-pink">
                  <p className="text-sm text-gray mb-2">Quick Actions</p>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 bg-pink bg-opacity-10 hover:bg-opacity-20 text-pink rounded-md text-sm font-medium text-left flex items-center">
                      <FaPlus className="mr-2" /> Create New Chatbot
                    </button>
                    <button className="w-full py-2 px-4 bg-teal bg-opacity-10 hover:bg-opacity-20 text-teal rounded-md text-sm font-medium text-left flex items-center">
                      <FaChartLine className="mr-2" /> View Analytics
                    </button>
                    <button className="w-full py-2 px-4 bg-cream hover:bg-opacity-80 text-dark rounded-md text-sm font-medium text-left flex items-center">
                      <FaCog className="mr-2" /> Configure Settings
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-medium text-dark mb-2">Subscription Status</h4>
                    {userData.isActive ? (
                      <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md">
                        <p className="text-sm text-green-700 flex items-center">
                          <FaCheck className="mr-2" />
                          Your subscription is active until {userData.expiryDate}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-md">
                        <p className="text-sm text-red-700 flex items-center">
                          <FaTimes className="mr-2" />
                          Your subscription has expired. Please renew to continue using all features.
                        </p>
                        <Link 
                          to="/subscribe" 
                          className="mt-2 inline-block px-3 py-1 bg-pink text-white text-sm font-medium rounded"
                        >
                          Renew Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-light rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-dark">Your Chatbots</h3>
                    <button className="text-pink hover:text-pink-700 text-sm font-medium flex items-center">
                      <FaPlus className="mr-1" /> New Chatbot
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {userData.chatbots.map((chatbot) => (
                      <div key={chatbot.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-dark">{chatbot.name}</h4>
                            <p className="text-sm text-gray">Platform: {chatbot.platform}</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              chatbot.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {chatbot.status.charAt(0).toUpperCase() + chatbot.status.slice(1)}
                            </span>
                            <button className="ml-2 text-gray hover:text-dark">
                              <FaEllipsisH />
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-pink bg-opacity-10 text-pink rounded text-xs">
                            {chatbot.messages} messages
                          </span>
                          {chatbot.languages.map((lang, index) => (
                            <span key={index} className="px-2 py-1 bg-teal bg-opacity-10 text-teal rounded text-xs">
                              {lang}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Link 
                            to={`/chatbots/${chatbot.id}/edit`}
                            className="text-sm text-pink hover:text-pink-700 font-medium"
                          >
                            Manage
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-light rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-dark">Recent Conversations</h3>
                    <Link 
                      to="/conversations" 
                      className="text-pink hover:text-pink-700 text-sm font-medium"
                    >
                      View All
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {userData.recentConversations.map((conversation) => (
                      <div key={conversation.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0 hover:bg-cream hover:bg-opacity-30 p-2 rounded-md transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-dark">{conversation.customer}</h4>
                          <div className="flex items-center">
                            <span className="text-xs text-gray mr-2">{conversation.time}</span>
                            <span className="text-xs px-1.5 py-0.5 bg-pink bg-opacity-10 text-pink rounded">
                              {conversation.platform}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray truncate">{conversation.preview}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'chatbots':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Manage Chatbots</h2>
            <p className="text-gray mb-6">Create and manage your chatbots for different platforms.</p>
            {/* Chatbot management content would go here */}
          </div>
        );
      
      case 'analytics':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Analytics & Insights</h2>
            <p className="text-gray mb-6">View detailed analytics about your chatbot interactions.</p>
            {/* Analytics content would go here */}
          </div>
        );
        
      case 'billing':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Billing & Subscription</h2>
            <p className="text-gray mb-6">Manage your subscription plan and payment details.</p>
            {/* Billing content would go here */}
          </div>
        );
        
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Account Settings</h2>
            <p className="text-gray mb-6">Update your profile and account preferences.</p>
            {/* Settings content would go here */}
          </div>
        );
        
      case 'support':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Customer Support</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-light rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 text-dark">Submit a Query</h3>
                  <form onSubmit={handleSupportSubmit}>
                    <div className="mb-4">
                      <label htmlFor="supportCategory" className="block text-dark font-medium mb-2">
                        Query Category
                      </label>
                      <select
                        id="supportCategory"
                        value={supportCategory}
                        onChange={(e) => setSupportCategory(e.target.value)}
                        className="w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Subscription</option>
                        <option value="feature">Feature Request</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="supportQuery" className="block text-dark font-medium mb-2">
                        Your Query
                      </label>
                      <textarea
                        id="supportQuery"
                        value={supportQuery}
                        onChange={(e) => setSupportQuery(e.target.value)}
                        rows="6"
                        className="w-full p-3 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Please describe your issue or question in detail..."
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={sendingSupport}
                      className="px-6 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300 flex items-center justify-center"
                    >
                      {sendingSupport ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Query'
                      )}
                    </button>
                  </form>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-light rounded-lg shadow-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-dark">Contact Options</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark">Email Support</h4>
                        <p className="text-sm text-gray">support@localsathi.com</p>
                        <p className="text-xs text-gray mt-1">Response time: Within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark">Phone Support</h4>
                        <p className="text-sm text-gray">+91 9999999999</p>
                        <p className="text-xs text-gray mt-1">Available Mon-Fri, 9am to 6pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-primary-100 p-2 rounded-full mr-3">
                        <SiTelegram className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-dark">Telegram Support</h4>
                        <p className="text-sm text-gray">
                          <a 
                            href="https://t.me/LocalSathiBot" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            @LocalSathiBot
                          </a>
                        </p>
                        <p className="text-xs text-gray mt-1">24/7 Automated + Human Support</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <h4 className="font-medium text-dark mb-2">Support Hours</h4>
                  <p className="text-sm text-gray mb-4">Our team is available during the following hours:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray">Monday - Friday:</span>
                      <span className="font-medium text-dark">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray">Saturday:</span>
                      <span className="font-medium text-dark">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray">Sunday:</span>
                      <span className="font-medium text-dark">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <ToastContainer position="top-right" />
      
      <div className="flex-grow flex pt-20">
        {/* Sidebar */}
        <div className="w-64 bg-light shadow-md hidden md:block">
          <div className="p-6 border-b border-gray-200">
            <h2 className="font-bold text-lg text-dark">{userData.name}</h2>
            <p className="text-sm text-gray">{userData.business}</p>
          </div>
          <div className="py-4">
            <ul>
              <li>
                <button
                  onClick={() => setActiveMenuItem('overview')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'overview' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaHome className="mr-3" /> Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenuItem('chatbots')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'chatbots' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaRobot className="mr-3" /> Chatbots
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenuItem('analytics')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'analytics' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaChartLine className="mr-3" /> Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenuItem('billing')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'billing' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaCreditCard className="mr-3" /> Billing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenuItem('settings')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'settings' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaCog className="mr-3" /> Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveMenuItem('support')}
                  className={`flex items-center w-full px-6 py-3 text-left ${
                    activeMenuItem === 'support' 
                      ? 'bg-pink bg-opacity-10 text-pink font-medium border-r-4 border-pink' 
                      : 'text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink'
                  }`}
                >
                  <FaPlus className="mr-3" /> Support
                </button>
              </li>
              <li className="mt-6 border-t border-gray-200 pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-6 py-3 text-left text-dark hover:bg-pink hover:bg-opacity-5 hover:text-pink"
                >
                  <FaSignOutAlt className="mr-3" /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink"></div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard; 