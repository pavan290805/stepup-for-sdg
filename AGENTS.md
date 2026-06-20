# Agents Guide

## Project Overview
StepUp SDG is a Next.js 16 admin dashboard for monitoring UN Sustainable Development Goals.

## Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (login/register) + inline styles (dashboard)
- **Charts**: chart.js + react-chartjs-2
- **Animation**: framer-motion (login/register only)

## Project Structure
```
app/
  page.tsx                        # Redirects to /Pages/login
  layout.tsx                      # Root layout
  globals.css                     # Global styles
  Pages/
    login/page.tsx                # Login page
    register/page.tsx             # Register page
    dashboard/
      layout.tsx                  # Dashboard shell (sidebar, topbar, footer)
      page.tsx                    # Dashboard home
      ThemeContext.tsx            # Dark/light theme context
      PartnersContext.tsx         # Global partners state
      sdg-management/page.tsx    # SDG management
      partners/page.tsx          # Partner management (School/Company/NGO/Volunteer forms)
      partnership-review/page.tsx # Review queue (supports ?idx= query param)
      contact/page.tsx           # Contact centre (inbox + support tickets)
public/
  SDG_LOGO-removebg-preview.png
  PPP SDG.png
  sdg_illustration_1781192627956.jpg
  images/                        # Screenshot references (not used in app)
```

## Auth
- Session stored in `localStorage` under key `stepup_admin_session`
- Credentials: `admin@stepup.org` / `admin1234`
- Dashboard layout redirects to `/Pages/login` if no session found

## Key Conventions
- All dashboard components use `useDashboardTheme()` from `ThemeContext.tsx` for dark mode
- Partners state is shared via `usePartners()` from `PartnersContext.tsx`
- Inline styles are used throughout the dashboard for theming
- Tailwind classes are used only in login/register pages
- Nav items are defined in `dashboard/layout.tsx` under `navItems`
- `useSearchParams` must always be wrapped in a `Suspense` boundary in Next.js App Router

## Routing
- `?idx=N` on partnership-review page opens the Nth application in the queue
- Apex Eco-Logistics Corp = idx 0, Riverdale Eco-Secondary School = idx 1
