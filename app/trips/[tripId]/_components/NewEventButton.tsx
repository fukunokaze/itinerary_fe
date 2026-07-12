'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AddEventModal } from './AddEventModal';
import { Trip } from '@/lib/types/trip';

interface NewEventButtonProps {
  tripId: string;
  trip: Trip;
}

export function NewEventButton({ tripId, trip }: NewEventButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
      >
        <Plus className="w-4 h-4" />
        New Event
      </button>

      {isOpen && (
        <AddEventModal
          tripId={tripId}
          trip={trip}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
