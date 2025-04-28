import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PricingCard from '../components/PricingCard';

const PricingPage = () => {
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
        'Basic member benefits',
        '24/7 local assistance',
        'Exclusive member benefits'
      ],
      disabledFeatures: []
    },
    {
      plan: 'Premium',
      price: 1499,
      features: [
        'All Business Features',
        'Multi-Language Support',
        'Unlimited Messages',
        'Multiple Team Members',
        'Custom Integrations',
        'Dedicated Account Manager',
        '24/7 Priority Support'
      ],
      disabledFeatures: []
    },
    {
      plan: 'Enterprise',
      price: 2599,
      features: [
        'All Premium Features',
        'White-label Solution',
        'Custom Development',
        'On-premise Option',
        'SLA Guarantees',
        'API Access',
        'Enterprise Support'
      ],
      disabledFeatures: []
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-gray-600">Choose the plan that works for your business</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I change plans later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major UPI payments including PayTM, Google Pay, PhonePe, and direct bank transfers.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">How do the free trials work?</h3>
              <p className="text-gray-600">You can start with a free trial period, depending on the plan. No payment is required during the trial. You'll only be charged when the trial ends and you decide to continue.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What happens if I exceed my message limit?</h3>
              <p className="text-gray-600">If you exceed your monthly message limit, you can continue using the service at additional per-message rates, or upgrade to a higher tier plan with more messages included.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Do you offer discounts for annual plans?</h3>
              <p className="text-gray-600">Yes, we offer a 15% discount when you choose to pay annually instead of monthly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started with Local Sathi?</h2>
            <p className="text-lg text-gray-600 mb-8">Choose your plan and start providing excellent customer support today.</p>
            <a
              href="/subscribe"
              className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition duration-300 inline-block"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage; 