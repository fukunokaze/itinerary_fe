import {
  Trip,
  TripResponse,
  EventsResponse,
  LogisticsResponse,
  TravelersResponse,
} from '@/lib/types/trip';

const API_URL = process.env.API_URL || 'http://localhost:5000/api';

async function fetchFromAPI<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getTrip(tripId: string): Promise<Trip> {
  try {
    const data = await fetchFromAPI<TripResponse>(
      `/trips/${tripId}`
    );
    // Transform API response to Trip type as needed
    return data as unknown as Trip;
  } catch (error) {
    console.error(`Failed to fetch trip ${tripId}:`, error);
    throw error;
  }
}

export async function getTripEvents(tripId: string) {
  try {
    const data = await fetchFromAPI<EventsResponse>(
      `/trips/${tripId}/events`
    );
    return data.events;
  } catch (error) {
    console.error(`Failed to fetch events for trip ${tripId}:`, error);
    throw error;
  }
}

export async function getTripLogistics(tripId: string) {
  try {
    const data = await fetchFromAPI<LogisticsResponse>(
      `/trips/${tripId}/logistics`
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch logistics for trip ${tripId}:`, error);
    throw error;
  }
}

export async function getTripTravelers(tripId: string) {
  try {
    const data = await fetchFromAPI<TravelersResponse>(
      `/trips/${tripId}/travelers`
    );
    return data.travelers;
  } catch (error) {
    console.error(`Failed to fetch travelers for trip ${tripId}:`, error);
    throw error;
  }
}

export async function createEvent(
  tripId: string,
  eventData: Record<string, unknown>
) {
  try {
    return await fetchFromAPI(
      `/trips/${tripId}/events`,
      {
        method: 'POST',
        body: JSON.stringify(eventData),
      }
    );
  } catch (error) {
    console.error(`Failed to create event for trip ${tripId}:`, error);
    throw error;
  }
}
