import { getDb } from '@/server/db/client';
import type { Activity } from '@/components/stay-listings/DestinationData';

const COLLECTION = 'activities';

export async function findActivitiesByDestination(destinationSlugOrName: string): Promise<Activity[]> {
  const db = await getDb();
  const normalized = destinationSlugOrName.toLowerCase().trim();
  
  // Query with case-insensitive match for destinationSlug and exclude hidden items
  const rows = await db.collection<any>(COLLECTION)
    .find({
      $and: [
        {
          $or: [
            { destinationSlug: { $regex: new RegExp(`^${normalized}$`, 'i') } },
            { destinationSlug: normalized },
            // Also try matching if destinationSlug contains the normalized value
            { destinationSlug: { $regex: new RegExp(normalized, 'i') } }
          ]
        },
        { isHidden: { $ne: true } }
      ]
    })
    .toArray();
  
  return rows.map((r) => ({
    id: r._id?.toString() || r.id || '',
    name: r.name || '',
    coverImage: r.coverImage || r.image || '',
    duration: r.duration || '',
    price: r.price || 0,
    category: r.category || 'General', // Map category from DB or default
  }));
}

export async function findActivityById(activityId: string, includeHidden: boolean = false): Promise<any | null> {
  const db = await getDb();
  
  try {
    const ObjectId = require('mongodb').ObjectId;
    
    const cleanActivityId = activityId?.trim();
    
    let activity = null;
    
    if (cleanActivityId && ObjectId.isValid(cleanActivityId)) {
      try {
        const objectId = new ObjectId(cleanActivityId);
        const query: any = { _id: objectId };
        if (!includeHidden) {
          query.isHidden = { $ne: true };
        }
        activity = await db.collection(COLLECTION).findOne(query);
        if (activity) {
          return mapActivityData(activity);
        }
      } catch (err) {
        // ObjectId query failed, try next strategy
      }
    }
    
    if (!activity) {
      const query: any = {};
      if (!includeHidden) {
        query.isHidden = { $ne: true };
      }
      const allActivities = await db.collection(COLLECTION).find(query).toArray();
      
      activity = allActivities.find((a: any) => {
        const idStr = a._id?.toString() || a.id || '';
        return idStr === cleanActivityId || idStr === activityId;
      });
      
      if (activity) {
        return mapActivityData(activity);
      }
    }
    
    if (!activity) {
      const query: any = { id: cleanActivityId };
      if (!includeHidden) {
        query.isHidden = { $ne: true };
      }
      activity = await db.collection(COLLECTION).findOne(query);
      if (activity) {
        return mapActivityData(activity);
      }
    }
    
    return null;
  } catch (error) {
    console.error('[findActivityById] Error:', error);
    return null;
  }
}

function mapActivityData(activity: any): any {
  return {
    id: activity._id?.toString() || activity.id || '',
    name: activity.name || '',
    destinationSlug: activity.destinationSlug || '',
    category: activity.category || '',
    coverImage: activity.coverImage || '',
    carouselImages: activity.carouselImages || [],
    startingPrice: activity.startingPrice || 0,
    originalPrice: activity.originalPrice || null,
    currency: activity.currency || 'INR',
    about: activity.about || '',
    includes: activity.includes || [],
    excludes: activity.excludes || [],
    location: activity.location || '',
    activityDetails: activity.activityDetails || {},
    additionalDetails: activity.additionalDetails || [],
  };
}

