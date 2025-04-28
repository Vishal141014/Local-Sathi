import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Demo = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Try Our Demo</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience Local Sathi in action with our live demo bots across different platforms.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Telegram Demo */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center h-20 mb-4">
                <img
                  src="/images/telegram-logo.png"
                  alt="Telegram"
                  className="h-16"
                  onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg'}
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Telegram Bot</h3>
              <p className="text-gray-600 mb-5 text-center">
                Our Telegram bot demonstrates the full capabilities of Local Sathi with quick responses and natural conversations.
              </p>
              <div className="flex justify-center">
                <a
                  href="https://t.me/LocalSathiBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-200 inline-flex items-center"
                >
                  Try on Telegram
                </a>
              </div>
            </div>
            
            {/* WhatsApp Demo - Coming Soon */}
            <div className="bg-white p-6 rounded-lg shadow-md opacity-75">
              <div className="flex items-center justify-center h-20 mb-4">
                <img
                  src="/images/whatsapp-logo.png"
                  alt="WhatsApp"
                  className="h-16"
                  onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'}
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">WhatsApp Bot</h3>
              <p className="text-gray-600 mb-5 text-center">
                Our WhatsApp integration is coming soon. Sign up for early access to our WhatsApp demo bot.
              </p>
              <div className="flex justify-center">
                <button
                  disabled
                  className="bg-gray-300 text-gray-600 font-medium py-2 px-6 rounded-md cursor-not-allowed inline-flex items-center"
                >
                  Coming Soon
                </button>
              </div>
            </div>
            
            {/* Web Widget Demo */}
            <div className="bg-white p-6 rounded-lg shadow-md opacity-75">
              <div className="flex items-center justify-center h-20 mb-4">
                <img
                  src="/images/web-logo.png"
                  alt="Web Widget"
                  className="h-16"
                  onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'}
                />
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">Web Widget</h3>
              <p className="text-gray-600 mb-5 text-center">
                Explore our web chat widget that can be integrated seamlessly into any website with minimal code.
              </p>
              <div className="flex justify-center">
                <button
                  disabled
                  className="bg-gray-300 text-gray-600 font-medium py-2 px-6 rounded-md cursor-not-allowed inline-flex items-center"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">What You Can Try</h2>
            <p className="text-gray-700 mb-6">
              Our demo bots can handle a variety of interactions to showcase the capabilities of Local Sathi:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">Ask about products and services</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">Check business hours and location</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">Inquire about pricing and availability</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">Test multi-language support by changing languages</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-700">Experience the handoff process to a human agent</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Demo; 