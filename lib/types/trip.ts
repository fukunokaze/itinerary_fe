export type EventType = 
  | 'flight' 
  | 'hotel' 
  | 'meal' 
  | 'attraction' 
  | 'activity' 
  | 'transport' 
  | 'other';

export interface Traveler {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  departureAirport: string;
  departureTime: string; // ISO 8601
  arrivalAirport: string;
  arrivalTime: string; // ISO 8601
  seatCount: number;
  confirmationNumber?: string;
  imageUrl?: string;
}

export interface Lodging {
  id: string;
  name: string;
  address: string;
  checkInDate: string; // ISO 8601
  checkOutDate: string; // ISO 8601
  nights: number;
  confirmationNumber?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
}

export interface Document {
  id: string;
  type: 'passport' | 'insurance' | 'visa' | 'other';
  name: string;
  url?: string;
}

export interface LogisticalItem {
  id: string;
  type: 'flight' | 'lodging' | 'activity';
  name: string;
  itemId: string; // References Flight.id, Lodging.id, etc.
}

export interface TripEvent {
  id: string;
  tripId: string;
  title: string;
  description?: string;
  eventType: EventType;
  startTime: string; // ISO 8601
  endTime?: string; // ISO 8601
  location?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  notes?: string;
  confirmationNumber?: string;
  assignedTravelers: Traveler[];
  relatedLogisticalItems: LogisticalItem[];
}

export interface Trip {
  id: string;
  title: string;
  description?: string;
  startDate: string; // ISO 8601
  endDate: string; // ISO 8601
  locations: string[];
  travelers: Traveler[];
  events: TripEvent[];
  flights: Flight[];
  lodging: Lodging[];
  activities: TripEvent[];
  documents: Document[];
  notes?: string;
}

export interface TripResponse {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  locations: string[];
}

export interface EventsResponse {
  events: TripEvent[];
}

export interface LogisticsResponse {
  flights: Flight[];
  lodging: Lodging[];
  activities: TripEvent[];
  documents: Document[];
  notes?: string;
}

export interface TravelersResponse {
  travelers: Traveler[];
}
