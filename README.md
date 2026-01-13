# LawnHub (MVP)

LawnHub is a simple single-page quoting tool for landscapers. It lets you capture client details, measure job area on Google Maps, add materials and labour line items with markups, and produce a clean quote summary ready for printing.

## Features

- Client/job details with GST toggle, deposit %, and travel fee.
- Google Maps polygon drawing with automatic m² calculation.
- Materials and labour line items with markups and totals.
- Quote summary view for printing/PDF.
- Local storage persistence with saved quote list.

## Tech Stack

- React + Vite + TypeScript
- Tailwind CSS
- Google Maps JavaScript API (Drawing + Places + Geometry)

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Create a `.env` file in the project root:

```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### 3) Run the app

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Google Maps API Setup

1. Create a Google Cloud project and enable:
   - **Maps JavaScript API**
   - **Places API**
   - **Geometry Library** (part of Maps JS)
2. Create an API key and restrict it to your local host.
3. The app loads Maps with these libraries:
   - `drawing` (for polygons)
   - `places` (for autocomplete)
   - `geometry` (for area calculation)

## Known Limitations (MVP)

- Quotes are stored only in the browser via `localStorage`.
- No PDF generation beyond browser print.
- No multi-user or cloud sync.

## Next Steps Ideas

- Customer database + job history.
- Server-side PDF generation with templates.
- Email quotes directly to clients.
- Job costing and margin tracking.
- Photo attachments and on-site notes.
- Signature acceptance.
- Multi-user accounts and access control.

## Manual Area Entry Fallback

If the Maps API key is missing or fails to load, the app displays a manual area input so quotes can still be created.
