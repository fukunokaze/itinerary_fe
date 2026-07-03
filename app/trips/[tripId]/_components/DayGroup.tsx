import { TripEvent } from '@/lib/types/trip';
import { EventCard } from './EventCard';

interface DayGroupProps {
  dayNumber: number;
  date: Date;
  events: TripEvent[];
}

export async function DayGroup({ dayNumber, date, events }: DayGroupProps) {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  // Sort events by time
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="pb-6">
      {/* Day Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            {dayNumber}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Day {dayNumber}</h3>
            <p className="text-sm text-gray-500">
              {dayName} {dayDate}
            </p>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="ml-5 space-y-0 border-l-2 border-gray-200 pl-6 relative">
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-6 w-3 h-3 bg-blue-600 rounded-full -ml-8" />
            
            <EventCard event={event} />

            {/* Connector line between events (except last) */}
            {index < sortedEvents.length - 1 && (
              <div className="h-2 -ml-8 mt-1 border-l-2 border-dashed border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
