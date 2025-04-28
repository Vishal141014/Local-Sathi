import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const TestimonialCard = ({ name, role, image, rating, testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-md h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute -top-4 -left-4 text-primary-100">
        <FaQuoteLeft size={80} />
      </div>
      
      <div className="relative">
        {/* Avatar and info */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-100 shadow-md mr-4 flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/logo.png'; // fallback image
              }}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
            <p className="text-sm text-primary-600">{role}</p>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < rating ? 'text-yellow-500' : 'text-gray-300'}
                  size={14}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Testimonial text */}
        <p className="text-gray-700 mb-4 relative z-10 italic">"{testimonial}"</p>
      </div>
    </div>
  );
};

export default TestimonialCard; 