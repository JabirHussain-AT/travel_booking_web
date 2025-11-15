import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { findActivityById } from "@/server/repositories/activitiesRepository";
import { findDestinationBySlugOrName } from "@/server/repositories/destinationsRepository";
import ActivityDetailsClient from "./ActivityDetailsClient";
import { optimizeCloudinaryUrl } from "@/utils/cloudinary";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ 'things-to-do'?: string; destination?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const activityId = params['things-to-do'];

  if (!activityId) {
    return {
      title: "Activity Details",
      description: "View activity details on Tripeloo",
    };
  }

  try {
    const decodedActivityId = decodeURIComponent(activityId);
    const activity = await findActivityById(decodedActivityId);

    if (!activity) {
      return {
        title: "Activity Not Found",
        description: "The requested activity could not be found.",
      };
    }

    let destinationName = '';
    if (activity.destinationSlug) {
      const destination = await findDestinationBySlugOrName(activity.destinationSlug);
      destinationName = destination?.name || '';
    }

    const title = `${activity.name}${destinationName ? ` in ${destinationName}` : ''} | ${siteConfig.name}`;
    const description = activity.about 
      ? `${activity.about.substring(0, 155)}...`
      : `Book ${activity.name}${destinationName ? ` in ${destinationName}` : ''} on Tripeloo. Starting from ₹${activity.startingPrice || 0}.`;

    const imageUrl = activity.coverImage 
      ? optimizeCloudinaryUrl(activity.coverImage)
      : siteConfig.ogImage;

    return {
      title,
      description,
      keywords: [
        activity.name,
        destinationName,
        'things to do',
        'activity booking',
        'experience booking',
        'Tripeloo',
      ],
      openGraph: {
        title,
        description,
        url: `${siteConfig.url}/things-to-do?things-to-do=${encodeURIComponent(activityId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
        siteName: siteConfig.name,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: activity.name,
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
        canonical: `${siteConfig.url}/things-to-do?things-to-do=${encodeURIComponent(activityId)}${params.destination ? `&destination=${encodeURIComponent(params.destination)}` : ''}`,
      },
    };
  } catch (error) {
    console.error('[generateMetadata] Error:', error);
    return {
      title: "Activity Details",
      description: "View activity details on Tripeloo",
    };
  }
}

async function getActivityData(activityId: string) {
  try {
    const decodedActivityId = decodeURIComponent(activityId);
    const activity = await findActivityById(decodedActivityId);
    
    if (!activity) {
      return null;
    }

    let destinationName = '';
    if (activity.destinationSlug) {
      const destination = await findDestinationBySlugOrName(activity.destinationSlug);
      destinationName = destination?.name || '';
    }

    return {
      ...activity,
      destinationName,
    };
  } catch (error) {
    console.error('[getActivityData] Error:', error);
    return null;
  }
}

export default async function ActivityDetailsPage({ searchParams }: { searchParams: Promise<{ 'things-to-do'?: string; destination?: string }> }) {
  const params = await searchParams;
  const activityId = params['things-to-do'];
  const destination = params.destination || '';

  if (!activityId) {
    return (
      <Suspense fallback={
        <div className="mx-0 pt-11 sm:mx-[10%] relative flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      }>
        <ActivityDetailsClient activityData={null} activityId="" destination="" />
      </Suspense>
    );
  }

  const activityData = await getActivityData(activityId);

  return (
    <Suspense fallback={
      <div className="mx-0 pt-11 sm:mx-[10%] relative flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading activity details...</p>
        </div>
      </div>
    }>
      <ActivityDetailsClient activityData={activityData} activityId={activityId} destination={destination} />
    </Suspense>
  );
}
