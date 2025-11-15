"use client";
import dynamic from "next/dynamic";
import LocationSection from "@/components/ListDetails/LocationSection";
import {
  Star,
  Users,
  Hourglass,
  Clock1,
  Smartphone,
  PawPrint,
  BookA,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

const IncludeItemSection = dynamic(() => import("@/components/ThingsToDo/IncludeItemSection"), {
  loading: () => <div className="h-48 bg-gray-100 animate-pulse rounded-lg" />,
});

const ReviewsSection = dynamic(() => import("@/components/ThingsToDo/ReviewsSection"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />,
});

const ThingsCarousel = dynamic(() => import("@/components/ThingsToDo/ThingsCarousel"), {
  loading: () => <div className="h-[70vh] sm:h-[90vh] bg-gray-200 animate-pulse rounded-sm sm:rounded-3xl" />,
});

const AdditionalDetailItem = ({ detail }: { detail: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasContent = 
    (detail.type === 'description' && detail.description?.trim()) ||
    (detail.type === 'points' && detail.points?.length > 0);

  if (!detail.heading?.trim() || !hasContent) {
    return null;
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-left">
          {detail.heading}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0 ml-4" />
        )}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-200">
          {detail.type === 'description' && detail.description && (
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {detail.description}
            </p>
          )}
          {detail.type === 'points' && detail.points && detail.points.length > 0 && (
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
              {detail.points.map((point: string, pointIndex: number) => (
                <li key={pointIndex}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

interface ActivityDetailsClientProps {
  activityData: any;
  activityId: string;
  destination: string;
}

export default function ActivityDetailsClient({ activityData, activityId, destination }: ActivityDetailsClientProps) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: activityData?.currency || 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const savings = activityData?.originalPrice 
    ? activityData.originalPrice - activityData.startingPrice 
    : 0;

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello! I'm interested in checking availability for this activity:

Activity: ${activityData?.name || 'N/A'}
Adults: ${adults}
Children: ${children}
Price: ${activityData ? formatPrice(activityData.startingPrice) : 'N/A'}

Please confirm availability and provide booking details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918089909386?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  if (!activityData) {
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
              Activity Not Found
            </h1>
            <p className="text-gray-600 mb-2">
              We couldn't find the activity you're looking for.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              The activity may have been removed or the link might be incorrect.
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

  const activityDetails = activityData.activityDetails || {};

  return (
    <div className="mx-0 pt-11 sm:mx-[10%]">
      <ThingsCarousel 
        carouselImages={activityData.carouselImages || []} 
        coverImage={activityData.coverImage} 
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
              {activityData.name}
            </h1>
            <div>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-gray-600">
                <div className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Star className="w-4 h-4 fill-emerald-500" />
                  <span>5.0</span>
                </div>
                <span className="text-sm">(Reviews)</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-1">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatPrice(activityData.startingPrice)}/-
                </p>
                {activityData.originalPrice && (
                  <span className="line-through text-gray-500 text-sm">
                    {formatPrice(activityData.originalPrice)}/-
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 bg-red-50 px-3 py-3 border rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
                About
              </h2>
              <p>{activityData.about}</p>
            </div>

            {(activityDetails.ages || activityDetails.duration || activityDetails.startTime || 
              activityDetails.mobileTicket || activityDetails.animalWelfare || activityDetails.liveGuide) && (
              <div className="mt-6 px-4 flex flex-col gap-4 sm:gap-6 border-y py-4 text-gray-700 text-sm sm:text-base">
                {activityDetails.ages && (
                  <div className="flex items-center gap-2">
                    <Users size={18} /> <span>{activityDetails.ages}</span>
                  </div>
                )}
                {activityDetails.duration && (
                  <div className="flex items-center gap-2">
                    <Hourglass size={18} /> <span>Duration: {activityDetails.duration}</span>
                  </div>
                )}
                {activityDetails.startTime && (
                  <div className="flex items-center gap-2">
                    <Clock1 size={18} /> <span>Start time: {activityDetails.startTime}</span>
                  </div>
                )}
                {activityDetails.mobileTicket && (
                  <div className="flex items-center gap-2">
                    <Smartphone size={18} /> <span>Mobile ticket</span>
                  </div>
                )}
                {activityDetails.animalWelfare && (
                  <div className="flex items-center gap-2">
                    <PawPrint size={18} /> <span>Meets animal welfare guidelines</span>
                  </div>
                )}
                {activityDetails.liveGuide && (
                  <div className="flex items-center gap-2">
                    <BookA size={18} /> <span>Live guide: {activityDetails.liveGuide}</span>
                  </div>
                )}
              </div>
            )}

            <div className="px-4 sm:px-3 mt-5 mb-5">
              <IncludeItemSection 
                includes={activityData.includes || []} 
                excludes={activityData.excludes || []} 
              />
            </div>

            {activityData.additionalDetails && activityData.additionalDetails.length > 0 && (() => {
              const validDetails = activityData.additionalDetails.filter((detail: any) => {
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

            <div className="px-4 sm:px-6 mb-5">
              <LocationSection 
                location={activityData.location} 
                destinationName={activityData.destinationName || activityData.destinationSlug} 
              />
            </div>

            <div className="w-full lg:w-[350px] border shadow-md p-6 h-fit md:hidden top-20 mb-5">
              <h2 className="text-gray-800 font-semibold text-lg line-clamp-2">
                {activityData.name}
              </h2>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xl font-bold text-gray-900">
                  {formatPrice(activityData.startingPrice)}/-
                </p>
                {activityData.originalPrice && (
                  <span className="line-through text-gray-500 text-sm">
                    {formatPrice(activityData.originalPrice)}/-
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-emerald-600 text-sm mt-1">
                  SAVE {formatPrice(savings)}/-
                </p>
              )}

              <form onSubmit={handleCheckAvailability} className="mt-6 flex flex-col gap-3">
                <label className="text-sm text-gray-700">Number of Adults</label>
                <input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="border px-3 py-2 rounded-lg"
                />
                <label className="text-sm text-gray-700">Number of Children</label>
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  className="border px-3 py-2 rounded-lg"
                />
                <button
                  type="submit"
                  className="bg-[#E51A4B] hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg"
                >
                  Check Availability
                </button>
              </form>
            </div>

            <div className="px-4 sm:px-3 mb-5">
              {activityData && (
                <ReviewsSection
                  itemId={activityData._id?.toString() || activityData.id || activityId || ""}
                  itemType="activity"
                />
              )}
            </div>
          </div>

          <div className="w-full lg:w-[350px] border shadow-md p-6 h-fit sticky hidden md:block top-20">
            <h2 className="text-gray-800 font-semibold text-lg line-clamp-2">
              {activityData.name}
            </h2>
            <div className="flex items-center justify-between mt-3">
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(activityData.startingPrice)}/-
              </p>
              {activityData.originalPrice && (
                <span className="line-through text-gray-500 text-sm">
                  {formatPrice(activityData.originalPrice)}/-
                </span>
              )}
            </div>
            {savings > 0 && (
              <p className="text-emerald-600 text-sm mt-1">
                SAVE {formatPrice(savings)}/-
              </p>
            )}

            <form onSubmit={handleCheckAvailability} className="mt-6 flex flex-col gap-3">
              <label className="text-sm text-gray-700">Number of Adults</label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="border px-3 py-2 rounded-lg"
              />
              <label className="text-sm text-gray-700">Number of Children</label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="border px-3 py-2 rounded-lg"
              />
              <button
                type="submit"
                className="bg-[#E51A4B] hover:bg-red-700 transition text-white font-semibold py-2 rounded-lg"
              >
                Check Availability
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

