import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedDestinations } from '@/components/FeaturedDestinations';
import OurSpecialities from "@/components/OurSpecialities";
import { NearbySection } from '@/components/NearbySection';
import { Footer } from '@/components/Footer';
import { AboutBand } from '@/components/AboutBand';
import { TripsStaysGrid } from '@/components/TripsStaysGrid';
import { BlogTeasers } from '@/components/BlogTeasers';
import AboutUsSSR from '@/components/AboutUs.ssr';
import TestimonialsSSR from '@/components/Testimonials.ssr';
import ClientMarker from '@/components/ClientMarker';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutBand />
      <FeaturedDestinations />
      <OurSpecialities />
      <AboutUsSSR />
      <TestimonialsSSR />
      {/* anchor aliases so hero buttons can address different hashes */}
      {/* <div id="stays" />
      <div id="things-to-do" />
      <div id="trips" />
      <TripsStaysGrid /> */}
      {/* <CategoriesTabs /> */}
      {/* <BlogTeasers /> */}
      <NearbySection />
      <Footer />
      {/* Ensures client manifest presence for Vercel while not affecting SEO */}
      <ClientMarker />
    </main>
  );
}

