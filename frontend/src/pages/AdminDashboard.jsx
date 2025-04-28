import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaCreditCard, FaChartLine, FaCog, FaSignOutAlt, FaSearch, FaEye, FaTrash, FaDatabase, FaServer, FaExclamationTriangle, FaCheckCircle, FaMemory, FaCheck, FaTimes, FaEnvelope, FaReply } from 'react-icons/fa';
import api from '../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [dbStatus, setDbStatus] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('All Plans');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();
  
  // Check admin authentication
  useEffect(() => {
    const userInfoStr = localStorage.getItem('userInfo');
    
    if (!userInfoStr) {
      console.log('No user info found, redirecting to login');
      navigate('/login');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userInfoStr);
      console.log('User info in AdminDashboard:', parsedUser);
      
      // Verify we have valid user data
      if (!parsedUser || !parsedUser.id) {
        console.error('Invalid user data in localStorage:', parsedUser);
        localStorage.removeItem('userInfo');
        navigate('/login');
        return;
      }
      
      setUserInfo(parsedUser);
      
      // Verify user is admin
      if (parsedUser.role !== 'admin') {
        console.error('Non-admin user attempting to access admin dashboard:', parsedUser);
        toast.error('You do not have permission to access the admin panel');
        navigate('/user-dashboard');
        return;
      }
      
      console.log('Admin verification successful, loading dashboard');
      
      // Fetch dashboard data
      fetchDashboardData();
      
      // Fetch DB status and system health
      fetchDbStatus();
      fetchSystemHealth();
    } catch (error) {
      console.error('Error parsing user info:', error);
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  }, [navigate]);
  
  const fetchDbStatus = async () => {
    try {
      const { data } = await api.get('/status/db');
      setDbStatus(data);
    } catch (error) {
      console.error('Error fetching DB status:', error);
      setDbStatus({ status: 'Error', error: error.message });
    }
  };
  
  const fetchSystemHealth = async () => {
    try {
      const { data } = await api.get('/status/health');
      setSystemHealth(data);
    } catch (error) {
      console.error('Error fetching system health:', error);
      setSystemHealth({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    toast.success('Logged out successfully');
  };
  
  const formatCurrency = (value) => {
    return `₹${value.toLocaleString()}`;
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'dashboard':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Admin Dashboard</h2>
            
            {/* System Status Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-dark">System Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-pink">
                  <div className="flex justify-between">
                    <h4 className="text-gray text-sm font-medium mb-2">Database Connection</h4>
                    {loading ? (
                      <div className="animate-pulse w-4 h-4 bg-gray-300 rounded-full"></div>
                    ) : (
                      dbStatus?.status === 'Connected' ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaExclamationTriangle className="text-red-500" />
                      )
                    )}
                  </div>
                  {loading ? (
                    <div className="animate-pulse h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-dark font-semibold">{dbStatus?.status || 'Unknown'}</p>
                      {dbStatus?.status === 'Connected' ? (
                        <p className="text-sm text-gray mt-1">Connected to {dbStatus?.db} on {dbStatus?.host}</p>
                      ) : (
                        <p className="text-sm text-red-500 mt-1">Database connection issue. Check server logs.</p>
                      )}
                    </div>
                  )}
                  <button 
                    onClick={fetchDbStatus} 
                    className="mt-4 px-3 py-1 bg-pink text-white text-sm rounded hover:bg-opacity-90"
                    disabled={loading}
                  >
                    Refresh Status
                  </button>
                </div>
                
                <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-teal">
                  <div className="flex justify-between">
                    <h4 className="text-gray text-sm font-medium mb-2">Server Performance</h4>
                    {loading ? (
                      <div className="animate-pulse w-4 h-4 bg-gray-300 rounded-full"></div>
                    ) : (
                      <FaServer className="text-teal" />
                    )}
                  </div>
                  {loading ? (
                    <div className="space-y-2">
                      <div className="animate-pulse h-6 bg-gray-300 rounded w-1/2"></div>
                      <div className="animate-pulse h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center">
                        <FaMemory className="mr-2 text-dark" />
                        <span className="text-dark font-medium">Memory Usage</span>
                      </div>
                      <ul className="mt-2 space-y-1 text-sm text-gray">
                        <li>RSS: {systemHealth?.memory?.rss || 'N/A'}</li>
                        <li>Heap Total: {systemHealth?.memory?.heapTotal || 'N/A'}</li>
                        <li>Heap Used: {systemHealth?.memory?.heapUsed || 'N/A'}</li>
                      </ul>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-sm text-dark">
                      Uptime: {loading ? 'Loading...' : `${Math.floor((systemHealth?.uptime || 0) / 3600)} hours, ${Math.floor(((systemHealth?.uptime || 0) % 3600) / 60)} minutes`}
                    </p>
                  </div>
                </div>
                
                <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-pink">
                  <div className="flex justify-between">
                    <h4 className="text-gray text-sm font-medium mb-2">Admin Actions</h4>
                    <FaCog className="text-pink" />
                  </div>
                  <div className="mt-4 space-y-2">
                    <button className="w-full py-2 px-4 bg-teal text-white rounded-md text-sm font-medium text-left flex items-center">
                      <FaDatabase className="mr-2" /> Database Backup
                    </button>
                    <button className="w-full py-2 px-4 bg-cream text-dark rounded-md text-sm font-medium text-left flex items-center">
                      <FaUsers className="mr-2" /> Manage Users
                    </button>
                    <button className="w-full py-2 px-4 bg-pink bg-opacity-10 text-pink rounded-md text-sm font-medium text-left flex items-center">
                      <FaCog className="mr-2" /> System Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-purple-700">
                <h2 className="text-gray-600 mb-2">Total Customers</h2>
                <p className="text-3xl font-bold">{dashboardData?.stats?.totalCustomers || 124}</p>
                <p className="text-sm text-green-500 mt-2">
                  ↑ {dashboardData?.stats?.customerGrowthPercent || 12}% from last month
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-gray-600 mb-2">Monthly Revenue</h2>
                <p className="text-3xl font-bold">{formatCurrency(dashboardData?.stats?.monthlyRevenue || 62400)}</p>
                <p className="text-sm text-green-500 mt-2">
                  ↑ {dashboardData?.stats?.revenueGrowthPercent || 8}% from last month
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                <h2 className="text-gray-600 mb-2">Active Subscriptions</h2>
                <p className="text-3xl font-bold">{dashboardData?.stats?.activeSubscriptions || 98}</p>
                <p className="text-sm text-green-500 mt-2">
                  ↑ {dashboardData?.stats?.subscriptionGrowthPercent || 5}% from last month
                </p>
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-md border-l-4 border-red-500">
                <h2 className="text-gray-600 mb-2">Pending Verifications</h2>
                <p className="text-3xl font-bold">{dashboardData?.stats?.pendingVerifications || 7}</p>
                <p className="text-sm text-red-500 mt-2">
                  ↓ {Math.abs(dashboardData?.stats?.verificationChangePercent || 3)}% from last month
                </p>
              </div>
            </div>
            
            <div className="mb-6 flex justify-between items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search customers..."
                  className="pl-10 pr-4 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray" />
              </div>
              
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent">
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Business</option>
                  <option>Premium</option>
                  <option>Enterprise</option>
                </select>
                
                <select className="px-4 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pink focus:border-transparent">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Expired</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-dark">Recent Subscriptions</h3>
              <div className="flex items-center">
                <Link to="/admin/subscriptions" className="text-pink text-sm font-medium hover:text-pink-700 flex items-center">
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button className="ml-4 text-red-600 text-sm font-medium hover:text-red-700">
                  Clear All Data
                </button>
              </div>
            </div>
            
            <div className="bg-light rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-cream">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Plan
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-light divide-y divide-gray-200">
                  {filterSubscriptions().length > 0 ? (
                    filterSubscriptions().map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-cream hover:bg-opacity-30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-dark">{subscription.customer}</div>
                              <div className="text-sm text-gray-500">{subscription.customerEmail}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}</div>
                          <div className="text-sm text-gray-500">{subscription.customerBusiness}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark">{formatCurrency(subscription.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-dark">
                            {new Date(subscription.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                               subscription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                               subscription.status === 'expired' ? 'bg-red-100 text-red-800' : 
                               'bg-gray-100 text-gray-800'}`}
                          >
                            {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              className="text-indigo-600 hover:text-indigo-900"
                              onClick={() => navigate(`/admin/subscriptions/${subscription.id}`)}
                            >
                              <FaEye />
                            </button>
                            
                            {subscription.status === 'pending' && !subscription.isVerified && (
                              <button 
                                className="text-green-600 hover:text-green-900"
                                onClick={() => verifySubscription(subscription.id)}
                              >
                                <FaCheck />
                              </button>
                            )}
                            
                            {subscription.status === 'pending' && (
                              <button 
                                className="text-red-600 hover:text-red-900"
                                onClick={() => cancelSubscription(subscription.id)}
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No submissions yet. When customers fill out the form, their data will appear here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'customers':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Manage Customers</h2>
            <p className="text-gray mb-6">View and manage customer accounts.</p>
            {/* Customers content would go here */}
          </div>
        );
      case 'subscriptions':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Manage Subscriptions</h2>
            <p className="text-gray mb-6">View and manage customer subscriptions.</p>
            {/* Subscriptions content would go here */}
          </div>
        );
      case 'analytics':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Analytics Dashboard</h2>
            <p className="text-gray mb-6">View detailed analytics and reports.</p>
            {/* Analytics content would go here */}
          </div>
        );
      case 'messages':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Messages</h2>
            <p className="text-gray mb-6">View and manage customer messages.</p>
            {/* Messages content would go here */}
          </div>
        );
      case 'database':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">Database Management</h2>
            <p className="text-gray mb-6">Monitor and manage the database.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-light p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dark">Database Status</h3>
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                ) : dbStatus?.status === 'Connected' ? (
                  <div>
                    <div className="flex items-center mb-3">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-green-600 font-medium">Connected</span>
                    </div>
                    <p className="text-dark mb-1">Database: <span className="font-medium">{dbStatus?.db}</span></p>
                    <p className="text-dark mb-1">Host: <span className="font-medium">{dbStatus?.host}</span></p>
                    <button 
                      onClick={fetchDbStatus}
                      className="mt-4 bg-pink text-white px-4 py-2 rounded hover:bg-opacity-90"
                    >
                      Refresh Status
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center mb-3">
                      <FaExclamationTriangle className="text-red-500 mr-2" />
                      <span className="text-red-600 font-medium">Connection Issue</span>
                    </div>
                    <p className="text-red-600 mb-3">The database connection is not established. Please check the server logs for more information.</p>
                    <button 
                      onClick={fetchDbStatus}
                      className="mt-2 bg-pink text-white px-4 py-2 rounded hover:bg-opacity-90"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}
              </div>
              
              <div className="bg-light p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-4 text-dark">System Health</h3>
                {loading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                ) : (
                  <div>
                    <p className="text-dark mb-2">
                      Uptime: <span className="font-medium">{Math.floor((systemHealth?.uptime || 0) / 3600)} hours, {Math.floor(((systemHealth?.uptime || 0) % 3600) / 60)} minutes</span>
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium text-dark mb-2">Memory Usage</h4>
                      <ul className="space-y-1 text-gray">
                        <li>RSS: {systemHealth?.memory?.rss || 'N/A'}</li>
                        <li>Heap Total: {systemHealth?.memory?.heapTotal || 'N/A'}</li>
                        <li>Heap Used: {systemHealth?.memory?.heapUsed || 'N/A'}</li>
                      </ul>
                    </div>
                    <button 
                      onClick={fetchSystemHealth}
                      className="mt-4 bg-teal text-dark px-4 py-2 rounded hover:bg-opacity-90"
                    >
                      Refresh Health Data
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-dark">System Settings</h2>
            <p className="text-gray mb-6">Configure system settings and options.</p>
            {/* Settings content would go here */}
          </div>
        );
      default:
        return null;
    }
  };

  const filterSubscriptions = () => {
    if (!dashboardData?.recentSubscriptions) return [];
    
    return dashboardData.recentSubscriptions.filter(sub => {
      const matchesSearch = sub.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.customerBusiness.toLowerCase().includes(searchTerm.toLowerCase());
                          
      const matchesPlan = selectedPlan === 'All Plans' || 
                          sub.plan.toLowerCase() === selectedPlan.toLowerCase();
                          
      const matchesStatus = selectedStatus === 'All Status' || 
                           sub.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesPlan && matchesStatus;
    });
  };

  const verifySubscription = async (subscriptionId) => {
    try {
      await api.put(`/subscriptions/${subscriptionId}/verify`);
      
      toast.success('Subscription verified successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error verifying subscription:', error);
      toast.error('Failed to verify subscription');
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    try {
      await api.put(`/subscriptions/${subscriptionId}/cancel`);
      
      toast.success('Subscription cancelled successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
    }
  };
  
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      toast.info('Data clearing not implemented in demo version.');
    }
  };

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const { data } = await api.get('/dashboard');
      console.log('Dashboard data response:', data);
      
      if (!data.success) {
        console.error('Dashboard API returned error:', data);
        toast.error('Failed to load dashboard data');
        return;
      }
      
      setDashboardData(data.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response && error.response.status === 401) {
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('userInfo');
        navigate('/login');
      } else if (error.response && error.response.status === 403) {
        toast.error('You do not have permission to view this dashboard');
        navigate('/user-dashboard');
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <ToastContainer position="top-right" />
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-purple-700">Local Sathi Admin</h1>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6">
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'dashboard' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('dashboard')}
          >
            <FaChartLine className={`mr-3 ${activeMenuItem === 'dashboard' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'dashboard' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Dashboard</span>
          </div>
          
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'customers' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('customers')}
          >
            <FaUsers className={`mr-3 ${activeMenuItem === 'customers' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'customers' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Customers</span>
          </div>
          
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'subscriptions' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('subscriptions')}
          >
            <FaCreditCard className={`mr-3 ${activeMenuItem === 'subscriptions' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'subscriptions' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Subscriptions</span>
          </div>
          
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'messages' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('messages')}
          >
            <FaEnvelope className={`mr-3 ${activeMenuItem === 'messages' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'messages' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Messages</span>
          </div>
          
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'analytics' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('analytics')}
          >
            <FaChartLine className={`mr-3 ${activeMenuItem === 'analytics' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'analytics' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Analytics</span>
          </div>
          
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeMenuItem === 'settings' ? 'bg-purple-100 border-l-4 border-purple-700' : ''}`}
            onClick={() => setActiveMenuItem('settings')}
          >
            <FaCog className={`mr-3 ${activeMenuItem === 'settings' ? 'text-purple-700' : 'text-gray-500'}`} />
            <span className={`${activeMenuItem === 'settings' ? 'font-medium text-purple-700' : 'text-gray-700'}`}>Settings</span>
          </div>
          
          <div 
            className="flex items-center px-4 py-3 cursor-pointer text-red-500 mt-8"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* User Profile */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="font-medium">Admin User</p>
              <p className="text-sm text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <>
            {activeMenuItem === 'dashboard' && (
              <>
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Total Customers */}
                  <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-700">
                    <h2 className="text-gray-600 mb-2">Total Customers</h2>
                    <p className="text-3xl font-bold">{dashboardData?.stats?.totalCustomers || 124}</p>
                    <p className="text-sm text-green-500 mt-2">
                      ↑ {dashboardData?.stats?.customerGrowthPercent || 12}% from last month
                    </p>
                  </div>
                  
                  {/* Monthly Revenue */}
                  <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h2 className="text-gray-600 mb-2">Monthly Revenue</h2>
                    <p className="text-3xl font-bold">{formatCurrency(dashboardData?.stats?.monthlyRevenue || 62400)}</p>
                    <p className="text-sm text-green-500 mt-2">
                      ↑ {dashboardData?.stats?.revenueGrowthPercent || 8}% from last month
                    </p>
                  </div>
                  
                  {/* Active Subscriptions */}
                  <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h2 className="text-gray-600 mb-2">Active Subscriptions</h2>
                    <p className="text-3xl font-bold">{dashboardData?.stats?.activeSubscriptions || 98}</p>
                    <p className="text-sm text-green-500 mt-2">
                      ↑ {dashboardData?.stats?.subscriptionGrowthPercent || 5}% from last month
                    </p>
                  </div>
                  
                  {/* Pending Verifications */}
                  <div className="bg-white p-6 rounded-lg shadow border-l-4 border-red-500">
                    <h2 className="text-gray-600 mb-2">Pending Verifications</h2>
                    <p className="text-3xl font-bold">{dashboardData?.stats?.pendingVerifications || 7}</p>
                    <p className="text-sm text-red-500 mt-2">
                      ↓ {Math.abs(dashboardData?.stats?.verificationChangePercent || 3)}% from last month
                    </p>
                  </div>
                </div>
                
                {/* Subscriptions Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Subscriptions</h2>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => navigate('/admin/subscriptions')}
                        className="text-purple-700 hover:underline flex items-center"
                      >
                        View All →
                      </button>
                    </div>
                  </div>
                  
                  {/* Search and Filters */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
                    <div className="relative w-full md:w-auto">
                      <input
                        type="text"
                        placeholder="Search customers..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                    
                    <div className="flex space-x-2 w-full md:w-auto">
                      <select
                        className="border rounded-lg px-4 py-2 bg-white w-full md:w-auto"
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                      >
                        <option>All Plans</option>
                        <option>Basic</option>
                        <option>Business</option>
                        <option>Premium</option>
                        <option>Enterprise</option>
                      </select>
                      
                      <select
                        className="border rounded-lg px-4 py-2 bg-white w-full md:w-auto"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option>All Status</option>
                        <option>Pending</option>
                        <option>Active</option>
                        <option>Expired</option>
                        <option>Cancelled</option>
                      </select>
                    </div>

                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedPlan('All Plans');
                        setSelectedStatus('All Status');
                      }}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 ml-auto"
                    >
                      Clear Filters
                    </button>
                  </div>
                  
                  {/* Subscriptions Table */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Plan
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filterSubscriptions().length > 0 ? (
                          filterSubscriptions().map((subscription) => (
                            <tr key={subscription.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{subscription.customer}</div>
                                    <div className="text-sm text-gray-500">{subscription.customerEmail}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}</div>
                                <div className="text-sm text-gray-500">{subscription.customerBusiness}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatCurrency(subscription.amount)}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(subscription.date).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                                     subscription.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                     subscription.status === 'expired' ? 'bg-red-100 text-red-800' : 
                                     'bg-gray-100 text-gray-800'}`}
                                >
                                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  <button 
                                    className="text-indigo-600 hover:text-indigo-900"
                                    onClick={() => navigate(`/admin/subscriptions/${subscription.id}`)}
                                  >
                                    <FaEye />
                                  </button>
                                  
                                  {subscription.status === 'pending' && !subscription.isVerified && (
                                    <button 
                                      className="text-green-600 hover:text-green-900"
                                      onClick={() => verifySubscription(subscription.id)}
                                    >
                                      <FaCheck />
                                    </button>
                                  )}
                                  
                                  {subscription.status === 'pending' && (
                                    <button 
                                      className="text-red-600 hover:text-red-900"
                                      onClick={() => cancelSubscription(subscription.id)}
                                    >
                                      <FaTimes />
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                              No submissions yet. When customers fill out the form, their data will appear here.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
            
            {activeMenuItem === 'messages' && (
              <>
                <h1 className="text-2xl font-bold mb-6">Messages</h1>
                
                {/* Messages Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData?.recentMessages && dashboardData.recentMessages.length > 0 ? (
                        dashboardData.recentMessages.map((message) => (
                          <tr key={message._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{message.name}</div>
                              <div className="text-sm text-gray-500">{message.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{message.subject}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 truncate max-w-xs">{message.message}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {new Date(message.createdAt).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${message.status === 'responded' ? 'bg-green-100 text-green-800' : 
                                   message.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                                   'bg-gray-100 text-gray-800'}`}
                              >
                                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => navigate(`/admin/messages/${message._id}`)}
                                >
                                  <FaEye />
                                </button>
                                
                                <button 
                                  className="text-green-600 hover:text-green-900"
                                  onClick={() => navigate(`/admin/messages/${message._id}/reply`)}
                                >
                                  <FaReply />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                            No messages yet. When customers submit contact forms, they will appear here.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      {/* Toast notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default AdminDashboard; 