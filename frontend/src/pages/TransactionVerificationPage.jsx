import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TransactionVerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || { formData: {} };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [transactionData, setTransactionData] = useState({
    transactionId: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: '',
    screenshot: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleFileChange = (e) => {
    setTransactionData({ ...transactionData, screenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Generate a reference number with timestamp to ensure uniqueness
    const timestamp = new Date().getTime();
    const reference = 'REF-' + timestamp + '-' + Math.floor(1000 + Math.random() * 9000);
    
    try {
      // Get the user token from local storage
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      
      if (!userInfo.token) {
        throw new Error('You must be logged in to submit a subscription');
      }
      
      // Set up plan prices
      const planPrices = {
        basic: 599,
        business: 999,
        premium: 1499,
        enterprise: 2599,
      };
      
      // Create the subscription data
      const subscriptionData = {
        plan: formData.plan || 'premium',
        price: planPrices[formData.plan || 'premium'],
        paymentReference: transactionData.transactionId || reference,
        paymentMethod: transactionData.paymentMethod,
      };
      
      console.log('Sending subscription data:', subscriptionData);
      
      // Send the subscription data to the backend
      const response = await axios.post('/api/subscriptions', subscriptionData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      
      console.log('Subscription created:', response.data);
      
      // If a screenshot was uploaded, you could handle that here with FormData
      if (transactionData.screenshot) {
        const formData = new FormData();
        formData.append('screenshot', transactionData.screenshot);
        formData.append('subscriptionId', response.data.data._id);
        
        await axios.post('/api/subscriptions/upload-proof', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
      }
      
      // Navigate to confirmation page with all the data
      navigate('/subscription-confirmed', { 
        state: { 
          formData,
          transactionData,
          reference: transactionData.transactionId || reference,
          subscriptionId: response.data.data._id
        } 
      });
    } catch (err) {
      console.error('Error creating subscription:', err);
      setError(err.response?.data?.message || 'Failed to create subscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Transaction Details</h1>
              <p className="text-gray-600 mt-2">Please provide the transaction details for verification.</p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-full relative">
                  <div className="flex items-center justify-between z-10 relative">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step === 3 
                            ? 'bg-secondary-500 text-white' 
                            : step < 3 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {step < 3 ? '✓' : step}
                      </div>
                    ))}
                  </div>
                  <div className="absolute h-1 bg-gray-200 top-4 left-0 right-0 -z-10"></div>
                  <div 
                    className="absolute h-1 bg-green-500 top-4 left-0 -z-10 transition-all duration-300"
                    style={{ width: `66.66%` }}
                  ></div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction ID/Reference Number
                </label>
                <input
                  type="text"
                  id="transactionId"
                  name="transactionId"
                  value={transactionData.transactionId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  placeholder="Please enter transaction ID"
                />
                <p className="text-xs text-gray-500 mt-1">Please enter transaction ID</p>
              </div>
              
              <div>
                <label htmlFor="paymentDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  id="paymentDate"
                  name="paymentDate"
                  value={transactionData.paymentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={transactionData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="paytm">PayTM</option>
                  <option value="googlepay">Google Pay</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="upi">Other UPI</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="screenshot" className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Screenshot (optional)
                </label>
                <input
                  type="file"
                  id="screenshot"
                  name="screenshot"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload a screenshot of your payment for faster verification
                </p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300 disabled:opacity-70"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TransactionVerificationPage; 