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
<<<<<<< HEAD
    }>
      <TripDetailsClient tripData={tripData} tripId={tripId} />
=======
    );
  }

  if (!tripData) {
    return (
      <div className="mx-0 pt-11 sm:mx-[10%] relative flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Trip Not Found
            </h1>
            <p className="text-gray-600 mb-2">
              We couldn't find the trip you're looking for.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              The trip may have been removed or the link might be incorrect.
            </p>
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-0 pt-11 sm:mx-[10%] relative">
      {/* Carousel with trip cover image */}
      <ListCarousel 
        carouselImages={tripData.carouselImages || []} 
        coverImage={tripData.coverImage} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {tripData.name}
            </h1>

            {/* Rating + Price */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-600">
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Star className="w-4 h-4 fill-emerald-500" />
                  <span>5.0</span>
                </div>
                <span className="text-sm">(Reviews)</span>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatPrice(displayPrice)}/-
                </p>
                {tripData.originalPrice && selectedPackages.length === 0 && (
                  <span className="line-through text-gray-500 text-sm sm:text-base">
                    {formatPrice(tripData.originalPrice)}/-
                  </span>
                )}
              </div>
            </div>

            {/* Summary */}
            {tripData.summary && (
              <div className="mt-8 bg-red-50 px-3 py-3 border rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  About
                </h2>
                <p>{tripData.summary}</p>
              </div>
            )}

            {/* Inclusions */}
            {tripData.includes && tripData.includes.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 sm:gap-6 border-y py-4 text-gray-700 text-sm sm:text-base">
                {tripData.includes.map((inc: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Trip Properties */}
            {tripData.properties && tripData.properties.length > 0 && (
              <div className="mt-8 bg-red-50 rounded-2xl p-5 sm:p-6 shadow-inner">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                  Trip Features
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-gray-700 text-sm sm:text-base">
                  {tripData.properties.map((prop: string, index: number) => (
                    <div key={index}>{prop}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Packages Section */}
            {tripData.packages && tripData.packages.length > 0 && (
              <div className="px-4 sm:px-6 mb-5 mt-8 relative">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Choose Your Package
                  </h2>
                </div>

                {/* Info Badge */}
                <div className="inline-block bg-[#7E22CE]/10 text-[#7E22CE] text-xs font-medium px-3 py-1 rounded-full mb-4">
                  💡 Select your preferred package duration to continue booking
                </div>

                <PackagesSection 
                  packages={tripData.packages.map((pkg: any, index: number) => ({
                    id: pkg.id || `pkg-${index}`,
                    name: pkg.name,
                    duration: pkg.duration,
                    price: pkg.price,
                    thumb: pkg.thumb,
                    images: pkg.images || [],
                    highlights: pkg.highlights || [],
                  }))}
                  onPackageSelect={(packages) => setSelectedPackages(packages)} 
                />
              </div>
            )}

            {/* Price Section */}
            <div className="mb-5">
              <PriceSection 
                includes={tripData.includes || []} 
                excludes={tripData.excludes || []} 
              />
            </div>

            {/* Additional Details - Expandable */}
            {tripData.additionalDetails && tripData.additionalDetails.length > 0 && (() => {
              const validDetails = tripData.additionalDetails.filter((detail: any) => {
                const hasHeading = detail.heading?.trim();
                const hasContent = 
                  (detail.type === 'description' && detail.description?.trim()) ||
                  (detail.type === 'points' && detail.points?.length > 0);
                return hasHeading && hasContent;
              });
              
              return validDetails.length > 0 ? (
                <div className="px-4 sm:px-6 mb-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Details</h2>
                  <div className="space-y-4">
                    {validDetails.map((detail: any, index: number) => (
                      <AdditionalDetailItem key={index} detail={detail} />
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Mobile Booking Sidebar */}
            <div ref={bookingRef} className="md:hidden">
              <BookingSidebar
                selectedRooms={selectedPackages}
                title={tripData.name}
                price={`${formatPrice(displayPrice)}/-`}
                oldPrice={tripData.originalPrice && selectedPackages.length === 0 ? `${formatPrice(tripData.originalPrice)}/-` : ""}
                savings={savings > 0 && selectedPackages.length === 0 ? `${formatPrice(savings)}/-` : ""}
                isPackage={true}
                destination={destination || tripData.destinationName}
                itemType="trip"
                itemLocation={tripData.location || tripData.destinationName}
              />
            </div>

            {/* Location + Reviews */}
            <div className="px-4 sm:px-6 mb-5">
              <LocationSection 
                location={tripData.location} 
                destinationName={tripData.destinationName} 
              />
            </div>
            <div className="px-4 sm:px-6 mb-5">
              {tripData && (
                <ReviewsSection
                  itemId={tripData._id?.toString() || tripData.id || tripId || ""}
                  itemType="trip"
                />
              )}
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div ref={bookingRef} className="hidden md:block sticky top-20">
            <BookingSidebar
              selectedRooms={selectedPackages}
              title={tripData.name}
              price={formatPrice(displayPrice)}
              oldPrice={tripData.originalPrice && selectedPackages.length === 0 ? formatPrice(tripData.originalPrice) : ""}
              savings={savings > 0 && selectedPackages.length === 0 ? formatPrice(savings) : ""}
              className="w-full lg:w-[350px]"
              isPackage={true}
              destination={destination || tripData.destinationName}
              itemType="trip"
              itemLocation={tripData.location || tripData.destinationName}
            />
          </div>
        </div>
      </div>

      {/* ✅ Floating Book Now Button */}
      <button
        onClick={handleScrollToBooking}
        className="fixed bottom-5 right-5 bg-[#7E22CE]/15 hover:bg-[#7E22CE]/25 text-[#7E22CE] font-medium px-4 py-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 flex items-center gap-2 z-40"
      >
        <span>Book Now</span>
        <span className="text-lg animate-bounce">↓</span>
      </button>
    </div>
  );
};

const TripDetails = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E51A4B] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trip details...</p>
          </div>
        </div>
      }
    >
      <TripDetailsContent />
>>>>>>> 6829b32a3f4c6d1433af8e54bfc82c0136183464
    </Suspense>
  );
}
