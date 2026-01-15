# Branching Out SEQ Website

Production-ready marketing site for Branching Out SEQ (lawn mowing & property maintenance).

## Tech stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma + SQLite for quote storage
- Nodemailer for email notifications

## Getting started

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Visit `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Environment variables
Copy `.env.example` to `.env` and update values.

### Email setup (Nodemailer)
- Provide SMTP settings in `.env` (EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS).
- Set `EMAIL_TO` to the inbox that receives quote requests.

### Analytics
- Add `NEXT_PUBLIC_GA_ID` for GA4.
- Optional: add `NEXT_PUBLIC_META_PIXEL_ID` for Meta Pixel tracking.

## Where leads are stored
- Quote requests are stored in the SQLite database referenced by `DATABASE_URL`.
- View data with Prisma Studio:

```bash
npm run prisma:studio
```

## Updating business details
- Edit `src/lib/site.ts` to change the business name, phone, email, ABN, and service area defaults.

## Editing service areas and services
- Services: `src/data/services.ts`
- Service areas: `src/data/areas.ts`
- These data files drive static generation for `/services/[slug]` and `/service-areas/[suburb]`.

## Quote form workflow
- Quote form posts to `POST /api/quote`.
- Submissions are validated, rate-limited, stored in SQLite, and emailed.

## Scripts
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Create SQLite schema
- `npm run prisma:studio` - Browse quote submissions
