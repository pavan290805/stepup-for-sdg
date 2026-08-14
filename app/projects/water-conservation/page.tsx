'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Droplets, Globe2, MapPin, School, Users, Calendar } from 'lucide-react';
import { FadeUp } from '@/app/components/site/FadeUp';

const BLUE = '#0369a1';
const BLUE_LIGHT = '#e0f2fe';

const STEPS = [
  { step: '01', title: 'Site Assessment', desc: 'Our team evaluates your school or community site for rainwater harvesting potential and water usage patterns.' },
  { step: '02', title: 'System Installation', desc: 'We install rainwater collection systems, storage tanks, and filtration units tailored to your site.' },
  { step: '03', title: 'Monitor & Maintain', desc: 'Ongoing monitoring, community training, and maintenance support to ensure long-term impact.' },
];

const BENEFITS = [
  'Reduce dependence on municipal water supply',
  'Hands-on SDG 6 learning for students',
  'Quarterly impact reports with water saved data',
];

const EVENTS = [
  {
    id: 'rainwater-drive-hyd',
    title: 'Rainwater Harvesting Drive',
    organizer: 'AquaReach India',
    type: 'WORKSHOP',
    open: true,
    location: 'Hyderabad, Telangana',
    date: '10 Aug 2025',
    spots: '50 spots left',
    tag: 'Hands-on',
  },
  {
    id: 'water-awareness-walk',
    title: 'Clean Water Awareness Walk',
    organizer: 'JalJeevan Trust',
    type: 'COMMUNITY',
    open: true,
    location: 'Jaipur, Rajasthan',
    date: '22 Aug 2025',
    spots: '200 spots left',
    tag: 'Open to all',
  },
  {
    id: 'sdg6-youth-summit',
    title: 'SDG 6 Youth Summit 2025',
    organizer: 'WaterAid South Asia',
    type: 'SUMMIT',
    open: true,
    location: 'New Delhi, India',
    date: '5 Sep 2025',
    spots: '100 spots left',
    tag: 'Certificate',
  },
  {
    id: 'water-hackathon',
    title: 'Water Innovation Hackathon',
    organizer: 'BlueMap Analytics',
    type: 'HACKATHON',
    open: true,
    location: 'Bengaluru, India',
    date: '14 Sep 2025',
    spots: '30 teams left',
    tag: 'Prize pool',
  },
  {
    id: 'school-water-audit',
    title: 'School Water Audit Camp',
    organizer: 'GreenCivil Solutions',
    type: 'CAMP',
    open: true,
    location: 'Chennai, Tamil Nadu',
    date: '20 Sep 2025',
    spots: '40 spots left',
    tag: 'Students',
  },
  {
    id: 'river-cleanup-pune',
    title: 'River Clean-Up & Restoration',
    organizer: 'HydroPolicy Lab',
    type: 'VOLUNTEER',
    open: true,
    location: 'Pune, Maharashtra',
    date: '28 Sep 2025',
    spots: '80 spots left',
    tag: 'Volunteer',
  },
];

const BLOGS = [
  {
    id: 'why-rainwater-harvesting',
    tag: 'Water Conservation',
    title: 'Why Rainwater Harvesting is the Future of Urban Water Security',
    excerpt: 'As cities face growing water stress, rainwater harvesting offers a decentralised, cost-effective solution that every school and community can adopt today.',
    author: 'Priya Reddy',
    date: 'Jul 12, 2025',
    readTime: '5 min read',
  },
  {
    id: 'sdg6-india-progress',
    tag: 'SDG 6',
    title: "India's Progress on SDG 6: Gaps, Gains and What Youth Can Do",
    excerpt: "A deep dive into India's clean water and sanitation targets — where we stand in 2025 and how student-led initiatives are closing the gap.",
    author: 'Arjun Sharma',
    date: 'Jun 28, 2025',
    readTime: '7 min read',
  },
  {
    id: 'school-water-audit-guide',
    tag: 'How-To Guide',
    title: 'How to Conduct a Water Audit at Your School in 5 Simple Steps',
    excerpt: 'A practical, step-by-step guide for students and teachers to measure water usage, identify waste, and build a conservation action plan.',
    author: 'Sneha Rao',
    date: 'Jun 10, 2025',
    readTime: '4 min read',
  },
];

const STATS = [
  { icon: Droplets, value: '2M+', label: 'Litres harvested' },
  { icon: School,   value: '80+', label: 'Schools reached' },
  { icon: Users,    value: '15K+', label: 'Beneficiaries' },
  { icon: Globe2,   value: '12+', label: 'Districts covered' },
];

export default function WaterConservationPage() {
  return (
    <div className="bg-[#f0f9ff] text-slate-950">

      {/* Hero */}
      <section className="bg-[#f0f9ff]">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <FadeUp>
            <div className="max-w-2xl">
              <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Water Conservation <span style={{ color: BLUE }}>Program</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Promoting sustainable water conservation by implementing rainwater harvesting systems in schools and communities across India.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/projects/water-conservation/register"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  style={{ background: BLUE }}
                >
                  Join the Program <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                >
                  How it works
                </a>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
                {STATS.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="rounded-[24px] bg-white/70 px-4 py-5 text-center">
                    <Icon className="mx-auto h-5 w-5 mb-2" style={{ color: BLUE }} />
                    <p className="text-2xl font-bold text-slate-950">{value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
              {/* Decorative rings */}
              <div className="absolute -inset-3 rounded-[48px] border border-[#bae6fd]/60" />
              <div className="absolute -inset-6 rounded-[56px] border border-[#bae6fd]/30" />

              {/* Main image card */}
              <div className="relative overflow-hidden rounded-[40px] border border-[#bae6fd] bg-white shadow-[0_40px_100px_-40px_rgba(3,105,161,0.22)]">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/waterrr.jpeg"
                    alt="Water conservation - rainwater harvesting"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-20 md:px-8 bg-[#f0f9ff]">
        <FadeUp>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Three steps to water security.</h2>
          </div>
        </FadeUp>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map(({ step, title, desc }, i) => (
            <FadeUp key={step} delay={i * 80}>
              <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md">
                <span className="rounded-full border border-slate-200 bg-[#f5f6fa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                  STEP {step}
                </span>
                <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: BLUE_LIGHT }}>
                  <Droplets className="h-5 w-5" style={{ color: BLUE }} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Impact banner */}
      <section className="py-16 text-white" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #0284c7 50%, #0ea5e9 100%)` }}>
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-[24px] bg-white/10 px-6 py-8 text-center shadow-xl">
                <Icon className="mx-auto h-7 w-7 text-white" />
                <p className="mt-4 text-3xl font-bold">{value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/80">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Participation */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>Get involved</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-950 sm:text-5xl">Upcoming events.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Workshops, drives, summits and volunteer events — join and make a water impact.</p>
          </div>
        </FadeUp>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((ev, i) => (
            <FadeUp key={ev.id} delay={i * 60}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: BLUE }}>
                    {ev.title.split(' ').map((w: string) => w[0]).slice(0, 2).join('')}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: '#e0f2fe', color: BLUE }}>
                      {ev.type}
                    </span>
                    {ev.open && (
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />Open
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">{ev.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{ev.organizer}</p>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{ev.location}</p>
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-slate-400" />{ev.date}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Availability</p>
                    <p className="mt-0.5 font-semibold text-slate-950">{ev.spots}</p>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-[#f5f6fa] px-3 py-1 text-[11px] font-semibold text-slate-500">{ev.tag}</span>
                </div>

                <div className="mt-4">
                  <Link
                    href="/projects/water-conservation/register"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    style={{ background: BLUE }}
                  >
                    Participate <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>From the field</p>
              <h2 className="mt-2 text-4xl font-bold text-slate-950 sm:text-5xl">Latest articles.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-500">Insights, guides and stories on water conservation and SDG 6.</p>
          </div>
        </FadeUp>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {BLOGS.map((b, i) => (
            <FadeUp key={b.id} delay={i * 70}>
              <article className="flex h-full flex-col rounded-[28px] border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${BLUE} 0%, #0ea5e9 100%)` }} />
                <div className="flex flex-1 flex-col p-6">
                  <span className="self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ background: '#e0f2fe', color: BLUE }}>
                    {b.tag}
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-slate-950">{b.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">{b.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-950">{b.author}</p>
                      <p className="text-[11px] text-slate-400">{b.date} · {b.readTime}</p>
                    </div>
                    <Link href={`/projects/water-conservation/blog/${b.id}`} className="text-sm font-semibold transition hover:opacity-70" style={{ color: BLUE }}>
                      Read <ArrowRight className="ml-1 inline-block h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Benefits + Register CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>What you get</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-4xl">Benefits of joining.</h2>
              <ul className="mt-8 space-y-4">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: BLUE_LIGHT }}>
                      <CheckCircle2 className="h-4 w-4" style={{ color: BLUE }} />
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{b}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border bg-white p-10 shadow-sm" style={{ borderColor: '#bae6fd' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: BLUE }}>Get involved</p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">Ready to make a difference?</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Register your school or community to receive a free site assessment and join India's growing network of water-conscious institutions.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { label: 'Who can join', value: 'Schools, colleges, NGOs, community groups' },
                  { label: 'SDGs aligned', value: 'SDG 6 · SDG 13' },
                  { label: 'Timeline', value: 'Assessment within 2 weeks' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
                    <p className="text-right text-sm font-semibold text-slate-950">{value}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/projects/water-conservation/register"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold text-white transition hover:opacity-90"
                style={{ background: BLUE }}
              >
                Register now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
