'use client';

import { Lodging } from '@/lib/types/trip';

interface LodgingCardProps {
  lodging: Lodging;
}

export function LodgingCard({ lodging }: LodgingCardProps) {
  const checkInDate = new Date(lodging.checkIn).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const checkOutDate = new Date(lodging.checkOut).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-3">
        <h4 className="font-semibold text-gray-900">{lodging.name}</h4>
        {lodging.address && (
          <p className="text-xs text-gray-600 mt-1">{lodging.address}</p>
        )}
        <div className="mt-2 text-xs text-gray-700 space-y-1">
          <div>
            <strong>{lodging.nights}</strong> night{lodging.nights !== 1 ? 's' : ''}
          </div>
          <div>
            {checkInDate} - {checkOutDate}
          </div>
          {lodging.confirmationCode && (
            <div>
              Confirmation #: <strong>{lodging.confirmationCode}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
