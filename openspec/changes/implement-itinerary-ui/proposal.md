## Why

The project currently has an empty Next.js shell with no application UI. We need to implement the core itinerary planning interface so travelers can view trip timelines, manage logistical details (flights, lodging, documents), and add new events — turning the scaffold into a usable product.

## What Changes

- Introduce the full-page **app shell** layout: dark left-side navigation + main content area + right logistics panel
- Build a **trip itinerary timeline** component rendering day-grouped events with time, icon, title, subtitle, and optional image
- Build a **trip logistics panel** showing flights, lodging, activities, documents, and notes as summary cards
- Build an **Add New Event modal form** with fields for title, date/time, location (text + map picker), notes, confirmation number, traveler assignment, related logistical item linking, and image/receipt upload
- Wire RSC data-fetching layers to call the .NET API for trip, event, and logistics data
- Apply Tailwind CSS throughout; no CSS Modules or separate stylesheets beyond `globals.css`

## Capabilities

### New Capabilities

- `app-shell`: Top-level layout with dark left nav (logo, nav links, trip list) and content slot; used by all trip pages
- `itinerary-timeline`: Day-by-day scrollable timeline of events rendered as a React Server Component fed by the .NET API
- `trip-logistics-panel`: Right-side panel RSC showing flight cards, lodging cards with map thumbnails, activity overview, documents, and notes
- `add-event-form`: Client Component modal form for adding a new event to a trip; validates inputs and posts to the .NET API

### Modified Capabilities

## Impact

- Creates `app/layout.tsx` shell wrapping all pages
- Creates `app/trips/[tripId]/page.tsx` as the main trip detail route (RSC)
- Creates `app/trips/[tripId]/components/` for itinerary timeline, logistics panel, and event form
- Adds Tailwind CSS utility classes; no new CSS dependencies required (Tailwind already in project)
- Establishes the pattern for .NET API calls via `fetch` in Server Components with typed response models
