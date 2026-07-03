'use client';

import { Flight } from '@/lib/types/trip';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const departTime = new Date(flight.departureTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const departDate = new Date(flight.departureTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 text-left hover:bg-gray-100 transition flex items-start justify-between"
      >
        <div className="flex-1">
          <div className="font-semibold text-gray-900">
            Flight {flight.flightNumber} ({flight.departureAirport}→{flight.arrivalAirport})
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {flight.airline} • {departDate}
          </div>
          <div className="text-sm text-gray-700 mt-1">Seats: {flight.seatCount}</div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-600 flex-shrink-0 transition ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="px-3 py-3 bg-white border-t border-gray-200 text-xs text-gray-600 space-y-1">
          <div>
            <strong>Departure:</strong> {departTime} from {flight.departureAirport}
          </div>
          <div>
            <strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            at {flight.arrivalAirport}
          </div>
          {flight.confirmationNumber && (
            <div>
              <strong>Confirmation:</strong> {flight.confirmationNumber}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
