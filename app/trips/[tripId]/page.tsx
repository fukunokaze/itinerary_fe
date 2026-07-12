import { notFound } from 'next/navigation';
import { Share2, Edit, Users } from 'lucide-react';
import { NewEventButton } from './_components/NewEventButton';
import { ItineraryTimeline } from './_components/ItineraryTimeline';
import { LogisticsPanel } from './_components/LogisticsPanel';
import { getTrip, ApiError } from '@/lib/api/trips';

interface PageProps {
  params: Promise<{
    tripId: string;
  }>;
}

export default async function TripPage({ params }: PageProps) {
  const { tripId } = await params;

  let trip;
  try {
    trip = await getTrip(tripId);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  const startDate = new Date(trip.startDate);
  const endDate = new Date(trip.endDate);
  
  const dateRange = `${startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })} - ${endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })}`;

  return (
    <div className="flex flex-col h-full">
      {/* Page Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-40">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {trip.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-sm">{dateRange}</span>
              </div>
              {trip.destination && (
                <div className="flex items-center gap-1">
                  <span className="text-sm">📍 {trip.destination}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Trip
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <NewEventButton tripId={tripId} trip={trip} />
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Manage Travelers
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 px-8 py-6">
        {/* Left Column: Itinerary Timeline */}
        <div className="flex-1 min-w-0">
          <ItineraryTimeline events={trip.events} />
        </div>

        {/* Right Column: Logistics Panel */}
        <aside className="w-80 flex-shrink-0">
          <LogisticsPanel
            flights={trip.flights}
            lodgings={trip.lodgings}
            documents={trip.documents}
            notes={trip.notes}
          />
        </aside>
      </div>
    </div>
  );
}
