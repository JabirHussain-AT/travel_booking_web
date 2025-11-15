import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { findStayById } from "@/server/repositories/staysRepository";
import { findDestinationBySlugOrName } from "@/server/repositories/destinationsRepository";
import StayDetailsClient from "./StayDetailsClient";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ stay?: string; destination?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const stayId = params.stay;

  if (!stayId) {
    return {
      title: "Stay Details",
      description: "View stay details on Tripeloo",
    };
  }

  try {
    const decodedStayId = decodeURIComponent(stayId);
    const stay = await findStayById(decodedStayId);

    if (!stay) {
      return {
        title: "Stay Not Found",
        description: "The requested stay could not be found.",
      };
    }

    let destinationName = '';
    if (stay.destinationSlug) {
      const destination = await findDestinationBySlugOrName(stay.destinationSlug);
      destinationName = destination?.name || '';
    }

    const title = `${stay.name}${destinationName ? ` in ${destinationName}` : ''} | ${siteConfig.name}`;
    const description = stay.summary 
      ? `${stay.summary.substring(0, 155)}...`
      : `Book ${stay.name}${destinationName ? ` in ${destinationName}` : ''} on Tripeloo. Starting from ₹${stay.startingPrice || 0}.`;

    const imageUrl = stay.coverImage 
      ? optimizeCloudinaryUrl(stay.coverImage)
      : siteConfig.ogImage;

    return {
      title,
      description,
      keywords: [
        stay.name,
        destinationName,
        'hotel booking',
        'resort booking',
        'stay booking',
        'Tripeloo',
      ],
      openGraph: {
        title,
        description,
        url: `${siteConfig.url}/item-details?stay=${encodeURIComponent(stayId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
        siteName: siteConfig.name,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: stay.name,
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
        canonical: `${siteConfig.url}/item-details?stay=${encodeURIComponent(stayId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
      },
    };
  } catch (error) {
    console.error('[generateMetadata] Error:', error);
    return {
      title: "Stay Details",
      description: "View stay details on Tripeloo",
    };
  }
}

async function getStayData(stayId: string) {
  try {
    const decodedStayId = decodeURIComponent(stayId);
    const stay = await findStayById(decodedStayId);
    
    if (!stay) {
      return null;
    }

    let destinationName = '';
    if (stay.destinationSlug) {
      const destination = await findDestinationBySlugOrName(stay.destinationSlug);
      destinationName = destination?.name || '';
    }

    return {
      ...stay,
      destinationName,
    };
  } catch (error) {
    console.error('[getStayData] Error:', error);
    return null;
  }
}

export default async function StayDetailsPage({ searchParams }: { searchParams: Promise<{ stay?: string; destination?: string }> }) {
  const params = await searchParams;
  const stayId = params.stay;
  const destination = params.destination || '';

  if (!stayId) {
    return (
      <Suspense fallback={
        <div className="mx-0 pt-11 sm:mx-[10%] relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <StayDetailsClient stayData={null} stayId="" destination="" />
      </Suspense>
    );
  }

  const stayData = await getStayData(stayId);

  return (
    <Suspense fallback={
      <div className="mx-0 pt-11 sm:mx-[10%] relative flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stay details...</p>
        </div>
      </div>
    }>
      <StayDetailsClient stayData={stayData} stayId={stayId} destination={destination} />
    </Suspense>
  );
}
