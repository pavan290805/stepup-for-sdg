# Claude Guide

## Project
StepUp SDG — Next.js 16 admin portal for UN SDG monitoring.

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Architecture Notes
- App Router is used; pages live under `app/Pages/`
- Dashboard shell is in `app/Pages/dashboard/layout.tsx` — contains sidebar, topbar, footer and theme provider
- `ThemeContext.tsx` exposes `{ dark }` via `useDashboardTheme()` hook
- All chart registrations happen in `layout.tsx` (ChartJS.register)

## When Editing
- Do not remove ChartJS.register calls from `dashboard/layout.tsx`
- Do not remove `ThemeContext.Provider` wrapping in `dashboard/layout.tsx`
- `sdg-management/page.tsx` is the active SDG management page — `sdgmanagemant/` (typo) was the old stub and has been removed
- `partners/` folder is reserved for a future page
- Keep `'use client'` directive on all dashboard pages/components
