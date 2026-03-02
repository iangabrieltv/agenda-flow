# AgendAi - Project Overview

## About

AgendAi is an online scheduling system (Portuguese-language) targeting beauty professionals (barbershops, salons). It is a pure frontend React single-page application built with Vite.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5 with `@vitejs/plugin-react-swc`
- **Styling**: Tailwind CSS + shadcn/ui component library
- **Routing**: React Router v6
- **State/Data**: TanStack React Query, React Context (AuthContext, AppDataContext)
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Charts**: Recharts

## Project Structure

```
src/
  pages/         # Route-level page components (Index, Login, Dashboard, Booking, NotFound)
  components/    # Reusable UI components
    ui/          # shadcn/ui primitives
    landing/     # Landing page sections
    dashboard/   # Dashboard-specific components
  contexts/      # React Context providers (Auth, AppData)
  hooks/         # Custom hooks
  lib/           # Utilities (e.g., cn helper)
```

## Replit Configuration

- Dev server runs on **port 5000** bound to `0.0.0.0` with `allowedHosts: true`
- Workflow: `npm run dev` (Start application)
- The `lovable-tagger` dev dependency was removed during migration as it is Lovable-specific

## Running the Project

The app starts automatically via the "Start application" workflow (`npm run dev`).
