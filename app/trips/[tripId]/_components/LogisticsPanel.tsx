import { getTripLogistics } from '@/lib/api/trips';
import { mockLodging, mockFlights, mockDocuments } from '@/lib/fixtures/trip';
import { FlightCard } from './FlightCard';
import { LodgingCard } from './LodgingCard';

interface LogisticsPanelProps {
  tripId: string;
}

export async function LogisticsPanel({ tripId }: LogisticsPanelProps) {
  let logistics;

  try {
    logistics = await getTripLogistics(tripId);
  } catch (error) {
    console.log('Using fixture logistics:', error);
    logistics = {
      flights: mockFlights,
      lodging: mockLodging,
      activities: [],
      documents: mockDocuments,
      notes: 'Remember to exchange currency before departure',
    };
  }

  return (
    <div className="space-y-6 bg-white rounded-lg p-6 border border-gray-200 sticky top-24">
      {/* Flights Section */}
      {logistics.flights && logistics.flights.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Flights</h3>
          <div className="space-y-2">
            {logistics.flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
      )}

      {/* Lodging Section */}
      {logistics.lodging && logistics.lodging.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Lodging</h3>
          <div className="space-y-2">
            {logistics.lodging.map((lodge) => (
              <LodgingCard key={lodge.id} lodging={lodge} />
            ))}
          </div>
        </div>
      )}

      {/* Activities Section */}
      {logistics.activities && logistics.activities.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Activities</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Overview ▾
          </button>
        </div>
      )}

      {/* Documents Section */}
      {logistics.documents && logistics.documents.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents</h3>
          <div className="grid grid-cols-2 gap-2">
            {logistics.documents.map((doc) => {
              const docEmoji = doc.type === 'passport' ? '📕' : doc.type === 'insurance' ? '🛡️' : '📄';
              return (
                <div
                  key={doc.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center"
                >
                  <div className="text-2xl mb-1">{docEmoji}</div>
                  <p className="text-xs font-medium text-gray-700">{doc.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes Section */}
      {logistics.notes && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">{logistics.notes}</p>
        </div>
      )}
    </div>
  );
}
