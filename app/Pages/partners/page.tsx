"use client";

import { useEffect, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   ICONS — dependency-free inline SVGs (no emoji, no icon library)
   ──────────────────────────────────────────────────────────────── */

const Icon = {
  Building: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
    </svg>
  ),
  GradCap: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
    </svg>
  ),
  Heart: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  School: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Search: ({ className = "w-[14px] h-[14px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ className = "w-[13px] h-[13px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  TrendUp: ({ className = "w-[11px] h-[11px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  MapPin: ({ className = "w-[11px] h-[11px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Arrow: ({ className = "w-[14px] h-[14px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Globe: ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  ChevRight: ({ className = "w-[10px] h-[10px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
  Star: ({ className = "w-[9px] h-[9px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  ExternalLink: ({ className = "w-[13px] h-[13px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  BarChart: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Handshake: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    </svg>
  ),
  Megaphone: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  ),
  Shield: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Quote: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M9.5 7C6.5 7 4 9.5 4 12.5S6.5 18 9.5 18c.3 0 .6 0 .9-.1-.6 1.7-2 3.1-3.9 3.6v1.5c3.4-.6 6-3.6 6-7V12.5C12.5 9.5 12.4 7 9.5 7zm9 0c-3 0-5.5 2.5-5.5 5.5S15.5 18 18.5 18c.3 0 .6 0 .9-.1-.6 1.7-2 3.1-3.9 3.6v1.5c3.4-.6 6-3.6 6-7V12.5C21.5 9.5 21.4 7 18.5 7z" />
    </svg>
  ),
  Clock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" />
    </svg>
  ),
  Lock: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  ),
  Users: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Calendar: ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Award: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="6" /><path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
    </svg>
  ),
  Eye: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

/* ────────────────────────────────────────────────────────────────
   TYPES
   ──────────────────────────────────────────────────────────────── */

type PartnerType = "School" | "NGO" | "Company" | "University";
type Tier = "Gold" | "Silver";

interface Partner {
  id: number;
  name: string;
  type: PartnerType;
  city: string;
  initials: string;
  sdgs: number[];
  since: string;
  story: string;
  lastActivity: string;
  funds?: string;
  fundsLakh?: number;
  tier?: Tier;
}

/* ────────────────────────────────────────────────────────────────
   DESIGN TOKENS — every type maps to the actual StepUp brand
   palette (#0cc0df cyan / #c03538 red / #1d5948 green) instead of
   generic Tailwind colors. University gets a warm neutral accent
   rather than a 4th unrelated saturated hue.
   ──────────────────────────────────────────────────────────────── */

const typeConfig: Record<
  PartnerType,
  { color: string; bg: string; border: string; badgeBg: string; badgeText: string; IconEl: (p: { className?: string }) => JSX.Element }
> = {
  School: { color: "#3fae8c", bg: "rgba(29,89,72,0.18)", border: "rgba(63,174,140,0.35)", badgeBg: "rgba(29,89,72,0.2)", badgeText: "#3fae8c", IconEl: Icon.School },
  NGO: { color: "#0cc0df", bg: "rgba(12,192,223,0.1)", border: "rgba(12,192,223,0.3)", badgeBg: "rgba(12,192,223,0.14)", badgeText: "#0cc0df", IconEl: Icon.Heart },
  Company: { color: "#e8767a", bg: "rgba(192,53,56,0.12)", border: "rgba(192,53,56,0.3)", badgeBg: "rgba(192,53,56,0.16)", badgeText: "#e8767a", IconEl: Icon.Building },
  University: { color: "#c9a227", bg: "rgba(201,162,39,0.1)", border: "rgba(201,162,39,0.3)", badgeBg: "rgba(201,162,39,0.14)", badgeText: "#c9a227", IconEl: Icon.GradCap },
};

const tierConfig: Record<Tier, { label: string; color: string; bg: string }> = {
  Gold: { label: "Gold", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  Silver: { label: "Silver", color: "#94a3b8", bg: "rgba(148,163,184,0.12)" },
};

const tabs = ["All", "Schools", "NGOs", "Companies", "Universities"] as const;
type Tab = (typeof tabs)[number];

const TAB_TO_TYPE: Record<Tab, PartnerType | null> = {
  All: null,
  Schools: "School",
  NGOs: "NGO",
  Companies: "Company",
  Universities: "University",
};

/* ────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────── */

const partners: Partner[] = [
  { id: 1, name: "Delhi Public School", type: "School", city: "New Delhi", initials: "DPS", sdgs: [4, 13], since: "2023", story: "Students launched their own sustainability council after their first SDG workshop — it now runs independently of staff oversight.", lastActivity: "Hosted an SDG workshop · 2 weeks ago" },
  { id: 2, name: "GreenEarth Initiative", type: "NGO", city: "Hyderabad", initials: "GE", sdgs: [13, 15], since: "2024", story: "Co-designed a tree-cover restoration curriculum now used across 6 partner schools in Telangana.", lastActivity: "Published impact report · 5 days ago" },
  { id: 3, name: "TechCorp India", type: "Company", city: "Bangalore", initials: "TC", sdgs: [4, 9], since: "2023", story: "A ₹50L CSR commitment turned into 3 audited programs reaching 620 students with AI literacy and climate-action training.", lastActivity: "Funded the AI Bootcamp cohort · 3 days ago", funds: "₹50L", fundsLakh: 50, tier: "Gold" },
  { id: 4, name: "IIT Hyderabad", type: "University", city: "Hyderabad", initials: "IIT", sdgs: [4, 9, 17], since: "2023", story: "420 student volunteers now run peer-led SDG workshops in under-resourced government schools nearby.", lastActivity: "Volunteer cohort onboarded · 1 week ago" },
  { id: 5, name: "Bright Futures Academy", type: "School", city: "Mumbai", initials: "BF", sdgs: [4, 10], since: "2024", story: "First cohort of 95% satisfaction-rated SDG electives — now expanding to two more grade levels.", lastActivity: "Completed term-1 workshops · 4 days ago" },
  { id: 6, name: "EcoVolt Energy", type: "Company", city: "Chennai", initials: "EV", sdgs: [7, 13], since: "2024", story: "Brought hands-on renewable-energy labs to schools that had only ever studied solar power from a textbook.", lastActivity: "New funding round confirmed · 6 days ago", funds: "₹20L", fundsLakh: 20, tier: "Silver" },
  { id: 7, name: "Hope NGO", type: "NGO", city: "Delhi", initials: "HN", sdgs: [1, 10], since: "2024", story: "Connected 840 beneficiaries across 4 cities with partner companies for direct livelihood support.", lastActivity: "Beneficiary survey completed · 2 weeks ago" },
  { id: 8, name: "Woxsen University", type: "University", city: "Hyderabad", initials: "WU", sdgs: [4, 17], since: "2025", story: "Newest university partner — already piloting a joint research project with GreenEarth Initiative.", lastActivity: "Joined the ecosystem · 3 weeks ago" },
  { id: 9, name: "InfraBuild Corp", type: "Company", city: "Mumbai", initials: "IB", sdgs: [9, 11], since: "2024", story: "Funding urban-planning workshops that let students redesign a real city block as their final project.", lastActivity: "Workshop showcase held · 1 week ago", funds: "₹30L", fundsLakh: 30, tier: "Silver" },
];

const testimonials = [
  { quote: "Partnering with StepUp SDG gave our CSR program something it lacked — a direct line to measurable student impact. Our board could finally see exactly where the funds went.", name: "Priya Nambiar", role: "Head of CSR", org: "TechCorp India", initials: "PN", sdgs: [4, 9], verified: true },
  { quote: "Our students ran their first climate workshop within three weeks of joining. The curriculum support was ready, the connections were there. We just had to show up.", name: "Rajesh Kumar", role: "Principal", org: "Delhi Public School", initials: "RK", sdgs: [4, 13], verified: true },
];

const partnershipModels = [
  { IconEl: Icon.BarChart, title: "Sponsorship", desc: "Fund SDG workshops and events. Full spend audit provided." },
  { IconEl: Icon.Handshake, title: "Co-hosted Programs", desc: "Run joint programs designed around your sector and SDG goals." },
  { IconEl: Icon.Megaphone, title: "Awareness Campaigns", desc: "Create student-led campaigns inside your partner schools." },
];

const audienceCards: { IconEl: (p: { className?: string }) => JSX.Element; title: string; type: PartnerType; benefits: string[] }[] = [
  { IconEl: Icon.Building, title: "For Companies (CSR)", type: "Company", benefits: ["Verified impact reports for your board", "Direct line to 12,000+ students", "Brand visibility across 6 states"] },
  { IconEl: Icon.School, title: "For Schools & Universities", type: "School", benefits: ["Ready SDG curriculum and materials", "Funded workshops at zero cost", "Student leadership opportunities"] },
  { IconEl: Icon.Heart, title: "For NGOs", type: "NGO", benefits: ["Co-design programs with companies", "Reach across 8 partner cities", "Joint grant opportunities"] },
];

/** Official UN SDG colors — standard, expected practice for any SDG
 *  platform to display correctly, not an IP concern. */
const SDG_INFO: Record<number, { title: string; color: string }> = {
  1: { title: "No Poverty", color: "#E5243B" },
  4: { title: "Quality Education", color: "#C5192D" },
  7: { title: "Clean Energy", color: "#FCC30B" },
  9: { title: "Industry & Innovation", color: "#FD6925" },
  10: { title: "Reduced Inequalities", color: "#DD1367" },
  11: { title: "Sustainable Cities", color: "#FD9D24" },
  13: { title: "Climate Action", color: "#3F7E44" },
  15: { title: "Life on Land", color: "#56C02B" },
  17: { title: "Partnerships", color: "#19486A" },
};

// Derived from real partner data, not arbitrary — the SDGs your
// partners actually work on most, ranked by frequency.
const sdgFrequency = partners.flatMap((p) => p.sdgs).reduce<Record<number, number>>((acc, n) => {
  acc[n] = (acc[n] ?? 0) + 1;
  return acc;
}, {});
const topSdgs = Object.entries(sdgFrequency)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([num]) => Number(num));

function formatFunding(totalLakh: number): string {
  if (totalLakh >= 100) {
    const cr = totalLakh / 100;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(1)}Cr+`;
  }
  return `₹${totalLakh}L+`;
}
const totalFundsLakh = partners.reduce((sum, p) => sum + (p.fundsLakh ?? 0), 0);
const fundingStat = formatFunding(totalFundsLakh);

const ecosystemRoles: { type: PartnerType | "Hub"; title: string; role: string }[] = [
  { type: "School", title: "Schools", role: "SDG education & awareness" },
  { type: "NGO", title: "NGOs", role: "Ground execution & community impact" },
  { type: "Hub", title: "StepUp SDG", role: "Coordination & impact tracking" },
  { type: "Company", title: "Companies", role: "CSR funding & resources" },
  { type: "University", title: "Universities", role: "Research, innovation & volunteers" },
];

// Each story links back to a real partner record and opens that
// partner's existing modal — no dead "Read story" links.
const successStories = [
  { partnerId: 3, title: "TechCorp India & 12 Schools", description: "Digital literacy program impacting 620+ students across Hyderabad." },
  { partnerId: 2, title: "GreenEarth NGO Initiative", description: "Tree plantation drive across 6 schools with 3 corporate partners." },
  { partnerId: 4, title: "University Volunteer Program", description: "420 student volunteers from IIT Hyderabad supporting rural communities." },
];

/* ────────────────────────────────────────────────────────────────
   SMALL PRESENTATIONAL PIECES
   ──────────────────────────────────────────────────────────────── */

function SDGPill({ num }: { num: number }) {
  return (
    <span className="rounded-full border border-[#1e2d3d] px-[7px] py-0.5 text-[10px] font-medium text-[#8899aa]">
      SDG {num}
    </span>
  );
}

function StatCard({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="text-[28px] font-extrabold tracking-tight text-white">{value}</span>
        {trend && (
          <span className="flex items-center gap-[3px] text-[11px] font-semibold text-[#22c55e]">
            <Icon.TrendUp /> {trend}
          </span>
        )}
      </div>
      <div className="mt-0.5 text-xs text-[#8899aa]">{label}</div>
    </div>
  );
}

function MetricCard({
  IconEl,
  glyph,
  value,
  label,
  sublabel,
  color,
  bg,
  border,
}: {
  IconEl?: (p: { className?: string }) => JSX.Element;
  glyph?: string;
  value: string;
  label: string;
  sublabel?: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div className="rounded-2xl border p-5" style={{ background: bg, borderColor: border }}>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-base font-extrabold" style={{ background: `${color}26`, color }}>
        {IconEl ? <IconEl className="h-5 w-5" /> : glyph}
      </div>
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="mt-0.5 text-[13px] font-semibold text-white/90">{label}</div>
      {sublabel && <div className="mt-1 text-xs leading-snug text-[#8899aa]">{sublabel}</div>}
    </div>
  );
}

function TrustBadge({
  IconEl,
  title,
  desc,
  color,
  bg,
  border,
}: {
  IconEl: (p: { className?: string }) => JSX.Element;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border p-4" style={{ background: bg, borderColor: border }}>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}26`, color }}>
        <IconEl className="h-4 w-4" />
      </div>
      <div>
        <div className="text-[13px] font-semibold text-white">{title}</div>
        <div className="text-[11px] leading-snug text-[#8899aa]">{desc}</div>
      </div>
    </div>
  );
}

function SDGFocusBadge({ num }: { num: number }) {
  const info = SDG_INFO[num];
  if (!info) return null;
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-t-[3px] border-[#1e2d3d] bg-[#131f2e] p-3.5" style={{ borderTopColor: info.color }}>
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-extrabold text-white" style={{ background: info.color }}>
        {num}
      </div>
      <div className="text-center text-[10px] font-medium leading-tight text-[#8899aa]">{info.title}</div>
    </div>
  );
}

/** Network/orbit diagram tied to the real stat numbers — each node
 *  shows the actual count, so the visual earns its place instead of
 *  being filler. Gradient hub + dashed orbit ring + radar pulse read
 *  as "a live network," without faking satellite photography. */
const ecosystemNodes = [
  { x: 220, y: 75, color: "#3fae8c", label: "Schools", value: "142" },
  { x: 395, y: 220, color: "#e8767a", label: "Companies", value: "56" },
  { x: 220, y: 365, color: "#c9a227", label: "Universities", value: "24" },
  { x: 45, y: 220, color: "#0cc0df", label: "NGOs", value: "38" },
];

function EcosystemVisual({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 440"
      className={className}
      role="img"
      aria-label="Diagram showing StepUp SDG at the center, connected to 142 schools, 38 NGOs, 56 companies, and 24 universities"
    >
      <defs>
        <radialGradient id="hubGlobe" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#1c3b4d" />
          <stop offset="60%" stopColor="#102330" />
          <stop offset="100%" stopColor="#0a1620" />
        </radialGradient>
      </defs>

      <ellipse cx="220" cy="220" rx="175" ry="145" fill="none" stroke="#1e2d3d" strokeWidth="1.5" strokeDasharray="3 7" />

      {ecosystemNodes.map((n) => (
        <line key={`${n.x}-${n.y}`} x1="220" y1="220" x2={n.x} y2={n.y} stroke="#1e2d3d" strokeWidth="1.5" />
      ))}

      <circle cx="220" cy="220" r="60" fill="none" stroke="#0cc0df" strokeWidth="1" opacity="0.45" className="animate-ping" style={{ animationDuration: "2.5s" }} />
      <circle cx="220" cy="220" r="48" fill="url(#hubGlobe)" stroke="#0cc0df" strokeWidth="1.5" />
      <path d="M180,205 a40,18 0 0 0 80,0" fill="none" stroke="#0cc0df" strokeOpacity="0.3" strokeWidth="1" />
      <path d="M178,220 a42,8 0 0 0 84,0" fill="none" stroke="#0cc0df" strokeOpacity="0.2" strokeWidth="1" />
      <text x="220" y="215" textAnchor="middle" fill="#0cc0df" fontSize="11" fontWeight="700">
        STEPUP
      </text>
      <text x="220" y="228" textAnchor="middle" fill="#0cc0df" fontSize="9">
        SDG
      </text>

      {ecosystemNodes.map((n) => (
        <g key={`${n.x}-${n.y}-node`}>
          <circle cx={n.x} cy={n.y} r="30" fill="#131f2e" stroke={n.color} strokeWidth="1.5" />
          <text x={n.x} y={n.y - 4} textAnchor="middle" fill={n.color} fontSize="13" fontWeight="700">
            {n.value}
          </text>
          <text x={n.x} y={n.y + 11} textAnchor="middle" fill={n.color} fontSize="8">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function PartnerCard({ partner, onSelect }: { partner: Partner; onSelect: () => void }) {
  const cfg = typeConfig[partner.type];
  return (
    <button
      onClick={onSelect}
      className="group relative flex flex-col gap-3 rounded-2xl border border-[#1e2d3d] bg-[#131f2e] p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-[#0cc0df]/60 hover:shadow-lg hover:shadow-black/30"
    >
      {partner.tier && (
        <span
          className="absolute right-2.5 top-2.5 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
          style={{ color: tierConfig[partner.tier].color, background: tierConfig[partner.tier].bg }}
        >
          <Icon.Star /> {partner.tier}
        </span>
      )}

      <div
        className="flex items-center justify-center rounded-xl border py-5 transition-transform duration-200 group-hover:scale-[1.03]"
        style={{ background: cfg.bg, borderColor: cfg.border }}
      >
        <span className="text-[22px] font-extrabold tracking-tight" style={{ color: cfg.color }}>
          {partner.initials}
        </span>
      </div>

      <div>
        <div className="mb-1 text-[13px] font-semibold leading-tight text-white">{partner.name}</div>
        <div className="flex items-center gap-1 text-[11px] text-[#8899aa]">
          <Icon.MapPin /> {partner.city}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {partner.sdgs.map((n) => (
          <SDGPill key={n} num={n} />
        ))}
      </div>

      <div className="mt-1 flex items-center gap-1.5 border-t border-[#1e2d3d] pt-2 text-[10px] text-[#5d7186]">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#22c55e]" />
        {partner.lastActivity}
      </div>

      <div className="flex items-center gap-1 text-[10px] text-[#8899aa] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        View profile <Icon.ChevRight />
      </div>
    </button>
  );
}

const COMPANY_PROJECTS = [
  { name: "SDG Workshop — Hyderabad", amount: "₹15L", status: "Completed" as const, verified: true },
  { name: "AI Bootcamp for Schools", amount: "₹12L", status: "Ongoing" as const, verified: false },
  { name: "Climate Action Camp", amount: "₹11L", status: "Completed" as const, verified: true },
];

const METRICS_BY_TYPE: Record<PartnerType, [string, string][]> = {
  Company: [["₹50L", "Total contributed"], ["₹38L", "Funds utilized"], ["₹12L", "Remaining"], ["620", "Students reached"], ["12", "Schools helped"], ["8", "Workshops done"]],
  School: [["320", "Students"], ["8", "Workshops"], ["3", "SDG Goals"], ["2", "Years active"], ["4", "Events held"], ["95%", "Satisfaction"]],
  NGO: [["12", "Projects"], ["4", "Cities"], ["5", "SDG Goals"], ["840", "Beneficiaries"], ["3", "Years active"], ["6", "Partners"]],
  University: [["420", "Volunteers"], ["6", "Events"], ["5", "SDG Goals"], ["200", "Students active"], ["4", "Departments"], ["2", "Years active"]],
};

function PartnerModal({ partner, onClose }: { partner: Partner; onClose: () => void }) {
  const cfg = typeConfig[partner.type];
  const metrics = METRICS_BY_TYPE[partner.type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose} role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[20px] border border-[#1e2d3d] bg-[#131f2e]"
      >
        <div className="border-b border-[#1e2d3d] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl border-[1.5px] text-lg font-extrabold"
                style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
              >
                {partner.initials}
              </div>
              <div>
                <div id="partner-modal-title" className="text-lg font-bold text-white">
                  {partner.name}
                </div>
                <div className="mt-[3px] flex items-center gap-1.5 text-xs text-[#8899aa]">
                  <Icon.MapPin /> {partner.city} · Partner since {partner.since}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <span className="rounded-full px-2.5 py-[3px] text-[11px] font-semibold" style={{ background: cfg.badgeBg, color: cfg.badgeText }}>
                    {partner.type}
                  </span>
                  {partner.tier && (
                    <span
                      className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-bold"
                      style={{ color: tierConfig[partner.tier].color, background: tierConfig[partner.tier].bg }}
                    >
                      <Icon.Star /> {tierConfig[partner.tier].label} Partner
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close partner details"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e2d3d] text-[#8899aa] transition-colors hover:text-white"
            >
              <Icon.X />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-xl border border-[#1e2d3d] bg-[#0f1923] p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">
              <Icon.Quote className="h-3 w-3" /> The story so far
            </div>
            <p className="text-[13px] leading-relaxed text-[#c8d6e5]">{partner.story}</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-[#22c55e]/20 bg-[#22c55e]/[0.08] p-3">
            <Icon.Shield className="h-4 w-4 text-[#22c55e]" />
            <span className="text-[13px] font-semibold text-[#22c55e]">Verified Partner</span>
            <span className="ml-auto text-[11px] text-[#5d9b76]">Audited · Impact verified</span>
          </div>

          <div>
            <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">SDG Goals</div>
            <div className="flex flex-wrap gap-1.5">
              {partner.sdgs.map((n) => (
                <span key={n} className="rounded-full border border-[#1e2d3d] px-3 py-1 text-xs font-medium text-white">
                  SDG {n}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Impact overview</div>
            <div className="grid grid-cols-3 gap-2">
              {metrics.map(([val, label]) => (
                <div key={label} className="rounded-[10px] border border-[#1e2d3d] bg-[#0f1923] p-3.5 text-center">
                  <div className="text-xl font-bold" style={{ color: cfg.color }}>
                    {val}
                  </div>
                  <div className="mt-[3px] text-[11px] leading-tight text-[#8899aa]">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {partner.type === "Company" && (
            <div>
              <div className="mb-2.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Funding journey</div>
              <div className="flex flex-col">
                {COMPANY_PROJECTS.map((p, i) => (
                  <div key={p.name} className="relative flex gap-3 pb-4 pl-1 last:pb-0">
                    {i !== COMPANY_PROJECTS.length - 1 && <span className="absolute left-[7px] top-4 h-full w-px bg-[#1e2d3d]" />}
                    <span
                      className="z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                      style={{ borderColor: cfg.color, background: p.status === "Completed" ? cfg.color : "transparent" }}
                    />
                    <div className="flex-1 rounded-lg border border-[#1e2d3d] bg-[#0f1923] p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[13px] font-medium text-white">{p.name}</span>
                        <span className="text-[13px] font-bold" style={{ color: cfg.color }}>
                          {p.amount}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-[#8899aa]">
                        <span>{p.status}</span>
                        {p.verified && (
                          <span className="flex items-center gap-1 text-[#0cc0df]">
                            <Icon.Check /> Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   PAGE
   ──────────────────────────────────────────────────────────────── */

interface ApplyForm {
  name: string;
  organization: string;
  email: string;
  type: string;
  budget: string;
  message: string;
}
const EMPTY_FORM: ApplyForm = { name: "", organization: "", email: "", type: "", budget: "", message: "" };

export default function PartnersPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ApplyForm>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = partners.filter((p) => {
    const targetType = TAB_TO_TYPE[activeTab];
    const matchesTab = targetType === null || p.type === targetType;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q.length === 0 || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  function updateForm<K extends keyof ApplyForm>(key: K, value: ApplyForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: replace with a real POST to the partnership-applications endpoint.
    console.log("Partnership application submitted:", form);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#0b1520] font-sans text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[#1e2d3d] bg-[#0b1520]/95 px-6 py-3.5 backdrop-blur-md md:px-10">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="StepUp SDG logo" className="h-[38px] w-[38px] object-contain" />
          <div>
            <span className="text-[15px] font-extrabold text-[#0cc0df]">STEPUP</span>
            <span className="text-[15px] font-extrabold text-[#c03538]"> FOR SDG</span>
          </div>
        </div>
        <div className="hidden gap-8 md:flex">
          {["Home", "About Us", "SDG Goals", "Partners", "Contact"].map((link) => (
            <a key={link} href="#" className={`text-[13px] transition-colors ${link === "Partners" ? "text-[#0cc0df]" : "text-[#8899aa] hover:text-white"}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="#partner-form" className="hidden rounded-lg bg-[#0cc0df] px-4 py-2 text-[12px] font-bold text-[#0b1520] transition-transform hover:scale-105 sm:block">
            Partner With Us
          </a>
          <select className="rounded-md border border-[#1e2d3d] bg-transparent px-2.5 py-1 text-[11px] text-[#8899aa] focus:border-[#0cc0df] focus:outline-none" defaultValue="EN" aria-label="Select language">
            {["EN", "తె", "हि"].map((lang) => (
              <option key={lang} value={lang} className="bg-[#0b1520]">
                {lang}
              </option>
            ))}
          </select>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#1e2d3d] px-6 py-14 md:px-10 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#0cc0df]/[0.10] blur-[110px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 right-[-60px] h-[300px] w-[300px] rounded-full bg-[#3fae8c]/[0.08] blur-[100px]" />

        <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className={`transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <div className="mb-5 inline-flex items-center gap-[7px] rounded-full border border-[#0cc0df]/30 bg-[#0cc0df]/[0.06] px-3.5 py-1.5">
              <Icon.Globe className="h-3 w-3 text-[#0cc0df]" />
              <span className="text-[11px] font-semibold tracking-wide text-[#0cc0df]">India&apos;s SDG Partnership Network</span>
            </div>
            <h1 className="max-w-xl text-[40px] font-extrabold leading-[1.08] tracking-tight md:text-[48px]">
              260+ institutions.
              <br />
              <span className="text-[#0cc0df]">One shared mission.</span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[#8899aa] md:text-[17px]">
              Schools, NGOs, universities, and companies building measurable impact around the 17 UN SDGs — together, not separately.
            </p>
          </div>
          <div className={`transition-all delay-150 duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <EcosystemVisual className="mx-auto h-auto w-full max-w-[360px]" />
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#1e2d3d] pt-9 sm:grid-cols-3 md:grid-cols-5">
          <StatCard value="142" label="Schools" trend="+18 this quarter" />
          <StatCard value="38" label="NGOs" trend="+5 this quarter" />
          <StatCard value="56" label="Companies (CSR)" trend="+9 this quarter" />
          <StatCard value="24" label="Universities" />
          <StatCard value="12,450" label="Students reached" trend="+2,100 this year" />
        </div>

        <div className="relative z-10 mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <TrustBadge IconEl={Icon.Shield} title="Verified Partners" desc="Every partner is verified & validated" color="#0cc0df" bg="rgba(12,192,223,0.06)" border="rgba(12,192,223,0.18)" />
          <TrustBadge IconEl={Icon.Award} title="CSR Compliant" desc="Aligned with CSR policy requirements" color="#3fae8c" bg="rgba(29,89,72,0.1)" border="rgba(63,174,140,0.2)" />
          <TrustBadge IconEl={Icon.BarChart} title="Impact Audited" desc="Regular impact assessments" color="#e8767a" bg="rgba(192,53,56,0.07)" border="rgba(192,53,56,0.18)" />
          <TrustBadge IconEl={Icon.Eye} title="Transparent" desc="Clear reports & open data" color="#c9a227" bg="rgba(201,162,39,0.07)" border="rgba(201,162,39,0.18)" />
        </div>
      </section>

      {/* MEASURABLE IMPACT */}
      <section className="border-b border-[#1e2d3d] px-6 py-12 md:px-10">
        <div className="mb-5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Measurable impact</div>
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          <MetricCard IconEl={Icon.Users} value="12,450+" label="Students Impacted" sublabel="Through SDG programs and initiatives" color="#0cc0df" bg="rgba(12,192,223,0.07)" border="rgba(12,192,223,0.18)" />
          <MetricCard glyph="₹" value={fundingStat} label="Funding Facilitated" sublabel="Driving impactful projects across India" color="#3fae8c" bg="rgba(29,89,72,0.12)" border="rgba(63,174,140,0.22)" />
          <MetricCard IconEl={Icon.Calendar} value="186+" label="Workshops Conducted" sublabel="Building awareness and capabilities" color="#e8767a" bg="rgba(192,53,56,0.08)" border="rgba(192,53,56,0.2)" />
          <MetricCard IconEl={Icon.TrendUp} value="96%" label="Partner Satisfaction" sublabel="High satisfaction from our partners" color="#c9a227" bg="rgba(201,162,39,0.08)" border="rgba(201,162,39,0.2)" />
        </div>
      </section>

      {/* TOP SDG FOCUS AREAS — derived from real partner data, not arbitrary */}
      <section className="border-b border-[#1e2d3d] px-6 py-10 md:px-10">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="mb-1.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Where our partners focus</div>
            <h2 className="text-xl font-bold text-white">Top SDG Focus Areas</h2>
          </div>
          <a href="#" className="hidden items-center gap-1 text-xs text-[#0cc0df] sm:flex">
            View all SDGs we support <Icon.ChevRight />
          </a>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {topSdgs.map((num) => (
            <SDGFocusBadge key={num} num={num} />
          ))}
        </div>
      </section>

      {/* HOW THE ECOSYSTEM WORKS */}
      <section className="border-b border-[#1e2d3d] bg-[#0a1520] px-6 py-12 md:px-10">
        <div className="mb-9 text-center">
          <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Our partnership ecosystem</div>
          <h2 className="text-2xl font-bold text-white">Together, we create lasting change</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#8899aa]">Each partner plays a distinct role in the ecosystem, working toward the same SDGs.</p>
        </div>
        <div className="flex flex-wrap items-start justify-center gap-y-6">
          {ecosystemRoles.map((node, i) => {
            const isHub = node.type === "Hub";
            const cfg = !isHub ? typeConfig[node.type as PartnerType] : null;
            return (
              <div key={node.title} className="flex items-center">
                {i !== 0 && <div className="hidden h-px w-6 shrink-0 bg-[#1e2d3d] md:block lg:w-10" />}
                <div className="flex w-[116px] flex-col items-center gap-2.5 text-center">
                  <div
                    className={`flex items-center justify-center rounded-full border-2 ${isHub ? "h-20 w-20" : "h-16 w-16"}`}
                    style={{ background: isHub ? "rgba(12,192,223,0.12)" : cfg?.bg, borderColor: isHub ? "#0cc0df" : cfg?.border }}
                  >
                    {isHub ? (
                      <Icon.Globe className="h-7 w-7 text-[#0cc0df]" />
                    ) : (
                      cfg && (
                        <span style={{ color: cfg.color }}>
                          <cfg.IconEl className="h-6 w-6" />
                        </span>
                      )
                    )}
                  </div>
                  <div>
                    <div className={`text-[13px] font-bold ${isHub ? "text-[#0cc0df]" : "text-white"}`}>{node.title}</div>
                    <div className="mt-0.5 text-[11px] leading-snug text-[#8899aa]">{node.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DIRECTORY — search, filters, grid */}
      <section className="px-6 py-9 md:px-10">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8899aa]">
              <Icon.Search />
            </span>
            <input
              type="text"
              placeholder="Search by name or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[260px] rounded-[10px] border border-[#1e2d3d] bg-[#131f2e] py-2.5 pl-[34px] pr-4 text-[13px] text-white outline-none focus:border-[#0cc0df]"
              aria-label="Search partners by name or city"
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter partners by type">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg border px-4 py-2 text-[13px] transition-all ${
                    isActive ? "border-[#0cc0df] bg-[#0cc0df] font-bold text-[#0b1520]" : "border-[#1e2d3d] bg-transparent font-medium text-[#8899aa] hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#1e2d3d] py-20 text-center text-sm text-[#8899aa]">
            No partners found for &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {filtered.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} onSelect={() => setSelectedPartner(partner)} />
            ))}
          </div>
        )}
      </section>

      {/* FEATURED SUCCESS STORIES — "Read story" opens the real partner modal, no dead links */}
      <section className="border-t border-[#1e2d3d] px-6 py-12 md:px-10">
        <div className="mb-6 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Featured success stories</div>
        <div className="grid gap-4 md:grid-cols-3">
          {successStories.map((story) => {
            const partner = partners.find((p) => p.id === story.partnerId);
            if (!partner) return null;
            const cfg = typeConfig[partner.type];
            return (
              <div key={story.partnerId} className="overflow-hidden rounded-2xl border border-[#1e2d3d] bg-[#131f2e]">
                <div className="flex h-32 items-center justify-center" style={{ background: `linear-gradient(135deg, ${cfg.bg}, rgba(11,21,32,0.5))` }}>
                  <span style={{ color: cfg.color }}>
                    <cfg.IconEl className="h-10 w-10" />
                  </span>
                </div>
                <div className="p-5">
                  <div className="mb-1.5 text-sm font-bold text-white">{story.title}</div>
                  <p className="mb-3 text-[12px] leading-relaxed text-[#8899aa]">{story.description}</p>
                  <button onClick={() => setSelectedPartner(partner)} className="flex items-center gap-1 text-[12px] font-semibold text-[#0cc0df]">
                    Read story <Icon.Arrow className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-[#1e2d3d] px-6 py-12 md:px-10">
        <div className="mb-6 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">In their words</div>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-[14px] border border-[#1e2d3d] bg-[#131f2e] p-7">
              <Icon.Quote className="mb-3.5 h-7 w-7 text-[#0cc0df]/70" />
              <p className="mb-5 text-[13px] leading-relaxed text-[#c8d6e5]">{t.quote}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {t.sdgs.map((n) => (
                  <SDGPill key={n} num={n} />
                ))}
                {t.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-[#22c55e]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22c55e]">
                    <Icon.Shield className="h-2.5 w-2.5" /> Verified outcome
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2d3d] text-[11px] font-bold text-[#0cc0df]">{t.initials}</div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{t.name}</div>
                  <div className="text-[11px] text-[#8899aa]">
                    {t.role} · {t.org}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ORGANIZATIONS IN THE ECOSYSTEM — real mock partners only, never fabricated brand logos */}
      <section className="border-t border-[#1e2d3d] bg-[#0a1520] px-6 py-9 md:px-10">
        <div className="mb-5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Organizations in our ecosystem</div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {partners.map((p) => (
            <span key={p.id} className="text-sm font-bold tracking-tight text-[#5d7186] transition-colors hover:text-white">
              {p.name}
            </span>
          ))}
        </div>
      </section>

      {/* PARTNER WITH US */}
      <section id="partner-form" className="relative overflow-hidden border-t border-[#1e2d3d] bg-[#0a1520] px-6 py-14 md:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#0cc0df]/[0.08] blur-[120px]" />
        <div className="mb-11 text-center">
          <div className="mb-2.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Join the ecosystem</div>
          <h2 className="mb-3 text-[32px] font-extrabold tracking-tight">Partner with StepUp SDG</h2>
          <p className="mx-auto max-w-[480px] text-sm leading-relaxed text-[#8899aa]">
            Whether you&apos;re a company with a CSR mandate, a school with motivated students, or an NGO with a program to scale — there&apos;s a place for you here.
          </p>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {audienceCards.map((card) => {
            const cfg = typeConfig[card.type];
            return (
              <div key={card.title} className="rounded-[14px] border border-[#1e2d3d] bg-[#131f2e] p-7">
                <div className="mb-4.5 flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border" style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}>
                  <card.IconEl />
                </div>
                <div className="mb-4 text-[15px] font-bold text-white">{card.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {card.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[13px] leading-snug text-[#8899aa]">
                      <Icon.Check className="mt-[3px] h-[13px] w-[13px] shrink-0 text-[#0cc0df]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mb-8 rounded-[14px] border border-[#1e2d3d] bg-[#131f2e] p-7">
          <div className="mb-4.5 text-[10px] uppercase tracking-[0.1em] text-[#8899aa]">Partnership models</div>
          <div className="grid gap-3.5 md:grid-cols-3">
            {partnershipModels.map((m) => (
              <div key={m.title} className="rounded-[10px] border border-[#1e2d3d] bg-[#0b1520] p-5">
                <span className="text-[#0cc0df]">
                  <m.IconEl />
                </span>
                <div className="mb-1.5 mt-2.5 text-[13px] font-semibold text-white">{m.title}</div>
                <div className="text-xs leading-relaxed text-[#8899aa]">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid max-w-3xl gap-0 overflow-hidden rounded-[20px] border border-[#0cc0df]/20 bg-[#131f2e] md:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between gap-7 border-b border-[#1e2d3d] bg-[#0f1923] p-7 md:border-b-0 md:border-r">
            <div>
              <h3 className="mb-2 text-lg font-bold text-white">Start a conversation</h3>
              <p className="text-[13px] leading-relaxed text-[#8899aa]">Join 260+ schools, NGOs, universities, and companies already building toward the SDGs together.</p>
            </div>
            <div className="flex flex-col gap-3">
              {[
                [Icon.Clock, "We respond within 2 business days"],
                [Icon.Shield, "No commitment required to start"],
                [Icon.Lock, "Your details are never shared"],
              ].map(([Ico, text], i) => {
                const IconComp = Ico as (p: { className?: string }) => JSX.Element;
                return (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#8899aa]">
                    <IconComp className="h-4 w-4 shrink-0 text-[#0cc0df]" />
                    {text as string}
                  </div>
                );
              })}
            </div>
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.1em] text-[#5d7186]">Already on board</div>
              <div className="flex -space-x-2">
                {partners.slice(0, 5).map((p) => (
                  <div
                    key={p.id}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0f1923] text-[10px] font-bold"
                    style={{ background: typeConfig[p.type].bg, color: typeConfig[p.type].color }}
                    title={p.name}
                  >
                    {p.initials}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-7">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <Icon.Check className="mb-3 h-8 w-8 text-[#22c55e]" />
                <h3 className="mb-1.5 text-lg font-bold text-white">Application sent</h3>
                <p className="max-w-[280px] text-[13px] text-[#8899aa]">
                  Thanks, {form.name || "there"} — we&apos;ll reach out at {form.email || "the email you provided"} within 2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                <div>
                  <label className="mb-1.5 block text-[11px] text-[#8899aa]">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="w-full rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] text-[#8899aa]">Organization</label>
                  <input
                    required
                    type="text"
                    placeholder="Your organization"
                    value={form.organization}
                    onChange={(e) => updateForm("organization", e.target.value)}
                    className="w-full rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] text-[#8899aa]">Work email</label>
                  <input
                    required
                    type="email"
                    placeholder="you@organization.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="w-full rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="mb-1.5 block text-[11px] text-[#8899aa]">Type</label>
                    <select
                      value={form.type}
                      onChange={(e) => updateForm("type", e.target.value)}
                      className="w-full rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                    >
                      <option value="">Select</option>
                      <option>Company / CSR</option>
                      <option>School</option>
                      <option>NGO</option>
                      <option>University</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[11px] text-[#8899aa]">CSR budget</label>
                    <select
                      value={form.budget}
                      onChange={(e) => updateForm("budget", e.target.value)}
                      className="w-full rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                    >
                      <option value="">Optional</option>
                      <option>Under ₹10L</option>
                      <option>₹10L – ₹50L</option>
                      <option>₹50L – ₹2Cr</option>
                      <option>Above ₹2Cr</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] text-[#8899aa]">How do you want to collaborate?</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your organization and the SDG goals you care about most..."
                    value={form.message}
                    onChange={(e) => updateForm("message", e.target.value)}
                    className="w-full resize-none rounded-lg border border-[#1e2d3d] bg-[#0b1520] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-[#0cc0df]"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-1 flex items-center justify-center gap-2 rounded-[10px] bg-[#0cc0df] py-3 text-sm font-bold text-[#0b1520] transition-transform hover:scale-[1.02]"
                >
                  Send partnership request <Icon.Arrow />
                </button>
                <p className="text-center text-[11px] text-[#8899aa]">
                  By submitting you agree to our <a href="#" className="text-[#0cc0df]">partnership terms</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {selectedPartner && <PartnerModal partner={selectedPartner} onClose={() => setSelectedPartner(null)} />}

      {/* FOOTER */}
      <footer className="border-t border-[#1e2d3d] bg-[#070f18] px-6 pb-8 pt-11 md:px-10">
        <div className="mb-8 grid gap-9 md:grid-cols-4">
          <div>
            <div className="mb-3.5 flex items-center gap-2">
              <img src="/logo.png" alt="StepUp SDG logo" className="h-[30px] w-[30px] object-contain" />
              <div>
                <span className="text-[13px] font-extrabold text-[#0cc0df]">STEPUP</span>
                <span className="text-[13px] font-extrabold text-[#c03538]"> FOR SDG</span>
              </div>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#8899aa]">
              India&apos;s growing SDG partnership ecosystem — connecting schools, NGOs, universities, and companies for real, measurable impact.
            </p>
            <div className="mb-1 text-[10px] uppercase tracking-[0.1em] text-[#5d7186]">Trusted by</div>
            <div className="flex -space-x-2">
              {partners.slice(0, 6).map((p) => (
                <div
                  key={p.id}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#070f18] text-[9px] font-bold"
                  style={{ background: typeConfig[p.type].bg, color: typeConfig[p.type].color }}
                  title={p.name}
                >
                  {p.initials}
                </div>
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#070f18] bg-[#1e2d3d] text-[9px] font-bold text-[#8899aa]">+254</div>
            </div>
          </div>

          {[
            { title: "Pages", links: ["Home", "About Us", "SDG Goals", "Partners", "Contact"] },
            { title: "Ecosystem", links: ["Schools", "NGOs", "Companies", "Universities", "Become a partner"] },
            { title: "Contact", links: ["hello@stepupsdg.in", "+91 98765 43210", "Hyderabad, Telangana"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8899aa]">{col.title}</div>
              {col.links.map((l) => (
                <div key={l} className="mb-2">
                  <a href="#" className="text-xs text-[#8899aa] hover:text-white">
                    {l}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-[#1e2d3d] pt-5 md:flex-row">
          <span className="text-[11px] text-[#8899aa]">© 2026 StepUp for SDG. All rights reserved.</span>
          <div className="flex gap-4 text-[11px] text-[#8899aa]">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            {["English", "తెలుగు", "हिंदी"].map((lang) => (
              <button key={lang} className="rounded border border-[#1e2d3d] px-2.5 py-1 hover:border-[#0cc0df] hover:text-[#0cc0df]">
                {lang}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}