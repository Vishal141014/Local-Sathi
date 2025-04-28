import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const planFromQuery = searchParams.get('plan');

  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    businessName: '',
    businessType: '',
    plan: planFromQuery || 'premium', // Default to premium if no plan is provided
  });

  // Plan prices
  const planPrices = {
    basic: 599,
    business: 999,
    premium: 1499,
    enterprise: 2599,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically submit the form data to your backend
    navigate('/payment', { state: { formData } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Subscribe to Local Sathi</h1>
              <p className="text-gray-600 mt-2">Complete your subscription details below to get started</p>
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
                          step === formStep 
                            ? 'bg-secondary-500 text-white' 
                            : step < formStep 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {step < formStep ? '✓' : step}
                      </div>
                    ))}
                  </div>
                  <div className="absolute h-1 bg-gray-200 top-4 left-0 right-0 -z-10"></div>
                  <div 
                    className="absolute h-1 bg-green-500 top-4 left-0 -z-10 transition-all duration-300"
                    style={{ width: `${(formStep - 1) * 33.33}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {formStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Business Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="retail">Retail</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="service">Service Business</option>
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                    <select
                      id="plan"
                      name="plan"
                      value={formData.plan}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="basic">Basic - ₹599/month</option>
                      <option value="business">Business - ₹999/month</option>
                      <option value="premium">Premium - ₹1499/month</option>
                      <option value="enterprise">Enterprise - ₹2599/month</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Plan Summary</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)} Plan
                    </h3>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{planPrices[formData.plan]}<span className="text-sm text-gray-500">/month</span>
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan Price</span>
                      <span className="font-medium">₹{planPrices[formData.plan]}/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Free Trial</span>
                      <span className="font-medium">14 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Billing Date</span>
                      <span className="font-medium">
                        {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="block text-gray-500">Name</span>
                      <span className="font-medium">{formData.fullName}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Email</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Phone</span>
                      <span className="font-medium">{formData.phone}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Business</span>
                      <span className="font-medium">{formData.businessName}</span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Business Type</span>
                      <span className="font-medium">
                        {formData.businessType.charAt(0).toUpperCase() + formData.businessType.slice(1)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-gray-500">Address</span>
                      <span className="font-medium">{formData.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition duration-300"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionForm; 