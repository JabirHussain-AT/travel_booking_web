'use client';

import { useEffect, useRef, useState } from 'react';

export default function AboutUs() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    destinations: 0,
    staycations: 0,
    clients: 0,
  });

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Default dynamic stats (can come from API later)
  const stats = {
    years: 8,
    destinations: 16,
    staycations: 450,
    clients: 5000,
  };

  // Observer for triggering animation once
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  // Animated counting logic (stops correctly)
  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000;
    const startValues = { ...counts };
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      setCounts({
        years: Math.floor(progress * stats.years),
        destinations: Math.floor(progress * stats.destinations),
        staycations: Math.floor(progress * stats.staycations),
        clients: Math.floor(progress * stats.clients),
      });
      if (progress < 1) requestAnimationFrame(animate);
      else {
        // Ensure exact values at the end
        setCounts(stats);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        {/* Tagline */}
        <p className="text-sm uppercase tracking-widest text-[#E51A4B] font-semibold mb-3">
          Stay. Explore. Feel More.
        </p>

        {/* Title with gradient */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#E51A4B] to-[#ff6a88] text-transparent bg-clip-text">
          About Tripeloo
        </h2>

        {/* Description — more elegant spacing and readability */}
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-12">
          <span className="font-semibold text-gray-900">Tripeloo</span> isn’t just a travel brand — it’s an experience.  
          We believe every journey should tell a story, spark emotion, and awaken curiosity.  
          With our passion for discovery and dedication to excellence, we craft experiences that go beyond travel —  
          they redefine connection with places and people.  
          <br /><br />
          Born from the love of exploration, <span className="font-semibold text-gray-900">Tripeloo</span> was founded by explorers who dreamed of
          blending adventure, comfort, and authenticity. From curated staycations to breathtaking destinations,
          our goal is to make every traveler feel at home anywhere in the world.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10">
          <StatCard number={counts.years || 0} suffix="+" label="Years in Industry" />
          <StatCard number={counts.destinations || 0} suffix="+" label="Destinations" />
          <StatCard number={counts.staycations || 0} suffix="+" label="Staycations" />
          <StatCard number={Math.floor(counts.clients / 1000) || 0} suffix="k+" label="Happy Clients" />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  number,
  suffix,
  label,
}: {
  number: number;
  suffix: string;
  label: string;
}) {
  return (
    <div
      className="flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${Math.random() * 0.3 + 0.1}s`, animationFillMode: 'forwards' }}
    >
      <h3 className="text-4xl sm:text-5xl font-extrabold text-[#E51A4B] mb-2">
        {number}
        <span className="text-2xl sm:text-3xl font-bold">{suffix}</span>
      </h3>
      <p className="text-sm sm:text-base text-gray-700 font-medium">{label}</p>
    </div>
  );
}
