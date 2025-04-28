import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUserFriends, FaChartBar, FaGlobe, FaMicrophone, FaPalette, FaArrowRight } from 'react-icons/fa';
import { SiWhatsapp, SiTelegram, SiGoogle, SiFacebook, SiInstagram } from 'react-icons/si';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import TestimonialCard from '../components/TestimonialCard';
import PricingCard from '../components/PricingCard';

const HomePage = () => {
  const features = [
    {
      icon: <FaSearch className="h-6 w-6 text-primary-500" />,
      title: 'Instant Reply',
      description: 'Respond to customer queries 24/7 without delays, even when you\'re busy or offline.'
    },
    {
      icon: <FaUserFriends className="h-6 w-6 text-primary-500" />,
      title: 'Human Handoff',
      description: 'Seamlessly transfer complex conversations to your team when human touch is needed.'
    },
    {
      icon: <FaChartBar className="h-6 w-6 text-primary-500" />,
      title: 'Insights & Analytics',
      description: 'Store and analyze customer queries to improve your business and identify opportunities.'
    },
    {
      icon: <FaGlobe className="h-6 w-6 text-primary-500" />,
      title: 'Multi-language',
      description: 'Support your customers in English, Hindi, Bengali, Marathi and other regional languages.'
    },
    {
      icon: <FaMicrophone className="h-6 w-6 text-primary-500" />,
      title: 'Voice Interactions',
      description: 'Enable voice-based conversations for more natural and accessible customer interactions.'
    },
    {
      icon: <FaPalette className="h-6 w-6 text-primary-500" />,
      title: 'Custom Branding',
      description: 'Customize the chatbot interface with your business colors, logo, and terminology.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Salon Owner',
      image: '/images/testimonial1.jpg',
      rating: 5,
      testimonial: 'Local Sathi has been a game-changer for my salon. It handles appointment scheduling seamlessly, reducing no-shows by sending customers timely reminders. We\'ve seen a 30% increase in bookings!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Grocery Store Owner',
      image: '/images/testimonial2.jpg',
      rating: 4,
      testimonial: 'As a small grocery store owner, I was skeptical about AI, but Local Sathi proved me wrong. It answers common order inquiries and delivery questions perfectly, saving me at least 2 hours daily.'
    },
    {
      name: 'Priya Sharma',
      role: 'Coaching Center Director',
      image: '/images/testimonial3.jpg',
      rating: 5,
      testimonial: 'My coaching center has grown since implementing Local Sathi. Parents get immediate responses to their questions about courses and fees, and we\'ve reduced our phone call volume by 40%!'
    }
  ];

  const pricingPlans = [
    {
      plan: 'Basic',
      price: 599,
      features: [
        'Telegram Integration',
        'Single Language Support',
        'Up to 500 messages/month',
        'Basic Analytics',
        'Email Support'
      ],
      disabledFeatures: [
        'WhatsApp Integration',
        'Human Handoff'
      ]
    },
    {
      plan: 'Business',
      price: 999,
      isPopular: true,
      trialDays: 14,
      features: [
        'Premium customer support',
        'Full service access',
        'Priority request handling',
        'Extended hours assistance',
        '24/7 local assistance',
      ],
      disabledFeatures: []
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with improved styling and animation */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 pt-28 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <div className="relative">
                <span className="absolute -top-4 -left-4 bg-secondary-100 text-secondary-700 px-3 py-1 text-xs font-medium rounded-full">
                  AI-Powered
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 mt-4">
                Grow Your Business <br />
                <span className="text-primary-600 relative">
                  with Local Sathi
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-secondary-400"></span>
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Instant AI-powered Customer Support on WhatsApp and Telegram
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/subscribe"
                  className="px-6 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <a
                  href="https://t.me/LocalSathiBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white text-primary-600 font-medium rounded-md border border-primary-500 hover:bg-gray-50 transition duration-300 text-center shadow-sm hover:shadow-md flex items-center"
                >
                  <SiTelegram className="mr-2" /> Try Demo
                </a>
              </div>
              <div className="flex flex-wrap mt-6 gap-4">
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">Multi-Language Support</span>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">Voice Interaction</span>
                <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">Business Customization</span>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 -bottom-6 -left-6 bg-primary-100 rounded-2xl transform rotate-3"></div>
                <img
                  src="/images/home.jpeg"
                  alt="Local Sathi Customer Support"
                  className="relative w-full h-auto rounded-lg shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Bot Demo Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">Try Our Demo</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience Our Local Sathi Bot</h2>
              <p className="text-lg text-gray-600 mb-6">
                Get a hands-on experience with our Telegram bot. Ask questions, explore features, and see how it can help your business.
              </p>
              <div className="flex items-center p-4 bg-white rounded-lg shadow-md border border-blue-100">
                <div className="mr-4 text-blue-500">
                  <SiTelegram className="h-12 w-12" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Local Sathi Bot</h3>
                  <p className="text-sm text-gray-600 mb-2">Intelligent AI assistant for your business needs</p>
                  <a 
                    href="https://t.me/LocalSathiBot" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Try on Telegram <SiTelegram className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <div className="relative">
                <div className="bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 bg-blue-500 rounded-full p-2">
                      <SiTelegram className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Local Sathi Bot</h3>
                      <p className="text-sm text-gray-500">Online | Telegram Bot</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm">Hello! How can I help you with your business needs today?</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg max-w-xs ml-auto">
                      <p className="text-sm">I want to learn more about your services.</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                      <p className="text-sm">I'd be happy to tell you about our services! We offer personalized learning plans, expert guidance, and interactive content.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">Experience the full conversation on Telegram</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 -z-10 bg-blue-200 h-full w-full rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-3">Features</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Features for Your Business</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Local Sathi comes packed with everything you need to provide exceptional customer support
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-600 rounded-full text-sm font-medium mb-3">Integrations</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Integrations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with the platforms your customers already use
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-8">
            <div className="text-center transform transition-transform duration-300 hover:scale-110">
              <div className="bg-green-50 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-3 shadow-md">
                <SiWhatsapp className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-sm font-medium">WhatsApp</p>
            </div>
            <div className="text-center transform transition-transform duration-300 hover:scale-110">
              <a href="https://t.me/LocalSathiBot" target="_blank" rel="noopener noreferrer" className="block">
                <div className="bg-blue-50 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-3 shadow-md">
                  <SiTelegram className="h-8 w-8 text-blue-500" />
                </div>
                <p className="text-sm font-medium">Telegram</p>
              </a>
            </div>
            <div className="text-center transform transition-transform duration-300 hover:scale-110">
              <div className="bg-gray-50 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-3 shadow-md">
                <SiGoogle className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Google Business</p>
            </div>
            <div className="text-center transform transition-transform duration-300 hover:scale-110">
              <div className="bg-blue-50 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-3 shadow-md">
                <SiFacebook className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm font-medium">Facebook</p>
            </div>
            <div className="text-center transform transition-transform duration-300 hover:scale-110">
              <div className="bg-pink-50 p-4 rounded-full inline-flex items-center justify-center w-16 h-16 mb-3 shadow-md">
                <SiInstagram className="h-8 w-8 text-pink-600" />
              </div>
              <p className="text-sm font-medium">Instagram</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-3">Pricing</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works for your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan.plan}
                price={plan.price}
                isPopular={plan.isPopular}
                features={plan.features}
                disabledFeatures={plan.disabledFeatures}
                trialDays={plan.trialDays}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/pricing"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all pricing plans <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-3">Testimonials</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                image={testimonial.image}
                rating={testimonial.rating}
                testimonial={testimonial.testimonial}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/testimonials"
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              Read more success stories <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-xl p-8 md:p-12 max-w-5xl mx-auto overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M42.5,-65.4C55.9,-58.8,68.4,-49.1,76.9,-36.1C85.5,-23.1,90.1,-6.7,87.6,8.5C85.1,23.7,75.5,37.7,64.4,49.6C53.3,61.5,40.8,71.2,26.5,77.8C12.3,84.4,-3.6,87.8,-19.2,84.6C-34.8,81.4,-50.1,71.6,-61.3,58.8C-72.6,46.1,-79.8,30.3,-81.7,14.1C-83.7,-2.1,-80.5,-18.8,-72.9,-32.6C-65.3,-46.5,-53.4,-57.5,-40.2,-64.1C-27,-70.7,-13.5,-72.9,0.4,-73.6C14.4,-74.3,28.7,-73.5,42.5,-65.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="relative text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let us show you how Local Sathi can help your small business provide exceptional customer support 24/7.
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-6">
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <span className="text-white font-medium">info@localsathi.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <span className="mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </span>
                  <span className="text-white font-medium">+91 9999999</span>
                </div>
                <Link 
                  to="/contact" 
                  className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-opacity-90 transition duration-300 text-center shadow-md transform hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage; 