import {
  Trip,
  TripEvent,
  Flight,
  Lodging,
  CreateTripInput,
  UpdateTripInput,
  CreateTripEventInput,
  CreateFlightInput,
  CreateLodgingInput,
} from '@/lib/types/trip';

const API_URL = process.env.API_URL || 'http://localhost:5238/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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
    throw new ApiError(
      response.status,
      `API request failed: ${response.status} ${response.statusText}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// Trips

export async function getTrips(): Promise<Trip[]> {
  return fetchFromAPI<Trip[]>('/Trips');
}

export async function getTrip(tripId: string): Promise<Trip> {
  return fetchFromAPI<Trip>(`/Trips/${tripId}`);
}

export async function createTrip(input: CreateTripInput): Promise<Trip> {
  return fetchFromAPI<Trip>('/Trips', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function updateTrip(
  tripId: string,
  input: UpdateTripInput
): Promise<Trip> {
  return fetchFromAPI<Trip>(`/Trips/${tripId}`, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}

export async function deleteTrip(tripId: string): Promise<void> {
  await fetchFromAPI<void>(`/Trips/${tripId}`, { method: 'DELETE' });
}

// Trip Events

export async function getTripEvents(tripId: string): Promise<TripEvent[]> {
  return fetchFromAPI<TripEvent[]>(`/trips/${tripId}/events`);
}

export async function createEvent(
  tripId: string,
  input: CreateTripEventInput
): Promise<TripEvent> {
  return fetchFromAPI<TripEvent>(`/trips/${tripId}/events`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteEvent(
  tripId: string,
  eventId: string
): Promise<void> {
  await fetchFromAPI<void>(`/trips/${tripId}/events/${eventId}`, {
    method: 'DELETE',
  });
}

// Flights

export async function getTripFlights(tripId: string): Promise<Flight[]> {
  return fetchFromAPI<Flight[]>(`/trips/${tripId}/flights`);
}

export async function createFlight(
  tripId: string,
  input: CreateFlightInput
): Promise<Flight> {
  return fetchFromAPI<Flight>(`/trips/${tripId}/flights`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteFlight(
  tripId: string,
  flightId: string
): Promise<void> {
  await fetchFromAPI<void>(`/trips/${tripId}/flights/${flightId}`, {
    method: 'DELETE',
  });
}

// Lodgings

export async function getTripLodgings(tripId: string): Promise<Lodging[]> {
  return fetchFromAPI<Lodging[]>(`/trips/${tripId}/lodgings`);
}

export async function createLodging(
  tripId: string,
  input: CreateLodgingInput
): Promise<Lodging> {
  return fetchFromAPI<Lodging>(`/trips/${tripId}/lodgings`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function deleteLodging(
  tripId: string,
  lodgingId: string
): Promise<void> {
  await fetchFromAPI<void>(`/trips/${tripId}/lodgings/${lodgingId}`, {
    method: 'DELETE',
  });
}
