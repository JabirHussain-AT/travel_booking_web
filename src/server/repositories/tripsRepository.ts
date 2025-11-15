import { getDb } from '@/server/db/client';
import type { Trip } from '@/components/stay-listings/DestinationData';

const COLLECTION = 'trips';

export async function findTripsByDestination(destinationSlugOrName: string): Promise<Trip[]> {
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
    price: r.startingPrice || r.price || 0, // Use startingPrice from DB
    category: r.category || 'General', // Map category from DB or default
  }));
}

export async function findTripById(tripId: string, includeHidden: boolean = false): Promise<any | null> {
  const db = await getDb();
  
  try {
    const ObjectId = require('mongodb').ObjectId;
    
    const cleanTripId = tripId?.trim();
    
    let trip = null;
    
    if (cleanTripId && ObjectId.isValid(cleanTripId)) {
      try {
        const objectId = new ObjectId(cleanTripId);
        const query: any = { _id: objectId };
        if (!includeHidden) {
          query.isHidden = { $ne: true };
        }
        trip = await db.collection(COLLECTION).findOne(query);
        if (trip) {
          return mapTripData(trip);
        }
      } catch (err) {
        // ObjectId query failed, try next strategy
      }
    }
    
    if (!trip) {
      const query: any = {};
      if (!includeHidden) {
        query.isHidden = { $ne: true };
      }
      const allTrips = await db.collection(COLLECTION).find(query).toArray();
      
      trip = allTrips.find((t: any) => {
        const idStr = t._id?.toString() || t.id || '';
        return idStr === cleanTripId || idStr === tripId;
      });
      
      if (trip) {
        return mapTripData(trip);
      }
    }
    
    if (!trip) {
      const query: any = { id: cleanTripId };
      if (!includeHidden) {
        query.isHidden = { $ne: true };
      }
      trip = await db.collection(COLLECTION).findOne(query);
      if (trip) {
        return mapTripData(trip);
      }
    }
    
    return null;
  } catch (error) {
    console.error('[findTripById] Error:', error);
    return null;
  }
}

function mapTripData(trip: any): any {
  return {
    id: trip._id?.toString() || trip.id || '',
    name: trip.name || '',
    destinationSlug: trip.destinationSlug || '',
    category: trip.category || '',
    coverImage: trip.coverImage || '',
    carouselImages: trip.carouselImages || [],
    startingPrice: trip.startingPrice || 0,
    originalPrice: trip.originalPrice || null,
    currency: trip.currency || 'INR',
    summary: trip.summary || '',
    includes: trip.includes || [],
    excludes: trip.excludes || [],
    properties: trip.properties || [],
    packages: trip.packages || [],
    location: trip.location || '',
    additionalDetails: trip.additionalDetails || [],
  };
}

