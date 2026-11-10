# Dietitian Website - Holistic Wellness

This repository contains the Next.js frontend for the Dietitian Website, architected to provide a premium, modern, and trustworthy digital presence for condition-based nutrition services.

## Development Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- Git

## Folder Structure Overview

```text
src/
├── app/                  # Next.js App Router (pages & API routes)
│   ├── (frontend)/       # Marketing and content routes
│   │   ├── (marketing)/  # Static marketing pages (About, Services, Conditions)
│   │   ├── blog/         # Sanity-powered blog routes
│   │   ├── success-stories/# Sanity-powered success stories
│   │   ├── contact/      # General contact form page
│   │   └── book-consultation/# Cal.com Booking embed page
│   ├── api/              # API routes (e.g. Sanity revalidation webhook)
│   └── studio/           # Embedded Sanity Studio
├── components/           # Reusable UI elements
│   ├── ui/               # shadcn/ui base components
│   ├── sections/         # Complex page sections (Hero, FAQ)
│   └── global/           # Header, Footer, and layout wrappers
│   └── shared/           # Reusable generic components (Buttons, Cards, Forms)
├── lib/                  # Utilities (shadcn utils)
├── sanity/               # Sanity CMS configuration and schema definitions
```

## Environment Variables

Copy the `.env.example` file to `.env.local` and populate it with the appropriate values:

```bash
cp .env.example .env.local
```

Required variables:
- `SANITY_PROJECT_ID`: The project ID for the Sanity CMS.
- `SANITY_DATASET`: The Sanity dataset (e.g., `production`).
- `SANITY_API_VERSION`: API version string (e.g., `2023-01-01`).
- `SANITY_REVALIDATE_SECRET`: Secret token for Next.js ISR on-demand revalidation.
- `WEB3FORMS_ACCESS_KEY`: Access key for form submissions via Web3Forms.
- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Measurement ID.
- `NEXT_PUBLIC_CLARITY_ID`: Microsoft Clarity tracking ID.
- `CALCOM_LINK`: The username or direct link for the Cal.com embed widget.

## Content Management (Sanity Studio)

This project uses Sanity as a Headless CMS. The Studio is embedded directly into the Next.js application.

### Studio Usage
- Access the Studio locally at: `http://localhost:3000/studio`
- Production Studio: `https://yourdomain.com/studio`

### Seeding Content
A seed script is provided to populate placeholder content. You need the `SANITY_API_WRITE_TOKEN` in `.env.local`:
```bash
npx tsx scripts/seed.ts
```

### Revalidation (ISR)
When content is published or unpublished in Sanity, a webhook fires to the Next.js `/api/revalidate` route to instantly invalidate the cache and serve fresh content.

### Content Ownership
- Global Settings, Navigation, and Footer are managed under "Site Settings" and "Navigation Menus".
- Homepage is managed via modular objects under the "Homepage" singleton.
- Services, Conditions, Testimonials, and FAQs are separate document types and referenced inside the Homepage/Services pages.
- Blog is managed entirely within Sanity via "Posts", "Authors", and "Categories".

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to identify code issues.
- `npm run format` - (If configured) Runs Prettier to format code.
