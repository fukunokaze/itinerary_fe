## ADDED Requirements

### Requirement: Add New Event modal opens from the "+ New Event" button
The trip detail page SHALL render a "+ New Event" button in the page header. Clicking it SHALL open a modal dialog overlaying the page. The modal SHALL be a Client Component (`'use client'`).

#### Scenario: Modal opens on button click
- **WHEN** the user clicks the "+ New Event" button
- **THEN** the Add New Event modal SHALL appear, overlaying the page with a backdrop

#### Scenario: Modal closes on Cancel
- **WHEN** the user clicks the "Cancel" button inside the modal
- **THEN** the modal SHALL close without submitting any data

### Requirement: Add New Event form collects all required and optional event fields
The modal form SHALL include the following fields:
- **Event Title** (text input, required)
- **Date** (date picker, pre-filled with the current or selected day, required) with a "Day N" badge
- **Start Time** (time dropdown, required)
- **End Time** (time dropdown, optional)
- **Location** (text input for address/name)
- **Map** (read-only map thumbnail or "pick on map" affordance next to Location)
- **Notes** (textarea, optional)
- **Confirmation/Booking #** (text input, optional)
- **Assigned Travelers** (checkbox list with traveler avatars and names)
- **Related Logistical Items** (checkbox list of trip flights/lodging with an expand toggle)
- **Upload Image/Receipt** (file input button)

#### Scenario: Required fields validated before submit
- **WHEN** the user clicks "Add Event" with Event Title or Date empty
- **THEN** the form SHALL display inline validation errors and SHALL NOT submit

#### Scenario: Traveler checkboxes shown
- **WHEN** the modal opens
- **THEN** the Assigned Travelers section SHALL list all travelers associated with the trip as checkboxes with avatar images

#### Scenario: Related Logistical Items shown
- **WHEN** the modal opens
- **THEN** the Related Logistical Items section SHALL list trip flights and lodging as checkboxes; a chevron toggle SHALL expand/collapse additional items

#### Scenario: File input accepts images and PDFs
- **WHEN** the user clicks "Upload Image/Receipt"
- **THEN** a file picker SHALL open accepting image and PDF file types

### Requirement: Form submission posts the new event to the .NET API via a Server Action
On a valid submit the form SHALL invoke a Next.js Server Action that posts the new event payload to the .NET API. On success the Server Action SHALL call `revalidatePath` on the trip route to refresh the itinerary timeline. The Client Component SHALL use `useTransition` to show a loading state during submission.

#### Scenario: Successful event creation
- **WHEN** the user submits a valid form
- **THEN** the Server Action SHALL POST to the .NET API, the modal SHALL close, and the itinerary timeline SHALL re-render with the new event

#### Scenario: API error on submission
- **WHEN** the Server Action receives a non-2xx response from the .NET API
- **THEN** the modal SHALL remain open and display an error message to the user

#### Scenario: Loading state during submission
- **WHEN** the form has been submitted and the Server Action is in progress
- **THEN** the "Add Event" button SHALL be disabled and show a loading indicator

### Requirement: Modal is accessible and keyboard-navigable
The modal SHALL trap focus when open, be closeable via the Escape key, and use a `<dialog>` element or equivalent ARIA role to communicate its modal nature to assistive technologies.

#### Scenario: Escape key closes modal
- **WHEN** the modal is open and the user presses Escape
- **THEN** the modal SHALL close without submitting

#### Scenario: Focus trapped inside modal
- **WHEN** the modal is open
- **THEN** pressing Tab SHALL cycle focus only through elements inside the modal
