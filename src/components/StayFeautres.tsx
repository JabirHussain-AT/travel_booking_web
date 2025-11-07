import Image from "next/image";
import { assets } from "../assets/assets";

const StayFeatures = () => {
  return (
    <section className="mt-16 relative min-h-screen bg-slate-100 text-black flex flex-col items-center overflow-hidden px-6 md:px-16 py-24">
      <Image
        src={assets.staysfeatures}
        alt="Luxury stay background"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />

      <div className="relative z-10 max-w-7xl w-full mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
          Beautiful Stays for Every Kind of Traveller
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image
              src={assets.img}
              alt="Luxury resort room"
              className="rounded-lg shadow-[0_0_30px_#00bcd480] w-full max-w-md object-cover"
            />
          </div>

          <div className="text-gray-800 text-start">
            <h3 className="text-2xl font-semibold mb-3 text-center md:text-left">
              Comfort Meets Elegance
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 text-center md:text-left">
              Discover handpicked accommodations designed to make your travels
              unforgettable. From serene beachfront villas and cozy mountain
              cabins to urban luxury hotels — we’ve curated stays that match
              your style and comfort.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center md:text-left">
              Each stay comes with verified amenities, real guest reviews, and
              easy booking options. Whether you seek adventure, relaxation, or a
              romantic escape, our stays promise a blend of luxury, warmth, and
              authenticity wherever your journey takes you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayFeatures;
