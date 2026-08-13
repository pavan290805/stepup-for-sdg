"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";

/* --- GLOBAL STYLES --------------------------------------------------------- */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%) skewX(-12deg); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes border-glow {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 1; }
  }

  .logo-pill {
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.3s ease;
    cursor: default;
  }
  .logo-pill:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); opacity: 1 !important; }

  .shine-sweep::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
    transform: translateX(-100%) skewX(-12deg); pointer-events: none; border-radius: inherit;
  }
  .shine-sweep:hover::after { animation: shimmer 0.7s ease forwards; }

  .segmented-tab { position: relative; transition: color 0.2s ease; }
  .glass-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
  .glass-input:focus { outline: none; }

  .theme-transition * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease; }

  .logo-shimmer {
    background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: shimmer-bg 1.4s ease infinite;
  }
  .bg-grid-pattern {
    background-size: 24px 24px;
    background-image: radial-gradient(circle, var(--grid-color) 1.2px, transparent 1.2px);
  }
`;

/* --- THEMES ---------------------------------------------------------------- */
const DARK = {
  pageBg: "#060a10",
  sectionAlt: "#070c14",
  card: "#0d1625",
  cardHover: "#101c2e",
  footer: "#040810",
  border: "#1a2537",
  borderSubtle: "#111b28",
  text: "#f0f4f8",
  textSub: "#c8d4e0",
  muted: "#6b8099",
  dim: "#3d5166",
  accent: "#0ea5c9",
  accentGlow: "rgba(14,165,201,0.2)",
  accentRed: "#ef4444",
  inputBg: "#080f1a",
  glass: "rgba(13,22,37,0.82)",
  glassBorder: "rgba(14,165,201,0.2)",
  glow: "rgba(14,165,201,0.15)",
  overlay: "rgba(4,8,16,0.88)",
  gridLine: "rgba(255,255,255,0.03)",
};

const LIGHT = {
  pageBg: "#fafbfd",
  sectionAlt: "#f3f6fa",
  card: "#ffffff",
  cardHover: "#fafcff",
  footer: "#111827",
  border: "#e1e8f0",
  borderSubtle: "#edf2f7",
  text: "#0d1829",
  textSub: "#374151",
  muted: "#6b7280",
  dim: "#9ca3af",
  accent: "#0284c7",
  accentGlow: "rgba(2,132,199,0.15)",
  accentRed: "#dc2626",
  inputBg: "#f8fafc",
  glass: "rgba(255,255,255,0.92)",
  glassBorder: "rgba(2,132,199,0.2)",
  glow: "rgba(2,132,199,0.08)",
  overlay: "rgba(0,0,0,0.75)",
  gridLine: "rgba(0,0,0,0.025)",
};

type T = typeof DARK;

/* --- TYPES ----------------------------------------------------------------- */
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
  logoSources: string[];
  domain?: string;
}

/* --- TYPE CONFIGS ---------------------------------------------------------- */
const typeConfig: Record<
  PartnerType,
  {
    color: string;
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    gradient: string;
    IconEl: (p: { className?: string; style?: React.CSSProperties }) => React.JSX.Element;
  }
> = {
  School: {
    color: "#34d399",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(52,211,153,0.25)",
    badgeBg: "rgba(16,185,129,0.12)",
    badgeText: "#34d399",
    gradient: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  NGO: {
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.25)",
    badgeBg: "rgba(56,189,248,0.12)",
    badgeText: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  Company: {
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.25)",
    badgeBg: "rgba(248,113,113,0.12)",
    badgeText: "#f87171",
    gradient: "linear-gradient(135deg, rgba(248,113,113,0.1) 0%, rgba(251,146,60,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
      </svg>
    ),
  },
  University: {
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.25)",
    badgeBg: "rgba(251,191,36,0.12)",
    badgeText: "#fbbf24",
    gradient: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(249,115,22,0.06) 100%)",
    IconEl: ({ className = "w-[18px] h-[18px]", style }) => (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      </svg>
    ),
  },
};

const tierConfig: Record<Tier, { label: string; color: string; bg: string }> = {
  Gold: { label: "Gold", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  Silver: { label: "Silver", color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
};

const tabs = ["All", "NGOs", "Companies", "Educational Institutes"] as const;
type Tab = (typeof tabs)[number];
const TAB_TO_TYPE: Record<Tab, PartnerType[] | null> = {
  All: null,
  NGOs: ["NGO"],
  Companies: ["Company"],
  "Educational Institutes": ["School", "University"],
};

/* --- DATA ------------------------------------------------------------------ */
const partners: Partner[] = [
  {
    id: 1,
    name: "Delhi Public School",
    type: "School",
    city: "New Delhi",
    initials: "DPS",
    sdgs: [4, 13],
    since: "2023",
    story: "Students launched their own sustainability council after their first SDG workshop.",
    lastActivity: "Hosted an SDG workshop • 2 weeks ago",
    domain: "dpsrkp.net",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Delhi_Public_School_logo.png/200px-Delhi_Public_School_logo.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dpsrkp.net&size=128",
    ],
  },
  {
    id: 2,
    name: "GreenEarth Initiative",
    type: "NGO",
    city: "Hyderabad",
    initials: "GE",
    sdgs: [13, 15],
    since: "2024",
    story: "Co-designed a tree-cover restoration curriculum now used across 6 partner schools.",
    lastActivity: "Published impact report • 5 days ago",
    domain: "greenearth.org",
    logoSources: [
      "https://cdn.brandfetch.io/greenearth.org/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenearth.org&size=128",
    ],
  },
  {
    id: 3,
    name: "TechCorp India",
    type: "Company",
    city: "Bangalore",
    initials: "TC",
    sdgs: [4, 9],
    since: "2023",
    story: "A Rs50L CSR commitment turned into 3 audited programs reaching 620 students.",
    lastActivity: "Funded the AI Bootcamp cohort • 3 days ago",
    fundsLakh: 50,
    tier: "Gold",
    domain: "techcorp.in",
    logoSources: [
      "https://cdn.brandfetch.io/techcorp.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://techcorp.in&size=128",
    ],
  },
  {
    id: 4,
    name: "IIT Hyderabad",
    type: "University",
    city: "Hyderabad",
    initials: "IIT",
    sdgs: [4, 9, 17],
    since: "2023",
    story: "420 student volunteers now run peer-led SDG workshops in government schools.",
    lastActivity: "Volunteer cohort onboarded • 1 week ago",
    domain: "iith.ac.in",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indian_Institute_of_Technology_Hyderabad_Logo.svg/240px-Indian_Institute_of_Technology_Hyderabad_Logo.svg.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://iith.ac.in&size=128",
    ],
  },
  {
    id: 5,
    name: "Bright Futures Academy",
    type: "School",
    city: "Mumbai",
    initials: "BF",
    sdgs: [4, 10],
    since: "2024",
    story: "First cohort of 95% satisfaction-rated SDG electives • expanding to more grade levels.",
    lastActivity: "Completed term-1 workshops • 4 days ago",
    domain: "brightfuturesacademy.in",
    logoSources: [
      "https://cdn.brandfetch.io/brightfuturesacademy.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://brightfuturesacademy.in&size=128",
    ],
  },
  {
    id: 6,
    name: "EcoVolt Energy",
    type: "Company",
    city: "Chennai",
    initials: "EV",
    sdgs: [7, 13],
    since: "2024",
    story: "Brought hands-on renewable-energy labs to schools.",
    lastActivity: "New funding round confirmed • 6 days ago",
    fundsLakh: 20,
    tier: "Silver",
    domain: "ecovolt.in",
    logoSources: [
      "https://cdn.brandfetch.io/ecovolt.in/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecovolt.in&size=128",
    ],
  },
  {
    id: 7,
    name: "Hope NGO",
    type: "NGO",
    city: "Delhi",
    initials: "HN",
    sdgs: [1, 10],
    since: "2024",
    story: "Connected 840 beneficiaries across 4 cities with partner companies.",
    lastActivity: "Beneficiary survey completed • 2 weeks ago",
    domain: "hopengo.org",
    logoSources: [
      "https://cdn.brandfetch.io/hopengo.org/w/180/h/60/logo",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://hopengo.org&size=128",
    ],
  },
  {
    id: 8,
    name: "Woxsen University",
    type: "University",
    city: "Hyderabad",
    initials: "WU",
    sdgs: [4, 17],
    since: "2025",
    story: "Newest university partner • piloting a joint research project with GreenEarth.",
    lastActivity: "Joined the ecosystem • 3 weeks ago",
    domain: "woxsen.edu.in",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woxsen.png/240px-Woxsen.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://woxsen.edu.in&size=128",
    ],
  },
  {
    id: 9,
    name: "InfraBuild Corp",
    type: "Company",
    city: "Mumbai",
    initials: "IB",
    sdgs: [9, 11],
    since: "2024",
    story: "Funding urban-planning workshops letting students redesign real city blocks.",
    lastActivity: "Workshop showcase held • 1 week ago",
    fundsLakh: 30,
    tier: "Silver",
    domain: "l-and-t.com",
    logoSources: [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Larsen_and_Toubro_logo.svg/240px-Larsen_and_Toubro_logo.svg.png",
      "https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://l-and-t.com&size=128",
    ],
  },
];

const COMPANY_PROJECTS = [
  { name: "SDG Workshop • Hyderabad", amount: "Rs15L", status: "Completed" as const, verified: true },
  { name: "AI Bootcamp for Schools", amount: "Rs12L", status: "Ongoing" as const, verified: false },
  { name: "Climate Action Camp", amount: "Rs11L", status: "Completed" as const, verified: true },
];

const audienceCards: { title: string; type: PartnerType; benefits: string[]; href: string; btnLabel: string }[] = [
  {
    title: "For Companies",
    type: "Company",
    href: "mailto:companies@stepupsdg.in",
    btnLabel: "Get started",
    benefits: ["Verified impact reports for your board", "Direct line to 12,000+ students", "Brand visibility across 6 states"],
  },
  {
    title: "For Educational Institutes",
    type: "School",
    href: "mailto:schools@stepupsdg.in",
    btnLabel: "Join as an institute",
    benefits: ["Ready SDG curriculum and materials", "Funded workshops at zero cost", "Student leadership opportunities"],
  },
  {
    title: "For NGOs",
    type: "NGO",
    href: "mailto:ngos@stepupsdg.in",
    btnLabel: "Partner with us",
    benefits: ["Co-design programs with companies", "Reach across 8 partner cities", "Joint grant opportunities"],
  },
];

/* --- ICONS ----------------------------------------------------------------- */
const Icon = {
  Search: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  X: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Check: ({ className = "w-3.5 h-3.5", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  MapPin: ({ className = "w-3 h-3" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Arrow: ({ className = "w-4 h-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Star: ({ className = "w-2.5 h-2.5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Shield: ({ className = "w-3.5 h-3.5", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  Heart: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
  Users: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Megaphone: ({ className = "w-4 h-4", style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 19l-7-5H2V10h3l7-5v14z" />
      <path d="M17 14c.88-1.16.88-2.84 0-4" />
      <path d="M19 17c1.72-2.14 1.72-5.86 0-8" />
    </svg>
  ),
};

/* --- MULTI-SOURCE IMAGE ---------------------------------------------------- */
function MultiSourceImg({
  sources,
  alt,
  initials,
  color,
  gradient,
  border,
  className,
  style,
  isDark,
}: {
  sources: string[];
  alt: string;
  initials: string;
  color: string;
  gradient: string;
  border: string;
  className?: string;
  style?: React.CSSProperties;
  isDark: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [allFailed, setAllFailed] = useState(false);
  const tryNext = () => {
    if (idx + 1 < sources.length) {
      setIdx((i) => i + 1);
      setLoaded(false);
    } else setAllFailed(true);
  };
  if (allFailed || sources.length === 0) {
    return (
      <div
        className={className}
        style={{
          background: gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid ${border}`,
          borderRadius: "50%",
          width: 56,
          height: 56,
          ...style,
        }}
      >
        <span style={{ color, fontWeight: 900, fontSize: "14px", letterSpacing: "-0.02em" }}>
          {initials}
        </span>
      </div>
    );
  }
  return (
    <div className={className} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {!loaded && <div className="logo-shimmer" style={{ position: "absolute", inset: 0, borderRadius: "inherit" }} />}
      <img
        key={idx}
        src={sources[idx]}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={tryNext}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.35s ease",
          filter: isDark ? "brightness(0.9) saturate(0.85)" : "none",
        }}
      />
    </div>
  );
}

/* --- SCROLL REVEAL --------------------------------------------------------- */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

/* --- PARTNER CARD ---------------------------------------------------------- */
function PartnerCard({
  partner,
  onSelect,
  theme,
  isDark,
}: {
  partner: Partner;
  onSelect: () => void;
  theme: T;
  isDark: boolean;
}) {
  const cfg = typeConfig[partner.type];
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300"
      style={{
        background: "transparent",
        border: "1px solid transparent",
        borderRadius: 24,
        transform: hovered ? "translateY(-6px)" : "none",
      }}
    >
      {/* Logo (Poster) - Floating with NO background/border container */}
      <div
        className="flex h-20 w-full items-center justify-center transition-all duration-300"
        style={{
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      >
        <MultiSourceImg
          sources={partner.logoSources}
          alt={partner.name}
          initials={partner.initials}
          color={cfg.color}
          gradient={cfg.gradient}
          border={cfg.border}
          isDark={isDark}
          style={
            partner.logoSources.length > 0
              ? { width: "90%", height: "100%", borderRadius: 0 }
              : { width: 56, height: 56, borderRadius: "50%" }
          }
        />
      </div>

      {/* Partner Name */}
      <span
        className="text-xs font-bold text-center mt-3 tracking-tight transition-colors duration-300 line-clamp-1 px-2"
        style={{ color: hovered ? theme.accent : theme.text }}
      >
        {partner.name}
      </span>
    </div>
  );
}

/* --- PARTNER MODAL --------------------------------------------------------- */
function PartnerModal({
  partner,
  onClose,
  theme,
  isDark,
}: {
  partner: Partner;
  onClose: () => void;
  theme: T;
  isDark: boolean;
}) {
  const cfg = typeConfig[partner.type];
  const metrics: any[] = [];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: theme.overlay, backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[24px]"
        style={{ background: theme.card, border: `1px solid ${theme.border}`, boxShadow: `0 40px 80px rgba(0,0,0,0.4)` }}
      >
        <div
          className="sticky top-0 z-10 p-6 flex items-start justify-between"
          style={{ background: theme.card, borderBottom: `1px solid ${theme.border}`, backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-4">
            <MultiSourceImg
              sources={partner.logoSources}
              alt={partner.name}
              initials={partner.initials}
              color={cfg.color}
              gradient={cfg.gradient}
              border={cfg.border}
              isDark={isDark}
              style={{ width: 56, height: 56, borderRadius: 14, flexShrink: 0 }}
            />
            <div>
              <div className="text-[17px] font-bold tracking-tight" style={{ color: theme.text }}>{partner.name}</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs" style={{ color: theme.muted }}>
                <Icon.MapPin className="w-3 h-3" />
                {partner.city} • Since {partner.since}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                  style={{ background: cfg.badgeBg, color: cfg.badgeText }}
                >
                  {partner.type}
                </span>
                {partner.tier && (
                  <span
                    className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-bold"
                    style={{ color: tierConfig[partner.tier].color, background: tierConfig[partner.tier].bg }}
                  >
                    <Icon.Star />
                    {tierConfig[partner.tier].label}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ border: `1px solid ${theme.border}`, color: theme.muted, background: theme.pageBg }}
          >
            <Icon.X />
          </motion.button>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-2xl p-5" style={{ background: theme.pageBg, border: `1px solid ${theme.border}` }}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: theme.muted }}>
              The story so far
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: theme.textSub }}>
              {partner.story}
            </p>
          </div>
          <div
            className="flex items-center gap-2.5 rounded-xl p-3.5"
            style={{ border: "1px solid rgba(34,197,94,0.2)", background: "rgba(34,197,94,0.06)" }}
          >
            <Icon.Shield className="w-4 h-4" style={{ color: "#22c55e" }} />
            <span className="text-[13px] font-semibold" style={{ color: "#22c55e" }}>
              Verified Partner
            </span>
            <span className="ml-auto text-[11px]" style={{ color: "#4ade80" }}>
              Audited • Impact verified
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map(([val, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl p-4 text-center"
                style={{ background: cfg.gradient, border: `1px solid ${cfg.border}` }}
              >
                <div className="text-[22px] font-black tracking-tight leading-none" style={{ color: cfg.color }}>
                  {val}
                </div>
                <div className="mt-1 text-[11px] leading-snug" style={{ color: theme.muted }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
          {partner.type === "Company" && (
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{ color: theme.muted }}>
                Funding journey
              </div>
              {COMPANY_PROJECTS.map((p, i) => (
                <div key={p.name} className="relative flex gap-3 pb-4 pl-1 last:pb-0">
                  {i !== COMPANY_PROJECTS.length - 1 && (
                    <span className="absolute left-[7px] top-4 h-full w-px" style={{ background: theme.border }} />
                  )}
                  <span
                    className="z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                    style={{ borderColor: cfg.color, background: p.status === "Completed" ? cfg.color : "transparent" }}
                  />
                  <div className="flex-1 rounded-xl p-3" style={{ background: theme.pageBg, border: `1px solid ${theme.border}` }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium" style={{ color: theme.text }}>
                        {p.name}
                      </span>
                      <span className="text-[13px] font-bold" style={{ color: cfg.color }}>
                        {p.amount}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px]" style={{ color: theme.muted }}>
                      <span>{p.status}</span>
                      {p.verified && (
                        <span className="flex items-center gap-1" style={{ color: theme.accent }}>
                          <Icon.Check className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* --- MAIN PAGE COMPONENT --------------------------------------------------- */
export default function PartnersPage() {
  const { theme: siteTheme } = useTheme();
  const isDark = siteTheme === "dark";
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const [selectedPartner, setSelected] = useState<Partner | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const theme: T = isDark ? DARK : LIGHT;

  const filtered = partners.filter((p) => {
    const targetTypes = TAB_TO_TYPE[activeTab];
    const matchesTab = targetTypes === null || targetTypes.includes(p.type);
    const q = searchQuery.trim().toLowerCase();
    return matchesTab && (q === "" || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q));
  });

  return (
    <div
      className="min-h-screen theme-transition flex flex-col relative bg-grid-pattern overflow-hidden"
      style={{
        background: theme.pageBg,
        color: theme.text,
        fontFamily: "'Inter',system-ui,sans-serif",
        "--grid-color": isDark ? "rgba(255,255,255,0.02)" : "rgba(15,23,42,0.035)",
      } as React.CSSProperties}
    >
      <style>{GLOBAL_STYLES}</style>

      {/* -- BACKDROP RADIAL GLOW BLOBS -- */}
      {/* Top Left Glow */}
      <div
        className="absolute top-[-8%] left-[-12%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(14,165,201,0.16) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(2,132,199,0.11) 0%, transparent 70%)"
        }}
      />
      {/* Center Right Glow */}
      <div
        className="absolute top-[35%] right-[-15%] w-[650px] h-[650px] rounded-full blur-[150px] pointer-events-none opacity-35 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(99,102,241,0.11) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)"
        }}
      />
      {/* Bottom Left Glow */}
      <div
        className="absolute bottom-[-10%] left-[-15%] w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(52,211,153,0.07) 0%, transparent 70%)"
        }}
      />

      {/* -- ECOSYSTEM CONSTELLATION HERO -- */}
      <section className="px-6 md:px-12 lg:px-20 py-16 md:py-24 flex flex-col items-center justify-center relative border-b overflow-hidden z-10"
        style={{ borderColor: theme.border, background: "transparent" }}>
        
        {/* Glow Backdrops */}
        <div className="pointer-events-none absolute rounded-full blur-[140px]"
          style={{
            width: 600,
            height: 450,
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: isDark
              ? "radial-gradient(circle, rgba(14,165,201,0.12) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(2,132,199,0.08) 0%, transparent 70%)"
          }}
        />

        {/* Two-Column Hero Container */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">


            <Reveal delay={0.1}>
              <h1 className="font-display font-black tracking-tight text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.08] mb-5"
                style={{
                  background: isDark 
                    ? "linear-gradient(135deg,#ffffff 30%,#38bdf8 100%)" 
                    : "linear-gradient(135deg,#0f172a 30%,#1e40af 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                Coordinating action for a sustainable future
              </h1>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-xl" style={{ color: theme.muted }}>
                StepUp for SDG drives grassroots educational action under UN SDG 17. We match corporate funding, university research, and NGO fieldwork to deliver quality learning infrastructure where it is needed most.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#directory"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-white transition hover:opacity-95 shadow-sm"
                  style={{ background: `linear-gradient(135deg,${theme.accent},#818cf8)` }}
                >
                  Explore Partners <Icon.Arrow className="w-3.5 h-3.5 rotate-90" />
                </a>
                <a
                  href="/work-with-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs font-bold transition"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.02)"
                  }}
                >
                  Join Ecosystem
                </a>
              </div>
            </Reveal>


          </div>

          {/* Right Column: Interactive Constellation Map */}
          <div className="lg:col-span-5 flex justify-center w-full relative">
            {/* Constellation Glow Backdrop */}
            <div className="absolute rounded-full blur-[100px] pointer-events-none opacity-40"
              style={{
                width: 320,
                height: 320,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${theme.accent}20 0%, transparent 70%)`
              }}
            />
            
            <div className="relative w-[340px] xs:w-[380px] md:w-[420px] h-[360px] mx-auto scale-95 xs:scale-100">
              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 420 360" preserveAspectRatio="xMidYMid meet">
                {([
                  { x1: 80, y1: 70, x2: 210, y2: 180, color: typeConfig["School"].color, delay: 0.3 },
                  { x1: 340, y1: 70, x2: 210, y2: 180, color: typeConfig["NGO"].color, delay: 0.6 },
                  { x1: 80, y1: 290, x2: 210, y2: 180, color: typeConfig["Company"].color, delay: 0.9 },
                  { x1: 340, y1: 290, x2: 210, y2: 180, color: typeConfig["University"].color, delay: 1.2 },
                ]).map((l, i) => (
                  <g key={i}>
                    <line x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={theme.border} strokeWidth="1.5" />
                    <motion.line
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke={l.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.7"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: l.delay, ease: "easeInOut" }}
                    />
                    <circle r="4" fill={l.color} style={{ filter: `drop-shadow(0 0 6px ${l.color})` }}>
                      <animateMotion dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" path={`M${l.x1},${l.y1} L${l.x2},${l.y2}`} />
                      <animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" keyTimes="0;0.1;0.85;1" />
                      <animate attributeName="r" values="0;4;4;0" dur="2s" begin={`${l.delay}s`} repeatCount="indefinite" keyTimes="0;0.1;0.85;1" />
                    </circle>
                  </g>
                ))}
              </svg>

              {/* 4 Corner Nodes */}
              {([
                { type: "School" as PartnerType, title: "Educational Institutes", role: "SDG education & awareness", style: { top: "0%", left: "0%" }, align: "flex-start" as const, textAlign: "left" as const, delay: 0.3 },
                { type: "NGO" as PartnerType, title: "NGOs", role: "Ground execution & community impact", style: { top: "0%", right: "0%" }, align: "flex-end" as const, textAlign: "right" as const, delay: 0.6 },
                { type: "Company" as PartnerType, title: "Companies", role: "Funding & resources", style: { bottom: "0%", left: "0%" }, align: "flex-start" as const, textAlign: "left" as const, delay: 0.9 },
                { type: "University" as PartnerType, title: "Universities", role: "Research, innovation & volunteers", style: { bottom: "0%", right: "0%" }, align: "flex-end" as const, textAlign: "right" as const, delay: 1.2 },
              ]).map((node) => {
                const cfg = typeConfig[node.type];
                const rd = node.delay + 0.5;
                return (
                  <div key={node.title} className="absolute flex flex-col gap-1.5"
                    style={{ ...node.style, width: 130, alignItems: node.align, textAlign: node.textAlign }}>
                    <div className="relative flex items-center justify-center">
                      <motion.div className="absolute rounded-full pointer-events-none"
                        initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
                        viewport={{ once: true }} transition={{ duration: 0.65, delay: rd, ease: "easeOut" }}
                        style={{ width: 64, height: 64, border: `2px solid ${cfg.color}`, borderRadius: "50%" }} />
                      <motion.div className="absolute rounded-full pointer-events-none"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: rd + 0.8 }}
                        style={{ width: 64, height: 64, border: `1.5px solid ${cfg.color}`, borderRadius: "50%" }} />
                      <motion.div whileHover={{ scale: 1.1, y: -2, boxShadow: `0 0 24px ${cfg.color}40` }}
                        initial={{ opacity: 0, scale: 0.4, y: 16 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: rd, type: "spring", stiffness: 240, damping: 18 }}
                        className="relative flex h-16 w-16 items-center justify-center rounded-full border border-slate-700 shadow-sm cursor-default"
                        style={{ background: cfg.gradient, borderColor: cfg.color }}>
                        <motion.span animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
                          style={{ color: cfg.color }}><cfg.IconEl className="w-6 h-6" /></motion.span>
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rd + 0.15 }}>
                      <div className="text-[11px] font-bold" style={{ color: theme.text }}>{node.title}</div>
                      <div className="text-[9px] leading-snug mt-0.5" style={{ color: theme.muted }}>{node.role}</div>
                    </motion.div>
                  </div>
                );
              })}

              {/* Center Hub Node */}
              {(() => {
                const color = theme.accent;
                const rd = 0.15;
                return (
                  <div className="absolute flex flex-col items-center gap-1.5 text-center"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 150 }}>
                    <div className="relative flex items-center justify-center">
                      <motion.div className="absolute rounded-full pointer-events-none"
                        initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: [0.8, 1.8], opacity: [0.8, 0] }}
                        viewport={{ once: true }} transition={{ duration: 0.65, delay: rd, ease: "easeOut" }}
                        style={{ width: 96, height: 96, border: `2px solid ${color}`, borderRadius: "50%" }} />
                      <motion.div className="absolute rounded-full pointer-events-none"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.55, 0, 0.55] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: rd + 0.8 }}
                        style={{ width: 96, height: 96, border: `1.5px solid ${color}`, borderRadius: "50%" }} />
                      <motion.div whileHover={{ scale: 1.08, boxShadow: `0 0 36px ${color}50` }}
                        initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ duration: 0.55, delay: rd, type: "spring", stiffness: 240, damping: 18 }}
                        className="relative flex h-24 w-24 items-center justify-center rounded-full border overflow-hidden shadow-md cursor-default"
                        style={{ background: isDark ? "rgba(13,22,37,0.95)" : "#ffffff", borderColor: color, padding: 0 }}>
                        <img
                          src="/assets/SDG_LOGO-removebg-preview.png"
                          alt="StepUp SDG"
                          style={{ width: "80%", height: "80%", objectFit: "contain" }}
                        />
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rd + 0.15 }}>
                      <div className="text-[12px] font-bold">
                        <span style={{ color: theme.accent }}>StepUp</span> <span style={{ color: "#ef4444" }}>For SDG</span>
                      </div>
                      <div className="text-[9px] mt-0.5" style={{ color: theme.muted }}>Coordination & impact</div>
                    </motion.div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Professional Metrics Stats Grid */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-20 w-full relative z-10 px-4">
            {([
              { value: "9", label: "Verified Partners", color: "#38bdf8" },
              { value: "6", label: "States Reached", color: "#34d399" },
              { value: "Rs 1.2 Cr", label: "CSR Co-funding", color: "#f87171" },
              { value: "12,000+", label: "Students Impacted", color: "#fbbf24" },
            ]).map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border"
                style={{
                  background: isDark ? "rgba(13,22,37,0.3)" : "rgba(255,255,255,0.45)",
                  borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span className="text-[20px] md:text-[26px] font-black tracking-tight leading-none" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-[11px] font-medium mt-1.5 text-center" style={{ color: theme.muted }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* -- PARTNER DIRECTORY SECTION -- */}
      <section id="directory" className="max-w-7xl mx-auto py-16 px-6 md:px-12 lg:px-20 relative z-10" style={{ background: "transparent" }}>
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.muted }}>Verified Network</span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mt-1 mb-2" style={{ color: theme.text }}>
              Partner directory
            </h2>
            <div className="w-12 h-0.5 mx-auto rounded-full" style={{ background: theme.accent }} />
          </div>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: theme.muted }}>
                <motion.span animate={{ scale: searchFocused ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
                  <Icon.Search className="w-3.5 h-3.5" />
                </motion.span>
              </span>
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="glass-input rounded-full py-2.5 pl-[38px] pr-4 text-[13px] w-[280px] border shadow-sm"
                style={{
                  background: theme.card,
                  borderColor: searchFocused ? theme.accent : theme.border,
                  color: theme.text,
                  boxShadow: searchFocused ? `0 0 0 3px ${theme.accent}15` : "none",
                }}
              />
            </div>
            <div
              className="relative flex rounded-full p-1 border shadow-sm"
              style={{ background: theme.sectionAlt, borderColor: theme.border }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="segmented-tab relative rounded-full px-4 py-1.5 text-[13px] font-medium z-10"
                    style={{ color: isActive ? (isDark ? "#fff" : "#0d1829") : theme.muted }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="tab-indicator"
                        className="absolute inset-0 rounded-full z-0"
                        style={{
                          background: isDark ? theme.card : "#ffffff",
                          border: `1px solid ${theme.border}`,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <div
            className="rounded-2xl py-12 text-center text-sm"
            style={{ border: `1px dashed ${theme.border}`, color: theme.muted }}
          >
            No partners found for &ldquo;{searchQuery}&rdquo;
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((partner, idx) => (
                <motion.div
                  key={partner.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: "easeOut" }}
                >
                  <PartnerCard
                    partner={partner}
                    onSelect={() => setSelected(partner)}
                    theme={theme}
                    isDark={isDark}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* -- AUDIENCE CALL-OUT CARDS SECTION -- */}
      <section className="px-6 md:px-12 lg:px-20 py-20 border-t relative overflow-hidden z-10"
        style={{ borderColor: theme.border, background: "transparent" }}>
        
        {/* Glow Blob */}
        <div className="pointer-events-none absolute rounded-full blur-[120px] opacity-[0.06] bottom-0 left-0"
          style={{ width: 400, height: 400, background: theme.accent }} />

        <div className="relative z-10 text-center mb-16">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ background: isDark ? "rgba(14,165,201,0.12)" : "rgba(2,132,199,0.1)", border: `1px solid ${theme.accent}35`, color: theme.accent }}>
              Join the ecosystem
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: theme.text }}>
              Partner with <span style={{ background: `linear-gradient(135deg,${theme.accent},#818cf8)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StepUp For SDG</span>
            </h2>
            <p className="max-w-xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: theme.muted }}>
              Whether you're a school, NGO, company or volunteer — there's a place for you in building a future where every child creates real-world impact.
            </p>
          </Reveal>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map((card, idx) => {
              const cfg = typeConfig[card.type];
              return (
                <Reveal key={card.title} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="relative overflow-hidden rounded-[24px] p-8 h-full flex flex-col border"
                    style={{
                      background: isDark
                        ? `linear-gradient(145deg,rgba(13,22,37,0.95) 0%,rgba(8,14,28,0.98) 100%)`
                        : `linear-gradient(145deg,#ffffff 0%,${cfg.color}08 100%)`,
                      borderColor: `${cfg.color}35`,
                      boxShadow: isDark
                        ? `0 0 0 1px ${cfg.color}15, 0 20px 48px -12px ${cfg.color}25`
                        : `0 0 0 1px ${cfg.color}10, 0 16px 40px -10px ${cfg.color}15`,
                    }}
                  >
                    {/* color wash top */}
                    <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 rounded-t-[24px]"
                      style={{ background: `linear-gradient(180deg,${cfg.color}12 0%,transparent 100%)` }} />
                    
                    {/* watermark background icon */}
                    <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.05]">
                      <cfg.IconEl className="w-32 h-32" style={{ color: cfg.color }} />
                    </div>

                    <div className="relative z-10 mb-4 text-base font-bold" style={{ color: theme.text }}>
                      {card.title}
                    </div>
                    
                    <ul className="relative z-10 flex flex-col gap-3 mb-8 flex-1">
                      {card.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{ color: theme.textSub }}>
                          <span className="mt-[3px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                            style={{ background: `${cfg.color}18`, border: `1px solid ${cfg.color}30` }}>
                            <Icon.Check className="w-2.5 h-2.5" style={{ color: cfg.color }} />
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>

                    <motion.a
                      href={card.href}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative z-10 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-bold text-white shadow-sm"
                      style={{ background: `linear-gradient(135deg,${cfg.color},${cfg.color}d5)` }}
                    >
                      {card.btnLabel} <Icon.Arrow className="w-3.5 h-3.5" />
                    </motion.a>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* -- OUR PARTNERSHIP MODELS -- */}
        <div className="relative z-10 max-w-6xl mx-auto mt-8 pt-8 border-t" style={{ borderColor: `${theme.border}70` }}>
          <Reveal>
            <div className="text-left mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest block" style={{ color: theme.muted }}>
                Our Partnership Models
              </span>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {([
              {
                title: "Sponsorship",
                desc: "Fund SDG workshops and receive CSR compliance reports.",
                icon: "Heart"
              },
              {
                title: "Co-Hosted Programs",
                desc: "Run joint programs designed around your vision and SDG goals.",
                icon: "Users"
              },
              {
                title: "Awareness Campaigns",
                desc: "Create custom advocacy campaigns across partner schools.",
                icon: "Megaphone"
              }
            ]).map((model, idx) => (
              <Reveal key={model.title} delay={idx * 0.1}>
                <div
                  className="rounded-[20px] p-6 flex flex-col border h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: isDark ? "rgba(13,22,37,0.35)" : "#ffffff",
                    borderColor: theme.border,
                    boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.02)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                      style={{ background: isDark ? "rgba(56,189,248,0.1)" : "rgba(21,93,252,0.06)", border: `1px solid ${isDark ? "#38bdf8" : "#155DFC"}20` }}>
                      {model.icon === "Heart" && <Icon.Heart className="w-4 h-4" style={{ color: isDark ? "#38bdf8" : "#155DFC" }} />}
                      {model.icon === "Users" && <Icon.Users className="w-4 h-4" style={{ color: isDark ? "#38bdf8" : "#155DFC" }} />}
                      {model.icon === "Megaphone" && <Icon.Megaphone className="w-4 h-4" style={{ color: isDark ? "#38bdf8" : "#155DFC" }} />}
                    </span>
                    <h4 className="text-sm font-extrabold" style={{ color: theme.text }}>
                      {model.title}
                    </h4>
                  </div>
                  <p className="text-[12px] leading-relaxed text-left flex-1" style={{ color: theme.muted }}>
                    {model.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Centered Work With Us CTA button */}
          <Reveal delay={0.3}>
            <div className="flex justify-center mt-12">
              <a
                href="mailto:partners@stepupsdg.in"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-xs font-bold text-white transition hover:scale-[1.03] active:scale-[0.98] shadow-md"
                style={{ background: `linear-gradient(135deg,#155DFC,#1e40af)` }}
              >
                Work with us <Icon.Arrow className="w-3.5 h-3.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <PartnerModal
            partner={selectedPartner}
            onClose={() => setSelected(null)}
            theme={theme}
            isDark={isDark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}