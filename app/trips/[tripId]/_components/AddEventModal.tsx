'use client';

import { useRef, useEffect, useState, useTransition } from 'react';
import { createEventAction } from '../actions';
import { Trip, EventType } from '@/lib/types/trip';
import { X, ChevronDown } from 'lucide-react';

interface AddEventModalProps {
  tripId: string;
  trip: Trip;
  onClose: () => void;
}

const eventTypeOptions: { value: EventType; label: string }[] = [
  { value: 'activity', label: 'Activity' },
  { value: 'flight', label: 'Flight' },
  { value: 'lodging', label: 'Lodging' },
];

export function AddEventModal({ tripId, trip, onClose }: AddEventModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [expandRelated, setExpandRelated] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: 'activity' as EventType,
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '',
    location: '',
    notes: '',
    bookingCode: '',
    travelerIds: [] as string[],
    relatedItemIds: [] as string[],
  });

  useEffect(() => {
    dialogRef.current?.showModal();
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    dialogRef.current?.close();
    onClose();
  };

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
    setError(null);
  };

  const handleTravelerToggle = (travelerId: string) => {
    setFormData((prev) => ({
      ...prev,
      travelerIds: prev.travelerIds.includes(travelerId)
        ? prev.travelerIds.filter((id) => id !== travelerId)
        : [...prev.travelerIds, travelerId],
    }));
  };

  const handleRelatedToggle = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedItemIds: prev.relatedItemIds.includes(itemId)
        ? prev.relatedItemIds.filter((id) => id !== itemId)
        : [...prev.relatedItemIds, itemId],
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Event title is required');
      return false;
    }
    if (!formData.date) {
      setError('Date is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    startTransition(async () => {
      const result = await createEventAction(tripId, formData);

      if (!result.success) {
        setError(result.error || 'Failed to create event');
      } else {
        handleClose();
      }
    });
  };

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleEscapeKey}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 w-full h-full bg-black/50 p-4"
      style={{
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between sticky top-0">
            <h2 className="text-xl font-bold">Add New Event ({trip.title})</h2>
            <button
              onClick={handleClose}
              className="text-gray-300 hover:text-white transition p-1"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Event Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {eventTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Event Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, title: true }))
                }
                placeholder="e.g., Senso-ji Temple Visit"
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  touched.title && !formData.title
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {touched.title && !formData.title && (
                <p className="text-xs text-red-600 mt-1">Title is required</p>
              )}
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Asakusa, Tokyo"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Add any notes about this event"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Booking Code */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Confirmation/Booking #
              </label>
              <input
                type="text"
                value={formData.bookingCode}
                onChange={(e) => handleInputChange('bookingCode', e.target.value)}
                placeholder="e.g., CONF12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assigned Travelers */}
            {trip.travelers.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Assigned Travelers
                </label>
                <div className="space-y-2">
                  {trip.travelers.map((traveler) => (
                    <label key={traveler.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.travelerIds.includes(traveler.id)}
                        onChange={() => handleTravelerToggle(traveler.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                        {traveler.name.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-700">{traveler.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Related Logistical Items */}
            {(trip.flights.length > 0 || trip.lodgings.length > 0) && (
              <div>
                <button
                  type="button"
                  onClick={() => setExpandRelated(!expandRelated)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-900 mb-2"
                >
                  Related Logistical Items
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      expandRelated ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandRelated && (
                  <div className="space-y-2 ml-4 p-3 bg-gray-50 rounded-lg">
                    {trip.flights.length > 0 && (
                      <>
                        <div className="font-medium text-xs text-gray-600 uppercase">
                          Flights
                        </div>
                        {trip.flights.map((flight) => (
                          <label key={flight.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.relatedItemIds.includes(flight.id)}
                              onChange={() => handleRelatedToggle(flight.id)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-xs text-gray-700">
                              {flight.flightNumber}
                              {flight.route ? ` (${flight.route})` : ''}
                            </span>
                          </label>
                        ))}
                      </>
                    )}

                    {trip.lodgings.length > 0 && (
                      <>
                        <div className="font-medium text-xs text-gray-600 uppercase mt-3">
                          Lodging
                        </div>
                        {trip.lodgings.map((lodging) => (
                          <label key={lodging.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.relatedItemIds.includes(lodging.id)}
                              onChange={() => handleRelatedToggle(lodging.id)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600"
                            />
                            <span className="text-xs text-gray-700">{lodging.name}</span>
                          </label>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium transition flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  'Add Event'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
