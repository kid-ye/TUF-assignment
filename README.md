# TUF Wall Calendar

A fully interactive, responsive Wall Calendar component built with Next.js, React, and Tailwind CSS v4. Features an avant-garde geometric Bauhaus design system with robust date-range selection and contextual note-taking capabilities.

## ?? Getting Started

To run the project locally, run the following commands in your terminal:

# 1. Install dependencies

npm install

# 2. Start the development server

npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework:** Next.js (App Router) & React
- **Styling:** Tailwind CSS v4 (using CSS native `@theme` mapping)
- **Date Management:** `date-fns` for robust immutable calendar math
- **Icons:** `lucide-react`
- **Fonts:** Outfit (via Google Fonts)

## Architecture & Design Choices

### 1. The Design System

- **Hard Geometry:** CSS polygons (`clip-path`), aggressive element rotations, and hard `4px 4px 0px 0px` box shadows to emulate physical, brutalist materials.
- **Primary Colors:** Focused heavily on primary accent colors (`#D02020` Red, `#1040C0` Blue, `#F0C020` Yellow) offset against stark black borders and off-white backgrounds to ensure high contrast.
- **Tailwind v4 Setup:** Leveraged the new inline `@theme` directives inside `app/globals.css` instead of ailwind.config.js to manage the aesthetic.

### 2. State Management & Grid Logic

The `WallCalendar` handles complex multi-state mapping:

- **Date Math:** Leveraged `date-fns` to reliably trace `startOfMonth` and `endOfWeek` spanning intervals cleanly outside of the standard 30-day limits.
- **Selection Engine:** Built a custom interval engine allowing users to pick a start date, then smoothly attach an end date.
- **Contextual Note Storage:** Implemented a single dictionary mapping (`notesData: Record<string, string>`) instead of deeply nesting object state. Selecting discrete arrays of dates automatically generates unique ID payloads to save text state bound dynamically.

### 3. Polish & Accessibility

- **Screen Reader Support:** Ensured semantic `aria-label` formatting (e.g., explicitly reading "April 1, 2026") rather than raw integer nodes, along with reactive `aria-pressed` states on the interactable grid buttons.
- **UX Protections:** Added visual "tag" indicators alongside rapid "Clear Dates" functionality, ensuring users aren't friction-locked once they begin navigating.

## Repository Links

- **Source Code:** [Replace this with your GitHub repository link]
- **Live Demo:** [Replace this with your Vercel/live environment link]
