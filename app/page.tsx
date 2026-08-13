"use client";
import { ArrowRight, Users, BookOpen, Globe, Heart, CheckCircle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { Counter } from "@/app/components/site/Counter";

const LiveImpactMap = dynamic(
  () => import("@/app/components/site/LiveImpactMap").then((m) => m.default),
  { ssr: false, loading: () => <div className="h-64" /> }
);

/* ── SDG goal colours (UN official) ─────────────────────────────────────── */
const SDG_GOALS = [
  { num: 1,  name: "No Poverty",        color: "#E5243B" },
  { num: 2,  name: "Zero Hunger",       color: "#DDA63A" },
  { num: 3,  name: "Good Health",       color: "#4C9F38" },
  { num: 4,  name: "Quality Education", color: "#C5192D" },
  { num: 5,  name: "Gender Equality",   color: "#FF3A21" },
  { num: 13, name: "Climate Action",    color: "#3F7E44" },
  { num: 17, name: "Partnerships",      color: "#19486A" },
  { num: 11, name: "Sustainable Cities",color: "#FD9D24" },
  { num: 8,  name: "Decent Work",       color: "#A21942" },
  { num: 10, name: "Reduced Inequalities",color:"#DD1367"},
];

const metrics = [
  { value: 1240,   suffix: "+", label: "Schools Supported",  icon: BookOpen, color: "#155DFC" },
  { value: 380000, suffix: "+", label: "Students Enrolled",  icon: Users,    color: "#00B050" },
  { value: 560,    suffix: "+", label: "Projects Completed", icon: Globe,    color: "#00A8A8" },
  { value: 45000,  suffix: "+", label: "Volunteer Hours",    icon: Heart,    color: "#FF7A00" },
];

const partners = [
  {
    title: "Companies",
    body: "Channel CSR funding into transparent, measurable education programs and track impact in real time.",
    cta: "Explore Partnership",
    href: "/partners",
    accent: "#155DFC",
    icon: "🏢",
    bg: "linear-gradient(135deg,rgba(21,93,252,0.08),rgba(0,194,255,0.04))",
    border: "rgba(21,93,252,0.2)",
    features: ["Verified impact reports", "Real-time dashboards", "Brand visibility"],
  },
  {
    title: "Schools & Universities",
    body: "Join our network to access resources, infrastructure support and quality learning programs.",
    cta: "Join as School",
    href: "/get-involved/school",
    accent: "#00A8A8",
    icon: "🎓",
    bg: "linear-gradient(135deg,rgba(0,168,168,0.08),rgba(0,176,80,0.04))",
    border: "rgba(0,168,168,0.2)",
    features: ["Free SDG curriculum", "Funded workshops", "Student leadership"],
  },
  {
    title: "NGOs",
    body: "Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.",
    cta: "Collaborate Now",
    href: "/get-involved/ngo-partner",
    accent: "#FF7A00",
    icon: "🌱",
    bg: "linear-gradient(135deg,rgba(255,122,0,0.08),rgba(255,176,112,0.04))",
    border: "rgba(255,122,0,0.2)",
    features: ["Joint grant access", "Expand reach", "Impact auditing"],
  },
];

/* ── Floating SDG badge component ─────────────────────────────────────────── */
function FloatingBadge({ goal, style }: { goal: typeof SDG_GOALS[0]; style: React.CSSProperties }) {
  return (
    <div
      className="absolute flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg backdrop-blur-md border border-white/20 select-none pointer-events-none"
      style={{
        background: `${goal.color}cc`,
        ...style,
      }}
    >
      <span className="w-6 h-6 rounded-md bg-white/25 flex items-center justify-center text-white font-black text-[10px] flex-shrink-0">
        {goal.num}
      </span>
      <span className="text-white text-[11px] font-semibold whitespace-nowrap leading-none">{goal.name}</span>
    </div>
  );
}

/* ── Particle canvas ───────────────────────────────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.45)";
        ctx.fill();
      });
      // connect close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}

export default function Home() {
  const [imgIdx, setImgIdx] = useState(0);
  const BG = [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85",
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1800&q=85",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&q=85",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85",
  ];
  useEffect(() => {
    const id = setInterval(() => setImgIdx(n => (n + 1) % BG.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @keyframes slowZoom {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-12px); }
        }
        @keyframes floatY2 {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes shimmerText {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes pulseDot {
          0%,100% { transform:scale(1);   opacity:0.7; }
          50%      { transform:scale(1.4); opacity:1; }
        }
        @keyframes slideInLeft {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        .hero-bg-img { animation: slowZoom 22s ease-in-out infinite; }
        .badge-float-1 { animation: floatY  5s ease-in-out infinite; }
        .badge-float-2 { animation: floatY2 7s ease-in-out infinite 1s; }
        .badge-float-3 { animation: floatY  6s ease-in-out infinite 2s; }
        .badge-float-4 { animation: floatY2 8s ease-in-out infinite 0.5s; }
        .badge-float-5 { animation: floatY  5.5s ease-in-out infinite 3s; }
        .anim-fade-up-1 { animation: fadeUp 0.75s ease both; }
        .anim-fade-up-2 { animation: fadeUp 0.75s ease 0.15s both; }
        .anim-fade-up-3 { animation: fadeUp 0.75s ease 0.3s both; }
        .anim-fade-up-4 { animation: fadeUp 0.75s ease 0.45s both; }
        .anim-fade-up-5 { animation: fadeUp 0.75s ease 0.6s both; }
        .anim-slide-left { animation: slideInLeft  0.9s ease 0.2s both; }
        .anim-slide-right { animation: slideInRight 0.9s ease 0.4s both; }
        .shimmer-headline {
          background: linear-gradient(90deg, #fff 0%, #93c5fd 30%, #6ee7b7 60%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmerText 4s linear infinite;
        }
        .pulse-dot { animation: pulseDot 2.4s ease-in-out infinite; }
        .stat-card { backdrop-filter: blur(14px); }
        .btn-glow:hover { box-shadow: 0 0 28px rgba(21,93,252,0.55); }
        .btn-glow-ghost:hover { box-shadow: 0 0 24px rgba(255,255,255,0.2); }
        .partner-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .partner-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          HERO — split layout: left copy | right floating SDG badges
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          {BG.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-[-4%] hero-bg-img`}
              style={{
                backgroundImage: `url('${src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: i === imgIdx ? 1 : 0,
                transition: "opacity 2.5s ease-in-out",
              }}
            />
          ))}
        </div>

        {/* Dark overlay — gradient left-heavy to keep right side slightly lighter */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(3,8,22,0.90) 0%, rgba(3,8,22,0.75) 55%, rgba(3,8,22,0.60) 100%)", zIndex: 2 }} />

        {/* Particle network */}
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <ParticleCanvas />
        </div>

        {/* Blue left glow */}
        <div className="absolute pointer-events-none" style={{ width: 640, height: 640, top: "-10%", left: "-12%", background: "radial-gradient(ellipse,rgba(21,93,252,0.28) 0%,transparent 68%)", filter: "blur(70px)", zIndex: 2 }} />
        {/* Green bottom-right glow */}
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, bottom: "-5%", right: "-5%", background: "radial-gradient(ellipse,rgba(0,176,80,0.20) 0%,transparent 68%)", filter: "blur(70px)", zIndex: 2 }} />

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center" style={{ zIndex: 10 }}>

          {/* ── LEFT: Copy ── */}
          <div className="anim-slide-left">
            {/* Live badge */}
            <div className="anim-fade-up-1 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/8 backdrop-blur-sm px-4 py-2 mb-7">
              <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-[11px] font-bold tracking-[0.18em] text-white/75 uppercase">Empowering India's Future</span>
            </div>

            {/* Headline */}
            <h1 className="anim-fade-up-2 font-display font-black text-white leading-[1.03] mb-6" style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}>
              Driving{" "}
              <span className="shimmer-headline">Sustainable</span>
              <br />
              Development<br />
              <span className="shimmer-headline">for Every Child</span>
            </h1>

            {/* Sub */}
            <p className="anim-fade-up-3 text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "rgba(200,220,245,0.82)" }}>
              Connecting schools, companies, NGOs and volunteers to build measurable, lasting educational impact across India — aligned with all 17 UN Sustainable Development Goals.
            </p>

            {/* Trust proof-points */}
            <div className="anim-fade-up-3 flex flex-col gap-2 mb-8">
              {["UN SDG Aligned Programs across 6 states", "100% transparent CSR fund tracking", "12,000+ students impacted this year"].map(t => (
                <div key={t} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(190,215,240,0.8)" }}>
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="anim-fade-up-4 flex flex-wrap gap-4 mb-12">
              <Link
                href="/work-with-us"
                className="btn-glow inline-flex items-center gap-2.5 rounded-full font-bold px-7 py-3.5 text-sm text-slate-900 transition"
                style={{ background: "linear-gradient(90deg,#60a5fa,#34d399)" }}
              >
                Work With Us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sdg"
                className="btn-glow-ghost inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/8 backdrop-blur-sm text-white font-semibold px-7 py-3.5 text-sm hover:bg-white/15 transition"
              >
                Explore SDG Goals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Stats bar */}
            <div className="anim-fade-up-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metrics.map(m => {
                const Icon = m.icon;
                return (
                  <div key={m.label} className="stat-card rounded-2xl px-3 py-4 text-center border border-white/10 bg-black/25">
                    <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg mb-2" style={{ background: `${m.color}22` }}>
                      <Icon className="h-4 w-4" style={{ color: m.color }} />
                    </div>
                    <div className="font-display font-black text-xl text-white leading-none">
                      <Counter to={m.value} suffix={m.suffix} />
                    </div>
                    <div className="mt-1 text-[10px] text-white/50 font-medium leading-tight">{m.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT: Floating SDG badges visual ── */}
          <div className="anim-slide-right hidden lg:block relative" style={{ height: 540 }}>

            {/* Central hub circle */}
            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(21,93,252,0.25) 0%,rgba(0,176,80,0.12) 100%)", border: "1.5px solid rgba(255,255,255,0.15)", backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/SDG_LOGO-removebg-preview.png" alt="StepUp SDG" style={{ width: 90, height: 90, objectFit: "contain", filter: "brightness(1.2)" }} />
              <span className="text-white/60 text-[9px] font-bold tracking-[0.2em] uppercase mt-1">Partnership Hub</span>
            </div>

            {/* Orbit ring 1 */}
            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 340, height: 340, borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.08)" }} />
            {/* Orbit ring 2 */}
            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 490, height: 490, borderRadius: "50%", border: "1px dashed rgba(255,255,255,0.05)" }} />

            {/* Floating SDG badges — arranged around hub */}
            <FloatingBadge goal={SDG_GOALS[3]} style={{ top: "4%",  left: "28%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[0]} style={{ top: "18%", right: "4%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[2]} style={{ top: "42%", right: "0%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[6]} style={{ bottom: "14%", right: "8%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[4]} style={{ bottom: "2%",  left: "25%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[5]} style={{ bottom: "22%", left: "0%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[1]} style={{ top: "38%", left: "-2%", zIndex: 5 }} />
            <FloatingBadge goal={SDG_GOALS[7]} style={{ top: "10%", left: "5%", zIndex: 5 }} />

            {/* Animated float wrappers */}
            <style>{`
              .absolute:nth-child(4)  { animation: floatY  5.2s ease-in-out infinite; }
              .absolute:nth-child(5)  { animation: floatY2 6.8s ease-in-out infinite 0.5s; }
              .absolute:nth-child(6)  { animation: floatY  7s   ease-in-out infinite 1.2s; }
              .absolute:nth-child(7)  { animation: floatY2 5.5s ease-in-out infinite 2s; }
              .absolute:nth-child(8)  { animation: floatY  6.2s ease-in-out infinite 0.8s; }
              .absolute:nth-child(9)  { animation: floatY2 7.5s ease-in-out infinite 1.5s; }
              .absolute:nth-child(10) { animation: floatY  5.8s ease-in-out infinite 3s; }
              .absolute:nth-child(11) { animation: floatY2 6.4s ease-in-out infinite 2.5s; }
            `}</style>

            {/* Connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 4 }}>
              <line x1="50%" y1="50%" x2="42%"  y2="8%"  stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="88%"  y2="22%" stroke="rgba(52,211,153,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="97%"  y2="46%" stroke="rgba(251,191,36,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="82%"  y2="82%" stroke="rgba(248,113,113,0.18)" strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="42%"  y2="95%" stroke="rgba(167,139,250,0.18)" strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="5%"   y2="80%" stroke="rgba(34,211,238,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="2%"   y2="43%" stroke="rgba(74,222,128,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
              <line x1="50%" y1="50%" x2="12%"  y2="13%" stroke="rgba(251,146,60,0.18)"  strokeWidth="1" strokeDasharray="4 6"/>
            </svg>
          </div>
        </div>

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--background))", zIndex: 11 }} />
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          PURPOSE — Together we create lasting change
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(21,93,252,0.05) 0%, transparent 70%)" }} />
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "var(--cyan-glow)" }}>Our Purpose</span>
                <h2 className="mt-4 font-display font-bold leading-[1.1]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--foreground)" }}>
                  Together, we create{" "}
                  <span style={{ background: "linear-gradient(90deg,#155DFC,#00A8A8)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    lasting change
                  </span>
                </h2>
                <p className="mt-5 text-base leading-relaxed" style={{ color: "var(--muted-text)" }}>
                  StepUp for SDG is a collaborative platform that bridges the gap between intent and impact. We unite schools, NGOs, corporations, and volunteers under a shared mission — quality education for every child in India.
                </p>
                <Link
                  href="/about"
                  className="btn-arrow mt-8 inline-flex items-center gap-2 font-semibold text-sm"
                  style={{ color: "var(--electric)" }}
                >
                  Our Story <ArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🎓", title: "Quality Education",    desc: "SDG 4 aligned programs reaching underserved communities" },
                  { emoji: "🤝", title: "True Partnerships",    desc: "Companies, NGOs and schools working as one ecosystem" },
                  { emoji: "📊", title: "Measurable Impact",    desc: "Real-time dashboards tracking every rupee and outcome" },
                  { emoji: "🌱", title: "Sustainable Change",   desc: "Long-term programs that outlast individual initiatives" },
                ].map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl p-5 lift"
                    style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                  >
                    <div className="text-2xl mb-3">{p.emoji}</div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{p.title}</div>
                    <div className="text-xs leading-relaxed" style={{ color: "var(--muted-text)" }}>{p.desc}</div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          WORK WITH US — three partner cards
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6" style={{ background: "linear-gradient(180deg,var(--background) 0%,rgba(21,93,252,0.03) 100%)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "var(--cyan-glow)" }}>Work With Us</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--foreground)" }}>
                Three ways to make impact together
              </h2>
              <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "var(--muted-text)" }}>
                Whether you bring capital, classrooms, community reach or code — there's a role for you in the mission.
              </p>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <FadeUp key={p.title} delay={i * 120}>
                <div
                  className="partner-card group rounded-3xl p-8 h-full flex flex-col relative overflow-hidden"
                  style={{ background: p.bg, border: `1px solid ${p.border}` }}
                >
                  {/* accent top bar */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full" style={{ background: p.accent, opacity: 0.6 }} />

                  <div className="text-3xl mb-4 mt-2">{p.icon}</div>
                  <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted-text)" }}>{p.body}</p>

                  {/* feature list */}
                  <ul className="flex flex-col gap-2 mb-8 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--muted-text)" }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: p.accent + "20" }}>
                          <CheckCircle className="h-3 w-3" style={{ color: p.accent }} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={p.href}
                    className="btn-arrow inline-flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition self-start"
                    style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}30` }}
                  >
                    {p.cta} <ArrowRight className="arr h-4 w-4" />
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          LIVE IMPACT MAP
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "var(--cyan-glow)" }}>Live Data</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--foreground)" }}>Our Impact Across India</h2>
              <p className="mt-3 text-sm max-w-lg mx-auto" style={{ color: "var(--muted-text)" }}>Real-time activity from our partner network — schools, NGOs and companies creating change every day.</p>
            </div>
          </FadeUp>
          <LiveImpactMap />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA — Viksit India 2047
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <div
              className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
              style={{ background: "linear-gradient(135deg,#040f2e 0%,#0a1f5c 40%,#0d3b2e 100%)" }}
            >
              {/* decorative blobs */}
              <div className="absolute pointer-events-none" style={{ width: 420, height: 420, top: "-20%", left: "-10%", background: "radial-gradient(circle,rgba(21,93,252,0.32) 0%,transparent 65%)", filter: "blur(60px)" }} />
              <div className="absolute pointer-events-none" style={{ width: 360, height: 360, bottom: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(0,176,80,0.28) 0%,transparent 65%)", filter: "blur(60px)" }} />
              {/* grid overlay */}
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right,rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

              <div className="relative">
                <span className="inline-block text-xs uppercase tracking-[0.3em] font-semibold text-white/50 mb-4">United for Tomorrow</span>
                <h2 className="font-display font-black text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                  Viksit India 2047 Vision
                </h2>
                <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-white/60">
                  Join us in transforming India into a developed nation by 2047 through holistic education, empowerment, and sustainable development goals.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/partners"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 font-bold px-7 py-3.5 text-sm hover:bg-white/90 transition shadow-lg"
                  >
                    Become a Partner <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 text-white font-semibold px-7 py-3.5 text-sm hover:bg-white/10 transition"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
