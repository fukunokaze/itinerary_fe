'use client';

import { useRef, useEffect, useState, useTransition } from 'react';
import { createEventAction } from '../actions';
import { Traveler, Flight, Lodging } from '@/lib/types/trip';
import { mockTravelers, mockFlights, mockLodging } from '@/lib/fixtures/trip';
import { X, ChevronDown } from 'lucide-react';

interface AddEventModalProps {
  tripId: string;
  onClose: () => void;
}

export function AddEventModal({ tripId, onClose }: AddEventModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [expandRelated, setExpandRelated] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '',
    location: '',
    notes: '',
    confirmationNumber: '',
    assignedTravelers: ['1', '2'] as string[],
    relatedItems: [] as string[],
  });

  // Get day number
  const eventDate = new Date(formData.date);
  const dayNumber = eventDate.getDay() + 1;

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

  const handleInputChange = (
    field: string,
    value: string | string[]
  ) => {
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
      assignedTravelers: prev.assignedTravelers.includes(travelerId)
        ? prev.assignedTravelers.filter((id) => id !== travelerId)
        : [...prev.assignedTravelers, travelerId],
    }));
  };

  const handleRelatedToggle = (itemId: string) => {
    setFormData((prev) => ({
      ...prev,
      relatedItems: prev.relatedItems.includes(itemId)
        ? prev.relatedItems.filter((id) => id !== itemId)
        : [...prev.relatedItems, itemId],
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
            <h2 className="text-xl font-bold">Add New Event (Japan Adventure)</h2>
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
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 flex items-center">
                    Day {dayNumber}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Start Time *
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

            {/* Confirmation/Booking # */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Confirmation/Booking #
              </label>
              <input
                type="text"
                value={formData.confirmationNumber}
                onChange={(e) =>
                  handleInputChange('confirmationNumber', e.target.value)
                }
                placeholder="e.g., CONF12345"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Assigned Travelers */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Assigned Travelers
              </label>
              <div className="space-y-2">
                {mockTravelers.map((traveler) => (
                  <label key={traveler.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.assignedTravelers.includes(
                        traveler.id
                      )}
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

            {/* Related Logistical Items */}
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
                  <div className="font-medium text-xs text-gray-600 uppercase">
                    Flights
                  </div>
                  {mockFlights.map((flight) => (
                    <label
                      key={flight.id}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.relatedItems.includes(flight.id)}
                        onChange={() => handleRelatedToggle(flight.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-xs text-gray-700">
                        {flight.flightNumber} ({flight.departureAirport}→
                        {flight.arrivalAirport})
                      </span>
                    </label>
                  ))}

                  <div className="font-medium text-xs text-gray-600 uppercase mt-3">
                    Lodging
                  </div>
                  {mockLodging.map((lodge) => (
                    <label
                      key={lodge.id}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="checkbox"
                        checked={formData.relatedItems.includes(lodge.id)}
                        onChange={() => handleRelatedToggle(lodge.id)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-xs text-gray-700">{lodge.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Image/Receipt */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Upload Image/Receipt
              </label>
              <button
                type="button"
                className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-gray-400 transition"
              >
                📎 Upload Image/Receipt
              </button>
            </div>

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
