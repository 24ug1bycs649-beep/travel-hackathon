# Travel Hackathon Project

*(rename this — placeholder project name)*

A React + Firebase web app for [one-line description — e.g. "connecting travelers with local artisans and guides for itinerary building"].

## Tech Stack

- React (Vite)
- Firebase (Firestore + Auth)

## Getting Started (local setup)

1. Clone the repo
   git clone <repo-url>
   cd travel-hackathon

2. Install dependencies
   npm install

3. Set up environment variables
   Copy .env.example to .env:
   cp .env.example .env
   Fill in your own Firebase project's values in .env (get these from Firebase Console > Project Settings > General > Your apps > SDK setup and configuration).
   .env is gitignored — never commit it.

4. Run the app locally
   npm run dev
   App runs at http://localhost:5173

## Folder Structure

- /src/pages — Person A — Route-level pages (research/UI)
- /src/components — Shared — Reusable UI components
- /src/data — Person A — Destination/artisan/guide JSON data
- /src/services — Person B — Firebase calls, itinerary logic, booking logic
- /src/admin — Person C — Admin dashboard screens
- /src/utils — Shared — Helper functions

## Branch Naming Convention

feature/<short-name>

Examples: feature/map-view, feature/itinerary-builder, feature/admin-dashboard

See CONTRIBUTING.md for our full workflow.
