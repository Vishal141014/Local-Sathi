import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaCopy } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SubscriptionConfirmationPage = () => {
  const location = useLocation();
  const { formData, transactionData, reference } = location.state || { 
    formData: {}, 
    transactionData: {},
    reference: 'REF-' + Math.floor(100000 + Math.random() * 900000)
  };

  const handleCopyReference = () => {
    navigator.clipboard.writeText(reference);
    alert('Reference number copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-10">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <FaCheckCircle className="text-green-500 text-5xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You for Your Subscription!</h1>
              <p className="text-gray-600">
                We have received your payment details. Our team will verify your payment 
                and contact you within 24 hours to set up your Local Sathi account. If you 
                have any questions, please feel free to contact us.
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-2">
                <div className="w-full relative">
                  <div className="flex items-center justify-between z-10 relative">
                    {[1, 2, 3, 4].map((step) => (
                      <div 
                        key={step} 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-green-500 text-white"
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <div className="absolute h-1 bg-green-500 top-4 left-0 right-0 -z-10"></div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center mb-8">
              <p className="text-sm text-gray-600 mb-2">Please save this reference number for future communications:</p>
              <div className="flex items-center justify-center">
                <div className="border border-gray-300 rounded-md px-4 py-2 bg-white inline-flex items-center">
                  <span className="font-mono text-lg font-semibold mr-2">{reference}</span>
                  <button 
                    onClick={handleCopyReference} 
                    className="text-gray-500 hover:text-primary-500"
                    aria-label="Copy reference number"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8 text-center">
              <h3 className="text-lg font-semibold mb-3">Next Steps</h3>
              <ol className="list-decimal text-left max-w-md mx-auto space-y-2 text-gray-600">
                <li>Our team will verify your payment within 24 hours.</li>
                <li>You'll receive an email with your account credentials.</li>
                <li>You can then log in to your dashboard and start setting up your chatbot.</li>
                <li>Our support team will contact you for any additional information needed.</li>
              </ol>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-3 text-center">Need Assistance?</h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4 text-center">
                <div>
                  <p className="text-sm font-medium text-gray-700">Email Support</p>
                  <p className="text-primary-600">support@localsathi.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone Support</p>
                  <p className="text-primary-600">+91 9876542210</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                to="/"
                className="px-6 py-2 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300 inline-block"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubscriptionConfirmationPage; 