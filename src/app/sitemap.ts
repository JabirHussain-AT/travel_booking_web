import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getDb } from '@/server/db/client';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

async function getAllStays() {
  try {
    const db = await getDb();
    const stays = await db.collection('stays')
      .find({ isHidden: { $ne: true } })
      .project({ _id: 1 })
      .toArray();
    return stays.map((stay: any) => stay._id?.toString() || stay.id || '');
  } catch (error) {
    console.error('[sitemap] Error fetching stays:', error);
    return [];
  }
}

async function getAllActivities() {
  try {
    const db = await getDb();
    const activities = await db.collection('activities')
      .find({ isHidden: { $ne: true } })
      .project({ _id: 1 })
      .toArray();
    return activities.map((activity: any) => activity._id?.toString() || activity.id || '');
  } catch (error) {
    console.error('[sitemap] Error fetching activities:', error);
    return [];
  }
}

async function getAllTrips() {
  try {
    const db = await getDb();
    const trips = await db.collection('trips')
      .find({ isHidden: { $ne: true } })
      .project({ _id: 1 })
      .toArray();
    return trips.map((trip: any) => trip._id?.toString() || trip.id || '');
  } catch (error) {
    console.error('[sitemap] Error fetching trips:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stay-listings`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/things-to-do`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trips`,
      lastModified: now,
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    const [stayIds, activityIds, tripIds] = await Promise.all([
      getAllStays(),
      getAllActivities(),
      getAllTrips(),
    ]);

    const stayPages: MetadataRoute.Sitemap = stayIds.map((stayId: string) => ({
      url: `${baseUrl}/item-details?stay=${encodeURIComponent(stayId)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const activityPages: MetadataRoute.Sitemap = activityIds.map((activityId: string) => ({
      url: `${baseUrl}/things-to-do?things-to-do=${encodeURIComponent(activityId)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    const tripPages: MetadataRoute.Sitemap = tripIds.map((tripId: string) => ({
      url: `${baseUrl}/trips?trips=${encodeURIComponent(tripId)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...stayPages, ...activityPages, ...tripPages];
  } catch (error) {
    console.error('[sitemap] Error generating sitemap:', error);
    return staticPages;
  }
}
