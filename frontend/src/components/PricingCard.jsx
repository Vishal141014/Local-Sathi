import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingCard = ({ 
  plan, 
  price, 
  isPopular = false, 
  features = [], 
  disabledFeatures = [],
  trialDays = 0
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full ${isPopular ? 'border-2 border-secondary-400 relative' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-secondary-400 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
          Most Popular
        </div>
      )}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold mb-2">{plan}</h3>
        <div className="flex justify-center items-baseline">
          <span className="text-3xl font-bold">₹{price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
        {trialDays > 0 && (
          <p className="text-sm text-secondary-500 mt-2">
            Start with a {trialDays} day free trial
          </p>
        )}
      </div>
      <div className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
        {disabledFeatures.map((feature, index) => (
          <div key={index} className="flex items-start text-gray-400">
            <FaTimes className="text-gray-300 mt-1 mr-2 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto">
        <Link
          to={`/subscribe?plan=${plan.toLowerCase()}`}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isPopular 
              ? 'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-500' 
              : 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-500'
          }`}
        >
          Start Free Trial
        </Link>
      </div>
    </div>
  );
};

export default PricingCard; 