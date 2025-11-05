"use client";

import Image from "next/image";

function TentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className="inline h-[0.7em] w-[0.7em] align-baseline"
    >
      <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 20l9-16 9 16M4 20h16M9 20l3-6 3 6" />
    </svg>
  );
}

export function Hero() {
  const onNav = (hash: string) => {
    if (typeof window !== "undefined") {
      window.location.hash = hash;
      const el = document.getElementById("explore");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative">
      <div className="relative h-[100svh] sm:h-[100vh] w-full overflow-hidden rounded-none bg-gray-100">
        <Image
          src="https://cdn.pixabay.com/photo/2018/03/29/19/33/aurora-3273419_1280.jpg"
          alt="Lush green hills background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Moving marquee */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="marquee select-none w-full">
            <div className="marquee__track">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="marquee__item text-[6vw] font-serif  leading-none tracking-tight">
                  <button onClick={() => onNav("stays")} className="hover:text-brand transition-colors">
                    Stays
                  </button>
                  <span className="px-6 align-middle">
                    <TentIcon />
                  </span>
                  <button onClick={() => onNav("things-to-do")} className="hover:text-brand transition-colors">
                    Things to Do
                  </button>
                  <span className="px-6 align-middle">
                    <TentIcon />
                  </span>
                  <button onClick={() => onNav("trips")} className="hover:text-brand transition-colors">
                    Trips
                  </button>
                  <span className="px-6 align-middle">
                    <TentIcon />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom-left row: short text + rotating circular download icon */}
        <div className="absolute left-0 right-0 bottom-6 sm:bottom-8">
          <div className="container flex items-center justify-start gap-4">
            <p className="max-w-xs text-white text-sm sm:text-base font-light leading-relaxed animate-slideUp opacity-0" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
              Your gateway to unforgettable trips and stays.
              <br />
              Let's travel together!
            </p>
            <div className="relative h-56 w-56 sm:h-40 sm:w-40 ml-auto">
              <svg className="absolute inset-0 h-full w-full animate-spin-slower" viewBox="0 0 180 180" fill="none">
                <defs>
                  <path id="circlePathRow" d="M90,90 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text fontSize="12" letterSpacing="3" fontWeight="700" fill="#ffffff" xmlSpace="preserve">
                  <textPath href="#circlePathRow" startOffset="0%">
                    LET'S PLAN YOUR VACATION WITH TRIPELOO• LET'S PLAN YOUR VACATION WITH TRIPELOO • LET'S PLAN YOUR
                    VACATION WITH TRIPELOO • LET'S PLAN YOUR VACATION WITH TRIPELOO •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <a
                  href="https://wa.me/918089909386?text=Hi%2C%20I%20need%20some%20customised%20travel%20plans"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="h-28 w-28 sm:h-24 sm:w-24 rounded-full bg-white text-gray-900 shadow-lg hover:bg-white/95 transition flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-12 w-12 sm:h-10 sm:w-10"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Centered bottom light gray down arrow */}
        <div className="absolute left-0 right-0 bottom-6 sm:bottom-8 flex items-center justify-center">
          <button
            aria-label="Scroll to explore"
            onClick={() => onNav("stays")}
            className="text-gray-300 hover:text-gray-200 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-7 w-7"
            >
              <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out 0.3s forwards;
        }
      `}</style>
    </section>
  );
}