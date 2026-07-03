import Image from 'next/image';
import { TripEvent, EventType } from '@/lib/types/trip';

// Icon emoji map for event types
const eventIconMap: Record<EventType, string> = {
  flight: '✈️',
  hotel: '🛏️',
  meal: '🍽️',
  attraction: '📍',
  activity: '🎭',
  transport: '🚗',
  other: '📌',
};

// Color classes for event type indicators
const eventColorMap: Record<EventType, string> = {
  flight: 'bg-blue-100 text-blue-700',
  hotel: 'bg-purple-100 text-purple-700',
  meal: 'bg-orange-100 text-orange-700',
  attraction: 'bg-red-100 text-red-700',
  activity: 'bg-green-100 text-green-700',
  transport: 'bg-yellow-100 text-yellow-700',
  other: 'bg-gray-100 text-gray-700',
};

interface EventCardProps {
  event: TripEvent;
}

export function EventCard({ event }: EventCardProps) {
  const startTime = new Date(event.startTime);
  const timeStr = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const icon = eventIconMap[event.eventType];
  const colorClass = eventColorMap[event.eventType];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition">
      <div className="flex gap-4">
        {/* Left: Time and Icon */}
        <div className="flex-shrink-0 w-16 text-right">
          <div className="text-sm font-semibold text-gray-900">{timeStr}</div>
          <div className={`inline-block px-2 py-1 rounded mt-2 text-sm font-medium ${colorClass}`}>
            {icon}
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-base">{event.title}</h4>
          {event.description && (
            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
          )}
          {event.location && (
            <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
          )}
          {event.notes && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Note: {event.notes}
            </p>
          )}
          {event.confirmationNumber && (
            <p className="text-xs text-gray-500 mt-1">
              Confirmation: {event.confirmationNumber}
            </p>
          )}

          {/* Assigned Travelers */}
          {event.assignedTravelers.length > 0 && (
            <div className="flex items-center gap-1 mt-2">
              {event.assignedTravelers.map((traveler) => (
                <div
                  key={traveler.id}
                  className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-400"
                  title={traveler.name}
                >
                  {traveler.name.charAt(0)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Image */}
        {event.imageUrl && (
          <div className="flex-shrink-0 w-20 h-16">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
}
