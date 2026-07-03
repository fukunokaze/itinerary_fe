'use server';

import { revalidatePath } from 'next/cache';
import { createEvent } from '@/lib/api/trips';

interface CreateEventInput {
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  location?: string;
  notes?: string;
  confirmationNumber?: string;
  assignedTravelers: string[];
  relatedItems: string[];
}

export async function createEventAction(
  tripId: string,
  eventData: CreateEventInput
) {
  try {
    // Combine date and time into ISO format
    const [year, month, day] = eventData.date.split('-');
    const [startHour, startMin] = eventData.startTime.split(':');
    
    const startDateTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(startHour),
      parseInt(startMin)
    );

    const payload = {
      title: eventData.title,
      startTime: startDateTime.toISOString(),
      endTime: eventData.endTime ? new Date(eventData.endTime).toISOString() : undefined,
      location: eventData.location,
      notes: eventData.notes,
      confirmationNumber: eventData.confirmationNumber,
      assignedTravelers: eventData.assignedTravelers,
      relatedLogisticalItems: eventData.relatedItems,
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
