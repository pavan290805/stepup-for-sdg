# Agents Guide

## Project Overview
StepUp SDG is a Next.js 16 admin dashboard for monitoring UN Sustainable Development Goals.

## Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + inline styles
- **Charts**: chart.js + react-chartjs-2
- **Animation**: framer-motion

## Project Structure
```
app/
  page.tsx               # Redirects to /Pages/login
  layout.tsx             # Root layout
  globals.css            # Global styles
  Pages/
    login/page.tsx       # Login page
    register/page.tsx    # Register page
    dashboard/
      layout.tsx         # Dashboard shell (sidebar, topbar, footer)
      page.tsx           # Dashboard home
      ThemeContext.tsx   # Dark/light theme context
      sdg-management/
        page.tsx         # SDG management (tabs: info, cases, activities, impact)
public/
  SDG_LOGO-removebg-preview.png
  PPP SDG.png
  sdg_illustration_1781192627956.jpg
  images/
```

## Auth
- Session stored in `localStorage` under key `stepup_admin_session`
- Credentials: `admin@stepup.org` / `admin1234`
- Dashboard layout redirects to `/Pages/login` if no session found

## Key Conventions
- All dashboard components use `useDashboardTheme()` from `ThemeContext.tsx` for dark mode
- Inline styles are used throughout the dashboard for theming
- Tailwind classes are used in login/register pages
- Nav links are defined in `dashboard/layout.tsx` under `navItems`
