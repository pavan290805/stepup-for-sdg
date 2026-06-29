"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useInView } from "framer-motion";

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */
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
  @keyframes mesh-move {
    0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
    33%       { opacity: 0.6; transform: scale(1.05) translate(-20px, 10px); }
    66%       { opacity: 0.5; transform: scale(0.98) translate(15px, -8px); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes kenburns {
    0%   { transform: scale(1.08) translate(0px, 0px); }
    50%  { transform: scale(1.13) translate(-12px, -6px); }
    100% { transform: scale(1.08) translate(0px, 0px); }
  }
  @keyframes particle-float {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
    33%       { transform: translateY(-20px) translateX(8px); opacity: 0.8; }
    66%       { transform: translateY(-10px) translateX(-6px); opacity: 0.5; }
  }

  .kb-img    { animation: kenburns 18s ease-in-out infinite; }
  .particle  { animation: particle-float var(--dur, 6s) ease-in-out infinite; }

  .mq-track        { display:flex; width:max-content; animation:marquee 32s linear infinite; }
  .mq-track-slow   { display:flex; width:max-content; animation:marquee 50s linear infinite; }
  .mq-track:hover, .mq-track-slow:hover { animation-play-state:paused; }

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

  .mesh-blob   { animation: mesh-move 12s ease-in-out infinite; }
  .mesh-blob-2 { animation: mesh-move 16s ease-in-out infinite reverse; }
  .mesh-blob-3 { animation: mesh-move 20s ease-in-out infinite 4s; }

  .segmented-tab { position: relative; transition: color 0.2s ease; }
  .glass-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
  .glass-input:focus { outline: none; }

  .theme-transition * { transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease; }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

  .logo-shimmer {
    background-image: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
    background-size: 200% 100%;
    animation: shimmer-bg 1.4s ease infinite;
  }
`;

/* ─── THEMES ──────────────────────────────────────────────────────────────── */
const DARK = {
  pageBg:"#060a10", sectionAlt:"#070c14", card:"#0d1625", cardHover:"#101c2e", footer:"#040810",
  border:"#1a2537", borderSubtle:"#111b28", text:"#f0f4f8", textSub:"#c8d4e0",
  muted:"#6b8099", dim:"#3d5166",
  accent:"#0ea5c9", accentGlow:"rgba(14,165,201,0.2)", accentRed:"#ef4444", inputBg:"#080f1a",
  glass:"rgba(13,22,37,0.82)", glassBorder:"rgba(14,165,201,0.2)",
  glow:"rgba(14,165,201,0.15)", overlay:"rgba(4,8,16,0.88)",
  gridLine:"rgba(255,255,255,0.03)",
  meshA:"rgba(14,165,201,0.12)", meshB:"rgba(99,102,241,0.08)", meshC:"rgba(16,185,129,0.06)",
};
const LIGHT = {
  pageBg:"#fafbfd", sectionAlt:"#f3f6fa", card:"#ffffff", cardHover:"#fafcff", footer:"#111827",
  border:"#e1e8f0", borderSubtle:"#edf2f7", text:"#0d1829", textSub:"#374151",
  muted:"#6b7280", dim:"#9ca3af",
  accent:"#0284c7", accentGlow:"rgba(2,132,199,0.15)", accentRed:"#dc2626", inputBg:"#f8fafc",
  glass:"rgba(255,255,255,0.92)", glassBorder:"rgba(2,132,199,0.2)",
  glow:"rgba(2,132,199,0.08)", overlay:"rgba(0,0,0,0.75)",
  gridLine:"rgba(0,0,0,0.025)",
  meshA:"rgba(2,132,199,0.06)", meshB:"rgba(99,102,241,0.04)", meshC:"rgba(16,185,129,0.03)",
};
type T = typeof DARK;

/* ─── TYPES ───────────────────────────────────────────────────────────────── */
type PartnerType = "School" | "NGO" | "Company" | "University";
type Tier = "Gold" | "Silver";
interface Partner {
  id: number; name: string; type: PartnerType; city: string;
  initials: string; sdgs: number[]; since: string; story: string;
  lastActivity: string; funds?: string; fundsLakh?: number; tier?: Tier;
  logoSources: string[]; domain?: string;
}

/* ─── TYPE CONFIGS ────────────────────────────────────────────────────────── */
const typeConfig: Record<PartnerType, {
  color: string; bg: string; border: string; badgeBg: string; badgeText: string; gradient: string;
  IconEl: (p: { className?: string; style?: React.CSSProperties }) => JSX.Element;
}> = {
  School: {
    color:"#34d399", bg:"rgba(16,185,129,0.08)", border:"rgba(52,211,153,0.25)",
    badgeBg:"rgba(16,185,129,0.12)", badgeText:"#34d399",
    gradient:"linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(6,182,212,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>),
  },
  NGO: {
    color:"#38bdf8", bg:"rgba(56,189,248,0.08)", border:"rgba(56,189,248,0.25)",
    badgeBg:"rgba(56,189,248,0.12)", badgeText:"#38bdf8",
    gradient:"linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(99,102,241,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>),
  },
  Company: {
    color:"#f87171", bg:"rgba(248,113,113,0.08)", border:"rgba(248,113,113,0.25)",
    badgeBg:"rgba(248,113,113,0.12)", badgeText:"#f87171",
    gradient:"linear-gradient(135deg, rgba(248,113,113,0.1) 0%, rgba(251,146,60,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
      </svg>),
  },
  University: {
    color:"#fbbf24", bg:"rgba(251,191,36,0.08)", border:"rgba(251,191,36,0.25)",
    badgeBg:"rgba(251,191,36,0.12)", badgeText:"#fbbf24",
    gradient:"linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(249,115,22,0.06) 100%)",
    IconEl:({className="w-[18px] h-[18px]",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5"/>
      </svg>),
  },
};

const tierConfig: Record<Tier, { label: string; color: string; bg: string }> = {
  Gold:   { label:"Gold",   color:"#f59e0b", bg:"rgba(245,158,11,0.1)"  },
  Silver: { label:"Silver", color:"#94a3b8", bg:"rgba(148,163,184,0.1)" },
};

const tabs = ["All","Schools","NGOs","Companies","Universities"] as const;
type Tab = (typeof tabs)[number];
const TAB_TO_TYPE: Record<Tab, PartnerType | null> = {
  All:null, Schools:"School", NGOs:"NGO", Companies:"Company", Universities:"University",
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const partners: Partner[] = [
  { id:1, name:"Delhi Public School", type:"School", city:"New Delhi", initials:"DPS", sdgs:[4,13], since:"2023",
    story:"Students launched their own sustainability council after their first SDG workshop.",
    lastActivity:"Hosted an SDG workshop · 2 weeks ago", domain:"dpsrkp.net",
    logoSources:["https://dpsrkp.net/wp-content/uploads/2019/06/logo-png-152x195.png","https://upload.wikimedia.org/wikipedia/en/3/3c/Delhi_Public_School_logo.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://dpsrkp.net&size=128`]},
  { id:2, name:"GreenEarth Initiative", type:"NGO", city:"Hyderabad", initials:"GE", sdgs:[13,15], since:"2024",
    story:"Co-designed a tree-cover restoration curriculum now used across 6 partner schools.",
    lastActivity:"Published impact report · 5 days ago", domain:"greenearth.org",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Green_Earth_logo.svg/240px-Green_Earth_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenearth.org&size=128`]},
  { id:3, name:"TechCorp India", type:"Company", city:"Bangalore", initials:"TC", sdgs:[4,9], since:"2023",
    story:"A Rs50L CSR commitment turned into 3 audited programs reaching 620 students.",
    lastActivity:"Funded the AI Bootcamp cohort · 3 days ago", funds:"Rs50L", fundsLakh:50, tier:"Gold", domain:"techcorp.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Tata_Consultancy_Services_Logo.svg/240px-Tata_Consultancy_Services_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://tcs.com&size=128`]},
  { id:4, name:"IIT Hyderabad", type:"University", city:"Hyderabad", initials:"IIT", sdgs:[4,9,17], since:"2023",
    story:"420 student volunteers now run peer-led SDG workshops in government schools.",
    lastActivity:"Volunteer cohort onboarded · 1 week ago", domain:"iith.ac.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Indian_Institute_of_Technology_Hyderabad_Logo.svg/240px-Indian_Institute_of_Technology_Hyderabad_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://iith.ac.in&size=128`]},
  { id:5, name:"Bright Futures Academy", type:"School", city:"Mumbai", initials:"BF", sdgs:[4,10], since:"2024",
    story:"First cohort of 95% satisfaction-rated SDG electives — expanding to more grade levels.",
    lastActivity:"Completed term-1 workshops · 4 days ago", domain:"brightfuturesacademy.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Kendriya_Vidyalaya_logo.svg/240px-Kendriya_Vidyalaya_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://brightfuturesacademy.in&size=128`]},
  { id:6, name:"EcoVolt Energy", type:"Company", city:"Chennai", initials:"EV", sdgs:[7,13], since:"2024",
    story:"Brought hands-on renewable-energy labs to schools.",
    lastActivity:"New funding round confirmed · 6 days ago", funds:"Rs20L", fundsLakh:20, tier:"Silver", domain:"ecovolt.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Tata_Power_Logo.svg/240px-Tata_Power_Logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://ecovolt.in&size=128`]},
  { id:7, name:"Hope NGO", type:"NGO", city:"Delhi", initials:"HN", sdgs:[1,10], since:"2024",
    story:"Connected 840 beneficiaries across 4 cities with partner companies.",
    lastActivity:"Beneficiary survey completed · 2 weeks ago", domain:"hopengo.org",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/CRY_logo.svg/240px-CRY_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://hopengo.org&size=128`]},
  { id:8, name:"Woxsen University", type:"University", city:"Hyderabad", initials:"WU", sdgs:[4,17], since:"2025",
    story:"Newest university partner — piloting a joint research project with GreenEarth.",
    lastActivity:"Joined the ecosystem · 3 weeks ago", domain:"woxsen.edu.in",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Woxsen.png/240px-Woxsen.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://woxsen.edu.in&size=128`]},
  { id:9, name:"InfraBuild Corp", type:"Company", city:"Mumbai", initials:"IB", sdgs:[9,11], since:"2024",
    story:"Funding urban-planning workshops letting students redesign real city blocks.",
    lastActivity:"Workshop showcase held · 1 week ago", funds:"Rs30L", fundsLakh:30, tier:"Silver", domain:"l-and-t.com",
    logoSources:["https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Larsen_%26_Toubro_logo.svg/240px-Larsen_%26_Toubro_logo.svg.png",`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://larsentoubro.com&size=128`]},
];

const ECOSYSTEM_LOGOS = [
  { name:"Microsoft",     domain:"microsoft.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name:"Google",        domain:"google.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name:"Amazon",        domain:"amazon.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name:"IBM",           domain:"ibm.com",          wiki:"https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name:"Infosys",       domain:"infosys.com",      wiki:"https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" },
  { name:"TCS",           domain:"tcs.com",          wiki:"https://upload.wikimedia.org/wikipedia/commons/2/2f/Tata_Consultancy_Services_Logo.svg" },
  { name:"Wipro",         domain:"wipro.com",        wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" },
  { name:"Accenture",     domain:"accenture.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" },
  { name:"Deloitte",      domain:"deloitte.com",     wiki:"https://upload.wikimedia.org/wikipedia/commons/1/15/Deloitte_Logo.png" },
  { name:"NVIDIA",        domain:"nvidia.com",       wiki:"https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg" },
  { name:"Adobe",         domain:"adobe.com",        wiki:"https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" },
  { name:"Cognizant",     domain:"cognizant.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/3/37/Cognizant_logo.svg" },
  { name:"HCL Tech",      domain:"hcltech.com",      wiki:"https://upload.wikimedia.org/wikipedia/commons/f/f5/HCL_Technologies_logo.svg" },
  { name:"Tech Mahindra", domain:"techmahindra.com", wiki:"https://upload.wikimedia.org/wikipedia/commons/8/8e/Tech_Mahindra_New_Logo.svg" },
  { name:"Capgemini",     domain:"capgemini.com",    wiki:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Capgemini_201x_logo.svg" },
];

const heroFloatingCards = [
  { label:"CSR Funding",       value:"Rs1Cr+", sub:"Enabled this year",  delay:0,    floatDur:3.2 },
  { label:"SDG Projects",      value:"186+",   sub:"Currently active",   delay:0.15, floatDur:4.0 },
  { label:"Schools Connected", value:"142+",   sub:"Across India",       delay:0.3,  floatDur:3.6 },
  { label:"Verified Partners", value:"260+",   sub:"Organizations",      delay:0.45, floatDur:3.8 },
];

const ecosystemRoles: { type: PartnerType | "Hub"; title: string; role: string }[] = [
  { type:"School",     title:"Schools",      role:"SDG education & awareness"           },
  { type:"NGO",        title:"NGOs",         role:"Ground execution & community impact" },
  { type:"Hub",        title:"StepUp SDG",   role:"Coordination & impact tracking"      },
  { type:"Company",    title:"Companies",    role:"Funding & resources"                 },
  { type:"University", title:"Universities", role:"Research, innovation & volunteers"   },
];

const partnershipModels = [
  { title:"Sponsorship",         desc:"Fund SDG workshops and events. Full spend audit provided."     },
  { title:"Co-hosted Programs",  desc:"Run joint programs designed around your sector and SDG goals." },
  { title:"Awareness Campaigns", desc:"Create student-led campaigns inside your partner schools."     },
];

const audienceCards: { title: string; type: PartnerType; benefits: string[] }[] = [
  { title:"For Companies",           type:"Company",    benefits:["Verified impact reports for your board","Direct line to 12,000+ students","Brand visibility across 6 states"] },
  { title:"For Schools / Universities", type:"School",  benefits:["Ready SDG curriculum and materials","Funded workshops at zero cost","Student leadership opportunities"]      },
  { title:"For NGOs",                type:"NGO",        benefits:["Co-design programs with companies","Reach across 8 partner cities","Joint grant opportunities"]              },
];

const COMPANY_PROJECTS = [
  { name:"SDG Workshop — Hyderabad", amount:"Rs15L", status:"Completed" as const, verified:true  },
  { name:"AI Bootcamp for Schools",  amount:"Rs12L", status:"Ongoing"   as const, verified:false },
  { name:"Climate Action Camp",      amount:"Rs11L", status:"Completed" as const, verified:true  },
];

const METRICS_BY_TYPE: Record<PartnerType, [string,string][]> = {
  Company:    [["Rs50L","Total contributed"],["Rs38L","Funds utilized"],["Rs12L","Remaining"],["620","Students reached"],["12","Schools helped"],["8","Workshops done"]],
  School:     [["320","Students"],["8","Workshops"],["3","SDG Goals"],["2","Years active"],["4","Events held"],["95%","Satisfaction"]],
  NGO:        [["12","Projects"],["4","Cities"],["5","SDG Goals"],["840","Beneficiaries"],["3","Years active"],["6","Partners"]],
  University: [["420","Volunteers"],["6","Events"],["5","SDG Goals"],["200","Students active"],["4","Departments"],["2","Years active"]],
};

/* ─── ICONS ───────────────────────────────────────────────────────────────── */
const Icon = {
  Search:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  X:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Check:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polyline points="20 6 9 17 4 12"/></svg>),
  MapPin:({className="w-3 h-3"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Arrow:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Globe:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Star:({className="w-2.5 h-2.5"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Shield:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>),
  Sun:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>),
  Moon:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>),
  Clock:({className="w-4 h-4",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>),
  Lock:({className="w-4 h-4",style}:{className?:string;style?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>),
  BarChart:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
  Handshake:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>),
  Megaphone:({className="w-4 h-4"}:{className?:string})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>),
};

/* ─── MULTI-SOURCE LOGO ───────────────────────────────────────────────────── */
function MultiSourceImg({ sources,alt,initials,color,gradient,border,className,style,isDark }:{
  sources:string[]; alt:string; initials:string; color:string; gradient:string; border:string;
  className?:string; style?:React.CSSProperties; isDark:boolean;
}) {
  const [idx,setIdx]=useState(0);
  const [loaded,setLoaded]=useState(false);
  const [allFailed,setAllFailed]=useState(false);
  const tryNext=()=>{ if(idx+1<sources.length){setIdx(i=>i+1);setLoaded(false);}else setAllFailed(true); };
  if(allFailed||sources.length===0) return (
    <div className={className} style={{...style,background:gradient,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${border}`}}>
      <span style={{color,fontWeight:900,fontSize:"clamp(14px,2.5vw,26px)",letterSpacing:"-0.03em"}}>{initials}</span>
    </div>
  );
  return (
    <div className={className} style={{...style,position:"relative",overflow:"hidden"}}>
      {!loaded&&<div className="logo-shimmer" style={{position:"absolute",inset:0,borderRadius:"inherit"}}/>}
      <img key={idx} src={sources[idx]} alt={alt} onLoad={()=>setLoaded(true)} onError={tryNext}
        style={{width:"100%",height:"100%",objectFit:"contain",padding:"12%",opacity:loaded?1:0,transition:"opacity 0.35s ease",filter:isDark?"brightness(0.9) saturate(0.85)":"none"}}/>
    </div>
  );
}

/* ─── ANIMATED COUNTER ────────────────────────────────────────────────────── */
function AnimatedCounter({value,theme}:{value:string;theme:T}) {
  const ref=useRef<HTMLDivElement>(null);
  const isInView=useInView(ref,{once:true,margin:"-50px"});
  const [display,setDisplay]=useState("0");
  useEffect(()=>{
    if(!isInView) return;
    const num=parseFloat(value.replace(/[^0-9.]/g,""));
    if(isNaN(num)){setDisplay(value);return;}
    const suffix=value.replace(/[0-9.]/g,"");
    const dur=1400; const start=performance.now();
    const update=(now:number)=>{
      const t=Math.min((now-start)/dur,1);
      const eased=1-Math.pow(1-t,3);
      const cur=eased*num;
      setDisplay(`${num<100?cur.toFixed(num%1!==0?1:0):Math.round(cur)}${suffix}`);
      if(t<1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },[isInView,value]);
  return <div ref={ref} style={{color:theme.text}}>{display}</div>;
}

/* ─── TILT CARD ───────────────────────────────────────────────────────────── */
function TiltCard({children,className,style,onClick}:{children:React.ReactNode;className?:string;style?:React.CSSProperties;onClick?:()=>void}) {
  const ref=useRef<HTMLDivElement>(null);
  const x=useMotionValue(0); const y=useMotionValue(0);
  const rotateX=useSpring(useTransform(y,[-0.5,0.5],[4,-4]),{stiffness:300,damping:30});
  const rotateY=useSpring(useTransform(x,[-0.5,0.5],[-4,4]),{stiffness:300,damping:30});
  const glowX=useTransform(x,[-0.5,0.5],[0,100]);
  const glowY=useTransform(y,[-0.5,0.5],[0,100]);
  const handleMouseMove=useCallback((e:React.MouseEvent<HTMLDivElement>)=>{
    if(!ref.current) return;
    const rect=ref.current.getBoundingClientRect();
    x.set((e.clientX-rect.left)/rect.width-0.5);
    y.set((e.clientY-rect.top)/rect.height-0.5);
  },[x,y]);
  const handleMouseLeave=useCallback(()=>{x.set(0);y.set(0);},[x,y]);
  return (
    <motion.div ref={ref} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{rotateX,rotateY,transformStyle:"preserve-3d",perspective:1000,...style}} className={className}>
      <motion.div className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{background:useTransform([glowX,glowY],([gx,gy])=>`radial-gradient(circle at ${gx}% ${gy}%, rgba(14,165,201,0.08) 0%, transparent 60%)`)}}/>
      {children}
    </motion.div>
  );
}

/* ─── PARTNER LOGO MARK ───────────────────────────────────────────────────── */
function PartnerLogoMark({partner,theme,isDark}:{partner:Partner;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden"
      style={{background:cfg.gradient,height:148,borderBottom:`1px solid ${theme.border}`}}>
      <div className="absolute inset-0 opacity-20" style={{backgroundImage:`linear-gradient(${theme.gridLine} 1px,transparent 1px),linear-gradient(90deg,${theme.gridLine} 1px,transparent 1px)`,backgroundSize:"24px 24px"}}/>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <MultiSourceImg sources={partner.logoSources} alt={partner.name} initials={partner.initials}
          color={cfg.color} gradient={cfg.gradient} border={cfg.border} isDark={isDark}
          style={{width:90,height:60,borderRadius:10}}/>
        <span className="rounded-full px-2 py-[2px] text-[9px] font-bold uppercase tracking-widest"
          style={{background:cfg.badgeBg,color:cfg.badgeText}}>{partner.type}</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{background:`linear-gradient(90deg,transparent,${cfg.color}60,transparent)`}}/>
    </div>
  );
}

/* ─── SDG CHIP ────────────────────────────────────────────────────────────── */
function SDGChip({num,theme}:{num:number;theme:T}) {
  return (
    <span className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold"
      style={{background:theme.borderSubtle,color:theme.muted,border:`1px solid ${theme.border}`}}>
      SDG {num}
    </span>
  );
}

/* ─── PARTNER CARD ────────────────────────────────────────────────────────── */
function PartnerCard({partner,onSelect,theme,isDark}:{partner:Partner;onSelect:()=>void;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  const [hovered,setHovered]=useState(false);
  return (
    <TiltCard onClick={onSelect} className="group relative cursor-pointer shine-sweep"
      style={{background:theme.card,border:`1px solid ${hovered?cfg.border:theme.border}`,borderRadius:20,overflow:"hidden",
        boxShadow:hovered?`0 20px 60px -10px ${cfg.color}20,0 0 0 1px ${cfg.border}`:`0 1px 3px rgba(0,0,0,0.1)`}}>
      <motion.div onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
        animate={{y:hovered?-2:0}} transition={{type:"spring",stiffness:400,damping:25}}>
        <PartnerLogoMark partner={partner} theme={theme} isDark={isDark}/>
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[14px] font-bold leading-snug tracking-[-0.01em]" style={{color:theme.text}}>{partner.name}</div>
              <div className="flex items-center gap-1 mt-1 text-[11px]" style={{color:theme.muted}}><Icon.MapPin/>{partner.city}</div>
            </div>
            {partner.tier&&(
              <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold shrink-0"
                style={{color:tierConfig[partner.tier].color,background:tierConfig[partner.tier].bg}}>
                <Icon.Star/>{partner.tier}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[9px] font-semibold"
              style={{background:"rgba(34,197,94,0.1)",color:"#22c55e",border:"1px solid rgba(34,197,94,0.2)"}}>
              <Icon.Shield className="w-2.5 h-2.5"/>Verified
            </span>
            <span className="text-[10px]" style={{color:theme.dim}}>Since {partner.since}</span>
            {partner.funds&&<span className="ml-auto text-[10px] font-semibold" style={{color:cfg.color}}>{partner.funds}</span>}
          </div>
          <div className="flex flex-wrap gap-1.5">{partner.sdgs.map(n=><SDGChip key={n} num={n} theme={theme}/>)}</div>
          <div className="flex items-center gap-2 pt-3 text-[10px]" style={{borderTop:`1px solid ${theme.border}`,color:theme.dim}}>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full animate-pulse" style={{background:"#22c55e"}}/>
            {partner.lastActivity}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ─── PARTNER MODAL ───────────────────────────────────────────────────────── */
function PartnerModal({partner,onClose,theme,isDark}:{partner:Partner;onClose:()=>void;theme:T;isDark:boolean}) {
  const cfg=typeConfig[partner.type];
  const metrics=METRICS_BY_TYPE[partner.type];
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{background:theme.overlay,backdropFilter:"blur(8px)"}} onClick={onClose}>
      <motion.div initial={{scale:0.92,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}}
        exit={{scale:0.94,opacity:0,y:10}} transition={{type:"spring",stiffness:400,damping:30}}
        onClick={e=>e.stopPropagation()}
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-[24px]"
        style={{background:theme.card,border:`1px solid ${theme.border}`,boxShadow:`0 40px 80px rgba(0,0,0,0.4)`}}>
        <div className="sticky top-0 z-10 p-6 flex items-start justify-between"
          style={{background:theme.card,borderBottom:`1px solid ${theme.border}`,backdropFilter:"blur(12px)"}}>
          <div className="flex items-center gap-4">
            <MultiSourceImg sources={partner.logoSources} alt={partner.name} initials={partner.initials}
              color={cfg.color} gradient={cfg.gradient} border={cfg.border} isDark={isDark}
              style={{width:56,height:56,borderRadius:14,flexShrink:0}}/>
            <div>
              <div className="text-[17px] font-bold tracking-tight" style={{color:theme.text}}>{partner.name}</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs" style={{color:theme.muted}}>
                <Icon.MapPin className="w-3 h-3"/>{partner.city} · Since {partner.since}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="rounded-full px-2.5 py-[3px] text-[11px] font-semibold"
                  style={{background:cfg.badgeBg,color:cfg.badgeText}}>{partner.type}</span>
                {partner.tier&&(
                  <span className="flex items-center gap-1 rounded-full px-2.5 py-[3px] text-[11px] font-bold"
                    style={{color:tierConfig[partner.tier].color,background:tierConfig[partner.tier].bg}}>
                    <Icon.Star/>{tierConfig[partner.tier].label}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.button onClick={onClose} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{border:`1px solid ${theme.border}`,color:theme.muted,background:theme.pageBg}}>
            <Icon.X/>
          </motion.button>
        </div>
        <div className="flex flex-col gap-5 p-6">
          <div className="rounded-2xl p-5" style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.muted}}>The story so far</div>
            <p className="text-[13px] leading-relaxed" style={{color:theme.textSub}}>{partner.story}</p>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl p-3.5"
            style={{border:"1px solid rgba(34,197,94,0.2)",background:"rgba(34,197,94,0.06)"}}>
            <Icon.Shield className="w-4 h-4" style={{color:"#22c55e"}}/>
            <span className="text-[13px] font-semibold" style={{color:"#22c55e"}}>Verified Partner</span>
            <span className="ml-auto text-[11px]" style={{color:"#4ade80"}}>Audited · Impact verified</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {metrics.map(([val,label])=>(
              <motion.div key={label} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
                className="rounded-2xl p-4 text-center" style={{background:cfg.gradient,border:`1px solid ${cfg.border}`}}>
                <div className="text-[22px] font-black tracking-tight leading-none" style={{color:cfg.color}}>{val}</div>
                <div className="mt-1 text-[11px] leading-snug" style={{color:theme.muted}}>{label}</div>
              </motion.div>
            ))}
          </div>
          {partner.type==="Company"&&(
            <div>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.muted}}>Funding journey</div>
              {COMPANY_PROJECTS.map((p,i)=>(
                <div key={p.name} className="relative flex gap-3 pb-4 pl-1 last:pb-0">
                  {i!==COMPANY_PROJECTS.length-1&&<span className="absolute left-[7px] top-4 h-full w-px" style={{background:theme.border}}/>}
                  <span className="z-10 mt-1 h-3.5 w-3.5 shrink-0 rounded-full border-2"
                    style={{borderColor:cfg.color,background:p.status==="Completed"?cfg.color:"transparent"}}/>
                  <div className="flex-1 rounded-xl p-3" style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium" style={{color:theme.text}}>{p.name}</span>
                      <span className="text-[13px] font-bold" style={{color:cfg.color}}>{p.amount}</span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px]" style={{color:theme.muted}}>
                      <span>{p.status}</span>
                      {p.verified&&<span className="flex items-center gap-1" style={{color:theme.accent}}><Icon.Check className="w-3 h-3"/>Verified</span>}
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

/* ─── MARQUEE LOGO CARD ───────────────────────────────────────────────────── */
function MarqueeLogoCard({logo,theme,isDark}:{logo:{name:string;domain:string;wiki:string};theme:T;isDark:boolean}) {
  const sources=[logo.wiki,`https://cdn.brandfetch.io/${logo.domain}/w/180/h/60/logo`,`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${logo.domain}&size=128`];
  const [idx,setIdx]=useState(0);
  const [loaded,setLoaded]=useState(false);
  const [allFailed,setAllFailed]=useState(false);
  const tryNext=()=>{ if(idx+1<sources.length){setIdx(i=>i+1);setLoaded(false);}else setAllFailed(true); };
  return (
    <div className="logo-pill mx-3 flex items-center justify-center rounded-2xl px-5"
      style={{minWidth:160,height:76,flexShrink:0,position:"relative",overflow:"hidden",
        background:isDark?"rgba(255,255,255,0.05)":"#ffffff",
        border:`1px solid ${isDark?"rgba(255,255,255,0.09)":"#e5e9f0"}`,
        boxShadow:isDark?"none":"0 1px 4px rgba(0,0,0,0.07)"}}>
      {allFailed?(
        <span style={{fontSize:12,fontWeight:700,letterSpacing:"-0.02em",color:isDark?"rgba(255,255,255,0.45)":theme.muted,userSelect:"none"}}>{logo.name}</span>
      ):(
        <>
          {!loaded&&<div className="logo-shimmer" style={{position:"absolute",inset:0,borderRadius:"inherit"}}/>}
          <img key={idx} src={sources[idx]} alt={logo.name} loading="lazy" onLoad={()=>setLoaded(true)} onError={tryNext}
            style={{maxWidth:120,maxHeight:40,objectFit:"contain",display:"block",opacity:loaded?1:0,transition:"opacity 0.35s ease",filter:isDark?"brightness(0.85) saturate(0.9)":"brightness(0.95) saturate(1)"}}/>
        </>
      )}
    </div>
  );
}

function EcosystemLogoMarquee({theme,isDark}:{theme:T;isDark:boolean}) {
  const doubled=[...ECOSYSTEM_LOGOS,...ECOSYSTEM_LOGOS];
  return (
    <div className="overflow-hidden py-2" style={{WebkitMaskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)",maskImage:"linear-gradient(to right,transparent,black 5%,black 95%,transparent)"}}>
      <div className="mq-track-slow" style={{alignItems:"center",padding:"8px 0"}}>
        {doubled.map((logo,i)=><MarqueeLogoCard key={`${logo.domain}-${i}`} logo={logo} theme={theme} isDark={isDark}/>)}
      </div>
    </div>
  );
}

/* ─── APPLY FORM ──────────────────────────────────────────────────────────── */
interface ApplyForm { name:string; organization:string; email:string; type:string; budget:string; message:string; }
const EMPTY_FORM:ApplyForm={name:"",organization:"",email:"",type:"",budget:"",message:""};

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────────── */
function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref=useRef(null);
  const isInView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <motion.div ref={ref} initial={{opacity:0,y:24}} animate={isInView?{opacity:1,y:0}:{}}
      transition={{duration:0.55,delay,ease:[0.21,0.47,0.32,0.98]}}>
      {children}
    </motion.div>
  );
}

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function PartnersPage() {
  const [isDark,setIsDark]=useState(true);
  const [activeTab,setActiveTab]=useState<Tab>("All");
  const [selectedPartner,setSelected]=useState<Partner|null>(null);
  const [searchQuery,setSearchQuery]=useState("");
  const [mounted,setMounted]=useState(false);
  const [form,setForm]=useState<ApplyForm>(EMPTY_FORM);
  const [submitted,setSubmitted]=useState(false);
  const [searchFocused,setSearchFocused]=useState(false);
  const [dialCode,setDialCode]=useState("+91");
  const [dialOpen,setDialOpen]=useState(false);
  const theme:T=isDark?DARK:LIGHT;

  const mouseX=useMotionValue(0);
  const mouseY=useMotionValue(0);
  const heroRef=useRef<HTMLDivElement>(null);
  const dialRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const saved=localStorage.getItem("stepup-theme");
    if(saved) setIsDark(saved==="dark");
    setMounted(true);
  },[]);

  useEffect(()=>{
    const handler=(e:MouseEvent)=>{ if(dialRef.current&&!dialRef.current.contains(e.target as Node)) setDialOpen(false); };
    document.addEventListener("mousedown",handler);
    return ()=>document.removeEventListener("mousedown",handler);
  },[]);

  function toggleTheme() { setIsDark(prev=>{localStorage.setItem("stepup-theme",!prev?"dark":"light");return !prev;}); }

  const handleHeroMouseMove=useCallback((e:React.MouseEvent)=>{
    if(!heroRef.current) return;
    const rect=heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX-rect.left); mouseY.set(e.clientY-rect.top);
  },[mouseX,mouseY]);

  const filtered=partners.filter(p=>{
    const targetType=TAB_TO_TYPE[activeTab];
    const matchesTab=targetType===null||p.type===targetType;
    const q=searchQuery.trim().toLowerCase();
    return matchesTab&&(q===""||p.name.toLowerCase().includes(q)||p.city.toLowerCase().includes(q));
  });

  function updateForm<K extends keyof ApplyForm>(key:K,val:ApplyForm[K]) { setForm(prev=>({...prev,[key]:val})); }

  const DIALS=[
    {code:"+91",flag:"🇮🇳",label:"India"},{code:"+1",flag:"🇺🇸",label:"USA"},{code:"+44",flag:"🇬🇧",label:"UK"},
    {code:"+971",flag:"🇦🇪",label:"UAE"},{code:"+65",flag:"🇸🇬",label:"Singapore"},{code:"+61",flag:"🇦🇺",label:"Australia"},
    {code:"+49",flag:"🇩🇪",label:"Germany"},{code:"+33",flag:"🇫🇷",label:"France"},{code:"+81",flag:"🇯🇵",label:"Japan"},
    {code:"+86",flag:"🇨🇳",label:"China"},{code:"+880",flag:"🇧🇩",label:"Bangladesh"},{code:"+92",flag:"🇵🇰",label:"Pakistan"},
    {code:"+94",flag:"🇱🇰",label:"Sri Lanka"},{code:"+977",flag:"🇳🇵",label:"Nepal"},
  ];
  const currentDial=DIALS.find(d=>d.code===dialCode);

  return (
    <div className="min-h-screen theme-transition" style={{background:theme.pageBg,color:theme.text,fontFamily:"'Inter',system-ui,sans-serif"}}>
      <style>{GLOBAL_STYLES}</style>

      {/* ── NAVBAR ── */}
      <motion.nav initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
        className="sticky top-0 z-50 flex items-center justify-between"
        style={{
          background:isDark?"rgba(6,10,16,0.92)":"rgba(250,251,253,0.95)",
          borderBottom:`1px solid ${theme.border}`,
          backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
          height:80, padding:"0 40px",
        }}>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full overflow-hidden" style={{border:`2px solid ${theme.accent}40`}}>
            <img src="/logo.png" alt="StepUp SDG" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}}/>
          </div>
          <div className="font-black text-[19px] tracking-tight">
            <span style={{color:theme.accent}}>STEPUP</span>
            <span style={{color:theme.accentRed}}> FOR SDG</span>
          </div>
        </div>
        <div className="hidden gap-8 md:flex">
          {["Home","About Us","SDG Goals","Partners","Contact"].map(link=>(
            <a key={link} href="#" className="text-[14px] font-semibold transition-colors hover:opacity-100"
              style={{color:link==="Partners"?theme.accent:theme.muted,opacity:link==="Partners"?1:0.7}}>{link}</a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <motion.button onClick={toggleTheme} whileHover={{scale:1.05}} whileTap={{scale:0.95}}
            aria-label="Toggle theme" className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{border:`1px solid ${theme.border}`,color:theme.muted,background:"transparent"}}>
            {isDark?<Icon.Sun/>:<Icon.Moon/>}
          </motion.button>
          <select className="rounded-lg px-2.5 py-1.5 text-[11px] font-medium focus:outline-none"
            style={{border:`1px solid ${theme.border}`,background:theme.pageBg,color:theme.muted}} defaultValue="EN">
            {["EN","Te","Hi"].map(l=><option key={l} value={l} style={{background:theme.card}}>{l}</option>)}
          </select>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <section ref={heroRef} onMouseMove={handleHeroMouseMove} className="relative overflow-hidden"
        style={{minHeight:"calc(100vh - 80px)",display:"flex",alignItems:"center"}}>

        {/* Background photo with Ken Burns animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="kb-img absolute inset-[-5%]" style={{
            backgroundImage:`url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80')`,
            backgroundSize:"cover", backgroundPosition:"center center",
          }}/>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(4,8,16,0.82) 0%,rgba(6,12,22,0.68) 60%,rgba(4,8,16,0.55) 100%)"}}/>

        {/* Grid */}
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{
          backgroundImage:`linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
          backgroundSize:"48px 48px",
        }}/>

        {/* Floating particles */}
        {[
          {size:6, top:"12%", left:"7%",  dur:"5s",  delay:"0s"   },
          {size:4, top:"65%", left:"4%",  dur:"7s",  delay:"1s"   },
          {size:8, top:"25%", left:"91%", dur:"6s",  delay:"0.5s" },
          {size:5, top:"78%", left:"87%", dur:"8s",  delay:"2s"   },
          {size:3, top:"42%", left:"13%", dur:"5.5s",delay:"1.5s" },
          {size:7, top:"18%", left:"76%", dur:"6.5s",delay:"0.8s" },
          {size:4, top:"55%", left:"95%", dur:"7.5s",delay:"0.3s" },
          {size:5, top:"88%", left:"20%", dur:"6s",  delay:"2.5s" },
        ].map((p,i)=>(
          <div key={i} className="particle pointer-events-none absolute rounded-full"
            style={{width:p.size,height:p.size,top:p.top,left:p.left,
              ["--dur" as string]:p.dur, animationDelay:p.delay,
              background:"rgba(14,165,201,0.55)",
              boxShadow:"0 0 8px rgba(14,165,201,0.7)",
            }}/>
        ))}

        {/* Accent glow */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[300px] blur-[120px] opacity-20"
          style={{background:"radial-gradient(ellipse,#0ea5c9,transparent 70%)"}}/>

        <div className="relative z-10 w-full px-4 md:px-10 py-12">
          <motion.div
            initial={{opacity:0,y:28}} animate={mounted?{opacity:1,y:0}:{}}
            transition={{duration:0.7,ease:[0.21,0.47,0.32,0.98]}}
            className="mx-auto max-w-5xl rounded-[24px] relative"
            style={{
              background:"rgba(6,10,18,0.70)",
              backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)",
              border:"1px solid rgba(14,165,201,0.20)",
              boxShadow:"0 24px 64px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.05)",
              overflow:"hidden", minHeight:320,
            }}>

            {/* Text content */}
            <div className="flex flex-col justify-center gap-5 p-8 md:p-10" style={{maxWidth:"62%"}}>
              <motion.div initial={{opacity:0,y:8}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.15}}
                className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-wide"
                style={{border:"1px solid rgba(14,165,201,0.35)",background:"rgba(14,165,201,0.10)",color:"#38bdf8"}}>
                <Icon.Globe className="w-3 h-3" style={{color:"#38bdf8"}}/>
                India&apos;s SDG Partnership Network
              </motion.div>

              <motion.h1 initial={{opacity:0,y:16}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.2}}
                className="text-[36px] md:text-[50px] font-black leading-[1.05] tracking-[-0.03em]"
                style={{color:"#ffffff"}}>
                Building impact<br/>
                <span style={{backgroundImage:"linear-gradient(135deg,#0ea5c9,#818cf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
                  through collaboration.
                </span>
              </motion.h1>

              <motion.p initial={{opacity:0,y:12}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.27}}
                className="text-[15px] leading-relaxed" style={{color:"rgba(200,212,224,0.85)",maxWidth:380}}>
                Schools, NGOs, universities, and companies united around the 17 UN SDGs. Every partnership creates a ripple.
              </motion.p>

              <motion.div initial={{opacity:0,y:10}} animate={mounted?{opacity:1,y:0}:{}} transition={{delay:0.33}}
                className="flex flex-wrap gap-3">
                <motion.a href="#partner-form" whileHover={{scale:1.03,y:-1}} whileTap={{scale:0.97}}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold"
                  style={{background:"linear-gradient(135deg,#0ea5c9,#0284c7)",color:"#fff",boxShadow:"0 4px 20px rgba(14,165,201,0.40)"}}>
                  Partner With Us <Icon.Arrow/>
                </motion.a>
                <motion.a href="#directory" whileHover={{scale:1.03,y:-1}} whileTap={{scale:0.97}}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold"
                  style={{border:"1.5px solid rgba(255,255,255,0.22)",color:"rgba(255,255,255,0.82)",background:"rgba(255,255,255,0.05)"}}>
                  View Partners
                </motion.a>
              </motion.div>
            </div>

            {/* Floating stat cards — zigzag inside box */}
            {([
              {card:heroFloatingCards[0], top:"5%",  right:"2%",  width:178},
              {card:heroFloatingCards[1], top:"27%", right:"28%", width:166},
              {card:heroFloatingCards[2], top:"50%", right:"2%",  width:172},
              {card:heroFloatingCards[3], top:"71%", right:"28%", width:160},
            ] as {card:typeof heroFloatingCards[0];top:string;right:string;width:number}[]).map(({card,top,right,width},i)=>(
              <motion.div key={card.label} className="absolute hidden md:block" style={{top,right}}
                initial={{opacity:0,scale:0.85,y:10}} animate={mounted?{opacity:1,scale:1,y:0}:{}}
                transition={{delay:0.38+i*0.08,duration:0.45}}>
                <motion.div animate={{y:[0,-5,0]}} transition={{duration:card.floatDur,repeat:Infinity,ease:"easeInOut",delay:i*0.6}}
                  className="rounded-[14px] px-4 py-3"
                  style={{width,background:"rgba(8,14,26,0.94)",border:"1px solid rgba(14,165,201,0.28)",
                    boxShadow:"0 8px 28px rgba(0,0,0,0.45),inset 0 1px 0 rgba(255,255,255,0.04)"}}>
                  <div className="text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{color:"#4a6480"}}>{card.label}</div>
                  <div className="text-[22px] font-black tracking-tight leading-none" style={{color:"#0ea5c9"}}>{card.value}</div>
                  <div className="text-[10px] mt-1" style={{color:"rgba(200,212,224,0.6)"}}>{card.sub}</div>
                </motion.div>
              </motion.div>
            ))}

            {/* Mobile stat grid */}
            <div className="md:hidden grid grid-cols-2 gap-3 px-6 pb-6">
              {heroFloatingCards.slice(0,4).map(card=>(
                <div key={card.label} className="rounded-[14px] px-4 py-3"
                  style={{background:"rgba(8,14,26,0.85)",border:"1px solid rgba(14,165,201,0.18)"}}>
                  <div className="text-[9px] font-semibold uppercase tracking-widest mb-0.5" style={{color:"#4a6480"}}>{card.label}</div>
                  <div className="text-[20px] font-black tracking-tight" style={{color:"#0ea5c9"}}>{card.value}</div>
                  <div className="text-[10px] mt-0.5" style={{color:"rgba(200,212,224,0.6)"}}>{card.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ECOSYSTEM FLOW ── */}
      <section className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Our partnership ecosystem</p>
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight" style={{color:theme.text}}>Together, we create lasting change</h2>
            <p className="mt-2 text-sm max-w-md mx-auto" style={{color:theme.muted}}>Each partner plays a distinct role, working toward the same goals.</p>
          </div>
        </Reveal>
        <div className="flex flex-wrap items-start justify-center gap-y-6">
          {ecosystemRoles.map((node,i)=>{
            const isHub=node.type==="Hub";
            const cfg=!isHub?typeConfig[node.type as PartnerType]:null;
            return (
              <Reveal key={node.title} delay={i*0.07}>
                <div className="flex items-center">
                  {i!==0&&<div className="hidden md:block h-px w-8 lg:w-12 shrink-0"
                    style={{background:`linear-gradient(90deg,${theme.border},${theme.dim},${theme.border})`}}/>}
                  <div className="flex w-[120px] flex-col items-center gap-3 text-center">
                    <motion.div whileHover={{scale:1.08,y:-2}}
                      className={`flex items-center justify-center rounded-full border-2 ${isHub?"h-20 w-20":"h-16 w-16"}`}
                      style={{background:isHub?"transparent":cfg?.gradient,borderColor:isHub?theme.accent:cfg?.border,
                        boxShadow:isHub?`0 0 28px ${theme.accent}20`:`0 4px 16px ${cfg?.color}18`,
                        position:"relative",overflow:"hidden",padding:0}}>
                      {isHub
                        ?<img src="/logo.png" alt="StepUp SDG" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%",position:"absolute",inset:0}}/>
                        :cfg&&<span style={{color:cfg.color}}><cfg.IconEl className="w-6 h-6"/></span>
                      }
                    </motion.div>
                    <div>
                      <div className="text-[13px] font-bold" style={{color:isHub?theme.accent:theme.text}}>{node.title}</div>
                      <div className="mt-0.5 text-[11px] leading-snug" style={{color:theme.muted}}>{node.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── PARTNER DIRECTORY ── */}
      <section id="directory" className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`}}>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2" style={{color:theme.muted}}>
                <motion.span animate={{scale:searchFocused?1.1:1}} transition={{duration:0.2}}><Icon.Search className="w-3.5 h-3.5"/></motion.span>
              </span>
              <input type="text" placeholder="Search by name or city..." value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)}
                className="glass-input rounded-xl py-2.5 pl-[38px] pr-4 text-[13px] w-[280px]"
                style={{background:theme.card,border:`1.5px solid ${searchFocused?theme.accent:theme.border}`,color:theme.text,
                  boxShadow:searchFocused?`0 0 0 3px ${theme.accent}15`:"none"}}/>
            </div>
            <div className="relative flex rounded-xl p-1" style={{background:theme.sectionAlt,border:`1px solid ${theme.border}`}}>
              {tabs.map(tab=>{
                const isActive=activeTab===tab;
                return (
                  <button key={tab} onClick={()=>setActiveTab(tab)}
                    className="segmented-tab relative rounded-lg px-4 py-1.5 text-[13px] font-medium z-10"
                    style={{color:isActive?(isDark?"#fff":"#0d1829"):theme.muted}}>
                    {isActive&&<motion.span layoutId="tab-indicator" className="absolute inset-0 rounded-lg z-0"
                      style={{background:isDark?theme.card:"#ffffff",border:`1px solid ${theme.border}`,boxShadow:"0 1px 4px rgba(0,0,0,0.12)"}}
                      transition={{type:"spring",stiffness:500,damping:35}}/>}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>
        {filtered.length===0?(
          <div className="rounded-2xl py-24 text-center text-sm" style={{border:`1px dashed ${theme.border}`,color:theme.muted}}>
            No partners found for &ldquo;{searchQuery}&rdquo;
          </div>
        ):(
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((partner,idx)=>(
                <motion.div key={partner.id} layout initial={{opacity:0,scale:0.94,y:16}}
                  animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.94}}
                  transition={{duration:0.35,delay:idx*0.04,ease:"easeOut"}}>
                  <PartnerCard partner={partner} onSelect={()=>setSelected(partner)} theme={theme} isDark={isDark}/>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ── LOGO MARQUEE ── */}
      <section className="py-12" style={{borderBottom:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <Reveal>
          <p className="text-center text-[10px] font-semibold uppercase tracking-widest mb-8 px-6" style={{color:theme.dim}}>
            Organizations in our ecosystem
          </p>
        </Reveal>
        <EcosystemLogoMarquee theme={theme} isDark={isDark}/>
      </section>

      {/* ── PARTNER WITH US ── */}
      <section id="partner-form" className="relative overflow-hidden px-6 md:px-10 py-20"
        style={{borderTop:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <div aria-hidden className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{background:`${theme.accent}08`}}/>
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Join the ecosystem</p>
            <h2 className="text-[34px] md:text-[44px] font-black tracking-[-0.03em] mb-4" style={{color:theme.text}}>Partner with StepUp SDG</h2>
            <p className="mx-auto max-w-[480px] text-[15px] leading-relaxed" style={{color:theme.muted}}>
              Whether you&apos;re a company with a CSR mandate, a school with motivated students, or an NGO with a program to scale — there&apos;s a place for you here.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 mb-6 md:grid-cols-3">
          {audienceCards.map((card,idx)=>{
            const cfg=typeConfig[card.type];
            return (
              <Reveal key={card.title} delay={idx*0.08}>
                <motion.div whileHover={{y:-4}} className="rounded-[20px] p-7 h-full"
                  style={{background:theme.card,border:`1px solid ${theme.border}`}}>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border"
                    style={{background:cfg.gradient,borderColor:cfg.border,color:cfg.color}}>
                    <cfg.IconEl className="w-5 h-5"/>
                  </div>
                  <div className="mb-4 text-[15px] font-bold tracking-tight" style={{color:theme.text}}>{card.title}</div>
                  <ul className="flex flex-col gap-3">
                    {card.benefits.map(b=>(
                      <li key={b} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{color:theme.muted}}>
                        <Icon.Check className="mt-0.5 w-3.5 h-3.5 shrink-0" style={{color:theme.accent}}/>{b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mb-6 rounded-[20px] p-7" style={{background:theme.card,border:`1px solid ${theme.border}`}}>
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-5" style={{color:theme.muted}}>Partnership models</p>
            <div className="grid gap-3.5 md:grid-cols-3">
              {[{IconEl:Icon.BarChart,...partnershipModels[0]},{IconEl:Icon.Handshake,...partnershipModels[1]},{IconEl:Icon.Megaphone,...partnershipModels[2]}].map(m=>(
                <motion.div key={m.title} whileHover={{y:-2}} className="rounded-[14px] p-5"
                  style={{background:theme.pageBg,border:`1px solid ${theme.border}`}}>
                  <span style={{color:theme.accent}}><m.IconEl className="w-4 h-4"/></span>
                  <div className="mb-1.5 mt-3 text-[13px] font-semibold" style={{color:theme.text}}>{m.title}</div>
                  <div className="text-[12px] leading-relaxed" style={{color:theme.muted}}>{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto grid max-w-3xl overflow-hidden rounded-[24px] md:grid-cols-[0.85fr_1.15fr]"
            style={{border:`1px solid ${theme.accent}25`,background:theme.card,boxShadow:`0 0 60px ${theme.accent}06`}}>
            <div className="flex flex-col justify-between gap-8 p-8"
              style={{background:theme.pageBg,borderRight:`1px solid ${theme.border}`}}>
              <div>
                <h3 className="mb-2.5 text-[18px] font-bold tracking-tight" style={{color:theme.text}}>Start a conversation</h3>
                <p className="text-[13px] leading-relaxed" style={{color:theme.muted}}>
                  Join 260+ schools, NGOs, universities, and companies already building toward the SDGs together.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {[{Ico:Icon.Clock,text:"We respond within 2 business days"},{Ico:Icon.Shield,text:"No commitment required to start"},{Ico:Icon.Lock,text:"Your details are never shared"}].map(({Ico,text})=>(
                  <div key={text} className="flex items-center gap-2.5 text-[12px]" style={{color:theme.muted}}>
                    <Ico className="w-3.5 h-3.5 shrink-0" style={{color:theme.accent}}/>{text}
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.dim}}>Already on board</p>
                <div className="flex -space-x-2">
                  {partners.slice(0,5).map(p=>(
                    <div key={p.id} className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                      style={{background:typeConfig[p.type].bg,color:typeConfig[p.type].color,borderColor:theme.pageBg}} title={p.name}>
                      {p.initials}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {submitted?(
                  <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                    className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400,damping:20,delay:0.1}}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                      style={{background:"rgba(34,197,94,0.12)",border:"1.5px solid rgba(34,197,94,0.3)"}}>
                      <Icon.Check className="w-6 h-6" style={{color:"#22c55e"}}/>
                    </motion.div>
                    <h3 className="mb-2 text-[18px] font-bold" style={{color:theme.text}}>Application sent</h3>
                    <p className="max-w-[260px] text-[13px]" style={{color:theme.muted}}>
                      Thanks, {form.name||"there"} — we&apos;ll reach out within 2 business days.
                    </p>
                  </motion.div>
                ):(
                  <motion.form key="form" onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="flex flex-col gap-4">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Full Name</label>
                      <input required type="text" placeholder="Your name" value={form.name} onChange={e=>updateForm("name",e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={{background:theme.inputBg,border:`1.5px solid ${theme.border}`,color:theme.text}}/>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Type</label>
                      <select value={form.type} onChange={e=>updateForm("type",e.target.value)}
                        className="glass-input w-full rounded-xl px-3 py-2.5 text-[13px]"
                        style={{background:theme.inputBg,border:`1.5px solid ${theme.border}`,color:form.type?theme.text:theme.muted}}>
                        <option value="">Select</option>
                        {["Company","School","NGO","University"].map(o=><option key={o} style={{background:theme.card}}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Organization Name</label>
                      <input required type="text" placeholder="Your organization" value={form.organization} onChange={e=>updateForm("organization",e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={{background:theme.inputBg,border:`1.5px solid ${theme.border}`,color:theme.text}}/>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Work email</label>
                      <input required type="email" placeholder="you@organization.com" value={form.email} onChange={e=>updateForm("email",e.target.value)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={{background:theme.inputBg,border:`1.5px solid ${theme.border}`,color:theme.text}}/>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>WhatsApp Number</label>
                      <div className="flex rounded-xl overflow-visible" style={{border:`1.5px solid ${theme.border}`,background:theme.inputBg}}>
                        <div ref={dialRef} className="relative shrink-0" style={{borderRight:`1.5px solid ${theme.border}`}}>
                          <button type="button" onClick={()=>setDialOpen(o=>!o)}
                            className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold focus:outline-none w-[100px]"
                            style={{color:theme.text}}>
                            <span>{currentDial?.flag??"🌐"}</span>
                            <span>{dialCode}</span>
                            <svg className="w-3 h-3 ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color:theme.muted}}><polyline points="6 9 12 15 18 9"/></svg>
                          </button>
                          {dialOpen&&(
                            <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-[200px] rounded-xl overflow-hidden shadow-2xl"
                              style={{background:theme.card,border:`1px solid ${theme.border}`}}>
                              {DIALS.map(c=>(
                                <button key={c.code} type="button" onClick={()=>{setDialCode(c.code);setDialOpen(false);}}
                                  className="flex w-full items-center gap-2.5 px-3 py-2 text-[12px] transition-opacity hover:opacity-70"
                                  style={{background:dialCode===c.code?`${theme.accent}15`:"transparent",color:dialCode===c.code?theme.accent:theme.text}}>
                                  <span className="text-[16px]">{c.flag}</span>
                                  <span className="flex-1 text-left">{c.label}</span>
                                  <span className="font-semibold text-[11px]" style={{color:theme.muted}}>{c.code}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <input type="tel" placeholder="00000 00000" value={form.budget} onChange={e=>updateForm("budget",e.target.value)}
                          className="flex-1 px-4 py-2.5 text-[13px] bg-transparent focus:outline-none" style={{color:theme.text}}/>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>How do you want to collaborate?</label>
                      <textarea rows={3} placeholder="Tell us about your SDG goals..." value={form.message} onChange={e=>updateForm("message",e.target.value)}
                        className="glass-input w-full resize-none rounded-xl px-4 py-2.5 text-[13px]"
                        style={{background:theme.inputBg,border:`1.5px solid ${theme.border}`,color:theme.text}}/>
                    </div>
                    <motion.button type="submit" whileHover={{scale:1.01,y:-1}} whileTap={{scale:0.99}}
                      className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold"
                      style={{background:`linear-gradient(135deg,${theme.accent},#0284c7)`,color:"#fff",boxShadow:`0 4px 20px ${theme.accent}35`}}>
                      Send partnership request <Icon.Arrow/>
                    </motion.button>
                    <p className="text-center text-[11px]" style={{color:theme.muted}}>
                      By submitting you agree to our <a href="#" style={{color:theme.accent}}>partnership terms</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedPartner&&<PartnerModal partner={selectedPartner} onClose={()=>setSelected(null)} theme={theme} isDark={isDark}/>}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="px-6 md:px-10 pb-10 pt-14" style={{background:theme.footer,borderTop:`1px solid ${theme.border}`}}>
        <div className="mb-10 grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{background:`${theme.accent}15`,border:`1px solid ${theme.accent}30`}}>
                <img src="/logo.png" alt="StepUp SDG" className="h-5 w-5 object-contain"/>
              </div>
              <div className="font-black text-[14px] tracking-tight">
                <span style={{color:theme.accent}}>STEPUP</span>
                <span style={{color:theme.accentRed}}> FOR SDG</span>
              </div>
            </div>
            <p className="mb-5 text-[12px] leading-relaxed" style={{color:theme.muted}}>
              India&apos;s growing SDG partnership ecosystem connecting schools, NGOs, universities, and companies for real, measurable impact.
            </p>
            <div className="flex -space-x-2">
              {partners.slice(0,6).map(p=>(
                <div key={p.id} className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold"
                  style={{background:typeConfig[p.type].bg,color:typeConfig[p.type].color,borderColor:theme.footer}} title={p.name}>
                  {p.initials}
                </div>
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 text-[9px] font-bold"
                style={{background:theme.border,color:theme.muted,borderColor:theme.footer}}>+254</div>
            </div>
          </div>
          {[
            {title:"Pages",     links:["Home","About Us","SDG Goals","Partners","Contact"]},
            {title:"Ecosystem", links:["Schools","NGOs","Companies","Universities","Become a partner"]},
            {title:"Contact",   links:["hello@stepupsdg.in","+91 98765 43210","Hyderabad, Telangana"]},
          ].map(col=>(
            <div key={col.title}>
              <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest" style={{color:theme.dim}}>{col.title}</div>
              {col.links.map(l=>(
                <div key={l} className="mb-2.5">
                  <a href="#" className="text-[12px] transition-opacity hover:opacity-100" style={{color:theme.muted,opacity:0.7}}>{l}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 pt-6 md:flex-row"
          style={{borderTop:`1px solid ${theme.border}`}}>
          <span className="text-[11px]" style={{color:theme.dim}}>© 2026 StepUp for SDG. All rights reserved.</span>
          <div className="flex gap-2">
            {["English","Telugu","Hindi"].map(lang=>(
              <motion.button key={lang} whileHover={{scale:1.03}}
                className="rounded-lg border px-3 py-1 text-[11px] transition-opacity hover:opacity-100"
                style={{borderColor:theme.border,color:theme.dim,opacity:0.6}}>{lang}</motion.button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}