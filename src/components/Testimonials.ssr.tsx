import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Fasnim',
    location: 'Calicut',
    text: 'Happy to share our experience with Tripeloo to Munnar. A beautiful, well-managed trip!'
  },
  {
    id: 2,
    name: 'Adil',
    location: 'Kochi',
    text: 'Wholesome experience that helped us refresh and stay in the present.'
  },
  {
    id: 3,
    name: 'Sara',
    location: 'Bangalore',
    text: 'Tripeloo took care of everything from hotel to transport. Highly recommended!'
  }
];

export default function TestimonialsSSR() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-10">What our travelers say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <article key={t.id} className="bg-white rounded-2xl shadow p-6">
              <p className="text-gray-700 mb-4">{t.text}</p>
              <div className="text-sm text-gray-600">
                <strong className="text-gray-900">{t.name}</strong> · {t.location}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


