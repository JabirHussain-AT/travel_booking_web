import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { findTripById } from "@/server/repositories/tripsRepository";
import { findDestinationBySlugOrName } from "@/server/repositories/destinationsRepository";
import TripDetailsClient from "./TripDetailsClient";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ trips?: string; destination?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const tripId = params.trips;

  if (!tripId) {
    return {
      title: "Trip Details",
      description: "View trip details on Tripeloo",
    };
  }

  try {
    const decodedTripId = decodeURIComponent(tripId);
    const trip = await findTripById(decodedTripId);

    if (!trip) {
      return {
        title: "Trip Not Found",
        description: "The requested trip could not be found.",
      };
    }

    let destinationName = '';
    if (trip.destinationSlug) {
      const destination = await findDestinationBySlugOrName(trip.destinationSlug);
      destinationName = destination?.name || '';
    }

    const title = `${trip.name}${destinationName ? ` in ${destinationName}` : ''} | ${siteConfig.name}`;
    const description = trip.summary 
      ? `${trip.summary.substring(0, 155)}...`
      : `Book ${trip.name}${destinationName ? ` in ${destinationName}` : ''} on Tripeloo. Starting from ₹${trip.startingPrice || 0}.`;

    const imageUrl = trip.coverImage 
      ? optimizeCloudinaryUrl(trip.coverImage)
      : siteConfig.ogImage;

    return {
      title,
      description,
      keywords: [
        trip.name,
        destinationName,
        'trip booking',
        'travel package',
        'holiday package',
        'Tripeloo',
      ],
      openGraph: {
        title,
        description,
        url: `${siteConfig.url}/trips?trips=${encodeURIComponent(tripId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
        siteName: siteConfig.name,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: trip.name,
          }
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `${siteConfig.url}/trips?trips=${encodeURIComponent(tripId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
      },
    };
  } catch (error) {
    console.error('[generateMetadata] Error:', error);
    return {
      title: "Trip Details",
      description: "View trip details on Tripeloo",
    };
  }
}

async function getTripData(tripId: string) {
  try {
    const decodedTripId = decodeURIComponent(tripId);
    const trip = await findTripById(decodedTripId);
    
    if (!trip) {
      return null;
    }

    let destinationName = '';
    if (trip.destinationSlug) {
      const destination = await findDestinationBySlugOrName(trip.destinationSlug);
      destinationName = destination?.name || '';
    }

    return {
      ...trip,
      destinationName,
    };
  } catch (error) {
    console.error('[getTripData] Error:', error);
    return null;
  }
}

export default async function TripDetailsPage({ searchParams }: { searchParams: Promise<{ trips?: string; destination?: string }> }) {
  const params = await searchParams;
  const tripId = params.trips;

  if (!tripId) {
    return (
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <TripDetailsClient tripData={null} tripId="" />
      </Suspense>
    );
  }

  const tripData = await getTripData(tripId);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trip details...</p>
        </div>
      </div>
    }>
      <TripDetailsClient tripData={tripData} tripId={tripId} />
    </Suspense>
  );
}
