## 1. TypeScript Types & API Layer

- [x] 1.1 Create `lib/types/trip.ts` defining `Trip`, `TripEvent`, `EventType`, `Flight`, `Lodging`, `Traveler`, `Document`, and `LogisticalItem` TypeScript interfaces matching the expected .NET API response shapes
- [x] 1.2 Create `lib/api/trips.ts` with typed `fetch` helper functions: `getTrip(id)`, `getTripEvents(tripId)`, `getTripLogistics(tripId)`, `getTripTravelers(tripId)` — reading base URL from `process.env.API_URL`
- [x] 1.3 Create `lib/fixtures/trip.ts` with mock data matching the `Trip`, `TripEvent`, `Flight`, `Lodging`, and `Traveler` interfaces for use when `API_URL` is not set

## 2. App Shell Layout

- [x] 2.1 Update `app/layout.tsx` to apply a full-height flex layout with the dark sidebar and a `{children}` main content area; add Tailwind dark sidebar styles (`bg-gray-900` or equivalent)
- [x] 2.2 Create `app/_components/Sidebar.tsx` as an RSC rendering the JourneyPlanner logo/wordmark, primary nav links (Dashboard, My Trips, Calendar, Budget, Settings with icons), and a Trips section with a static/fixture list of trips using Next.js `<Link>` components
- [x] 2.3 Wire `Sidebar` into `app/layout.tsx` so it appears on all pages
- [x] 2.4 Style the active nav item highlight using Next.js `usePathname` in a thin `'use client'` wrapper component (`NavLink.tsx`) that applies active styles when the href matches the current path

## 3. Trip Detail Page Route

- [x] 3.1 Create `app/trips/[tripId]/page.tsx` as an RSC that calls `getTrip(tripId)` and renders the page header (trip title, date range, location badge) plus the action buttons (Edit Trip, Share, + New Event, Manage Travelers)
- [x] 3.2 Implement the two-column layout within the trip detail page: left/main column for the itinerary timeline, right column (fixed width ~320px) for the logistics panel
- [x] 3.3 Create `app/trips/[tripId]/loading.tsx` with a skeleton loading UI for the trip detail page

## 4. Itinerary Timeline

- [x] 4.1 Create `app/trips/[tripId]/_components/ItineraryTimeline.tsx` as an RSC that accepts a `tripId` prop, calls `getTripEvents(tripId)`, and groups events by calendar day
- [x] 4.2 Create `app/trips/[tripId]/_components/DayGroup.tsx` as an RSC rendering the "Day N — Mon DD" header and a vertical list of event cards for that day
- [x] 4.3 Create `app/trips/[tripId]/_components/EventCard.tsx` as an RSC rendering: time (12-hr), category icon, bold title, subtitle line, and an optional right-aligned thumbnail image
- [x] 4.4 Implement the event category icon map in `EventCard.tsx` using a `classMap` object with full Tailwind class strings for each `EventType` (flight ✈, hotel 🛏, food 🍽, attraction 📍, etc.)
- [x] 4.5 Handle the empty itinerary state in `ItineraryTimeline.tsx` — render an empty-state message with a prompt to add the first event

## 5. Trip Logistics Panel

- [x] 5.1 Create `app/trips/[tripId]/_components/LogisticsPanel.tsx` as an RSC that calls `getTripLogistics(tripId)` and renders all sections (Flights, Lodging, Activities, Documents, Notes) in the right column
- [x] 5.2 Create `app/trips/[tripId]/_components/FlightCard.tsx` rendering flight number, route arrow (SFO→NRT style), airline, date, seat count, and a "Details" disclosure toggle (Client Component for toggle state)
- [x] 5.3 Create `app/trips/[tripId]/_components/LodgingCard.tsx` rendering property name, nights, address, dates, confirmation number, and a map thumbnail `<img>` (use a placeholder SVG or static URL initially)
- [x] 5.4 Add Activities, Documents, and Notes sub-sections to `LogisticsPanel.tsx`; Activities shows an "Overview ▾" toggle; Documents renders icon+label cards for Passport and Insurance; Notes shows a static text block

## 6. Add New Event Modal (Client Component)

- [x] 6.1 Create `app/trips/[tripId]/_components/NewEventButton.tsx` as a Client Component (`'use client'`) holding the modal open/close state; render the "+ New Event" button that toggles the modal
- [x] 6.2 Create `app/trips/[tripId]/_components/AddEventModal.tsx` as a Client Component implementing the modal dialog using a `<dialog>` element with `open` attribute or a conditional render with `role="dialog"` and `aria-modal="true"`; implement Escape-key and backdrop-click close handlers; implement focus trapping
- [x] 6.3 Implement all form fields in `AddEventModal.tsx`: Event Title (text), Date (date input + Day N badge), Start Time (select), End Time (select), Location text input, Notes (textarea), Confirmation/Booking # (text), Assigned Travelers (checkbox list with avatars), Related Logistical Items (checkbox list with expand chevron), Upload Image/Receipt (file input styled as a button)
- [x] 6.4 Add client-side validation: require Event Title and Date; display inline error messages on submit attempt with empty required fields
- [x] 6.5 Create `app/trips/[tripId]/actions.ts` with a `'use server'` Server Action `createEvent(formData)` that POSTs to the .NET API endpoint and calls `revalidatePath('/trips/[tripId]')` on success
- [x] 6.6 Wire `AddEventModal.tsx` to call `createEvent` via `useTransition`; disable the "Add Event" button and show a spinner during the pending state; display an error message if the action throws

## 7. Styling & Visual Polish

- [x] 7.1 Ensure the dark sidebar (`bg-gray-900` text-white with nav link hover/active states) matches the visual design reference
- [x] 7.2 Style the itinerary timeline vertical connector line and day header layout to match the design (colored circle + vertical dashed/solid line between events)
- [x] 7.3 Style event cards with a white background, subtle border, rounded corners, and proper spacing; thumbnail images use `object-cover` and a fixed aspect ratio
- [x] 7.4 Style the logistics panel cards (flights, lodging) with white background, border, rounded corners; lodging map thumbnail fills the card bottom
- [x] 7.5 Style the modal with dark header (`bg-gray-900`), white body, properly spaced form sections, and a full-screen semi-transparent backdrop

## 8. Integration & Verification

- [x] 8.1 Set up `.env.local` with `API_URL` pointing to the local .NET API; confirm fixture fallback works when `API_URL` is absent
- [x] 8.2 Run `npm run build` and resolve any TypeScript or ESLint errors
- [x] 8.3 Manually verify the trip detail page renders correctly on `/trips/[tripId]` with fixture data: sidebar, itinerary timeline, logistics panel all visible
- [x] 8.4 Manually verify the Add New Event modal: opens, validates required fields, submits (to fixture/stub), and closes; Escape key and Cancel button both close it; Tab cycles focus within the modal
