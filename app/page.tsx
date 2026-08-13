"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FadeUp } from "@/app/components/site/FadeUp";
import HeroSection from "@/app/components/home/HeroSection";
import { CheckCircle } from "lucide-react";


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

export default function Home() {
  return (
    <>
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
        <HeroSection />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent" />
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
