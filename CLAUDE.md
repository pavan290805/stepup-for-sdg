# Claude Guide

## Project
StepUp SDG — Next.js 16 admin portal for UN SDG monitoring.

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Architecture
- App Router; all pages live under `app/Pages/`
- Dashboard shell is in `app/Pages/dashboard/layout.tsx` — sidebar, topbar, footer, theme provider, PartnersProvider
- `ThemeContext.tsx` exposes `{ dark }` via `useDashboardTheme()` hook
- `PartnersContext.tsx` manages global partners state via `usePartners()` hook

## Pages
- `app/page.tsx` — redirects to `/Pages/login`
- `app/Pages/login/page.tsx` — login (email: admin@stepup.org / password: admin1234)
- `app/Pages/register/page.tsx` — register page
- `app/Pages/dashboard/page.tsx` — main dashboard with stats, charts, quick actions
- `app/Pages/dashboard/sdg-management/page.tsx` — SDG management
- `app/Pages/dashboard/partners/page.tsx` — partner management (cards + table view, modal forms per type)
- `app/Pages/dashboard/partnership-review/page.tsx` — review queue, accepts `?idx=` query param to open specific application
- `app/Pages/dashboard/contact/page.tsx` — contact centre (inbox + support tickets)

## Sidebar Order
1. Dashboard
2. SDG Management
3. Partnership Review
4. Partner Management
5. Contact Centre

## Routing Conventions
- Dashboard "Review Now", "Inspect Application", "Open Review Center" → `/Pages/dashboard/partnership-review?idx=N`
- Dashboard "Add Partner" → `/Pages/dashboard/partners`
- Dashboard "New SDG Entry" → `/Pages/dashboard/sdg-management`
- Dashboard "Review Requests" → `/Pages/dashboard/partnership-review`

## Rules
- Keep `'use client'` on all dashboard pages/components
- Do not remove `ThemeContext.Provider` or `PartnersProvider` from `dashboard/layout.tsx`
- Do not remove ChartJS.register calls from `dashboard/page.tsx`
- All dashboard components use inline styles for theming (not Tailwind)
- Login/register pages use Tailwind classes
