'use client';

import { Lodging } from '@/lib/types/trip';

interface LodgingCardProps {
  lodging: Lodging;
}

export function LodgingCard({ lodging }: LodgingCardProps) {
  const checkInDate = new Date(lodging.checkInDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const checkOutDate = new Date(lodging.checkOutDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-3">
        <h4 className="font-semibold text-gray-900">{lodging.name}</h4>
        <p className="text-xs text-gray-600 mt-1">{lodging.address}</p>
        <div className="mt-2 text-xs text-gray-700 space-y-1">
          <div>
            <strong>{lodging.nights}</strong> night{lodging.nights !== 1 ? 's' : ''}
          </div>
          <div>
            {checkInDate} - {checkOutDate}
          </div>
          {lodging.confirmationNumber && (
            <div>
              Confirmation #: <strong>{lodging.confirmationNumber}</strong>
            </div>
          )}
        </div>
      </div>

      {/* Map Thumbnail */}
      {lodging.latitude && lodging.longitude && (
        <div className="w-full h-24 bg-gray-200">
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${lodging.latitude},${lodging.longitude}&zoom=14&size=320x96&style=feature:all|element:labels|visibility:off&key=AIzaSyDummyKey`}
            alt="Map location"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback placeholder
              (e.target as HTMLImageElement).style.background = '#e5e7eb';
              (e.target as HTMLImageElement).style.display = 'flex';
              (e.target as HTMLImageElement).style.alignItems = 'center';
              (e.target as HTMLImageElement).style.justifyContent = 'center';
            }}
          />
        </div>
      )}
    </div>
  );
}
