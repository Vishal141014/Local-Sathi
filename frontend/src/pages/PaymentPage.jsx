import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || { formData: {} };

  // Plan prices
  const planPrices = {
    basic: 599,
    business: 999,
    premium: 1499,
    enterprise: 2599,
  };

  const handleNext = () => {
    navigate('/verify-transaction', { state: { formData } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Payment Information</h1>
              <p className="text-gray-600 mt-2">Please scan the QR code below to make payment for your selected plan:</p>
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
                          step === 2 
                            ? 'bg-secondary-500 text-white' 
                            : step < 2 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {step < 2 ? '✓' : step}
                      </div>
                    ))}
                  </div>
                  <div className="absolute h-1 bg-gray-200 top-4 left-0 right-0 -z-10"></div>
                  <div 
                    className="absolute h-1 bg-green-500 top-4 left-0 -z-10 transition-all duration-300"
                    style={{ width: `33.33%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mb-8 text-center">
              <div className="bg-primary-50 p-4 inline-block rounded-lg mb-4">
                <h2 className="text-xl font-semibold mb-2">
                  {formData.plan && formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)} Plan
                </h2>
                <p className="text-3xl font-bold text-primary-600">
                  ₹{formData.plan ? planPrices[formData.plan] : 1499}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm inline-block mb-4">
                <img 
                  src="/images/payment-qr.png" 
                  alt="Payment QR Code" 
                  className="w-64 h-64"
                />
              </div>
              <p className="text-sm text-gray-600 mb-1">UPI: 7533034026@juspay</p>
              <p className="text-sm text-gray-500 mb-6">
                Scan with any UPI app like PayTM, Google Pay, PhonePe, etc.
              </p>
              
              <div className="flex justify-center space-x-6 mb-6">
                <img src="/images/paytm-logo.png" alt="PayTM" className="h-8" />
                <img src="/images/upi-logo.png" alt="UPI" className="h-8" />
                <img src="/images/googlepay-logo.png" alt="Google Pay" className="h-8" />
                <img src="/images/phonepe-logo.png" alt="PhonePe" className="h-8" />
              </div>
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
                type="button"
                onClick={handleNext}
                className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300"
              >
                I've Completed Payment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentPage; 