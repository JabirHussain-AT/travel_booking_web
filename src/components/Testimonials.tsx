"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Fasnim",
    location: "Calicut",
    text: "Happy to share here the experience we had with Navigo Trips to Munnar. Team emblazed a beautiful lady’s only trip through the flora of the destination...",
    image: "/images/bungee.jpg",
  },
  {
    id: 2,
    name: "Adil",
    location: "Kochi",
    text: "It was such a wholesome experience that helped us refresh the mind and stay in the present.",
    image: "/images/bungee.jpg",
  },
  {
    id: 3,
    name: "Sara",
    location: "Bangalore",
    text: "Tripeloo took care of everything from hotel to transport. Highly recommended!",
    image: "/images/bungee.jpg",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    resetTimer();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Swipe detection (for mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) handleNext(); // swipe left → next
      else handlePrev(); // swipe right → previous
    }
  };

  const current = testimonials[index];

  return (
    <section className="bg-gray-50 py-16 overflow-hidden">
      <div
        className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE SECTION */}
        <div className="relative w-full h-80 sm:h-[400px] overflow-hidden rounded-2xl shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* TEXT SECTION */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + "-text"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-md"
          >
            <p className="text-gray-700 mb-6 leading-relaxed">{current.text}</p>
            <h4 className="font-semibold text-gray-900">{current.name}</h4>
            <p className="text-sm text-gray-600">{current.location}</p>

            {/* DOTS NAVIGATION */}
            <div className="flex justify-start gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === index ? "bg-gray-900 scale-110" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
