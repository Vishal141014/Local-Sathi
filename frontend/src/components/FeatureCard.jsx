import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary-100 p-3 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard; 