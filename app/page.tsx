"use client";
import { ArrowRight, Users, BookOpen, Globe, Heart } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { Counter } from "@/app/components/site/Counter";

const LiveImpactMap = dynamic(
  () => import("@/app/components/site/LiveImpactMap").then((m) => m.default),
  { ssr: false, loading: () => <div className="h-64" /> }
);

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1800&q=85",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85",
];

function HeroBgSlideshow() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCur((n) => (n + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden">
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-[-5%]"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === cur ? 1 : 0,
            transition: "opacity 2s ease-in-out",
            animation: i === cur ? "slowZoom 24s ease-in-out infinite" : "none",
          }}
        />
      ))}
    </div>
  );
}

const metrics = [
  { value: 1240, suffix: "+", label: "Schools Supported", icon: BookOpen, color: "#155DFC" },
  { value: 380000, suffix: "+", label: "Students Enrolled", icon: Users, color: "#00B050" },
  { value: 560, suffix: "+", label: "Projects Completed", icon: Globe, color: "#00A8A8" },
  { value: 45000, suffix: "+", label: "Volunteer Hours", icon: Heart, color: "#FF7A00" },
];

const partners = [
  {
    title: "Companies",
    body: "Channel CSR funding into transparent, measurable education programs and track impact in real time.",
    cta: "Explore Partnership",
    href: "/partners",
    accent: "#155DFC",
    bg: "linear-gradient(135deg,rgba(21,93,252,0.08),rgba(0,194,255,0.04))",
    border: "rgba(21,93,252,0.2)",
  },
  {
    title: "Schools & Universities",
    body: "Join our network to access resources, infrastructure support and quality learning programs.",
    cta: "Join as School",
    href: "/get-involved/school",
    accent: "#00A8A8",
    bg: "linear-gradient(135deg,rgba(0,168,168,0.08),rgba(0,176,80,0.04))",
    border: "rgba(0,168,168,0.2)",
  },
  {
    title: "NGOs",
    body: "Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.",
    cta: "Collaborate Now",
    href: "/get-involved/ngo-partner",
    accent: "#FF7A00",
    bg: "linear-gradient(135deg,rgba(255,122,0,0.08),rgba(255,176,112,0.04))",
    border: "rgba(255,122,0,0.2)",
  },
];

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes slowZoom {
          0%   { transform: scale(1.0); }
          50%  { transform: scale(1.12); }
          100% { transform: scale(1.0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.08); opacity: 1; }
        }
        .hero-badge { animation: fadeSlideUp 0.7s ease both; }
        .hero-h1    { animation: fadeSlideUp 0.7s ease 0.15s both; }
        .hero-sub   { animation: fadeSlideUp 0.7s ease 0.3s both; }
        .hero-btns  { animation: fadeSlideUp 0.7s ease 0.45s both; }
        .hero-stats { animation: fadeSlideUp 0.7s ease 0.6s both; }
        .metric-ring { animation: pulseRing 3s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: "100vh" }}>
        <HeroBgSlideshow />

        {/* layered overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,9,24,0.55) 0%, rgba(4,9,24,0.45) 60%, rgba(4,9,24,0.75) 100%)", zIndex: 1 }} />

        {/* left accent glow */}
        <div className="absolute pointer-events-none" style={{ width: 600, height: 600, top: "10%", left: "-8%", background: "radial-gradient(ellipse,rgba(21,93,252,0.22) 0%,transparent 70%)", filter: "blur(80px)", zIndex: 1 }} />
        {/* right accent glow */}
        <div className="absolute pointer-events-none" style={{ width: 500, height: 500, bottom: "5%", right: "-5%", background: "radial-gradient(ellipse,rgba(0,176,80,0.18) 0%,transparent 70%)", filter: "blur(80px)", zIndex: 1 }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 py-24 text-center" style={{ zIndex: 2 }}>
          {/* eyebrow badge */}
          <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 metric-ring" />
            <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">Empowering India's Future</span>
          </div>

          <h1 className="hero-h1 font-display font-bold text-white leading-[1.05]" style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
            StepUp for{" "}
            <span style={{ background: "linear-gradient(90deg,#60a5fa,#34d399)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
              SDG
            </span>
          </h1>

          <p className="hero-sub mt-5 mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(210,225,240,0.85)" }}>
            Connecting schools, companies, NGOs and volunteers to build measurable, lasting educational impact across India — aligned with the UN Sustainable Development Goals.
          </p>

          <div className="hero-btns mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/work-with-us"
              className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 font-bold px-7 py-3.5 text-sm hover:bg-white/90 transition shadow-lg"
            >
              Work With Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sdg"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold px-7 py-3.5 text-sm hover:bg-white/20 transition"
            >
              Explore SDG Goals <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* inline hero stats */}
          <div className="hero-stats mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-md max-w-3xl mx-auto">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col items-center py-5 px-4 bg-black/20">
                <span className="font-display font-bold text-2xl md:text-3xl text-white">
                  <Counter to={m.value} suffix={m.suffix} />
                </span>
                <span className="mt-1 text-xs text-white/60 font-medium">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--background))", zIndex: 3 }} />
      </section>

      {/* ── TOGETHER WE CREATE LASTING CHANGE ───────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* background accent */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(21,93,252,0.05) 0%, transparent 70%)" }} />

        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* left: big quote */}
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

            {/* right: value pillars */}
            <FadeUp delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🎓", title: "Quality Education", desc: "SDG 4 aligned programs reaching underserved communities" },
                  { emoji: "🤝", title: "True Partnerships", desc: "Companies, NGOs and schools working as one ecosystem" },
                  { emoji: "📊", title: "Measurable Impact", desc: "Real-time dashboards tracking every rupee and outcome" },
                  { emoji: "🌱", title: "Sustainable Change", desc: "Long-term programs that outlast individual initiatives" },
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

      {/* ── IMPACT METRICS BAND ──────────────────────────────────────── */}
      <section className="relative py-20 px-6 overflow-hidden" style={{ background: "linear-gradient(135deg,#040912 0%,#071020 50%,#040912 100%)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(21,93,252,0.12) 0%, transparent 65%)" }} />
        <div className="mx-auto max-w-6xl relative">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-blue-400">Impact by Numbers</span>
              <h2 className="mt-3 font-display font-bold text-white text-3xl md:text-4xl">Our reach across India</h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <FadeUp key={m.label} delay={i * 100}>
                  <div
                    className="rounded-2xl p-7 text-center relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${m.color}18 0%, transparent 70%)` }} />
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ background: `${m.color}20`, border: `1px solid ${m.color}40` }}>
                        <Icon className="h-5 w-5" style={{ color: m.color }} />
                      </div>
                      <div className="font-display font-bold text-3xl md:text-4xl text-white">
                        <Counter to={m.value} suffix={m.suffix} />
                      </div>
                      <div className="mt-2 text-sm text-white/50">{m.label}</div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WORK WITH US ─────────────────────────────────────────────── */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "var(--cyan-glow)" }}>Work With Us</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--foreground)" }}>
                Three ways to make impact together
              </h2>
            </div>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <FadeUp key={p.title} delay={i * 120}>
                <div
                  className="group rounded-3xl p-8 h-full flex flex-col relative overflow-hidden lift"
                  style={{ background: p.bg, border: `1px solid ${p.border}` }}
                >
                  {/* accent top bar */}
                  <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full" style={{ background: p.accent, opacity: 0.6 }} />

                  <div className="mt-2">
                    <h3 className="font-display font-bold text-xl mb-3" style={{ color: "var(--foreground)" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>{p.body}</p>
                  </div>

                  <Link
                    href={p.href}
                    className="btn-arrow mt-8 inline-flex items-center gap-2 text-sm font-bold rounded-full px-5 py-2.5 transition"
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

      {/* ── LIVE IMPACT MAP ──────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-10">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "var(--cyan-glow)" }}>Live Data</span>
              <h2 className="mt-3 font-display font-bold text-3xl md:text-4xl" style={{ color: "var(--foreground)" }}>Our Impact Across India</h2>
            </div>
          </FadeUp>
          <LiveImpactMap />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <div
              className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
              style={{ background: "linear-gradient(135deg,#040f2e 0%,#0a1f5c 40%,#0d3b2e 100%)" }}
            >
              {/* decorative blobs */}
              <div className="absolute pointer-events-none" style={{ width: 400, height: 400, top: "-20%", left: "-10%", background: "radial-gradient(circle,rgba(21,93,252,0.3) 0%,transparent 65%)", filter: "blur(60px)" }} />
              <div className="absolute pointer-events-none" style={{ width: 350, height: 350, bottom: "-15%", right: "-8%", background: "radial-gradient(circle,rgba(0,176,80,0.25) 0%,transparent 65%)", filter: "blur(60px)" }} />

              <div className="relative">
                <span className="inline-block text-xs uppercase tracking-[0.3em] font-semibold text-white/50 mb-4">United for Tomorrow</span>
                <h2 className="font-display font-bold text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
                  Viksit India 2047 Vision
                </h2>
                <p className="mt-5 max-w-xl mx-auto text-base leading-relaxed text-white/60">
                  Join us in transforming India into a developed nation by 2047 through holistic education, empowerment, and sustainable development.
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
