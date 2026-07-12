'use server';

import { revalidatePath } from 'next/cache';
import { createEvent } from '@/lib/api/trips';
import { EventType } from '@/lib/types/trip';

interface CreateEventInput {
  type: EventType;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  location?: string;
  notes?: string;
  bookingCode?: string;
  travelerIds: string[];
  relatedItemIds: string[];
}

export async function createEventAction(
  tripId: string,
  eventData: CreateEventInput
) {
  try {
    const payload = {
      type: eventData.type,
      title: eventData.title,
      date: eventData.date,
      startTime: eventData.startTime ? `${eventData.startTime}:00` : undefined,
      endTime: eventData.endTime ? `${eventData.endTime}:00` : undefined,
      location: eventData.location,
      notes: eventData.notes,
      bookingCode: eventData.bookingCode,
      travelerIds: eventData.travelerIds,
      relatedItemIds: eventData.relatedItemIds,
    };

    const result = await createEvent(tripId, payload);

    // Revalidate the trip page to refresh the itinerary
    revalidatePath(`/trips/${tripId}`);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Failed to create event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create event',
    };
  }
}
