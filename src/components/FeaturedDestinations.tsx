import Image from 'next/image';
import Link from 'next/link';

const destinations = [
  {
    slug: 'wayanad',
    name: 'Wayanad',
    image: 'https://images.unsplash.com/photo-1607054931379-95e37fc6684b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
  },
  {
    slug: 'munnar',
    name: 'Munnar',
    image: 'https://plus.unsplash.com/premium_photo-1697730334419-fba83fe143b7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687'
  },
  {
    slug: 'coorg',
    name: 'Coorg',
    image: 'https://images.unsplash.com/photo-1569996980833-901b5cd2eb70?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1935'
  },
  {
    slug: 'alleppey',
    name: 'Alleppey',
    image: 'https://media.istockphoto.com/id/2152760789/photo/kerala-backwaters-with-palms.jpg?s=2048x2048&w=is&k=20&c=6zUddoaMuMoiIxPpn4aYZ4lGxk5p-QPvw19-nsxIE6s='
  }
];

export function FeaturedDestinations() {
  return (
    <section className="mt-16 sm:mt-24">
      <div className="container id=destinations">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">Featured Destinations</h2>
          <Link href="/destinations" className="text-brand text-sm">View all</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {destinations.map((d) => (
            <Link key={d.slug} href={`/destinations/${d.slug}`} className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <div className="relative h-28 sm:h-40">
                <Image src={d.image} alt={d.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div className="p-3 sm:p-4">
                <div className="font-semibold">{d.name}</div>
                <div className="text-xs text-gray-500">Explore stays & activities</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

