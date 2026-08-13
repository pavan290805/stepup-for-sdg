"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useTheme } from "@/app/components/ThemeProvider";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  DIRECTORY, FEATURED_COLLABORATIONS, FILTERS, SDG_LIST,
  LIVE_STATS, WHY_PARTNER, PARTNERSHIP_MODELS,
  PartnerOrg, FeaturedCollaboration, PartnerType,
} from "@/app/components/partners/partnersData";

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }
  @keyframes prt-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes prt-grid-glow { 0%,100%{opacity:.03} 50%{opacity:.08} }
  @keyframes prt-particle { 0%,100%{transform:translate(0,0);opacity:.5} 50%{transform:translate(var(--px,8px),var(--py,-14px));opacity:.9} }
  .prt-grid { background-size:40px 40px; background-image:linear-gradient(to right,rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.04) 1px,transparent 1px); animation:prt-grid-glow 8s ease-in-out infinite; }
  .prt-grid-light { background-size:40px 40px; background-image:linear-gradient(to right,rgba(0,0,0,.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,0,0,.035) 1px,transparent 1px); }
  .prt-shimmer-text { background:linear-gradient(90deg,#38bdf8 0%,#818cf8 40%,#34d399 70%,#38bdf8 100%); background-size:200% auto; color:transparent; -webkit-background-clip:text; background-clip:text; animation:prt-shimmer 5s linear infinite; }
  .prt-logo-shimmer { background:linear-gradient(90deg,rgba(255,255,255,.03) 25%,rgba(255,255,255,.08) 50%,rgba(255,255,255,.03) 75%); background-size:200% 100%; animation:prt-shimmer 1.6s ease infinite; }
  .prt-scrollbar-hide::-webkit-scrollbar{display:none} .prt-scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
  .prt-eco-card:hover .prt-eco-icon{transform:scale(1.12) rotate(6deg)} .prt-eco-icon{transition:transform .3s ease}
  .prt-card-glow:hover{box-shadow:0 0 0 1px rgba(14,165,201,.35),0 12px 36px rgba(14,165,201,.12)!important}
  .prt-bar{width:0;transition:width .4s ease} .prt-card-glow:hover .prt-bar{width:100%}
  @media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
  @media (max-width:1024px){.prt-hero-desktop{display:none!important}}
  @media (min-width:1025px){.prt-hero-mobile{display:none!important}}
`;

const DARK = {
  pageBg:"#050914",sectionAlt:"#080e1e",card:"#0d1628",cardHover:"#111d33",
  border:"rgba(255,255,255,.1)",borderSubtle:"rgba(255,255,255,.06)",
  text:"#f8fafc",textSub:"#cbd5e1",muted:"#64748b",dim:"#475569",
  accent:"#0ea5c9",accentGlow:"rgba(14,165,201,.25)",
  inputBg:"#091122",glass:"rgba(13,22,40,.85)",overlay:"rgba(3,6,13,.85)",
};
const LIGHT = {
  pageBg:"#f8fafc",sectionAlt:"#f1f5f9",card:"#ffffff",cardHover:"#f8fafc",
  border:"#e2e8f0",borderSubtle:"#f1f5f9",
  text:"#0f172a",textSub:"#334155",muted:"#64748b",dim:"#94a3b8",
  accent:"#0284c7",accentGlow:"rgba(2,132,199,.15)",
  inputBg:"#ffffff",glass:"rgba(255,255,255,.92)",overlay:"rgba(15,23,42,.75)",
};
type TK = typeof DARK;
const Ic = {
  Search:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>),
  X:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Check:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><polyline points="20 6 9 17 4 12"/></svg>),
  MapPin:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Arrow:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>),
  Globe:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>),
  Star:({c="w-3 h-3",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={c} style={s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  Shield:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>),
  Users:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  Sparkles:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>),
  Heart:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>),
  ExternalLink:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>),
  ChevronLeft:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><polyline points="15 18 9 12 15 6"/></svg>),
  ChevronRight:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><polyline points="9 18 15 12 9 6"/></svg>),
  Download:({c="w-4 h-4",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>),
  Building:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01"/></svg>),
  GraduationCap:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>),
  Leaf:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>),
  Cpu:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>),
  Network:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><line x1="12" y1="8" x2="5" y2="16"/><line x1="12" y1="8" x2="19" y2="16"/><line x1="5" y1="19" x2="19" y2="19"/></svg>),
  Target:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>),
  TrendingUp:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>),
  Handshake:({c="w-5 h-5",s}:{c?:string;s?:React.CSSProperties})=>(<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c} style={s}><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>),
};
function MultiSourceLogo({sources,alt,initials,isDark,className,style}:{sources:string[];alt:string;initials:string;isDark:boolean;className?:string;style?:React.CSSProperties}) {
  const [idx,setIdx]=useState(0);
  const [loaded,setLoaded]=useState(false);
  const [failed,setFailed]=useState(false);
  const onErr=()=>{if(idx+1<sources.length){setIdx(p=>p+1);setLoaded(false);}else setFailed(true);};
  if(failed||sources.length===0) return <div className={`flex items-center justify-center rounded-xl font-black text-sm ${className||""}`} style={{...style,background:isDark?"rgba(255,255,255,.08)":"#f1f5f9",color:isDark?"#38bdf8":"#0284c7",border:`1px solid ${isDark?"rgba(255,255,255,.1)":"#e2e8f0"}`}}>{initials}</div>;
  return <div className={`relative overflow-hidden flex items-center justify-center ${className||""}`} style={style}>{!loaded&&<div className="prt-logo-shimmer absolute inset-0 rounded-lg"/>}<img key={idx} src={sources[idx]} alt={alt} loading="lazy" onLoad={()=>setLoaded(true)} onError={onErr} style={{width:"100%",height:"100%",objectFit:"contain",opacity:loaded?1:0,transition:"opacity .35s ease",filter:isDark?"brightness(.95) contrast(1.05)":"brightness(.9) contrast(1.1)"}}/></div>;
}

function AnimatedCounter({value,suffix="",prefix=""}:{value:number;suffix?:string;prefix?:string}) {
  const ref=useRef<HTMLSpanElement>(null);
  const inView=useInView(ref,{once:true,margin:"-40px"});
  const [count,setCount]=useState(0);
  useEffect(()=>{
    if(!inView)return;
    const dur=2000,start=performance.now();
    const frame=(now:number)=>{const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);setCount(e*value);if(p<1)requestAnimationFrame(frame);};
    requestAnimationFrame(frame);
  },[inView,value]);
  const fmt=value%1!==0?count.toFixed(1):Math.round(count).toString();
  return <span ref={ref}>{prefix}{fmt}{suffix}</span>;
}

function Reveal({children,delay=0,className}:{children:React.ReactNode;delay?:number;className?:string}) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});
  return <motion.div ref={ref} className={className} initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6,delay,ease:[.21,.47,.32,.98]}}>{children}</motion.div>;
}

function PartnerModal({partner,onClose,theme,isDark}:{partner:PartnerOrg;onClose:()=>void;theme:TK;isDark:boolean}) {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:theme.overlay,backdropFilter:"blur(12px)"}} onClick={onClose}>
      <motion.div initial={{scale:.93,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:.95,opacity:0,y:10}} transition={{type:"spring",stiffness:350,damping:28}} onClick={e=>e.stopPropagation()} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[28px] relative" style={{background:theme.card,border:`1px solid ${theme.border}`,boxShadow:"0 32px 80px rgba(0,0,0,.5)"}}>
        <div className="sticky top-0 z-20 p-6 flex items-start justify-between backdrop-blur-md" style={{background:isDark?"rgba(13,22,40,.92)":"rgba(255,255,255,.92)",borderBottom:`1px solid ${theme.border}`}}>
          <div className="flex items-center gap-4">
            <MultiSourceLogo sources={partner.logoSources} alt={partner.name} initials={partner.initials} isDark={isDark} className="w-16 h-16 rounded-2xl p-2" style={{background:isDark?"rgba(255,255,255,.05)":"#f8fafc",border:`1px solid ${theme.border}`}}/>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold tracking-tight" style={{color:theme.text}}>{partner.name}</h3>
                {partner.verified&&<span className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"><Ic.Shield c="w-3 h-3"/> Verified</span>}
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs" style={{color:theme.muted}}>
                <span className="flex items-center gap-1"><Ic.MapPin c="w-3.5 h-3.5 text-cyan-500"/>{partner.location}</span>
                <span>•</span><span>Since {partner.since}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:opacity-80" style={{background:theme.sectionAlt,border:`1px solid ${theme.border}`,color:theme.text}}><Ic.X c="w-4 h-4"/></button>
        </div>
        <div className="p-6 flex flex-col gap-6">
          {partner.image&&<div className="h-44 w-full rounded-2xl overflow-hidden relative"><img src={partner.image} alt={partner.name} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/><div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-semibold"><span className="rounded-full px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20">{partner.categoryTag}</span>{partner.funding&&<span className="rounded-full px-3 py-1 bg-cyan-500/80 backdrop-blur-md font-bold">{partner.funding}</span>}</div></div>}
          <div className="rounded-2xl p-5" style={{background:theme.sectionAlt,border:`1px solid ${theme.border}`}}><h4 className="text-xs font-bold uppercase tracking-wider mb-2" style={{color:theme.muted}}>Overview</h4><p className="text-sm leading-relaxed" style={{color:theme.textSub}}>{partner.description}</p></div>
          <div><h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{color:theme.muted}}>SDG Alignment</h4><div className="flex flex-wrap gap-2">{partner.sdgs.map(n=>{const s=SDG_LIST.find(x=>x.num===n);return <span key={n} className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-bold text-white" style={{background:s?.color||"#0ea5c9"}}><span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">{n}</span>{s?.name||`SDG ${n}`}</span>;})}</div></div>
          <div className="flex items-center gap-3 rounded-2xl p-4" style={{background:isDark?"rgba(14,165,201,.08)":"rgba(2,132,199,.06)",border:`1px solid ${theme.accent}30`}}><span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400"><Ic.Sparkles c="w-4 h-4"/></span><div><div className="text-xs font-bold uppercase tracking-wider text-cyan-400">Recent Milestone</div><div className="text-xs font-medium mt-0.5" style={{color:theme.text}}>{partner.activity}</div></div></div>
          {partner.website&&<a href={`https://${partner.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.02]" style={{background:`linear-gradient(135deg,${theme.accent},#818cf8)`}}>Visit Official Website <Ic.ExternalLink c="w-4 h-4"/></a>}
        </div>
      </motion.div>
    </motion.div>);
}
function HeroNetworkViz({isDark}:{isDark:boolean}) {
  const W=480,cx=240,cy=240,R=155;
  const nodes=[
    {label:"Companies",color:"#f87171",angle:-90},{label:"Schools",color:"#34d399",angle:-30},
    {label:"NGOs",color:"#38bdf8",angle:30},{label:"Government",color:"#a78bfa",angle:90},
    {label:"Foundations",color:"#fbbf24",angle:150},{label:"Technology",color:"#fb923c",angle:210},
  ].map(n=>({...n,x:cx+R*Math.cos(n.angle*Math.PI/180),y:cy+R*Math.sin(n.angle*Math.PI/180)}));
  const particles=Array.from({length:16},(_,i)=>({id:i,x:80+(i*53)%320,y:80+(i*71)%320,r:.8+(i%2)*1.2,dur:3+(i%4),delay:i*0.35}));
  return (
    <div className="prt-hero-desktop w-full flex justify-center" style={{height:460}}>
      <svg viewBox={`0 0 ${W} ${W}`} width={W} height={W} style={{display:"block",margin:"0 auto",overflow:"visible"}}>
        <defs>
          <radialGradient id="hub-dark" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0d2a42"/><stop offset="100%" stopColor="#050914"/></radialGradient>
          <radialGradient id="hub-light" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#dbeafe"/><stop offset="100%" stopColor="#f8fafc"/></radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r="185" fill="none" stroke={isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"} strokeWidth="1" strokeDasharray="3 8"/>
        <circle cx={cx} cy={cy} r={R+4} fill="none" stroke={isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.08)"} strokeWidth="1"/>
        {nodes.map((n,i)=>(
          <line key={`l${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke={n.color} strokeOpacity=".3" strokeWidth="1.2" strokeDasharray="3 5">
            <animate attributeName="strokeOpacity" values=".15;.45;.15" dur={`${2.5+i*.4}s`} repeatCount="indefinite"/>
          </line>))}
        {particles.map(p=>(
          <circle key={p.id} cx={p.x} cy={p.y} r={p.r} fill={isDark?"rgba(14,165,201,.55)":"rgba(2,132,199,.4)"}>
            <animate attributeName="opacity" values=".25;.8;.25" dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"/>
            <animate attributeName="cy" values={`${p.y};${p.y-9};${p.y}`} dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite"/>
          </circle>))}
        {nodes.map((n,i)=>(
          <g key={`n${i}`}>
            <circle cx={n.x} cy={n.y} r="26" fill={n.color} fillOpacity=".08" stroke={n.color} strokeOpacity=".25" strokeWidth="1">
              <animate attributeName="r" values="22;27;22" dur={`${2.8+i*.35}s`} repeatCount="indefinite"/>
            </circle>
            <circle cx={n.x} cy={n.y} r="19" fill={isDark?"#0d1628":"#fff"} stroke={n.color} strokeWidth="1.5" strokeOpacity=".85"/>
            <text x={n.x} y={n.y+4} textAnchor="middle" fontSize="6.5" fill={n.color} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" style={{pointerEvents:"none"}}>{n.label}</text>
          </g>))}
        <circle cx={cx} cy={cy} r="58" fill={isDark?"rgba(14,165,201,.07)":"rgba(2,132,199,.05)"} stroke={isDark?"rgba(14,165,201,.28)":"rgba(2,132,199,.22)"} strokeWidth="1.5"><animate attributeName="r" values="55;61;55" dur="4s" repeatCount="indefinite"/></circle>
        <circle cx={cx} cy={cy} r="46" fill={isDark?"url(#hub-dark)":"url(#hub-light)"} stroke={isDark?"rgba(14,165,201,.5)":"rgba(2,132,199,.4)"} strokeWidth="2"/>
        <text x={cx} y={cy+6} textAnchor="middle" fontSize="8.5" fill={isDark?"#38bdf8":"#0284c7"} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" letterSpacing="-0.2">StepUp for SDGs</text>
        <text x={cx} y={cx+20} textAnchor="middle" fontSize="6" fill={isDark?"#64748b":"#94a3b8"} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing="0.5">PARTNERSHIP HUB</text>
      </svg>
    </div>);
}

function HeroNetworkMobile({isDark,theme}:{isDark:boolean;theme:TK}) {
  const nodes=[{label:"Companies",color:"#f87171"},{label:"Schools",color:"#34d399"},{label:"NGOs",color:"#38bdf8"},{label:"Government",color:"#a78bfa"},{label:"Foundations",color:"#fbbf24"},{label:"Technology",color:"#fb923c"}];
  return (
    <div className="prt-hero-mobile flex flex-col items-center gap-4 w-full">
      <div className="rounded-2xl px-5 py-3 text-center border" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:theme.accent}}>
        <div className="text-sm font-black" style={{color:theme.text}}>StepUp for SDGs</div>
        <div className="text-xs mt-0.5" style={{color:theme.muted}}>Partnership Hub</div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {nodes.map(n=><div key={n.label} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold" style={{background:isDark?"rgba(13,22,40,.9)":"#fff",border:`1px solid ${n.color}50`,color:theme.text}}><span className="w-2 h-2 rounded-full" style={{background:n.color}}/>{n.label}</div>)}
      </div>
    </div>);
}

const ECO_CATS=[
  {key:"companies",label:"Companies",blurb:"Capital, expertise and technology to scale SDG programs.",detail:"Corporate partners fund workshops, deploy technology, and provide employee volunteers — gaining verified ESG impact reports and brand visibility across our network.",count:28,icon:"building",color:"#f87171",sdgs:[9,13,17]},
  {key:"schools",label:"Schools",blurb:"Embedding SDG awareness into everyday learning.",detail:"Partner schools receive free curriculum, funded workshops, and student leadership opportunities. Teachers gain professional development while students tackle real-world challenges.",count:45,icon:"grad",color:"#34d399",sdgs:[4,10,17]},
  {key:"ngos",label:"NGOs",blurb:"Ground-level execution and community trust at scale.",detail:"NGO partners co-design programs, expand reach across cities, and gain access to joint grants and verified impact auditing — bringing credibility and community connection.",count:22,icon:"leaf",color:"#38bdf8",sdgs:[1,3,13]},
  {key:"government",label:"Government",blurb:"Policy alignment and systemic multiplier effect.",detail:"Government bodies align programs with national SDG commitments, provide institutional validation, and help scale successful interventions through public sector channels.",count:12,icon:"network",color:"#a78bfa",sdgs:[16,17,10]},
  {key:"foundations",label:"Foundations",blurb:"Philanthropic capital for the hardest problems.",detail:"Foundations provide unrestricted and restricted grants, enabling long-term program development and systemic research that other funding sources might not support.",count:8,icon:"heart",color:"#fbbf24",sdgs:[2,5,8]},
  {key:"technology",label:"Technology",blurb:"Digital tools and platforms accelerating every goal.",detail:"Technology partners build and maintain digital infrastructure — learning platforms, impact dashboards, AI tools — powering the entire ecosystem at scale.",count:10,icon:"cpu",color:"#fb923c",sdgs:[9,4,13]},
];

function EcosystemSection({theme,isDark}:{theme:TK;isDark:boolean}) {
  const [activeKey,setActiveKey]=useState<string|null>(null);
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 relative" style={{background:theme.pageBg}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>HOW ORGANIZATIONS PARTICIPATE</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mt-3 mb-4" style={{color:theme.text}}>One mission, <span className="prt-shimmer-text">many ways in.</span></h2>
          <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{color:theme.muted}}>Every partner brings a different kind of leverage — capital, curriculum, coverage or code. Tap a category to see how it fits.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ECO_CATS.map((cat,i)=>{
            const isActive=activeKey===cat.key;
            return (
              <motion.div key={cat.key} initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.55,delay:i*.07}} whileHover={{y:-4}}
                onClick={()=>setActiveKey(isActive?null:cat.key)}
                className="prt-eco-card relative rounded-[24px] p-6 cursor-pointer border overflow-hidden transition-all duration-300"
                style={{background:isActive?isDark?`linear-gradient(135deg,${cat.color}12 0%,${theme.card} 100%)`:`linear-gradient(135deg,${cat.color}0a 0%,#fff 100%)`:theme.card,borderColor:isActive?`${cat.color}55`:theme.border,boxShadow:isActive?`0 8px 32px ${cat.color}18`:"none"}}>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="prt-eco-icon w-12 h-12 rounded-2xl flex items-center justify-center" style={{background:`${cat.color}18`,border:`1px solid ${cat.color}30`,color:cat.color}}>
                      {cat.icon==="building"&&<Ic.Building c="w-6 h-6" s={{color:cat.color}}/>}
                      {cat.icon==="grad"&&<Ic.GraduationCap c="w-6 h-6" s={{color:cat.color}}/>}
                      {cat.icon==="leaf"&&<Ic.Leaf c="w-6 h-6" s={{color:cat.color}}/>}
                      {cat.icon==="network"&&<Ic.Network c="w-6 h-6" s={{color:cat.color}}/>}
                      {cat.icon==="heart"&&<Ic.Heart c="w-6 h-6" s={{color:cat.color}}/>}
                      {cat.icon==="cpu"&&<Ic.Cpu c="w-6 h-6" s={{color:cat.color}}/>}
                    </div>
                    <span className="text-xs font-bold rounded-full px-2.5 py-1" style={{background:`${cat.color}14`,color:cat.color,border:`1px solid ${cat.color}25`}}>{cat.count} partners</span>
                  </div>
                  <div><h3 className="text-lg font-bold mb-1.5" style={{color:theme.text}}>{cat.label}</h3><p className="text-sm leading-relaxed" style={{color:theme.muted}}>{cat.blurb}</p></div>
                  <div className="flex gap-1.5 flex-wrap">{cat.sdgs.map(n=>{const s=SDG_LIST.find(x=>x.num===n);return <span key={n} className="text-[10px] font-bold rounded-md px-2 py-0.5 text-white" style={{background:s?.color||"#0ea5c9"}}>SDG {n}</span>;})}</div>
                  <AnimatePresence>{isActive&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.3}}><div className="pt-4 border-t" style={{borderColor:`${cat.color}25`}}><p className="text-xs leading-relaxed" style={{color:theme.textSub}}>{cat.detail}</p></div></motion.div>}</AnimatePresence>
                  <div className="flex items-center justify-between">
                    <button className="text-xs font-bold flex items-center gap-1.5" style={{color:cat.color}}>{isActive?"Show less":"Learn more"} <Ic.Arrow c="w-3 h-3"/></button>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{background:`${cat.color}18`,color:cat.color,transform:isActive?"rotate(45deg)":"rotate(0deg)",transition:"transform .3s ease"}}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                  </div>
                </div>
              </motion.div>);
          })}
        </div>
      </div>
    </section>);
}
function FeaturedCarousel({theme,isDark}:{theme:TK;isDark:boolean}) {
  const [cur,setCur]=useState(0);
  const [dir,setDir]=useState(0);
  const total=FEATURED_COLLABORATIONS.length;
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});
  const go=(d:number)=>{setDir(d);setCur(c=>(c+d+total)%total);};
  const collab=FEATURED_COLLABORATIONS[cur];
  const sdgColor=SDG_LIST.find(s=>s.num===collab.sdgNum)?.color||"#0ea5c9";
  const variants={enter:(d:number)=>({x:d>0?60:-60,opacity:0}),center:{x:0,opacity:1},exit:(d:number)=>({x:d>0?-60:60,opacity:0})};
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 relative border-t" style={{background:theme.sectionAlt,borderColor:theme.border}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="mb-12" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>FEATURED COLLABORATIONS</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color:theme.text}}>Partnerships making a difference</h2>
              <p className="text-base mt-3 max-w-xl" style={{color:theme.muted}}>A closer look at initiatives where partnership turned into measurable impact.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>go(-1)} className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:scale-105" style={{background:theme.card,borderColor:theme.border,color:theme.text}}><Ic.ChevronLeft c="w-5 h-5"/></button>
              <div className="flex gap-1.5">{FEATURED_COLLABORATIONS.map((_,i)=><button key={i} onClick={()=>{setDir(i>cur?1:-1);setCur(i);}} className="rounded-full transition-all duration-300" style={{width:i===cur?20:6,height:6,background:i===cur?theme.accent:theme.border}}/>)}</div>
              <button onClick={()=>go(1)} className="w-11 h-11 rounded-full flex items-center justify-center border transition-all hover:scale-105" style={{background:theme.card,borderColor:theme.border,color:theme.text}}><Ic.ChevronRight c="w-5 h-5"/></button>
            </div>
          </div>
        </motion.div>
        <div className="relative overflow-hidden" style={{minHeight:400}}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={cur} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{duration:.42,ease:[.25,.1,.25,1]}} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="rounded-[28px] overflow-hidden border group" style={{background:theme.card,borderColor:theme.border,boxShadow:"0 20px 60px rgba(0,0,0,.1)"}}>
                <div className="h-60 overflow-hidden relative">
                  <img src={collab.image} alt={collab.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"/>
                  <div className="absolute top-4 left-4"><span className="rounded-full px-3 py-1.5 text-xs font-bold text-white border border-white/20 backdrop-blur-md" style={{background:sdgColor}}>SDG {collab.sdgNum} · {collab.sdgName}</span></div>
                  <div className="absolute bottom-4 left-4"><div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15"><span className="text-sm font-bold text-white">{collab.partnerA.name}</span><span className="text-cyan-400 font-black">×</span><span className="text-sm font-bold text-white">{collab.partnerB.name}</span></div></div>
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <div><h3 className="text-xl font-black tracking-tight mb-2" style={{color:theme.text}}>{collab.title}</h3><p className="text-sm leading-relaxed" style={{color:theme.muted}}>{collab.summary}</p></div>
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t" style={{borderColor:theme.border}}>{collab.impactMetrics.map(m=><div key={m.label} className="rounded-xl p-3" style={{background:isDark?"rgba(14,165,201,.08)":"rgba(2,132,199,.06)",border:`1px solid ${theme.accent}20`}}><div className="text-lg font-black" style={{color:theme.accent}}>{m.value}</div><div className="text-xs font-medium" style={{color:theme.muted}}>{m.label}</div></div>)}</div>
                  <a href="#partner-form" className="inline-flex items-center gap-2 text-sm font-bold" style={{color:theme.accent}}>Explore Partnership <Ic.Arrow c="w-4 h-4"/></a>
                </div>
              </div>
              <div className="rounded-[24px] p-6 border flex flex-col gap-5" style={{borderColor:theme.border,background:isDark?"linear-gradient(135deg,#0d1628 0%,#0a1a2e 100%)":"linear-gradient(135deg,#fff 0%,#f1f5f9 100%)"}}>
                <div><p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Partners</p>
                  <div className="flex flex-col gap-3">{[collab.partnerA,collab.partnerB].map((p,pi)=><div key={pi} className="flex items-center gap-3 p-3 rounded-xl" style={{background:isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)",border:`1px solid ${theme.border}`}}><div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0" style={{background:pi===0?isDark?"rgba(14,165,201,.15)":"rgba(2,132,199,.1)":isDark?"rgba(129,140,248,.15)":"rgba(99,102,241,.1)",color:pi===0?theme.accent:"#818cf8"}}>{p.name.substring(0,2).toUpperCase()}</div><div><div className="text-sm font-bold" style={{color:theme.text}}>{p.name}</div><div className="text-xs" style={{color:theme.muted}}>{p.type}</div></div></div>)}</div>
                </div>
                <div><p className="text-xs font-bold uppercase tracking-widest mb-3" style={{color:theme.muted}}>Primary SDG</p>
                  <div className="rounded-xl p-4 flex items-center gap-4" style={{background:`${sdgColor}15`,border:`1px solid ${sdgColor}30`}}><div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{background:sdgColor}}>{collab.sdgNum}</div><div><div className="text-xs font-bold uppercase tracking-wide mb-0.5" style={{color:theme.muted}}>Goal {collab.sdgNum}</div><div className="text-sm font-bold" style={{color:theme.text}}>{collab.sdgName}</div></div></div>
                </div>
                <div><p className="text-xs font-bold uppercase tracking-widest mb-2" style={{color:theme.muted}}>About</p><p className="text-sm leading-relaxed" style={{color:theme.textSub}}>{collab.subtitle}</p></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>);
}

function SDGConstellation({theme,isDark}:{theme:TK;isDark:boolean}) {
  const [hovered,setHovered]=useState<number|null>(null);
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-100px"});
  const SZ=500,cx=250,cy=250,R=185;
  const positions=SDG_LIST.map((s,i)=>{const a=((i/SDG_LIST.length)*360-90)*Math.PI/180;return{...s,x:cx+R*Math.cos(a),y:cy+R*Math.sin(a)};});
  const getPartners=(n:number)=>DIRECTORY.filter(p=>p.sdgs.includes(n));
  const selInfo=hovered?SDG_LIST.find(s=>s.num===hovered):null;
  const selPartners=hovered?getPartners(hovered):[];
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 relative border-t" style={{background:theme.pageBg,borderColor:theme.border}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>SDG ALIGNMENT MAP</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4" style={{color:theme.text}}>Where our partners show up across the <span className="prt-shimmer-text">17 Goals</span></h2>
          <p className="text-base max-w-2xl mx-auto" style={{color:theme.muted}}>Hover — or tap on mobile — a goal to see which partners are actively driving it.</p>
        </motion.div>
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          <motion.div className="w-full lg:w-1/2 flex justify-center" initial={{opacity:0,scale:.9}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:.8,delay:.2}}>
            <div style={{maxWidth:SZ,width:"100%",overflowX:"auto"}}>
              <svg viewBox={`0 0 ${SZ} ${SZ}`} style={{width:"100%",maxWidth:SZ,display:"block",margin:"0 auto"}}>
                <circle cx={cx} cy={cy} r={R+22} fill="none" stroke={isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)"} strokeWidth="1" strokeDasharray="2 6"/>
                {positions.map(n=>{const isH=hovered===n.num,isO=hovered!==null&&!isH;return <line key={`l${n.num}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke={isH?n.color:isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)"} strokeWidth={isH?2:1} opacity={isO?.35:1} style={{transition:"all .3s ease"}}/>;})}
                {positions.map(n=>{const isH=hovered===n.num,isO=hovered!==null&&!isH,nr=isH?21:17;return(
                  <g key={`n${n.num}`} style={{cursor:"pointer"}} onMouseEnter={()=>setHovered(n.num)} onMouseLeave={()=>setHovered(null)} onClick={()=>setHovered(hovered===n.num?null:n.num)}>
                    {isH&&<circle cx={n.x} cy={n.y} r={nr+9} fill={n.color} fillOpacity=".14" stroke={n.color} strokeOpacity=".4" strokeWidth="1"/>}
                    <circle cx={n.x} cy={n.y} r={nr} fill={isH?n.color:isDark?"#0d1628":"#fff"} stroke={n.color} strokeWidth={isH?0:1.5} strokeOpacity={isO?.35:.85} fillOpacity={isO?.5:1} style={{transition:"all .3s ease"}}/>
                    <text x={n.x} y={n.y+4} textAnchor="middle" fontSize={isH?"11":"9"} fill={isH?"#fff":n.color} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" opacity={isO?.5:1} style={{transition:"all .3s ease",pointerEvents:"none"}}>{n.num}</text>
                  </g>);})}
                <circle cx={cx} cy={cy} r="46" fill={isDark?"rgba(14,165,201,.08)":"rgba(2,132,199,.05)"} stroke={isDark?"rgba(14,165,201,.3)":"rgba(2,132,199,.25)"} strokeWidth="1.5"/>
                <circle cx={cx} cy={cy} r="36" fill={isDark?"#0d1628":"#fff"} stroke={isDark?"rgba(14,165,201,.5)":"rgba(2,132,199,.4)"} strokeWidth="2"/>
                <text x={cx} y={cy-3} textAnchor="middle" fontSize="17" fill={isDark?"#38bdf8":"#0284c7"} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="900">17</text>
                <text x={cx} y={cy+9} textAnchor="middle" fontSize="6.5" fill={isDark?"#64748b":"#94a3b8"} fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="700" letterSpacing=".6">GOALS NETWORK</text>
              </svg>
            </div>
          </motion.div>
          <motion.div className="w-full lg:w-1/2" initial={{opacity:0,x:24}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.6,delay:.4}}>
            <AnimatePresence mode="wait">
              {!hovered?(
                <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="rounded-[24px] p-8 border text-center" style={{background:theme.card,borderColor:theme.border}}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.08)",color:theme.accent}}><Ic.Target c="w-8 h-8"/></div>
                  <h3 className="text-lg font-bold mb-2" style={{color:theme.text}}>Select a Goal</h3>
                  <p className="text-sm mb-6" style={{color:theme.muted}}>Hover over any SDG node in the constellation to see which partners are actively driving that goal.</p>
                  <div className="flex flex-wrap justify-center gap-1.5">{SDG_LIST.map(s=><div key={s.num} className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black cursor-pointer hover:scale-110 transition-transform" style={{background:s.color}} onMouseEnter={()=>setHovered(s.num)} onClick={()=>setHovered(hovered===s.num?null:s.num)}>{s.num}</div>)}</div>
                </motion.div>
              ):(
                <motion.div key={hovered} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-12}} transition={{duration:.3}} className="rounded-[24px] overflow-hidden border" style={{background:theme.card,borderColor:theme.border}}>
                  <div className="p-6 flex items-center gap-4" style={{background:`${selInfo?.color}1a`,borderBottom:`1px solid ${selInfo?.color}30`}}>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl flex-shrink-0" style={{background:selInfo?.color}}>{hovered}</div>
                    <div><p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{color:theme.muted}}>Goal {hovered}</p><h3 className="text-lg font-black" style={{color:theme.text}}>{selInfo?.name}</h3><p className="text-xs mt-0.5" style={{color:theme.muted}}>{selPartners.length} partner{selPartners.length!==1?"s":""} driving this goal</p></div>
                  </div>
                  <div className="p-6">
                    {selPartners.length>0?(
                      <div className="flex flex-col gap-3">
                        {selPartners.slice(0,5).map(p=><div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{background:isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.02)",border:`1px solid ${theme.border}`}}><div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0" style={{background:isDark?"rgba(255,255,255,.06)":"#f1f5f9",color:theme.accent}}>{p.initials.substring(0,2)}</div><div className="flex-1 min-w-0"><div className="text-sm font-bold truncate" style={{color:theme.text}}>{p.name}</div><div className="text-xs" style={{color:theme.muted}}>{p.categoryTag}</div></div>{p.verified&&<Ic.Shield c="w-4 h-4 flex-shrink-0" s={{color:"#34d399"}}/>}</div>)}
                        {selPartners.length>5&&<p className="text-xs text-center font-semibold" style={{color:theme.muted}}>+{selPartners.length-5} more partners</p>}
                      </div>
                    ):<div className="text-center py-6"><p className="text-sm" style={{color:theme.muted}}>No partners currently mapped to this goal.</p></div>}
                  </div>
                </motion.div>)}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>);
}
const STEPS=[
  {num:"01",label:"Connect",color:"#0ea5c9",title:"First Conversation",desc:"We begin with an open conversation about your goals, capacity, and where partnership creates the most leverage. No commitment required.",detail:"Discovery call · Alignment workshop · Needs assessment",icon:"handshake"},
  {num:"02",label:"Collaborate",color:"#818cf8",title:"Program Design",desc:"Together we co-design a partnership program tailored to your sector, geography, and SDG priorities — with clear deliverables and timelines.",detail:"MOU signing · Program scoping · Team introduction",icon:"users"},
  {num:"03",label:"Create Impact",color:"#34d399",title:"Live Programs",desc:"Programs go live. You receive real-time impact dashboards, regular field reports, and transparent financial accounting throughout.",detail:"Launch events · Live tracking · Milestone reviews",icon:"target"},
  {num:"04",label:"Scale",color:"#fbbf24",title:"Shared Growth",desc:"Successful programs are documented and scaled across geographies and sectors — growing your impact footprint year over year.",detail:"Annual report · Renewal planning · Scale strategy",icon:"trending"},
];

function PartnershipJourney({theme,isDark}:{theme:TK;isDark:boolean}) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-80px"});
  const [active,setActive]=useState(-1);
  useEffect(()=>{
    if(!inView)return;
    const timers=STEPS.map((_,i)=>setTimeout(()=>setActive(i),i*450+150));
    return()=>timers.forEach(clearTimeout);
  },[inView]);
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 relative border-t" style={{background:theme.sectionAlt,borderColor:theme.border}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>HOW PARTNERSHIP WORKS</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4" style={{color:theme.text}}>From first conversation to <span className="prt-shimmer-text">shared impact.</span></h2>
          <p className="text-base max-w-2xl mx-auto" style={{color:theme.muted}}>A partnership moves through four stages — each one measurable before we move to the next.</p>
        </motion.div>
        <div className="hidden md:block">
          <div className="relative mb-10">
            <div className="h-0.5 w-full rounded-full" style={{background:isDark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}}/>
            <div className="absolute top-0 left-0 h-0.5 rounded-full" style={{background:"linear-gradient(90deg,#0ea5c9,#818cf8,#34d399,#fbbf24)",width:`${((active+1)/STEPS.length)*100}%`,transition:"width .7s cubic-bezier(.4,0,.2,1)"}}/>
            <div className="absolute top-0 left-0 w-full flex justify-between" style={{transform:"translateY(-50%)"}}>
              {STEPS.map((s,i)=><div key={s.num} className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{background:i<=active?s.color:isDark?theme.sectionAlt:"#f1f5f9",borderColor:i<=active?s.color:isDark?"rgba(255,255,255,.12)":"#e2e8f0",boxShadow:i<=active?`0 0 14px ${s.color}65`:"none",transform:i===active?"scale(1.45)":"scale(1)",transition:"all .4s ease"}}/>)}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {STEPS.map((s,i)=>(
              <motion.div key={s.num} initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.1+.3}} onClick={()=>setActive(i)}
                className="rounded-[20px] p-5 cursor-pointer border transition-all duration-300"
                style={{background:i<=active?theme.card:isDark?"rgba(13,22,40,.5)":"rgba(255,255,255,.5)",borderColor:i<=active?`${s.color}45`:theme.border,boxShadow:i===active?`0 8px 28px ${s.color}18`:"none",opacity:i<=active?1:.45,transform:i===active?"translateY(-4px)":"none"}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black" style={{color:`${s.color}40`}}>{s.num}</span>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{background:i<=active?`${s.color}20`:isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.04)",color:i<=active?s.color:theme.muted}}>
                    {s.icon==="handshake"&&<Ic.Handshake c="w-4 h-4"/>}
                    {s.icon==="users"&&<Ic.Users c="w-4 h-4"/>}
                    {s.icon==="target"&&<Ic.Target c="w-4 h-4"/>}
                    {s.icon==="trending"&&<Ic.TrendingUp c="w-4 h-4"/>}
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{color:s.color}}>{s.label}</span>
                <h4 className="text-base font-bold mb-2" style={{color:theme.text}}>{s.title}</h4>
                <p className="text-xs leading-relaxed mb-3" style={{color:theme.muted}}>{s.desc}</p>
                <div className="text-[10px] font-semibold rounded-lg px-2.5 py-1.5 inline-block" style={{background:`${s.color}12`,color:s.color,border:`1px solid ${s.color}20`}}>{s.detail}</div>
              </motion.div>))}
          </div>
        </div>
        <div className="md:hidden flex flex-col">
          {STEPS.map((s,i)=>(
            <div key={s.num} className="flex gap-4">
              <div className="flex flex-col items-center" style={{width:40,flexShrink:0}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 font-black text-sm transition-all duration-500" style={{background:i<=active?s.color:isDark?theme.sectionAlt:"#f1f5f9",borderColor:s.color,color:i<=active?"#fff":s.color,boxShadow:i<=active?`0 0 16px ${s.color}50`:"none"}}>{i+1}</div>
                {i<STEPS.length-1&&<div className="flex-1 w-0.5 my-2 rounded-full" style={{minHeight:32,background:i<active?`linear-gradient(to bottom,${s.color},${STEPS[i+1].color})`:isDark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)",transition:"background .5s ease"}}/>}
              </div>
              <motion.div className="flex-1 pb-6 rounded-[18px] p-5 border mb-2" initial={{opacity:0,x:16}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:.5,delay:i*.12}} style={{background:i<=active?theme.card:isDark?"rgba(13,22,40,.5)":"rgba(255,255,255,.5)",borderColor:i<=active?`${s.color}40`:theme.border,opacity:i<=active?1:.5}}>
                <span className="text-xs font-bold uppercase tracking-widest mb-1 block" style={{color:s.color}}>{s.num} — {s.label}</span>
                <h4 className="text-base font-bold mb-2" style={{color:theme.text}}>{s.title}</h4>
                <p className="text-xs leading-relaxed" style={{color:theme.muted}}>{s.desc}</p>
              </motion.div>
            </div>))}
        </div>
      </div>
    </section>);
}

/* ─── HERO SECTION ──────────────────────────────────────────────────────────── */
function HeroSection({theme,isDark}:{theme:TK;isDark:boolean}) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{background:isDark?"linear-gradient(160deg,#020814 0%,#050d1a 40%,#060b18 100%)":"linear-gradient(160deg,#f0f6ff 0%,#fafbff 60%,#eef4fd 100%)"}}>
      <style>{GLOBAL_STYLES}</style>
      {/* animated background grid */}
      <div className="absolute inset-0 prt-grid" style={{opacity:isDark?1:0.5}}/>
      {/* colour blobs */}
      <div className="absolute pointer-events-none" style={{width:700,height:700,top:"-15%",left:"-10%",background:isDark?"radial-gradient(ellipse,rgba(14,165,201,0.14) 0%,transparent 65%)":"radial-gradient(ellipse,rgba(2,132,199,0.1) 0%,transparent 65%)",filter:"blur(80px)"}}/>
      <div className="absolute pointer-events-none" style={{width:500,height:500,bottom:"-5%",right:"-5%",background:isDark?"radial-gradient(ellipse,rgba(129,140,248,0.12) 0%,transparent 65%)":"radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)",filter:"blur(80px)"}}/>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-6" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>Partnership Hub
            </span>
            <h1 className="font-black tracking-tight leading-[1.05] mb-6" style={{fontSize:"clamp(2.6rem,5vw,4.2rem)",color:theme.text}}>
              Building the{" "}
              <span className="prt-shimmer-text">ecosystem</span>{" "}
              <br/>for a better India
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-xl" style={{color:theme.muted}}>
              We bring together companies, schools, NGOs, universities and government bodies — aligning action with all 17 UN Sustainable Development Goals to create measurable, lasting change.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#partner-form" className="inline-flex items-center gap-2 rounded-full text-white font-bold px-6 py-3 text-sm shadow-lg transition hover:opacity-90" style={{background:`linear-gradient(135deg,${theme.accent},#818cf8)`}}>
                Become a Partner <Ic.Arrow c="w-4 h-4"/>
              </a>
              <a href="#directory" className="inline-flex items-center gap-2 rounded-full font-semibold px-6 py-3 text-sm border transition hover:opacity-80" style={{borderColor:theme.border,color:theme.text,background:isDark?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)"}}>
                View All Partners <Ic.Arrow c="w-4 h-4"/>
              </a>
            </div>
            {/* mini live stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {LIVE_STATS.map(s=>(
                <div key={s.label} className="rounded-2xl p-4 border" style={{background:isDark?"rgba(255,255,255,.03)":"rgba(255,255,255,.9)",borderColor:theme.border}}>
                  <div className="font-black text-xl" style={{color:theme.accent}}>
                    <AnimatedCounter value={s.value} suffix={s.suffix}/>
                  </div>
                  <div className="text-xs font-semibold mt-0.5" style={{color:theme.text}}>{s.label}</div>
                  <div className="text-[10px] mt-0.5" style={{color:theme.muted}}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right: network viz */}
          <div className="hidden lg:block">
            <HeroNetworkViz isDark={isDark}/>
          </div>
          <div className="lg:hidden">
            <HeroNetworkMobile isDark={isDark} theme={theme}/>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PARTNER DIRECTORY SECTION ─────────────────────────────────────────────── */
function DirectorySection({theme,isDark}:{theme:TK;isDark:boolean}) {
  const [q,setQ]=useState("");
  const [activeFilter,setActiveFilter]=useState<string>("All Partners");
  const [activeSdg,setActiveSdg]=useState<number|null>(null);
  const [selected,setSelected]=useState<PartnerOrg|null>(null);
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});

  const filterMap: Record<string,PartnerType[]>={
    "All Partners":[],
    "Organizations":["UN Organization","Foundation","Network"],
    "Companies":["Company"],
    "Educational Institutions":["School","University"],
    "NGOs":["NGO"],
    "Government":["Government"],
    "Networks":["Network"],
  };

  const filtered=useMemo(()=>DIRECTORY.filter(p=>{
    const matchQ=!q||p.name.toLowerCase().includes(q.toLowerCase())||p.location.toLowerCase().includes(q.toLowerCase())||p.categoryTag.toLowerCase().includes(q.toLowerCase());
    const matchF=!filterMap[activeFilter]||filterMap[activeFilter].length===0||filterMap[activeFilter].includes(p.type as PartnerType);
    const matchSdg=!activeSdg||p.sdgs.includes(activeSdg);
    return matchQ&&matchF&&matchSdg;
  }),[q,activeFilter,activeSdg]);

  return (
    <section id="directory" className="py-24 px-6 md:px-12 lg:px-20 border-t" style={{background:theme.sectionAlt,borderColor:theme.border}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="mb-12" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>PARTNER DIRECTORY</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color:theme.text}}>Explore our <span className="prt-shimmer-text">global network</span></h2>
              <p className="text-base mt-2" style={{color:theme.muted}}>{filtered.length} organisations active across the SDG ecosystem</p>
            </div>
            {/* search */}
            <div className="relative w-full md:w-64">
              <Ic.Search c="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2" s={{color:theme.muted}}/>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search partners…" className="w-full rounded-2xl pl-10 pr-10 py-3 text-sm border outline-none" style={{background:isDark?"rgba(255,255,255,.05)":"rgba(255,255,255,.9)",borderColor:theme.border,color:theme.text}}/>
              {q&&<button onClick={()=>setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2"><Ic.X c="w-4 h-4" s={{color:theme.muted}}/></button>}
            </div>
          </div>

          {/* filter tabs */}
          <div className="mt-6 flex gap-2 flex-wrap">
            {FILTERS.map(f=>(
              <button key={f} onClick={()=>setActiveFilter(f)} className="rounded-full px-4 py-1.5 text-xs font-bold border transition-all" style={{background:activeFilter===f?theme.accent:"transparent",borderColor:activeFilter===f?theme.accent:theme.border,color:activeFilter===f?"#fff":theme.muted}}>
                {f}
              </button>
            ))}
          </div>

          {/* SDG quick filters */}
          <div className="mt-4 flex gap-2 flex-wrap items-center">
            <span className="text-xs font-semibold" style={{color:theme.muted}}>Filter by SDG:</span>
            {SDG_LIST.map(s=>(
              <button key={s.num} onClick={()=>setActiveSdg(activeSdg===s.num?null:s.num)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black transition-all hover:scale-110" style={{background:s.color,opacity:activeSdg&&activeSdg!==s.num?0.35:1,boxShadow:activeSdg===s.num?`0 0 12px ${s.color}80`:undefined}}>
                {s.num}
              </button>
            ))}
            {activeSdg&&<button onClick={()=>setActiveSdg(null)} className="text-xs font-semibold rounded-full px-3 py-1 border" style={{color:theme.accent,borderColor:`${theme.accent}40`}}>Clear</button>}
          </div>
        </motion.div>

        {/* Partner cards grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length>0?(
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p,i)=>{
                const tierColor=p.tier==="Gold"?"#fbbf24":p.tier==="Silver"?"#94a3b8":p.tier==="Founding"?"#a78bfa":null;
                return (
                  <motion.div key={p.id} layout initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:.95}} transition={{duration:.4,delay:Math.min(i*.04,.3)}}
                    onClick={()=>setSelected(p)}
                    className="prt-card-glow rounded-[22px] p-5 cursor-pointer border relative overflow-hidden group transition-all duration-300"
                    style={{background:theme.card,borderColor:theme.border,boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
                    {/* top colour line */}
                    <div className="prt-bar absolute top-0 left-0 h-0.5 rounded-t-full" style={{background:tierColor||theme.accent}}/>

                    <div className="flex items-start justify-between mb-4">
                      <MultiSourceLogo sources={p.logoSources} alt={p.name} initials={p.initials} isDark={isDark} className="w-12 h-12 rounded-xl p-1.5" style={{background:isDark?"rgba(255,255,255,.05)":"#f8fafc",border:`1px solid ${theme.border}`}}/>
                      <div className="flex flex-col items-end gap-1.5">
                        {p.verified&&<span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5"><Ic.Shield c="w-2.5 h-2.5"/>Verified</span>}
                        {p.tier&&<span className="text-[9px] font-black rounded-full px-2 py-0.5 border" style={{color:tierColor!,background:`${tierColor}14`,borderColor:`${tierColor}30`}}>{p.tier}</span>}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2" style={{color:theme.text}}>{p.name}</h3>
                    <div className="flex items-center gap-1 mb-3 text-xs" style={{color:theme.muted}}>
                      <Ic.MapPin c="w-3 h-3 text-cyan-500"/>{p.location}
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.sdgs.slice(0,3).map(n=>{const s=SDG_LIST.find(x=>x.num===n);return <span key={n} className="text-[9px] font-bold rounded-md px-1.5 py-0.5 text-white" style={{background:s?.color||theme.accent}}>SDG {n}</span>;})}
                      {p.sdgs.length>3&&<span className="text-[9px] font-bold rounded-md px-1.5 py-0.5" style={{background:isDark?"rgba(255,255,255,.07)":"rgba(0,0,0,.05)",color:theme.muted}}>+{p.sdgs.length-3}</span>}
                    </div>

                    <div className="text-[10px] leading-relaxed line-clamp-2 mb-3" style={{color:theme.muted}}>{p.description}</div>

                    <div className="flex items-center justify-between pt-3 border-t" style={{borderColor:theme.borderSubtle}}>
                      {p.funding?<span className="text-[10px] font-bold rounded-md px-2 py-0.5" style={{background:`${theme.accent}14`,color:theme.accent}}>{p.funding}</span>:<span className="text-[10px]" style={{color:theme.muted}}>Since {p.since}</span>}
                      <Ic.Arrow c="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" s={{color:theme.accent}}/>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ):(
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="text-center py-20 rounded-[24px] border" style={{background:theme.card,borderColor:theme.border}}>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold mb-2" style={{color:theme.text}}>No partners found</h3>
              <p className="text-sm" style={{color:theme.muted}}>Try adjusting your search or filters</p>
              <button onClick={()=>{setQ("");setActiveFilter("All Partners");setActiveSdg(null);}} className="mt-4 text-sm font-bold rounded-full px-5 py-2 border" style={{color:theme.accent,borderColor:`${theme.accent}40`}}>Reset filters</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>{selected&&<PartnerModal partner={selected} onClose={()=>setSelected(null)} theme={theme} isDark={isDark}/>}</AnimatePresence>
      </div>
    </section>
  );
}

/* ─── WHY PARTNER SECTION ───────────────────────────────────────────────────── */
function WhyPartnerSection({theme,isDark}:{theme:TK;isDark:boolean}) {
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 border-t" style={{background:theme.pageBg,borderColor:theme.border}}>
      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>WHY PARTNER WITH US</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4" style={{color:theme.text}}>What's in it for <span className="prt-shimmer-text">your organisation</span></h2>
          <p className="text-base max-w-2xl mx-auto" style={{color:theme.muted}}>Every organisation that joins our ecosystem gets tailored value — and contributes to something much bigger than any single initiative.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_PARTNER.map((w,i)=>(
            <motion.div key={w.key} initial={{opacity:0,y:32}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.5,delay:i*.1}} className="rounded-[24px] p-7 border relative overflow-hidden" style={{background:w.gradient,borderColor:theme.border}}>
              <h3 className="text-lg font-black mb-4" style={{color:theme.text}}>{w.title}</h3>
              <ul className="flex flex-col gap-3 mb-6">
                {w.benefits.map(b=>(
                  <li key={b} className="flex items-start gap-2.5 text-sm" style={{color:theme.textSub}}>
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{background:theme.accent}}><Ic.Check c="w-3 h-3 text-white"/></span>
                    {b}
                  </li>
                ))}
              </ul>
              <a href={w.href} className="inline-flex items-center gap-2 rounded-full text-sm font-bold px-5 py-2.5 text-white transition hover:opacity-90" style={{background:`linear-gradient(135deg,${theme.accent},#818cf8)`}}>
                {w.btnLabel} <Ic.Arrow c="w-4 h-4"/>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PARTNER FORM SECTION ───────────────────────────────────────────────────── */
function PartnerFormSection({theme,isDark}:{theme:TK;isDark:boolean}) {
  const [form,setForm]=useState({name:"",org:"",email:"",type:"",message:""});
  const [submitted,setSubmitted]=useState(false);
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,margin:"-60px"});

  function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    import("@/app/lib/adminStore").then(({addPartnershipSubmission})=>{
      addPartnershipSubmission({fullName:form.name,organization:form.org,email:form.email,type:form.type,message:form.message});
    });
    setSubmitted(true);
  }

  const inputStyle={background:isDark?"rgba(255,255,255,.05)":"rgba(255,255,255,.9)",borderColor:theme.border,color:theme.text};
  const inputClass="w-full rounded-2xl px-4 py-3 text-sm border outline-none focus:ring-2 transition";

  return (
    <section id="partner-form" className="py-24 px-6 md:px-12 lg:px-20 border-t" style={{background:theme.sectionAlt,borderColor:theme.border}}>
      <div ref={ref} className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6}}>
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest border mb-4" style={{background:isDark?"rgba(14,165,201,.1)":"rgba(2,132,199,.07)",borderColor:`${theme.accent}30`,color:theme.accent}}>START A PARTNERSHIP</span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mt-3 mb-4" style={{color:theme.text}}>Ready to create <span className="prt-shimmer-text">shared impact?</span></h2>
          <p className="text-base max-w-xl mx-auto" style={{color:theme.muted}}>Tell us about your organisation. Our partnerships team responds within 48 hours.</p>
        </motion.div>

        <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:.6,delay:.2}} className="rounded-[28px] border overflow-hidden" style={{background:theme.card,borderColor:theme.border,boxShadow:"0 24px 64px rgba(0,0,0,.1)"}}>
          {submitted?(
            <div className="flex flex-col items-center text-center p-16 gap-5">
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{background:`${theme.accent}18`,border:`2px solid ${theme.accent}40`}}>
                <Ic.Check c="w-10 h-10" s={{color:theme.accent}}/>
              </div>
              <h3 className="text-2xl font-black" style={{color:theme.text}}>Application Received!</h3>
              <p className="text-base max-w-md" style={{color:theme.muted}}>Thank you for reaching out. Our partnerships team will respond within 48 hours.</p>
              <button onClick={()=>{setSubmitted(false);setForm({name:"",org:"",email:"",type:"",message:""}); }} className="mt-2 rounded-full px-6 py-2.5 text-sm font-bold text-white" style={{background:`linear-gradient(135deg,${theme.accent},#818cf8)`}}>Submit Another</button>
            </div>
          ):(
            <form onSubmit={handleSubmit} className="p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{color:theme.muted}}>Full Name</label>
                <input required value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Your name" className={inputClass} style={inputStyle}/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{color:theme.muted}}>Organisation</label>
                <input required value={form.org} onChange={e=>setForm(f=>({...f,org:e.target.value}))} placeholder="Organisation name" className={inputClass} style={inputStyle}/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{color:theme.muted}}>Email</label>
                <input required type="email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@organisation.org" className={inputClass} style={inputStyle}/>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{color:theme.muted}}>Partner Type</label>
                <select required value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))} className={inputClass} style={{...inputStyle,colorScheme:isDark?"dark":"light"}}>
                  <option value="" disabled>Select type…</option>
                  <option>Company / CSR</option>
                  <option>School / University</option>
                  <option>NGO / Foundation</option>
                  <option>Government Body</option>
                  <option>Technology Partner</option>
                </select>
              </div>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider" style={{color:theme.muted}}>Message</label>
                <textarea required rows={4} value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} placeholder="Tell us about your goals and how you'd like to partner…" className={inputClass+" resize-none"} style={inputStyle}/>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-bold text-white shadow-lg transition hover:opacity-90" style={{background:`linear-gradient(135deg,${theme.accent},#818cf8)`}}>
                  Submit Partnership Application <Ic.Arrow c="w-4 h-4"/>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE COMPONENT ───────────────────────────────────────────────────── */
export default function PartnersPage() {
  const { theme: themeMode } = useTheme();
  const isDark = themeMode === "dark";
  const theme: TK = isDark ? DARK : LIGHT;

  return (
    <div style={{background:theme.pageBg,minHeight:"100vh"}}>
      <HeroSection theme={theme} isDark={isDark}/>
      <EcosystemSection theme={theme} isDark={isDark}/>
      <SDGConstellation theme={theme} isDark={isDark}/>
      <FeaturedCarousel theme={theme} isDark={isDark}/>
      <DirectorySection theme={theme} isDark={isDark}/>
      <WhyPartnerSection theme={theme} isDark={isDark}/>
      <PartnershipJourney theme={theme} isDark={isDark}/>
      <PartnerFormSection theme={theme} isDark={isDark}/>
    </div>
  );
}