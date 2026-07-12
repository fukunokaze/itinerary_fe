import { TripEvent, EventType } from '@/lib/types/trip';

// Icon emoji map for event types
const eventIconMap: Record<EventType, string> = {
  flight: '✈️',
  lodging: '🛏️',
  activity: '🎭',
};

// Color classes for event type indicators
const eventColorMap: Record<EventType, string> = {
  flight: 'bg-blue-100 text-blue-700',
  lodging: 'bg-purple-100 text-purple-700',
  activity: 'bg-green-100 text-green-700',
};

function formatTime(time: string): string {
  const [hourStr, minuteStr] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${minuteStr} ${period}`;
}

interface EventCardProps {
  event: TripEvent;
}

export function EventCard({ event }: EventCardProps) {
  const icon = eventIconMap[event.type];
  const colorClass = eventColorMap[event.type];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 hover:shadow-md transition">
      <div className="flex gap-4">
        {/* Left: Time and Icon */}
        <div className="flex-shrink-0 w-16 text-right">
          {event.startTime && (
            <div className="text-sm font-semibold text-gray-900">
              {formatTime(event.startTime)}
            </div>
          )}
          <div className={`inline-block px-2 py-1 rounded mt-2 text-sm font-medium ${colorClass}`}>
            {icon}
          </div>
        </div>

        {/* Middle: Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-base">{event.title}</h4>
          {event.location && (
            <p className="text-sm text-gray-500 mt-1">📍 {event.location}</p>
          )}
          {event.notes && (
            <p className="text-xs text-gray-500 mt-2 italic">
              Note: {event.notes}
            </p>
          )}
          {event.bookingCode && (
            <p className="text-xs text-gray-500 mt-1">
              Confirmation: {event.bookingCode}
            </p>
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
