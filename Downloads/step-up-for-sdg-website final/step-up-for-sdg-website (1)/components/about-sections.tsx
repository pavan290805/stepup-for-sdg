"use client"

import Image from "next/image"
import {
  Eye,
  Target,
  GraduationCap,
  Building2,
  HeartHandshake,
  Globe2,
  Sparkles,
  Users,
  BookOpen,
  Lightbulb,
  TrendingUp,
  Leaf,
  Handshake,
  ShieldCheck,
} from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"

/* 1. Vision  +  2. Mission */
export function VisionMission() {
  const items = [
    {
      icon: <Eye className="h-6 w-6" />,
      label: "Our Vision",
      title: "A world where every learner has the chance to thrive",
      body: "We envision inclusive communities where schools, NGOs and companies act together so that quality education and opportunity reach every child — regardless of where they are born.",
      tint: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: <Target className="h-6 w-6" />,
      label: "Our Mission",
      title: "Turning partnerships into measurable, lasting impact",
      body: "We connect purpose-driven partners and channel their resources into transparent, on-the-ground projects — building classrooms, skills and futures that align with the UN Sustainable Development Goals.",
      tint: "text-[#1d5948]",
      bg: "bg-[#1d5948]/10",
    },
  ]
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((it, i) => (
          <Reveal key={it.label} delay={i * 120}>
            <div className="group h-full rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${it.bg} ${it.tint}`}
              >
                {it.icon}
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {it.label}
              </p>
              <h3 className="mt-2 font-heading text-xl font-extrabold text-navy text-balance">
                {it.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                {it.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* 3. Our Team */
const team = [
  { name: "Aarav Mehta", role: "Founder & Director", initials: "AM" },
  { name: "Priya Nair", role: "Head of Partnerships", initials: "PN" },
  { name: "Rahul Verma", role: "Programs Lead", initials: "RV" },
  { name: "Sara Khan", role: "Impact & Research", initials: "SK" },
]

export function OurTeam() {
  return (
    <section className="bg-secondary/40 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            The People
          </p>
          <h2 className="mt-2 text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            Our Team
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
            A dedicated group of educators, organisers and partnership builders
            driving change across communities.
          </p>
        </Reveal>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#00a8a8] font-heading text-xl font-extrabold text-primary-foreground shadow-inner">
                  {m.initials}
                </div>
                <h3 className="mt-4 font-heading text-base font-bold text-navy">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 4. Our Services */
const services = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Education Programs",
    body: "Curriculum support, learning resources and SDG-aligned workshops for schools.",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Corporate Partnerships",
    body: "Helping companies channel CSR into transparent, measurable community projects.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "NGO Collaboration",
    body: "Connecting grassroots NGOs with funding, volunteers and operational support.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Impact Reporting",
    body: "Clear dashboards and reports that track every project from start to outcome.",
  },
]

export function OurServices() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          What We Do
        </p>
        <h2 className="mt-2 text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          Our Services
        </h2>
      </Reveal>
      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {s.icon}
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-navy">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* 6b. Get Involved - Premium Cards */
export function GetInvolved() {
  const { t } = useLanguage()
  const cards = [
    {
      title: t("Partner With Us"),
      img: "/images/infrastructure.png",
      icon: <Handshake className="h-6 w-6" />, 
      benefits: ["Strategic CSR alignment", "Transparent reporting", "Long-term partnerships"],
      cta: t("Become a Partner"),
    },
    {
      title: t("Join the School"),
      img: "/images/clssromms.png",
      icon: <Building2 className="h-6 w-6" />, 
      benefits: ["Access learning resources", "Teacher training", "Student support"],
      cta: t("Register School"),
    },
    {
      title: t("NGO Collaboration"),
      img: "/images/students.png",
      icon: <Users className="h-6 w-6" />, 
      benefits: ["Funding & volunteers", "Operational support", "Capacity building"],
      cta: t("Collaborate"),
    },
  ]

  return (
    <section
      id="get-involved"
      className="py-16"
      style={{
        background: "linear-gradient(135deg,#f8fbff,#eef9ff,#ffffff)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t("Get Involved")}</p>
          <h2 className="mt-2 font-heading text-3xl font-extrabold text-navy">{t("Partner, Register or Collaborate")}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">Three ways to join our mission — designed for partners, schools and NGOs.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {cards.map((c, i) => (
            <div key={c.title} className="group flex h-full flex-col overflow-hidden rounded-[24px] bg-white/60 backdrop-blur-md shadow-md transition-transform duration-300 hover:scale-105">
              <div className="relative h-44 w-full flex-shrink-0">
                <Image src={c.img} alt={c.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gradient-to-br from-primary to-[#006b8a] p-2 text-white">{c.icon}</div>
                  <h3 className="font-heading text-lg font-bold text-navy">{c.title}</h3>
                </div>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-700">
                  {c.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95 transition">
                    {c.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* 5. Our Impact */
const impactStats = [
  { value: "1,240+", label: "Schools Supported", icon: <BookOpen className="h-5 w-5" /> },
  { value: "560+", label: "Projects Completed", icon: <Sparkles className="h-5 w-5" /> },
  { value: "380K+", label: "Students Enrolled", icon: <Users className="h-5 w-5" /> },
  { value: "18", label: "Regions Reached", icon: <Globe2 className="h-5 w-5" /> },
]

export function OurImpact() {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f3d2e] to-[#16623f] px-6 py-10 sm:px-10">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              By The Numbers
            </p>
            <h2 className="mt-2 font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Our Impact
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {impactStats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                    {s.icon}
                  </div>
                  <p className="mt-4 font-heading text-3xl font-extrabold text-white">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-white/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* 6. 5P Model */
const fiveP = [
  { letter: "P", word: "People", icon: <Users className="h-5 w-5" />, color: "#0066cc", body: "Putting communities and learners at the centre of every decision." },
  { letter: "P", word: "Planet", icon: <Leaf className="h-5 w-5" />, color: "#00b050", body: "Protecting the environment through sustainable, responsible action." },
  { letter: "P", word: "Prosperity", icon: <TrendingUp className="h-5 w-5" />, color: "#f4b400", body: "Creating opportunity and shared economic growth for all." },
  { letter: "P", word: "Peace", icon: <ShieldCheck className="h-5 w-5" />, color: "#0cc0df", body: "Building inclusive, just and collaborative communities." },
  { letter: "P", word: "Partnership", icon: <Handshake className="h-5 w-5" />, color: "#c03538", body: "Uniting schools, NGOs and companies around a shared purpose." },
]

export function FivePModel() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Our Framework
        </p>
        <h2 className="mt-2 text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
          The 5P Model
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-muted-foreground">
          Inspired by the UN Agenda 2030, the five pillars that guide every
          partnership we build.
        </p>
      </Reveal>
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {fiveP.map((p, i) => (
          <Reveal key={p.word} delay={i * 80}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-inner"
                style={{ backgroundColor: p.color }}
              >
                {p.icon}
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-navy">
                {p.word}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* 7. Our Contribution to SDG */
const sdgs = [
  { n: 1, label: "No Poverty", color: "#c03538" },
  { n: 4, label: "Quality Education", color: "#c03538" },
  { n: 5, label: "Gender Equality", color: "#ff7a00" },
  { n: 8, label: "Decent Work", color: "#7b61ff" },
  { n: 10, label: "Reduced Inequalities", color: "#d63384" },
  { n: 11, label: "Sustainable Cities", color: "#f4b400" },
  { n: 13, label: "Climate Action", color: "#1d5948" },
  { n: 17, label: "Partnerships", color: "#0066cc" },
]

export function SdgContribution() {
  return (
    <section id="sdg" className="bg-secondary/40 py-14 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Globe2 className="h-6 w-6" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Aligned With Agenda 2030
            </p>
            <h2 className="font-heading text-2xl font-extrabold text-navy sm:text-3xl">
              Our Contribution to the SDGs
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Every project we support is mapped to the United Nations
              Sustainable Development Goals, ensuring our impact is purposeful
              and measurable.
            </p>
          </div>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {sdgs.map((g, i) => (
            <Reveal key={g.n} delay={i * 70}>
              <div className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-heading text-lg font-extrabold text-white"
                  style={{ backgroundColor: g.color }}
                >
                  {g.n}
                </div>
                <span className="font-heading text-sm font-bold text-navy">
                  {g.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* About hero */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_20%,rgba(12,192,223,0.12),transparent_60%),radial-gradient(50%_50%_at_15%_85%,rgba(29,89,72,0.1),transparent_60%)]"
      />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3.5 py-1.5 text-xs font-semibold text-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                About StepUp for SDG
              </div>
              <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight tracking-tight text-navy sm:text-5xl">
                Purpose-driven partnerships for a <span className="text-primary">better tomorrow</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                We bring together schools, NGOs, companies and communities to deliver transparent,
                measurable impact aligned with the UN Sustainable Development Goals.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex justify-center lg:justify-end">
              <div className="max-w-[550px] w-full overflow-hidden rounded-2xl bg-card shadow-2xl">
                <Image
                  src="/images/about hero page.png"
                  alt="About StepUp for SDG"
                  width={550}
                  height={420}
                  priority
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
