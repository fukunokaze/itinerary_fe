## Context

The project is a Next.js 14+ App Router application backed by a .NET REST API. The current state is an empty scaffold (no pages beyond the default). We need to implement the full trip-itinerary UI shown in the visual design: a three-column layout with a dark left nav, a scrollable day-by-day itinerary timeline, and a right logistics panel. An "Add New Event" modal provides the primary creation flow.

Tailwind CSS is the only styling system. No component library is being introduced.

## Goals / Non-Goals

**Goals:**
- Implement the `app/trips/[tripId]/page.tsx` route as a React Server Component that fetches trip data from the .NET API
- Build the app shell layout (left nav + content slot) as a shared RSC layout
- Build the logistics panel as an RSC; it fetches its own data server-side
- Build the itinerary timeline as an RSC rendering day-grouped events
- Build the "Add New Event" modal as a Client Component with controlled form state, posting to the .NET API via a Server Action or `fetch`
- Style everything with Tailwind CSS utility classes

**Non-Goals:**
- Authentication / session management (assumed handled elsewhere)
- Real-time updates / WebSockets
- Budget, Calendar, or Settings pages (nav links present but not implemented)
- File upload to cloud storage (UI present, wired to a stub)
- Map rendering beyond a static thumbnail placeholder

## Decisions

### RSC vs. Client Component boundary

**Decision**: The page, itinerary timeline, and logistics panel are RSCs. Only the Add New Event modal (and any interactive dropdowns/checkboxes within it) is a Client Component.

**Rationale**: Fetching data in RSCs eliminates client-side loading states for the read path and keeps API credentials server-side. The modal needs `useState`/`useReducer` for its multi-field form, so it must be a Client Component. This matches the App Router idiom of pushing interactivity to the leaves.

**Alternatives considered**: Fetch everything client-side with SWR/React Query — rejected because it adds bundle weight and exposes the .NET API URL to the browser unnecessarily.

### Data fetching pattern

**Decision**: RSCs call the .NET API directly with `fetch` and typed response interfaces. No separate API route layer between Next.js and the .NET backend.

**Rationale**: App Router makes it trivial to call upstream APIs in RSCs. Adding a `/api/*` proxy layer would be redundant complexity for a simple read path.

**Alternatives considered**: Next.js Route Handlers as a BFF proxy — kept as a future option for auth token injection but deferred.

### Server Action for form submission

**Decision**: The Add New Event form submits via a Next.js Server Action (`'use server'`), which calls the .NET API and triggers `revalidatePath` to refresh the itinerary timeline.

**Rationale**: Server Actions keep the mutation close to the RSC data layer, avoiding a separate `/api/events` Route Handler, and integrate with Next.js cache invalidation.

**Alternatives considered**: Client-side `fetch` to a Route Handler — viable but adds an extra file; Server Action is cleaner for this single-endpoint mutation.

### Styling

**Decision**: Tailwind CSS utility classes only. Component-level CSS Modules only if a utility approach becomes unwieldy (none expected at this scale).

**Rationale**: Already in the project; consistent with the visual design's clean utility-first look.

### Component co-location

**Decision**: Components specific to the trip detail page live in `app/trips/[tripId]/_components/`. Shared layout components live in `app/_components/`.

**Rationale**: Co-location keeps trip-specific code easy to find and delete. App Router convention uses `_` prefix for non-route folders.

## Risks / Trade-offs

- **No .NET API yet** → Mitigation: use typed mock/fixture data during development; swap to real `fetch` calls when the API is available. Define TypeScript interfaces that match the expected API contract.
- **Server Action revalidation on slow networks** → The modal may feel unresponsive after submit. Mitigation: show an optimistic loading state using `useTransition` in the Client Component.
- **Tailwind purge / class scanning** → Dynamic class names (e.g., event-type icon colors) must use complete class strings, not template literals, to avoid being purged. Mitigation: use a `classMap` object with full class names.

## Migration Plan

1. No existing pages to migrate — greenfield implementation.
2. Deploy as a new route; the existing root `page.tsx` can redirect to `/trips/[id]` once a trip store exists.
3. Rollback: revert the route directory; no database migrations involved.

## Open Questions

- What base URL / env var should be used for the .NET API? → Assume `NEXT_PUBLIC_API_URL` for now; server-side calls should use `API_URL` (no `NEXT_PUBLIC_` prefix).
- Should the left nav trip list be fetched server-side or driven by a static fixture initially?
- Is the map thumbnail a Google Maps static image or a placeholder SVG?
