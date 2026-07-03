## ADDED Requirements

### Requirement: App shell renders a persistent dark left navigation sidebar
The app shell layout SHALL render a full-height dark sidebar on the left containing the JourneyPlanner logo/wordmark, primary navigation links (Dashboard, My Trips, Calendar, Budget, Settings), a "Trips" section header, and a list of recent trips. The sidebar SHALL remain visible across all trip pages without re-rendering on navigation.

#### Scenario: Sidebar displays navigation links
- **WHEN** a user loads any trip page
- **THEN** the sidebar SHALL display the JourneyPlanner logo, navigation links (Dashboard, My Trips, Calendar, Budget, Settings), and a list of at least the current user's trips

#### Scenario: Active trip is highlighted in the sidebar
- **WHEN** the user is viewing a specific trip
- **THEN** the corresponding trip entry in the sidebar trip list SHALL be visually highlighted (e.g., bold text or background highlight)

#### Scenario: Sidebar is implemented as a React Server Component
- **WHEN** the sidebar is rendered
- **THEN** it SHALL be a React Server Component (no `'use client'` directive) so trip list data can be fetched server-side without client JS

### Requirement: App shell exposes a content slot for page-level content
The layout SHALL render its `children` prop in the main content area to the right of the sidebar, taking up the remaining horizontal space.

#### Scenario: Page content renders alongside sidebar
- **WHEN** a trip detail page is loaded
- **THEN** the trip detail content (itinerary timeline + logistics panel) SHALL render in the content area without obscuring the sidebar

### Requirement: App shell layout is defined via Next.js App Router layout file
The layout SHALL be implemented in `app/layout.tsx` or a nested `app/trips/layout.tsx` using the Next.js App Router `Layout` convention.

#### Scenario: Layout wraps all trip routes
- **WHEN** the user navigates between trips
- **THEN** the sidebar SHALL persist (not unmount/remount) due to the shared layout file
