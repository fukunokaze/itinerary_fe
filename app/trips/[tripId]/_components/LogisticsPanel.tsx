import { Flight, Lodging, Document } from '@/lib/types/trip';
import { FlightCard } from './FlightCard';
import { LodgingCard } from './LodgingCard';

interface LogisticsPanelProps {
  flights: Flight[];
  lodgings: Lodging[];
  documents: Document[];
  notes?: string | null;
}

export function LogisticsPanel({
  flights,
  lodgings,
  documents,
  notes,
}: LogisticsPanelProps) {
  return (
    <div className="space-y-6 bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
      {/* Flights Section */}
      {flights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Flights</h3>
          <div className="space-y-2">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      )}

      {/* Lodging Section */}
      {lodgings.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lodging</h3>
          <div className="space-y-2">
            {lodgings.map((lodging) => (
              <LodgingCard key={lodging.id} lodging={lodging} />
            ))}
          </div>
        </div>
      )}

      {/* Documents Section */}
      {documents.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents</h3>
          <div className="grid grid-cols-2 gap-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center"
              >
                <div className="text-2xl mb-1">{doc.icon}</div>
                <p className="text-xs font-medium text-gray-700">{doc.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      {notes && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">{notes}</p>
        </div>
      )}
    </div>
  );
}
