## ADDED Requirements

### Requirement: Logistics panel renders as a React Server Component in the right column
The trip logistics panel SHALL be a React Server Component that fetches its own data from the .NET API and renders in a fixed-width right column alongside the itinerary timeline. It SHALL contain collapsible sections for Flights, Lodging, Activities, Documents, and Notes.

#### Scenario: Panel renders on the trip detail page
- **WHEN** the trip detail page loads
- **THEN** the logistics panel SHALL appear in the right column with all sections visible

#### Scenario: Panel is a React Server Component
- **WHEN** the panel is rendered
- **THEN** it SHALL have no `'use client'` directive; all data fetching occurs server-side

### Requirement: Flights section displays flight summary cards
The Flights section SHALL render one card per flight associated with the trip. Each card SHALL display: flight number (e.g., "Flight JL11 (SFO→NRT)"), airline, flight number label, date, seat count, and a "Details" toggle to expand additional info.

#### Scenario: Multiple flights displayed
- **WHEN** a trip has two or more flights
- **THEN** the Flights section SHALL display all flights in a horizontal card layout (wrapping as needed)

#### Scenario: Details toggle
- **WHEN** the user clicks "Details" on a flight card
- **THEN** additional flight details SHALL expand below the card summary

### Requirement: Lodging section displays hotel/accommodation cards with map thumbnail
The Lodging section SHALL render one card per accommodation. Each card SHALL display: property name, number of nights, abbreviated address, check-in/check-out dates, confirmation number, and a static map thumbnail (Google Maps static image or placeholder).

#### Scenario: Lodging card with confirmation number
- **WHEN** a lodging entry has a confirmation number
- **THEN** the card SHALL display "Confirmation #: <number>"

#### Scenario: Map thumbnail displayed
- **WHEN** a lodging entry has a location
- **THEN** the card SHALL render a map thumbnail image below the lodging details

### Requirement: Activities section provides an overview toggle
The Activities section SHALL show a summary count or list of activities and provide an "Overview" toggle/link to expand the full activity list.

#### Scenario: Activities overview toggle
- **WHEN** the user clicks the "Overview" toggle in the Activities section
- **THEN** the full list of activities SHALL expand or navigate to the activities detail view

### Requirement: Documents section displays passport and insurance document cards
The Documents section SHALL render document cards for uploaded travel documents. At minimum it SHALL display a Passport card and an Insurance card with their respective icons.

#### Scenario: Documents listed
- **WHEN** a trip has documents attached
- **THEN** each document SHALL appear as a card with an icon and document type label

### Requirement: Notes section is present and editable via client interaction
The Notes section SHALL be rendered in the logistics panel. Viewing notes occurs server-side; editing SHALL be handled by a Client Component sub-component that receives the initial notes value as a prop.

#### Scenario: Notes section visible
- **WHEN** the logistics panel renders
- **THEN** a "Notes" section heading SHALL be visible at the bottom of the panel
