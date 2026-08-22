# Johar Jharkhand — Smart Digital Platform for Eco & Cultural Tourism

A full-stack prototype built for **Smart India Hackathon (SIH260513)** — a tourism platform for the Government of Jharkhand connecting travelers, local artisans/vendors, and government administration in one system, themed around Sohrai & Khovar tribal folk art.

🔗 **Live demo:** https://joharjharkhand-8f71a.web.app
📦 **Repo:** https://github.com/24ug1bycs649-beep/travel-hackathon

---

## What it does

Three connected, role-based dashboards:

### 🧭 Tourist Dashboard
- **Interactive map** of Jharkhand (Leaflet) with 11 real eco & cultural hotspots — waterfalls, hill stations, temples, tribal art villages — each with photos, weather/crowd info, and an audio-companion-style detail panel
- **Custom trip builder** — add places from the map, reorder/remove them, and watch the route draw live (toggle between full-trip and day-wise route views)
- **AI Trip Planner** — a rule-based recommendation engine that parses free-text prompts ("3 days, ₹10,000 budget, I love nature") and generates a day-wise itinerary by scoring locations against budget/interest/duration
- **Eco Trekker** — eco-points system with simulated GPS check-ins at eco-verified locations, plus a UPI-style payment scanner UI
- **Marketplace** — browse local artisan crafts (Dokra metalwork, Sohrai/Khovar paintings) with an AR-preview stub and per-artist profile pages

### 🏪 Local Vendor Dashboard
- Vendor registration form → **writes live to Firebase Firestore**
- Pending-approval flow, auto-generated QR code once approved
- Craft photo upload section for artisan vendors

### 🏛️ Government Admin Dashboard
- Vendor verification queue with approve/reject actions
- Live weather & crowd status table across all hotspots
- Push-alert system (e.g. weather warnings) to a specific location
- Revenue tracker stub for the platform's micro-economy model

### ✨ Extras
- Custom splash screen ("Johar Jharkhand") with a widen-and-fade entrance animation
- Full Sohrai/Khovar-inspired design system (earthy palette, geometric zigzag motifs, custom map markers) — no generic SaaS-blue styling
- Real Firebase project wired in (Firestore live, ready for Auth/Storage)

---

## Tech stack

- **React 19 + Vite** — fast dev/build tooling
- Role-switcher architecture (Context API for shared trip state)
- **Leaflet + react-leaflet** — interactive mapping, no API key required
- **Firebase** (Firestore) — live vendor registration & approval data
- **qrcode.react** — QR generation for approved vendors
- Hand-rolled CSS design system (no Tailwind/Bootstrap) — Fraunces + Work Sans + JetBrains Mono, full custom Sohrai/Khovar palette

---

## Running locally

```bash
git clone https://github.com/24ug1bycs649-beep/travel-hackathon.git
cd travel-hackathon
npm install
cp .env.example .env   # then fill in your own Firebase project keys
npm run dev
```

App runs at `http://localhost:5173`.

---

## Project background

Built solo (with AI pair-programming) across multiple sessions as a rapid hackathon prototype — going from an empty Vite scaffold to 3 full role-based dashboards, real map data, a working rule-based recommendation engine, and live Firestore integration in under a week. Ultimately a teammate's separate build was used for the team's final SIH submission, but this version is preserved here as a complete, standalone demonstration of the full feature spec.

---

## Screenshots

_[Add a few screenshots here — the splash screen, the map with trip builder, the AI planner result, the vendor QR code, the admin dashboard]_
