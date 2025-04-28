import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';

const FeaturesPage = () => {
  const features = [
    {
      title: 'Instant Reply',
      description: 'Respond to customer queries 24/7 without delays.',
      icon: 'clock'
    },
    {
      title: 'Human Handoff',
      description: 'Seamlessly transfer complex conversations to your team.',
      icon: 'users'
    },
    {
      title: 'Insights & Analytics',
      description: 'Analyze customer queries to improve your business.',
      icon: 'chart-bar'
    },
    {
      title: 'Multi-language Support',
      description: 'Support customers in English, Hindi, Bengali, Marathi and other languages.',
      icon: 'language'
    },
    {
      title: 'Voice Interactions',
      description: 'Enable voice-based conversations for accessibility.',
      icon: 'microphone'
    },
    {
      title: 'Custom Branding',
      description: 'Customize the chatbot with your business identity.',
      icon: 'palette'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Powerful Features</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Local Sathi comes packed with features designed to help small businesses in India provide excellent customer support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to improve your customer support?</h2>
              <p className="text-xl mb-8">Get started with Local Sathi today!</p>
              <a 
                href="/pricing" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium text-lg hover:bg-blue-50 transition duration-300"
              >
                View Pricing Plans
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage; 