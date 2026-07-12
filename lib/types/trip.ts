// Types mirror the .NET backend's OpenAPI schema (GET /openapi/v1.json)

export type EventType = 'flight' | 'lodging' | 'activity';

export interface Traveler {
  id: string;
  name: string;
}

export interface Flight {
  id: string;
  tripId: string;
  flightNumber: string;
  departureTime: string; // ISO 8601 date-time
  arrivalTime: string; // ISO 8601 date-time
  airline?: string | null;
  seat?: string | null;
  confirmationCode?: string | null;
  route?: string | null;
  cost?: number | null;
}

export interface Lodging {
  id: string;
  name: string;
  address?: string | null;
  checkIn: string; // ISO 8601 date-time
  checkOut: string; // ISO 8601 date-time
  nights: number;
  confirmationCode?: string | null;
  cost?: number | null;
}

export interface Document {
  id: string;
  title: string;
  icon: string;
}

export interface TripEvent {
  id: string;
  tripId: string;
  type: EventType;
  title: string;
  date: string; // ISO 8601 date (no time)
  startTime?: string | null; // "HH:mm:ss"
  endTime?: string | null; // "HH:mm:ss"
  location?: string | null;
  notes?: string | null;
  bookingCode?: string | null;
  imageUrl?: string | null;
  tags?: string | null;
  cost?: number | null;
}

export interface Trip {
  id: string;
  title: string;
  startDate: string; // ISO 8601 date
  endDate: string; // ISO 8601 date
  destination?: string;
  description?: string | null;
  emoji?: string;
  events: TripEvent[];
  flights: Flight[];
  lodgings: Lodging[];
  documents: Document[];
  travelers: Traveler[];
  notes?: string | null;
}

// Request payloads (mirror Create*Dto schemas)

export interface CreateTripInput {
  title: string;
  startDate: string;
  endDate: string;
  destination?: string;
  description?: string;
  emoji?: string;
}

export type UpdateTripInput = CreateTripInput;

export interface CreateTripEventInput {
  type: EventType;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  notes?: string;
  bookingCode?: string;
  travelerIds?: string[];
  relatedItemIds?: string[];
  cost?: number;
}

export interface CreateFlightInput {
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  airline?: string;
  seat?: string;
  confirmationCode?: string;
  route?: string;
  cost?: number;
}

export interface CreateLodgingInput {
  name: string;
  checkIn: string;
  checkOut: string;
  address?: string;
  confirmationCode?: string;
  cost?: number;
}
