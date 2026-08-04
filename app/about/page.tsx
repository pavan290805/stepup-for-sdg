"use client";
import Link from "next/link";
import { FadeUp } from "@/app/components/site/FadeUp";
import { useEffect, useRef, useState } from "react";

function CountUp({ to, duration = 1800 }: { to: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(tick); else setCount(to);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{count}</span>;
}

const metadata = {
  title: "About — StepUp for SDG",
  description: "Purpose-driven partnerships for a better tomorrow.",
};

export default function AboutPage() {
  return (
    <div style={{ background: "#f0f4ff" }}>
      {/* 1. Hero */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center px-6 py-16">
        {/* soft light blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-[rgba(21,93,252,0.07)] blur-[100px]" />
          <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[rgba(76,159,56,0.08)] blur-[90px]" />
          <div className="absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-[rgba(221,166,58,0.08)] blur-[80px]" />
        </div>

        {/* brush stroke accents */}
        <svg aria-hidden="true" className="pointer-events-none absolute top-[18%] right-[28%] w-64 opacity-40" viewBox="0 0 260 40" fill="none">
          <path d="M4 28 Q60 4 130 20 Q200 36 256 12" stroke="#4C9F38" strokeWidth="18" strokeLinecap="round" fill="none"/>
        </svg>
        <svg aria-hidden="true" className="pointer-events-none absolute bottom-[22%] right-[18%] w-48 opacity-35" viewBox="0 0 200 36" fill="none">
          <path d="M4 28 Q60 8 100 20 Q150 32 196 10" stroke="#DDA63A" strokeWidth="14" strokeLinecap="round" fill="none"/>
        </svg>

        <div className="relative mx-auto grid max-w-6xl w-full items-center gap-10 lg:grid-cols-2">

          {/* ── Left: text ── */}
          <FadeUp>
            <span className="inline-block rounded-full border border-[rgba(21,93,252,0.25)] bg-[rgba(21,93,252,0.07)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">
              Non-Profit · Education · SDGs
            </span>

            <h1 className="mt-5 font-display text-4xl md:text-[3.4rem] font-bold leading-[1.1] text-[#0d1b3e]">
              Purpose-driven{" "}
              <span className="relative inline-block">
                partnerships
                <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8 Q75 2 150 8 Q225 14 298 6" stroke="#4C9F38" strokeWidth="5" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
              <br />for a better tomorrow
            </h1>

            <p className="mt-6 max-w-lg leading-relaxed text-[#4a5980]">
              Educating students on the UN Sustainable Development Goals, empowering them to adopt sustainable lifestyles, make informed choices, explore meaningful careers, and drive positive change in their families and communities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/work-with-us"
                className="rounded-full bg-[#0d1b3e] px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#155dfc]"
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#0d1b3e] px-7 py-3 text-sm font-semibold text-[#0d1b3e] transition hover:bg-[#0d1b3e] hover:text-white"
              >
                Discover <span className="text-base">→</span>
              </Link>
            </div>
          </FadeUp>

          {/* ── Right: image in clipped shape + stat cards ── */}
          <FadeUp delay={150}>
            <div className="relative flex justify-center">

              {/* soft glow behind image */}
              <div
                className="absolute inset-0 m-auto h-[380px] w-[340px] opacity-30 blur-3xl"
                style={{ background: "radial-gradient(circle, #4C9F38 0%, #26BDE2 60%, transparent 80%)" }}
              />

              {/* main image clipped into ellipse */}
              <div
                className="relative z-10 h-[420px] w-[340px] overflow-hidden"
                style={{ clipPath: "ellipse(52% 50% at 50% 50%)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                  alt="Children in a classroom learning about SDGs"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* floating stat badge — bottom right */}
              <div className="absolute bottom-4 -right-6 z-20 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-2xl" style={{ background: "linear-gradient(135deg,#155dfc,#00c2ff)" }}>
                <div className="text-left">
                  <p className="font-display text-3xl font-black text-white leading-none"><CountUp to={17} /></p>
                  <p className="text-[10px] font-semibold text-white/80 mt-0.5 leading-snug">UN SDGs<br/>Covered</p>
                </div>
                <span className="text-3xl">🌐</span>
              </div>


            </div>
          </FadeUp>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="relative px-6 py-20 scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto max-w-6xl">
          {/* heading */}
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block rounded-full border border-[rgba(21,93,252,0.2)] bg-[rgba(21,93,252,0.06)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">
                Who We Are
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-[#0d1b3e]">
                Vision &amp; Mission
              </h2>
              <div className="mt-3 mx-auto h-1 w-16 rounded-full" style={{ background: "linear-gradient(90deg,#155dfc,#00c2ff)" }} />
            </div>
          </FadeUp>

          {/* cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Vision card */}
            <FadeUp>
              <div className="group relative h-full rounded-3xl p-px overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(21,93,252,0.3),rgba(0,194,255,0.15))" }}>
                <div className="relative h-full rounded-3xl bg-white p-8 flex flex-col gap-6">
                  {/* top accent bar */}
                  <div className="h-1 w-12 rounded-full" style={{ background: "linear-gradient(90deg,#155dfc,#00c2ff)" }} />

                  <div className="flex items-start gap-4">
                    {/* icon */}
                    <div className="shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shadow-md" style={{ background: "linear-gradient(135deg,#155dfc,#00c2ff)" }}>
                      👁️
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#155dfc]">Our Vision</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#0d1b3e] leading-snug">
                        Empowering Every Learner to Build a Better Tomorrow
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-[#4a5980] text-sm leading-relaxed">
                    <p>We envision a future where every child, regardless of geography, income, or background, has equal access to quality education, technology, and opportunities that unlock their full potential.</p>
                    <p>StepUp for SDG aims to create inclusive schools, empowered educators, and connected communities that inspire lifelong learning and sustainable development.</p>
                  </div>

                  {/* quote */}
                  <div className="mt-auto rounded-2xl bg-[#f0f4ff] px-5 py-4 border-l-4 border-[#155dfc]">
                    <p className="text-sm font-medium italic text-[#155dfc]">&ldquo;Education is the foundation for lasting change.&rdquo;</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Mission card */}
            <FadeUp delay={120}>
              <div className="group relative h-full rounded-3xl p-px overflow-hidden" style={{ background: "linear-gradient(135deg,rgba(0,194,255,0.3),rgba(0,208,132,0.2))" }}>
                <div className="relative h-full rounded-3xl bg-white p-8 flex flex-col gap-6">
                  {/* top accent bar */}
                  <div className="h-1 w-12 rounded-full" style={{ background: "linear-gradient(90deg,#00c2ff,#00d084)" }} />

                  <div className="flex items-start gap-4">
                    {/* icon */}
                    <div className="shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shadow-md" style={{ background: "linear-gradient(135deg,#00c2ff,#00d084)" }}>
                      🎯
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#00a89a]">Our Mission</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#0d1b3e] leading-snug">
                        Transforming Partnerships into Measurable Educational Impact
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 text-[#4a5980] text-sm leading-relaxed">
                    <p>Our mission is to connect schools, NGOs, companies, volunteers, and communities through one collaborative platform that enables transparent educational initiatives, innovation, and measurable social impact.</p>
                    <p>Every contribution helps children gain knowledge, confidence, and opportunities for a brighter future.</p>
                  </div>

                  {/* quote */}
                  <div className="mt-auto rounded-2xl bg-[#f0f4ff] px-5 py-4 border-l-4 border-[#00c2ff]">
                    <p className="text-sm font-medium italic text-[#00a89a]">&ldquo;Together we create opportunities that transform lives.&rdquo;</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>


        </div>
      </section>

      {/* 3. Five Pillars */}
      <section id="5p" className="relative px-6 py-24 scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto max-w-6xl">

          {/* heading */}
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block rounded-full border border-[rgba(76,159,56,0.3)] bg-[rgba(76,159,56,0.08)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#4C9F38]">5P Model</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-[#0d1b3e] leading-tight">
                Five Pillars of{" "}
                <span className="relative inline-block">
                  Sustainable Impact
                  <svg aria-hidden="true" className="absolute -bottom-1 left-0 w-full" viewBox="0 0 380 10" fill="none">
                    <path d="M2 7 Q95 1 190 6 Q285 11 378 4" stroke="#4C9F38" strokeWidth="4" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </h2>
              <p className="mt-4 text-[#4a5980] max-w-xl mx-auto text-sm leading-relaxed">
                Our work is grounded in the United Nations&apos; 5P framework — a holistic approach to sustainable development that leaves no one behind.
              </p>
            </div>
          </FadeUp>

          {/* 5 flip cards — 2 row layout: 3 top + 2 bottom centered */}
          <style>{`
            .flip-card { perspective: 1000px; }
            .flip-card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }
            .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
            .flip-card-front, .flip-card-back { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 1.5rem; overflow: hidden; }
            .flip-card-back { transform: rotateY(180deg); }
          `}</style>

          <div className="flex flex-col gap-6">
            {/* row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  num: "01", title: "People", emoji: "👥",
                  color: "#155DFC", grad: "linear-gradient(135deg,#155DFC,#00C2FF)",
                  tag: "Inclusive Education",
                  desc: "Empowering every individual — students, teachers, parents and communities — to participate actively in the education ecosystem and drive inclusive, lifelong learning.",
                },
                {
                  num: "02", title: "Planet", emoji: "🌍",
                  color: "#4C9F38", grad: "linear-gradient(135deg,#4C9F38,#26BDE2)",
                  tag: "Environmental Action",
                  desc: "Embedding environmental responsibility into every programme — from eco-friendly school infrastructure to climate literacy curricula that prepare students for a sustainable future.",
                },
                {
                  num: "03", title: "Prosperity", emoji: "📈",
                  color: "#E86A00", grad: "linear-gradient(135deg,#E86A00,#FFB070)",
                  tag: "Economic Empowerment",
                  desc: "Ensuring education investments generate measurable economic returns for communities — through skill-building, employment pathways, and entrepreneurship programmes for youth.",
                },
              ].map(({ num, title, emoji, color, grad, tag, desc }) => (
                <FadeUp key={title}>
                  <div className="flip-card h-44" style={{ boxShadow: `0 8px 32px ${color}18` }}>
                    <div className="flip-card-inner h-full">
                      {/* Front */}
                      <div className="flip-card-front flex flex-col" style={{ background: grad }}>
                        <span className="pointer-events-none absolute top-1 right-3 font-black text-[3rem] leading-none text-white opacity-10 select-none">{num}</span>
                        <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                          <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border border-white/30">{emoji}</div>
                          <h3 className="font-display text-lg font-black text-white">{title}</h3>
                          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-white/20 text-white border border-white/30">{tag}</span>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="flip-card-back flex flex-col items-center justify-center gap-2 p-4" style={{ background: grad }}>
                        <span className="text-xl">{emoji}</span>
                        <h3 className="font-display text-sm font-black text-white">{title}</h3>
                        <p className="text-[11px] text-white/90 leading-relaxed text-center">{desc}</p>
                        <div className="h-1 w-8 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* row 2 — centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-2/3 mx-auto">
              {[
                {
                  num: "04", title: "Peace", emoji: "☮️",
                  color: "#8B5CF6", grad: "linear-gradient(135deg,#8B5CF6,#C4B5FD)",
                  tag: "Safe Spaces",
                  desc: "Fostering inclusive, safe learning environments that celebrate diversity, resolve conflict through dialogue, and build the social cohesion necessary for lasting community well-being.",
                },
                {
                  num: "05", title: "Partnership", emoji: "🤝",
                  color: "#06B6D4", grad: "linear-gradient(135deg,#06B6D4,#0EA5E9)",
                  tag: "Collaboration",
                  desc: "Building transparent, accountable alliances between schools, NGOs, corporations and governments — because lasting impact requires every stakeholder working toward a shared goal.",
                },
              ].map(({ num, title, emoji, color, grad, tag, desc }) => (
                <FadeUp key={title} delay={80}>
                  <div className="flip-card h-44" style={{ boxShadow: `0 8px 32px ${color}18` }}>
                    <div className="flip-card-inner h-full">
                      {/* Front */}
                      <div className="flip-card-front flex flex-col" style={{ background: grad }}>
                        <span className="pointer-events-none absolute top-1 right-3 font-black text-[3rem] leading-none text-white opacity-10 select-none">{num}</span>
                        <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
                          <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-lg border border-white/30">{emoji}</div>
                          <h3 className="font-display text-lg font-black text-white">{title}</h3>
                          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-white/20 text-white border border-white/30">{tag}</span>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="flip-card-back flex flex-col items-center justify-center gap-2 p-4" style={{ background: grad }}>
                        <span className="text-xl">{emoji}</span>
                        <h3 className="font-display text-sm font-black text-white">{title}</h3>
                        <p className="text-[11px] text-white/90 leading-relaxed text-center">{desc}</p>
                        <div className="h-1 w-8 rounded-full bg-white/40" />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Story */}
      <section id="story" className="relative scroll-mt-20 overflow-hidden py-24 px-6">

        <div className="relative mx-auto max-w-6xl">
          {/* heading */}
          <FadeUp>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-10 bg-[#155dfc] opacity-40" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#155dfc]">Who We Are</span>
            </div>
            <h2 className="font-display font-black text-[#0d1b3e] leading-none" style={{ fontSize: "clamp(2.8rem,6vw,5rem)" }}>
              Our{" "}
              <span className="relative inline-block">
                Story
                <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 14" fill="none">
                  <path d="M2 10 Q50 2 100 8 Q150 14 198 5" stroke="#4C9F38" strokeWidth="6" strokeLinecap="round" fill="none"/>
                </svg>
              </span>
            </h2>
          </FadeUp>

          {/* 2-col grid */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — video */}
            <FadeUp delay={80}>
              <div className="relative group">
                {/* glow ring */}
                <div className="absolute -inset-1 rounded-3xl opacity-30 blur-xl" style={{ background: "linear-gradient(135deg,#155dfc,#4C9F38,#00c2ff)" }} />
                {/* video */}
                <div className="relative overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(13,27,62,0.15)]">
                  <video
                    src="/Sdg.white.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-video object-cover"
                  />
                  {/* bottom fade */}
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[rgba(13,27,62,0.25)] to-transparent" />
                  {/* live badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 shadow-md">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-semibold text-[#0d1b3e]">Our Journey</span>
                  </div>
                </div>
                {/* floating founded card */}
                <div className="absolute -top-4 -right-4 z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_40px_rgba(13,27,62,0.14)] border border-[rgba(13,27,62,0.06)]">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#155dfc]">Est.</p>
                  <p className="font-display text-2xl font-black text-[#0d1b3e]">2019</p>
                  <p className="text-[10px] text-[#4a5980]">Founded</p>
                </div>
              </div>
            </FadeUp>

            {/* RIGHT — text + timeline + pills */}
            <FadeUp delay={160}>
              <div className="flex flex-col gap-7">

                {/* story paragraphs */}
                <div className="space-y-4 text-[15px] leading-relaxed">
                  <p className="text-[#0d1b3e] font-semibold text-lg leading-snug">
                    StepUp for SDG began with a simple conviction: that quality education is the most powerful lever for lasting change.
                  </p>
                  <p className="text-[#4a5980]">
                    What started as a handful of volunteers supporting local schools has grown into a collaborative platform uniting students, educators, NGOs and companies around a shared mission.
                  </p>
                  <p className="text-[#4a5980]">
                    Today we connect partners across regions to fund, design and deliver transparent educational initiatives — turning intention into measurable impact for the children who need it most.
                  </p>
                  <p className="text-[#4a5980]">
                    We believe progress should be visible. Every project we support is tracked, reported, and built to last, so every contribution becomes a real opportunity for a learner.
                  </p>
                </div>


              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 5. Our Team */}
      <section id="team" className="relative px-6 py-24 scroll-mt-20 overflow-hidden">

        <div className="relative mx-auto max-w-6xl">
          <FadeUp>
            <div className="text-center mb-16">
              <span className="inline-block rounded-full border border-[rgba(21,93,252,0.2)] bg-[rgba(21,93,252,0.06)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#155dfc]">The People Behind It</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-black text-[#0d1b3e]">
                Meet Our{" "}
                <span className="relative inline-block">
                  Team
                  <svg aria-hidden="true" className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 10" fill="none">
                    <path d="M2 7 Q30 1 60 6 Q90 11 118 4" stroke="#4C9F38" strokeWidth="4" strokeLinecap="round" fill="none"/>
                  </svg>
                </span>
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                name: "Eswar Vardhan",
                role: "Co-Founder & Head of Operations",
                src: "/team/eswar.png",
                linkedin: "https://www.linkedin.com/in/eswarvardhan/",
              },
              {
                name: "Vijay Vedantam",
                role: "Financial & Strategic Advisor",
                src: "/team/vijay.png",
                linkedin: "https://www.linkedin.com/in/vijayvedantam/",
              },
              {
                name: "Pavan Tarak",
                role: "Co-Founder & Head of Execution",
                src: "/team/pavan.png",
                linkedin: "https://www.linkedin.com/in/pavantarak/",
              },
            ].map(({ name, role, src, linkedin }, i) => (
              <FadeUp key={name} delay={i * 100}>
                <div className="flex flex-col items-center text-center px-8 py-10">
                  {/* circular photo */}
                  <div className="h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-xl mb-5" style={{ outline: "4px solid #d4af37", outlineOffset: "4px" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={name} className="h-full w-full object-cover object-top" />
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0d1b3e]">{name}</h3>
                  <p className="mt-1 text-xs text-[#4a5980]">{role}</p>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-xs font-semibold hover:underline"
                    style={{ color: "#d4af37" }}
                  >
                    LinkedIn →
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Join Our Mission CTA */}
      <section id="join" className="px-6 pt-6 pb-16 scroll-mt-20">
        <FadeUp>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl p-10 text-center md:p-14" style={{ background: "linear-gradient(135deg,#0d1b3e 0%,#1a2f6e 60%,#0d1b3e 100%)" }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
              Join Our <span style={{ background: "linear-gradient(90deg,#ff7a00,#ffb347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mission</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[#a0aec0]">
              Whether you&apos;re a school, NGO, company or volunteer, there&apos;s
              a place for you in building a future where every child has access
              to quality education.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                style={{ background: "#ff7a00", boxShadow: "0 0 24px rgba(255,122,0,0.45)" }}
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition hover:text-[#00c2ff]"
                style={{ borderColor: "rgba(255,255,255,0.25)", color: "#ffffff" }}
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
