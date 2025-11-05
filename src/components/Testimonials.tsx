'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    image: '/images/bungee.jpg',
    name: 'Fasnim',
    location: 'Calicut',
    feedback:
      'Happy to share here the experience we had with Tripeloo to Munnar. Team emblazed a beautiful ladies-only trip through the flora of the destination, planned and accompanied by their hospitality wherever we checked in. The cab driver, a beautiful soul, needs a special mention. The property assigned helped us settle in a calm and peaceful atmosphere away from the chaos of travel crowds. It was a wholesome experience that refreshed our minds for the next trip to come.',
  },
  {
    image: '/images/bungee.jpg',
    name: 'Arjun',
    location: 'Bangalore',
    feedback:
      'Tripeloo made our honeymoon trip truly unforgettable. From the staycation selection to travel arrangements, everything was seamless. Their attention to detail and support throughout the journey were outstanding. Highly recommended!',
  },
  {
    image: '/images/bungee.jpg',
    name: 'Sana',
    location: 'Kochi',
    feedback:
      'A wonderful experience! Tripeloo crafted an itinerary perfectly suited for our family. Every hotel, every location felt handpicked with care. Thank you for the beautiful memories!',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-12 bg-gradient-to-r from-[#E51A4B] to-[#ff6a88] text-transparent bg-clip-text">
          What Our Travelers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Feedback */}
          <div className="bg-[#fff8f4] p-8 rounded-xl shadow-sm text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                  {testimonials[current].feedback}
                </p>
                <div>
                  <p className="font-semibold text-[#E51A4B] text-base">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonials[current].location}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? 'bg-[#E51A4B]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
