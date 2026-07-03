import { getTripEvents } from '@/lib/api/trips';
import { mockEvents } from '@/lib/fixtures/trip';
import { TripEvent } from '@/lib/types/trip';
import { DayGroup } from './DayGroup';

interface ItineraryTimelineProps {
  tripId: string;
}

export async function ItineraryTimeline({ tripId }: ItineraryTimelineProps) {
  let events: TripEvent[] = [];

  try {
    events = await getTripEvents(tripId);
  } catch (error) {
    console.log('Using fixture events:', error);
    events = mockEvents;
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-400 mb-3">📅</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          No events yet
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Start planning your trip by adding your first event
        </p>
      </div>
    );
  }

  // Group events by date
  const eventsByDate = new Map<string, TripEvent[]>();
  
  events.forEach((event) => {
    const eventDate = new Date(event.startTime);
    const dateKey = eventDate.toISOString().split('T')[0];
    
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey)!.push(event);
  });

  // Sort dates and create day groups
  const sortedDates = Array.from(eventsByDate.keys()).sort();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Itinerary</h2>
      
      <div className="space-y-0">
        {sortedDates.map((dateKey, index) => {
          const dayEvents = eventsByDate.get(dateKey)!;
          const dayNumber = index + 1;
          const eventDate = new Date(dateKey + 'T00:00:00Z');

          return (
            <DayGroup
              key={dateKey}
              dayNumber={dayNumber}
              date={eventDate}
              events={dayEvents}
            />
          );
        })}
      </div>
    </div>
  );
}
