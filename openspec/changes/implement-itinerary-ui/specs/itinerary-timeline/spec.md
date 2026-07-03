## ADDED Requirements

### Requirement: Itinerary timeline renders trip events grouped by day
The itinerary timeline SHALL fetch trip event data from the .NET API as a React Server Component and render events in chronological order, grouped under day headers (e.g., "Day 1 — Mar 15"). Each day group SHALL display its events in a vertical timeline layout.

#### Scenario: Events appear under the correct day header
- **WHEN** a trip has events on multiple days
- **THEN** each event SHALL appear under the day header matching its date, in ascending time order

#### Scenario: Timeline is rendered as a React Server Component
- **WHEN** the trip detail page loads
- **THEN** the itinerary timeline SHALL be rendered server-side (no `'use client'` directive on the timeline component) so event data is fetched without client JS

#### Scenario: Empty itinerary state
- **WHEN** a trip has no events
- **THEN** the timeline SHALL render an empty-state message prompting the user to add their first event

### Requirement: Each itinerary event card displays time, icon, title, subtitle, and optional image
Each event card in the timeline SHALL show: the event start time (12-hour format with AM/PM), a category icon indicating the event type (flight, hotel, food, attraction, etc.), the event title in bold, a subtitle line (e.g., hotel name + reservation number, flight number), and an optional thumbnail image on the right.

#### Scenario: Flight event card
- **WHEN** an event has type `flight`
- **THEN** the card SHALL display an airplane icon, the flight number as the title, and the route (e.g., "JL11, SFO-NRT") as subtitle

#### Scenario: Hotel check-in event card
- **WHEN** an event has type `hotel`
- **THEN** the card SHALL display a bed icon, "Check-in" as the title, the hotel name, and the reservation number as subtitle

#### Scenario: Event with image
- **WHEN** an event has an associated image URL
- **THEN** the card SHALL render the image as a right-aligned thumbnail (approximately 80×60px)

#### Scenario: Event without image
- **WHEN** an event has no image URL
- **THEN** the card SHALL render without an image placeholder; layout SHALL not shift

### Requirement: Timeline fetches data via typed fetch call in the Server Component
The itinerary timeline SHALL call the .NET API endpoint for trip events using `fetch` with typed TypeScript response interfaces. The API base URL SHALL be read from the `API_URL` environment variable (server-side only).

#### Scenario: Successful data fetch
- **WHEN** the .NET API returns a 200 response with event data
- **THEN** the timeline SHALL render all returned events grouped by day

#### Scenario: API unavailable during development
- **WHEN** the `API_URL` environment variable is not set or the API is unreachable
- **THEN** the timeline SHALL fall back to typed fixture/mock data so development is unblocked
