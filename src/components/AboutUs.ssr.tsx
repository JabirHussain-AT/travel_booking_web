export default function AboutUsSSR() {
  const stats = {
    years: 8,
    destinations: 16,
    staycations: 450,
    clientsK: 5, // 5k+
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-[#E51A4B] font-semibold mb-3">
          Stay. Explore. Feel More.
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          About Tripeloo
        </h2>

        <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-12">
          <span className="font-semibold text-gray-900">Tripeloo</span> isn’t just a travel brand — it’s an experience.
          We craft stays, activities, and trips that feel effortless and unforgettable.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-10">
          <Stat number={stats.years} suffix="+" label="Years in Industry" />
          <Stat number={stats.destinations} suffix="+" label="Destinations" />
          <Stat number={stats.staycations} suffix="+" label="Staycations" />
          <Stat number={stats.clientsK} suffix="k+" label="Happy Clients" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h3 className="text-4xl sm:text-5xl font-extrabold text-[#E51A4B] mb-2">
        {number}
        <span className="text-2xl sm:text-3xl font-bold">{suffix}</span>
      </h3>
      <p className="text-sm sm:text-base text-gray-700 font-medium">{label}</p>
    </div>
  );
}


