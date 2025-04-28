import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TestimonialCard from '../components/TestimonialCard';

const TestimonialsPage = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      business: 'Kumar General Store',
      location: 'Delhi',
      content: 'Local Sathi has transformed how we handle customer queries. Our response time has decreased from hours to seconds, and customers love the instant support.',
      rating: 5,
      image: '/images/testimonial1.jpg'
    },
    {
      name: 'Priya Sharma',
      business: 'Sharma Electronics',
      location: 'Mumbai',
      content: 'The multi-language support has been a game-changer for our business. We can now serve customers in Hindi, Marathi, and English without any language barriers.',
      rating: 5,
      image: '/images/testimonial2.jpg'
    },
    {
      name: 'Amit Patel',
      business: 'Patel Textiles',
      location: 'Ahmedabad',
      content: 'The analytics dashboard gives us valuable insights into what our customers are asking about, helping us improve our product descriptions and avoid common issues.',
      rating: 4,
      image: '/images/testimonial3.jpg'
    },
    {
      name: 'Sunita Gupta',
      business: 'Gupta Medical Store',
      location: 'Jaipur',
      content: 'We were skeptical about using an AI chatbot for our pharmacy, but Local Sathi has been excellent. It handles basic queries and seamlessly hands over to our pharmacists when needed.',
      rating: 5,
      image: '/images/testimonial4.jpg'
    },
    {
      name: 'Mohammed Khan',
      business: 'Khan Auto Parts',
      location: 'Hyderabad',
      content: 'The voice interaction feature has been particularly useful for our older customers who find typing difficult. They can simply speak their queries and get instant responses.',
      rating: 4,
      image: '/images/testimonial5.jpg'
    },
    {
      name: 'Lakshmi Nair',
      business: 'Nair Groceries',
      location: 'Kochi',
      content: 'Local Sathi has helped us compete with bigger stores by providing 24/7 support to our customers. The pricing is reasonable for small businesses like ours.',
      rating: 5,
      image: '/images/testimonial6.jpg'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Customer Success Stories</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover how Local Sathi is helping small businesses across India provide exceptional customer support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard 
                  key={index}
                  name={testimonial.name}
                  business={testimonial.business}
                  location={testimonial.location}
                  content={testimonial.content}
                  rating={testimonial.rating}
                  image={testimonial.image}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Join These Satisfied Businesses</h2>
              <p className="text-xl text-gray-600 mb-8">
                Local Sathi is designed specifically for small businesses in India. Join hundreds of businesses that are already providing exceptional customer support.
              </p>
              <a 
                href="/pricing" 
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-300 inline-block"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage; 