"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";

/* ─── GLOBAL STYLES ───────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes mesh-move {
    0%, 100% { opacity: 0.4; transform: scale(1) translate(0,0); }
    33%       { opacity: 0.6; transform: scale(1.05) translate(-20px,10px); }
    66%       { opacity: 0.5; transform: scale(0.98) translate(15px,-8px); }
  }
  @keyframes shimmer-bg {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes float-a {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-8px); }
  }
  @keyframes float-b {
    0%,100% { transform: translateY(0px); }
    50%     { transform: translateY(-12px); }
  }
  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50%     { opacity:0.5; transform:scale(0.75); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(250%) skewX(-12deg); }
  }
  @keyframes count-up { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }

  .mesh-blob   { animation: mesh-move 12s ease-in-out infinite; }
  .mesh-blob-2 { animation: mesh-move 16s ease-in-out infinite reverse; }
  .mesh-blob-3 { animation: mesh-move 20s ease-in-out infinite 4s; }
  .float-a     { animation: float-a 3.4s ease-in-out infinite; }
  .float-b     { animation: float-b 4.2s ease-in-out infinite 0.8s; }
  .pulse-dot   { animation: pulse-dot 2s ease-in-out infinite; }

  .glass-input { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .glass-input:focus { outline: none; }

  .shine-sweep::after {
    content:''; position:absolute; inset:0;
    background: linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.06) 50%, transparent 65%);
    transform: translateX(-100%) skewX(-12deg);
    pointer-events:none; border-radius:inherit;
  }
  .shine-sweep:hover::after { animation: shimmer 0.7s ease forwards; }

  .theme-transition * {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
  }

  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.1); border-radius:3px; }

  .gradient-text-hero {
    background-image: linear-gradient(135deg,#0ea5c9,#818cf8);
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
  }
  .role-card-hover { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
  .role-card-hover:hover { transform: translateY(-3px); }

  .step-line { position:absolute; top:28px; left:calc(50% + 28px); right:calc(-50% + 28px); height:1px; }

  .sdg-pill {
    transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
    cursor: pointer; user-select: none;
  }
  .sdg-pill:hover { transform: translateY(-1px); }
`;

/* ─── THEMES ──────────────────────────────────────────────────────────────── */
const DARK = {
  pageBg:"#060a10", sectionAlt:"#070c14", card:"#0d1625", cardHover:"#101c2e", footer:"#040810",
  border:"#1a2537", borderSubtle:"#111b28", text:"#f0f4f8", textSub:"#c8d4e0",
  muted:"#6b8099", dim:"#3d5166",
  accent:"#0ea5c9", accentGlow:"rgba(14,165,201,0.2)",
  accentRed:"#ef4444", inputBg:"#080f1a",
  glass:"rgba(13,22,37,0.82)", glassBorder:"rgba(14,165,201,0.2)",
  glow:"rgba(14,165,201,0.15)", overlay:"rgba(4,8,16,0.88)",
  gridLine:"rgba(255,255,255,0.03)",
  meshA:"rgba(14,165,201,0.12)", meshB:"rgba(99,102,241,0.08)", meshC:"rgba(16,185,129,0.06)",
};
const LIGHT = {
  pageBg:"#fafbfd", sectionAlt:"#f3f6fa", card:"#ffffff", cardHover:"#fafcff", footer:"#111827",
  border:"#e1e8f0", borderSubtle:"#edf2f7", text:"#0d1829", textSub:"#374151",
  muted:"#6b7280", dim:"#9ca3af",
  accent:"#0284c7", accentGlow:"rgba(2,132,199,0.15)",
  accentRed:"#dc2626", inputBg:"#f8fafc",
  glass:"rgba(255,255,255,0.92)", glassBorder:"rgba(2,132,199,0.2)",
  glow:"rgba(2,132,199,0.08)", overlay:"rgba(0,0,0,0.75)",
  gridLine:"rgba(0,0,0,0.025)",
  meshA:"rgba(2,132,199,0.06)", meshB:"rgba(99,102,241,0.04)", meshC:"rgba(16,185,129,0.03)",
};
type T = typeof DARK;

/* ─── VOLUNTEER ROLES ─────────────────────────────────────────────────────── */
interface VolRole {
  id: string; title: string; tagline: string; description: string;
  commitment: string; skills: string[];
  color: string; bg: string; border: string; gradient: string;
  IconEl: (p:{className?:string;style?:React.CSSProperties})=>JSX.Element;
}

const ROLES: VolRole[] = [
  {
    id:"facilitator", title:"SDG Workshop Facilitator", tagline:"Bring SDGs to life in classrooms",
    description:"Design and deliver hands-on workshops at partner schools. You'll guide students through real-world SDG challenges using StepUp's curriculum framework.",
    commitment:"4–6 hrs / week", skills:["Public speaking","Curriculum design","Empathy"],
    color:"#34d399", bg:"rgba(16,185,129,0.08)", border:"rgba(52,211,153,0.25)",
    gradient:"linear-gradient(135deg,rgba(16,185,129,0.12) 0%,rgba(6,182,212,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    id:"content", title:"Content Creator", tagline:"Make SDGs impossible to ignore",
    description:"Write blogs, design infographics, and create social content that translates the UN's goals into stories students and partners actually want to read.",
    commitment:"3–5 hrs / week", skills:["Writing","Design","Social media"],
    color:"#f87171", bg:"rgba(248,113,113,0.08)", border:"rgba(248,113,113,0.25)",
    gradient:"linear-gradient(135deg,rgba(248,113,113,0.1) 0%,rgba(251,146,60,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    id:"tech", title:"Tech & Web Volunteer", tagline:"Build the infrastructure for impact",
    description:"Help develop dashboards, data tools, and platform features. From React components to backend APIs, your code directly supports how partners track SDG progress.",
    commitment:"5–8 hrs / week", skills:["React","Node.js","UI/UX"],
    color:"#818cf8", bg:"rgba(129,140,248,0.08)", border:"rgba(129,140,248,0.25)",
    gradient:"linear-gradient(135deg,rgba(129,140,248,0.1) 0%,rgba(99,102,241,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    id:"events", title:"Event Coordinator", tagline:"Turn ideas into real gatherings",
    description:"Organise SDG summits, partner meetups, and school events end-to-end — from logistics and outreach to day-of coordination and post-event reporting.",
    commitment:"6–10 hrs / week (event weeks)", skills:["Logistics","Communication","Problem-solving"],
    color:"#fbbf24", bg:"rgba(251,191,36,0.08)", border:"rgba(251,191,36,0.25)",
    gradient:"linear-gradient(135deg,rgba(251,191,36,0.1) 0%,rgba(249,115,22,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id:"research", title:"Research & Data Analyst", tagline:"Turn numbers into actionable insight",
    description:"Collect, clean, and visualise impact data across StepUp's school and partner network. Help us measure what's working and publish findings that attract future partners.",
    commitment:"4–6 hrs / week", skills:["Data analysis","Excel/Python","Report writing"],
    color:"#38bdf8", bg:"rgba(56,189,248,0.08)", border:"rgba(56,189,248,0.25)",
    gradient:"linear-gradient(135deg,rgba(56,189,248,0.1) 0%,rgba(99,102,241,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
  },
  {
    id:"outreach", title:"Community Outreach Lead", tagline:"Grow the ecosystem one handshake at a time",
    description:"Identify and approach potential partner schools, NGOs, and companies. Build relationships, conduct initial calls, and hand off warm leads to StepUp's partnership team.",
    commitment:"3–5 hrs / week", skills:["Networking","Negotiation","CRM tools"],
    color:"#e879f9", bg:"rgba(232,121,249,0.08)", border:"rgba(232,121,249,0.25)",
    gradient:"linear-gradient(135deg,rgba(232,121,249,0.1) 0%,rgba(129,140,248,0.06) 100%)",
    IconEl:({className="w-5 h-5",style})=>(
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

/* ─── SDG GOALS ───────────────────────────────────────────────────────────── */
const SDG_GOALS = [
  {n:1,label:"No Poverty"},{n:2,label:"Zero Hunger"},{n:3,label:"Good Health"},
  {n:4,label:"Quality Education"},{n:5,label:"Gender Equality"},{n:6,label:"Clean Water"},
  {n:7,label:"Clean Energy"},{n:8,label:"Decent Work"},{n:9,label:"Industry & Innovation"},
  {n:10,label:"Reduced Inequalities"},{n:11,label:"Sustainable Cities"},{n:12,label:"Responsible Consumption"},
  {n:13,label:"Climate Action"},{n:14,label:"Life Below Water"},{n:15,label:"Life on Land"},
  {n:16,label:"Peace & Justice"},{n:17,label:"Partnerships"},
];

/* ─── HOW IT WORKS ────────────────────────────────────────────────────────── */
const STEPS = [
  { n:"01", title:"Apply in 3 minutes", desc:"Fill in the form below. No CV needed — just tell us what excites you." },
  { n:"02", title:"Quick intro call",   desc:"A 20-minute chat with our volunteer coordinator, usually within 3 days." },
  { n:"03", title:"Onboarding kit",     desc:"You receive a role guide, access to our tools, and a buddy volunteer." },
  { n:"04", title:"Start making waves", desc:"Join your first project or workshop within your first two weeks." },
];

/* ─── IMPACT STATS ────────────────────────────────────────────────────────── */
const IMPACT = [
  { value:"1,200+", label:"Volunteer hours logged this year"  },
  { value:"48",     label:"Active volunteers right now"       },
  { value:"6",      label:"States reached through volunteers" },
  { value:"94%",    label:"Would recommend volunteering here" },
];

/* ─── ICONS ───────────────────────────────────────────────────────────────── */
const Icon = {
  Sun:({className="w-4 h-4"}:{className?:string})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon:({className="w-4 h-4"}:{className?:string})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Arrow:({className="w-4 h-4"}:{className?:string})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Check:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Globe:({className="w-3 h-3",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Clock:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/>
    </svg>
  ),
  Shield:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/>
    </svg>
  ),
  MapPin:({className="w-3 h-3"}:{className?:string})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Lock:({className="w-3.5 h-3.5",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  X:({className="w-4 h-4"}:{className?:string})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Zap:({className="w-4 h-4",style}:{className?:string;style?:React.CSSProperties})=>(
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
};

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────────── */
function Reveal({children, delay=0}:{children:React.ReactNode;delay?:number}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once:true, margin:"-60px"});
  return (
    <motion.div ref={ref} initial={{opacity:0,y:24}}
      animate={isInView?{opacity:1,y:0}:{}}
      transition={{duration:0.55,delay,ease:[0.21,0.47,0.32,0.98]}}>
      {children}
    </motion.div>
  );
}

/* ─── ANIMATED COUNTER ────────────────────────────────────────────────────── */
function AnimCounter({value,theme}:{value:string;theme:T}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref,{once:true,margin:"-50px"});
  const [display, setDisplay] = useState("0");
  useEffect(()=>{
    if(!isInView) return;
    const num = parseFloat(value.replace(/[^0-9.]/g,""));
    if(isNaN(num)){setDisplay(value);return;}
    const suffix = value.replace(/[0-9,]/g,"");
    const prefix = value.match(/^[^0-9]*/)?.[0]??"";
    const dur=1400; const start=performance.now();
    const tick=(now:number)=>{
      const t=Math.min((now-start)/dur,1);
      const eased=1-Math.pow(1-t,3);
      const cur=eased*num;
      const formatted = num>=1000 ? Math.round(cur).toLocaleString() : num<100 ? cur.toFixed(0) : Math.round(cur).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);
      if(t<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },[isInView,value]);
  return <span ref={ref} style={{color:theme.text}}>{display}</span>;
}

/* ─── ROLE CARD ───────────────────────────────────────────────────────────── */
function RoleCard({role,selected,onSelect,theme}:{role:VolRole;selected:boolean;onSelect:()=>void;theme:T}) {
  return (
    <motion.div
      onClick={onSelect}
      whileHover={{y:-3}}
      whileTap={{scale:0.98}}
      className="relative cursor-pointer rounded-[20px] p-5 shine-sweep overflow-hidden"
      style={{
        background: selected ? role.gradient : theme.card,
        border:`1.5px solid ${selected ? role.border : theme.border}`,
        boxShadow: selected ? `0 8px 32px ${role.color}18` : "none",
        transition:"border-color 0.2s,box-shadow 0.2s,background 0.2s",
      }}>
      {selected && (
        <motion.div initial={{scale:0}} animate={{scale:1}}
          className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full"
          style={{background:role.color}}>
          <Icon.Check className="w-2.5 h-2.5" style={{color:"#fff"}}/>
        </motion.div>
      )}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{background:role.bg, border:`1px solid ${role.border}`, color:role.color}}>
        <role.IconEl className="w-5 h-5"/>
      </div>
      <div className="mb-1 text-[14px] font-bold tracking-tight" style={{color:theme.text}}>{role.title}</div>
      <div className="mb-3 text-[11px] leading-snug" style={{color:role.color}}>{role.tagline}</div>
      <div className="text-[11px] leading-relaxed mb-3" style={{color:theme.muted}}>{role.description}</div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {role.skills.map(s=>(
          <span key={s} className="rounded-md px-2 py-0.5 text-[10px] font-medium"
            style={{background:role.bg, color:role.color, border:`1px solid ${role.border}`}}>{s}</span>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-[10px]" style={{color:theme.dim}}>
        <Icon.Clock className="w-3 h-3" style={{color:theme.muted}}/>
        {role.commitment}
      </div>
    </motion.div>
  );
}

/* ─── FORM STATE ──────────────────────────────────────────────────────────── */
interface VolForm {
  name:string; email:string; phone:string;
  role:string; city:string; college:string;
  sdgs:number[]; availability:string; motivation:string; linkedin:string;
}
const EMPTY:VolForm = {name:"",email:"",phone:"",role:"",city:"",college:"",sdgs:[],availability:"",motivation:"",linkedin:""};

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
export default function VolunteerPage() {
  const [isDark, setIsDark]     = useState(true);
  const [mounted, setMounted]   = useState(false);
  const [form, setForm]         = useState<VolForm>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [dialCode, setDialCode] = useState("+91");
  const [dialOpen, setDialOpen] = useState(false);
  const [focusedField, setFocused] = useState<string|null>(null);
  const theme:T = isDark ? DARK : LIGHT;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const saved = localStorage.getItem("stepup-theme");
    if(saved) setIsDark(saved==="dark");
    setMounted(true);
  },[]);

  useEffect(()=>{
    const handler=(e:MouseEvent)=>{
      if(dialRef.current && !dialRef.current.contains(e.target as Node)) setDialOpen(false);
    };
    document.addEventListener("mousedown",handler);
    return ()=>document.removeEventListener("mousedown",handler);
  },[]);

  const handleHeroMouseMove = useCallback((e:React.MouseEvent)=>{
    if(!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseX.set(e.clientX-rect.left); mouseY.set(e.clientY-rect.top);
  },[mouseX,mouseY]);

  function upd<K extends keyof VolForm>(key:K,val:VolForm[K]) {
    setForm(prev=>({...prev,[key]:val}));
  }
  function toggleSDG(n:number) {
    setForm(prev=>({...prev, sdgs: prev.sdgs.includes(n) ? prev.sdgs.filter(x=>x!==n) : [...prev.sdgs,n]}));
  }

  const selectedRole = ROLES.find(r=>r.id===form.role);

  const DIALS = [
    {code:"+91",flag:"🇮🇳",label:"India"},{code:"+1",flag:"🇺🇸",label:"USA"},
    {code:"+44",flag:"🇬🇧",label:"UK"},{code:"+971",flag:"🇦🇪",label:"UAE"},
    {code:"+65",flag:"🇸🇬",label:"Singapore"},{code:"+61",flag:"🇦🇺",label:"Australia"},
    {code:"+49",flag:"🇩🇪",label:"Germany"},{code:"+33",flag:"🇫🇷",label:"France"},
    {code:"+81",flag:"🇯🇵",label:"Japan"},{code:"+86",flag:"🇨🇳",label:"China"},
    {code:"+880",flag:"🇧🇩",label:"Bangladesh"},{code:"+92",flag:"🇵🇰",label:"Pakistan"},
    {code:"+94",flag:"🇱🇰",label:"Sri Lanka"},{code:"+977",flag:"🇳🇵",label:"Nepal"},
  ];
  const currentDial = DIALS.find(d=>d.code===dialCode);

  function inputStyle(field:string) {
    return {
      background:theme.inputBg,
      border:`1.5px solid ${focusedField===field ? theme.accent : theme.border}`,
      color:theme.text,
      boxShadow: focusedField===field ? `0 0 0 3px ${theme.accent}15` : "none",
    };
  }

  return (
    <div className="min-h-screen theme-transition"
      style={{background:theme.pageBg, color:theme.text, fontFamily:"'Inter',system-ui,sans-serif"}}>
      <style>{GLOBAL_STYLES}</style>

      {/* ── HERO ── */
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        className="relative overflow-hidden px-6 md:px-10 py-24 md:py-32"
        style={{borderBottom:`1px solid ${theme.border}`}}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="mesh-blob absolute rounded-full blur-[120px]"
            style={{width:600,height:600,top:"-15%",left:"-10%",background:theme.meshA}}/>
          <div className="mesh-blob-2 absolute rounded-full blur-[100px]"
            style={{width:400,height:400,top:"20%",right:"-5%",background:theme.meshB}}/>
          <div className="mesh-blob-3 absolute rounded-full blur-[80px]"
            style={{width:300,height:300,bottom:"5%",left:"40%",background:theme.meshC}}/>
        </div>
        <div className="pointer-events-none absolute inset-0" aria-hidden style={{
          backgroundImage:`linear-gradient(${theme.gridLine} 1px,transparent 1px),linear-gradient(90deg,${theme.gridLine} 1px,transparent 1px)`,
          backgroundSize:"48px 48px",
        }}/>
        <motion.div className="pointer-events-none absolute rounded-full blur-[80px] opacity-30" aria-hidden
          style={{
            width:400,height:400,
            x:useTransform(mouseX,v=>v-200),
            y:useTransform(mouseY,v=>v-200),
            background:`radial-gradient(circle,${theme.accent}40,transparent 70%)`,
          }}/>

        {/* Hero content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold"
              style={{background:`${theme.accent}12`,border:`1px solid ${theme.accent}30`,color:theme.accent}}>
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full" style={{background:theme.accent}}/>
              Volunteer Applications Open · 2026
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mb-5 text-[40px] md:text-[58px] font-black leading-[1.08] tracking-[-0.03em]">
              <span style={{color:theme.text}}>Show up for </span>
              <span className="gradient-text-hero">the Goals.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mx-auto mb-8 max-w-[480px] text-[16px] leading-relaxed" style={{color:theme.muted}}>
              Join StepUp for SDG as a volunteer. Real projects, real schools, real impact — flexible, remote-friendly, and actually meaningful.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.a href="#roles" whileHover={{scale:1.03,y:-1}} whileTap={{scale:0.97}}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-bold"
                style={{background:`linear-gradient(135deg,${theme.accent},#0284c7)`,color:"#fff",boxShadow:`0 4px 20px ${theme.accent}35`}}>
                Browse open roles <Icon.Arrow/>
              </motion.a>
              <motion.a href="#volunteer-form" whileHover={{scale:1.03,y:-1}} whileTap={{scale:0.97}}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold"
                style={{border:`1.5px solid ${theme.border}`,color:theme.textSub,background:"transparent"}}>
                Apply now
              </motion.a>
            </div>
          </Reveal>
          {/* Impact stats strip */}
          <Reveal delay={0.28}>
            <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
              {IMPACT.map(stat=>(
                <div key={stat.label} className="rounded-2xl p-4 text-center"
                  style={{background:theme.card,border:`1px solid ${theme.border}`}}>
                  <div className="text-[22px] font-black tracking-tight">
                    <AnimCounter value={stat.value} theme={theme}/>
                  </div>
                  <div className="mt-1 text-[10px] leading-snug" style={{color:theme.muted}}>{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>{/* ── END HERO ── */}

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Simple process</p>
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight" style={{color:theme.text}}>From application to impact in two weeks</h2>
          </div>
        </Reveal>
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4 max-w-4xl mx-auto">
          {STEPS.map((step,i)=>(
            <Reveal key={step.n} delay={i*0.08}>
              <div className="relative flex flex-col items-center text-center">
                {i<STEPS.length-1 && (
                  <div className="hidden md:block step-line" style={{background:`linear-gradient(90deg,${theme.accent}40,${theme.border})`}}/>
                )}
                <motion.div whileHover={{scale:1.06}} className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{background:`${theme.accent}12`,border:`2px solid ${theme.accent}30`}}>
                  <span className="text-[13px] font-black" style={{color:theme.accent}}>{step.n}</span>
                </motion.div>
                <div className="text-[14px] font-bold mb-2" style={{color:theme.text}}>{step.title}</div>
                <div className="text-[12px] leading-relaxed" style={{color:theme.muted}}>{step.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ROLES ── */}
      <section id="roles" className="px-6 md:px-10 py-16" style={{borderBottom:`1px solid ${theme.border}`}}>
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Open positions</p>
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight" style={{color:theme.text}}>Find your role in the movement</h2>
            <p className="mt-2 text-sm max-w-md mx-auto" style={{color:theme.muted}}>Every skill set has a place. Pick the role that matches what you love doing.</p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role,i)=>(
            <Reveal key={role.id} delay={i*0.06}>
              <RoleCard role={role} selected={form.role===role.id}
                onSelect={()=>{upd("role",form.role===role.id?"":role.id); document.getElementById("volunteer-form")?.scrollIntoView({behavior:"smooth",block:"start"});}}
                theme={theme}/>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── VOLUNTEER FORM ── */}
      <section id="volunteer-form" className="relative overflow-hidden px-6 md:px-10 py-20"
        style={{borderTop:`1px solid ${theme.border}`,background:theme.sectionAlt}}>
        <div aria-hidden className="pointer-events-none absolute -bottom-48 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{background:`${theme.accent}08`}}/>
        <Reveal>
          <div className="text-center mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Apply now</p>
            <h2 className="text-[34px] md:text-[44px] font-black tracking-[-0.03em] mb-4" style={{color:theme.text}}>Ready to show up for the goals?</h2>
            <p className="mx-auto max-w-[460px] text-[15px] leading-relaxed" style={{color:theme.muted}}>
              Tell us about yourself — no CV required. We respond within 2 business days.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto grid max-w-3xl overflow-hidden rounded-[24px] md:grid-cols-[0.85fr_1.15fr]"
            style={{border:`1px solid ${theme.accent}25`,background:theme.card,boxShadow:`0 0 60px ${theme.accent}06`}}>

            {/* LEFT PANEL */}
            <div className="flex flex-col justify-between gap-8 p-8"
              style={{background:theme.pageBg,borderRight:`1px solid ${theme.border}`}}>
              <div>
                <h3 className="mb-2.5 text-[18px] font-bold tracking-tight" style={{color:theme.text}}>Why volunteer with us?</h3>
                <p className="text-[13px] leading-relaxed" style={{color:theme.muted}}>
                  Real projects, real students, real impact — not busy work. You&apos;ll be credited on every output you contribute to.
                </p>
              </div>
              <ul className="flex flex-col gap-3.5">
                {[
                  "Letter of recommendation after 3 months",
                  "SDG Volunteer certification (verifiable)",
                  "Network with 260+ partner organisations",
                  "Flexible hours — fully remote-friendly",
                  "Direct mention in our annual impact report",
                ].map(b=>(
                  <li key={b} className="flex items-start gap-2.5 text-[12px] leading-snug" style={{color:theme.muted}}>
                    <Icon.Check className="mt-0.5 w-3.5 h-3.5 shrink-0" style={{color:theme.accent}}/>{b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3">
                {[
                  {Ico:Icon.Clock,  text:"We respond within 2 business days"},
                  {Ico:Icon.Shield, text:"No commitment required to start"},
                  {Ico:Icon.Lock,   text:"Your details are never shared"},
                ].map(({Ico,text})=>(
                  <div key={text} className="flex items-center gap-2.5 text-[12px]" style={{color:theme.muted}}>
                    <Ico className="w-3.5 h-3.5 shrink-0" style={{color:theme.accent}}/>{text}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT PANEL — FORM */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
                    className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <motion.div initial={{scale:0}} animate={{scale:1}}
                      transition={{type:"spring",stiffness:400,damping:20,delay:0.1}}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                      style={{background:"rgba(34,197,94,0.12)",border:"1.5px solid rgba(34,197,94,0.3)"}}>
                      <Icon.Check className="w-6 h-6" style={{color:"#22c55e"}}/>
                    </motion.div>
                    <h3 className="mb-2 text-[18px] font-bold" style={{color:theme.text}}>Application received!</h3>
                    <p className="max-w-[260px] text-[13px]" style={{color:theme.muted}}>
                      Thanks, {form.name||"there"} — we&apos;ll be in touch within 2 business days about your{selectedRole?" "+selectedRole.title+" role":""}.
                    </p>
                  </motion.div>
                ):(
                  <motion.form key="form" onSubmit={e=>{e.preventDefault();setSubmitted(true);}} className="flex flex-col gap-4">

                    {/* Full Name */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Full Name</label>
                      <input required type="text" placeholder="Your name" value={form.name}
                        onChange={e=>upd("name",e.target.value)}
                        onFocus={()=>setFocused("name")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("name")}/>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>
                        Volunteer Role {form.role && <span style={{color:theme.accent}}>· selected ✓</span>}
                      </label>
                      <select required value={form.role} onChange={e=>upd("role",e.target.value)}
                        onFocus={()=>setFocused("role")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-3 py-2.5 text-[13px]"
                        style={{...inputStyle("role"),color:form.role?theme.text:theme.muted}}>
                        <option value="">Choose a role</option>
                        {ROLES.map(r=><option key={r.id} value={r.id} style={{background:theme.card}}>{r.title}</option>)}
                      </select>
                    </div>

                    {/* College / Organization */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>College / Organization</label>
                      <input type="text" placeholder="e.g. IIT Hyderabad, Deloitte" value={form.college}
                        onChange={e=>upd("college",e.target.value)}
                        onFocus={()=>setFocused("college")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("college")}/>
                    </div>

                    {/* City */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>City</label>
                      <input required type="text" placeholder="e.g. Hyderabad" value={form.city}
                        onChange={e=>upd("city",e.target.value)}
                        onFocus={()=>setFocused("city")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("city")}/>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Email</label>
                      <input required type="email" placeholder="you@example.com" value={form.email}
                        onChange={e=>upd("email",e.target.value)}
                        onFocus={()=>setFocused("email")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("email")}/>
                    </div>

                    {/* WhatsApp Number */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>WhatsApp Number</label>
                      <div className="flex rounded-xl overflow-visible" style={{border:`1.5px solid ${focusedField==="phone"?theme.accent:theme.border}`,background:theme.inputBg}}>
                        <div ref={dialRef} className="relative shrink-0" style={{borderRight:`1.5px solid ${theme.border}`}}>
                          <button type="button" onClick={()=>setDialOpen(o=>!o)}
                            className="flex items-center gap-2 px-3 py-2.5 text-[13px] font-semibold focus:outline-none w-[100px]"
                            style={{color:theme.text}}>
                            <span>{currentDial?.flag??"🌐"}</span>
                            <span>{dialCode}</span>
                            <svg className="w-3 h-3 ml-auto shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{color:theme.muted}}>
                              <polyline points="6 9 12 15 18 9"/>
                            </svg>
                          </button>
                          {dialOpen && (
                            <div className="absolute left-0 top-[calc(100%+6px)] z-[100] w-[200px] rounded-xl overflow-hidden shadow-2xl"
                              style={{background:theme.card,border:`1px solid ${theme.border}`}}>
                              {DIALS.map(c=>(
                                <button key={c.code} type="button"
                                  onClick={()=>{setDialCode(c.code);setDialOpen(false);}}
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
                        <input type="tel" placeholder="00000 00000" value={form.phone}
                          onChange={e=>upd("phone",e.target.value)}
                          onFocus={()=>setFocused("phone")} onBlur={()=>setFocused(null)}
                          className="flex-1 px-4 py-2.5 text-[13px] bg-transparent focus:outline-none"
                          style={{color:theme.text}}/>
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Weekly availability</label>
                      <select required value={form.availability} onChange={e=>upd("availability",e.target.value)}
                        onFocus={()=>setFocused("availability")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-3 py-2.5 text-[13px]"
                        style={{...inputStyle("availability"),color:form.availability?theme.text:theme.muted}}>
                        <option value="">Select hours per week</option>
                        {["1–3 hrs","3–5 hrs","5–8 hrs","8–12 hrs","12+ hrs"].map(o=>(
                          <option key={o} style={{background:theme.card}}>{o}</option>
                        ))}
                      </select>
                    </div>

                    {/* SDG interests */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>
                        SDG goals you care most about
                        <span className="ml-1.5 opacity-60">(pick any)</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {SDG_GOALS.map(g=>{
                          const sel=form.sdgs.includes(g.n);
                          return (
                            <button key={g.n} type="button" onClick={()=>toggleSDG(g.n)}
                              className="sdg-pill rounded-lg px-2.5 py-1 text-[10px] font-semibold"
                              style={{
                                background: sel?`${theme.accent}18`:theme.borderSubtle,
                                color: sel?theme.accent:theme.muted,
                                border:`1px solid ${sel?theme.accent+"40":theme.border}`,
                              }}>
                              SDG {g.n}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>LinkedIn / Portfolio <span className="opacity-60">(optional)</span></label>
                      <input type="url" placeholder="https://linkedin.com/in/yourname" value={form.linkedin}
                        onChange={e=>upd("linkedin",e.target.value)}
                        onFocus={()=>setFocused("linkedin")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("linkedin")}/>
                    </div>

                    {/* Motivation */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-medium" style={{color:theme.muted}}>Why do you want to volunteer?</label>
                      <textarea required rows={3} placeholder="Tell us what drives you — a sentence or two is fine."
                        value={form.motivation} onChange={e=>upd("motivation",e.target.value)}
                        onFocus={()=>setFocused("motivation")} onBlur={()=>setFocused(null)}
                        className="glass-input w-full resize-none rounded-xl px-4 py-2.5 text-[13px]"
                        style={inputStyle("motivation")}/>
                    </div>

                    <motion.button type="submit" whileHover={{scale:1.01,y:-1}} whileTap={{scale:0.99}}
                      className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold"
                      style={{background:`linear-gradient(135deg,${theme.accent},#0284c7)`,color:"#fff",boxShadow:`0 4px 20px ${theme.accent}35`}}>
                      Submit application <Icon.Arrow/>
                    </motion.button>
                    <p className="text-center text-[11px]" style={{color:theme.muted}}>
                      By submitting you agree to our <a href="#" style={{color:theme.accent}}>volunteer terms</a>.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </section>


    </div>
  );
}
