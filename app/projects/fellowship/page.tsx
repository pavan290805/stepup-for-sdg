'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Clock, HeartHandshake, MapPin, Search, Sparkles, Users } from 'lucide-react';
import { FadeUp } from '@/app/components/site/FadeUp';

const headingFont = '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

interface Internship {
  id: string;
  role: string;
  organization: string;
  location: string;
  sdgNumber: number;
  sdgColor: string;
  duration: string;
}

const BENEFITS = [
  { icon: BadgeCheck, text: 'A named fellowship credential added to your StepUp profile' },
  { icon: Briefcase, text: 'Direct access to internship listings from StepUp partner organizations' },
  { icon: Users, text: 'Mentorship check-ins with the StepUp program team' },
  { icon: Sparkles, text: 'Priority invitations to StepUp events and workshops' },
];

const ELIGIBILITY = [
  { icon: Award, text: 'Hold at least one active StepUp course certificate' },
  { icon: CheckCircle2, text: 'Submit a short statement of interest' },
  { icon: CalendarDays, text: 'Be available for a 15-minute intro call' },
];

const INTERNSHIPS: Internship[] = [
  {
    id: 'water-conservation-field',
    role: 'Water Conservation Field Associate',
    organization: 'Partner NGO — River Basin Trust',
    location: 'Hybrid',
    sdgNumber: 6,
    sdgColor: '#26BDE2',
    duration: '3 months',
  },
  {
    id: 'climate-data-intern',
    role: 'Climate Data Intern',
    organization: 'Partner NGO — Climate Watch',
    location: 'Remote',
    sdgNumber: 13,
    sdgColor: '#3F7E44',
    duration: '2 months',
  },
  {
    id: 'urban-sustainability-intern',
    role: 'Urban Sustainability Intern',
    organization: 'Partner Org — City Renewal Cell',
    location: 'On-site',
    sdgNumber: 11,
    sdgColor: '#FD9D24',
    duration: '4 months',
  },
];

type Opportunity = {
  id: string;
  title: string;
  organization: string;
  category: string;
  verified: boolean;
  location: string;
  duration: string;
  closes: string;
  compensation: string;
  domain: string;
};

const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'ocean-stewardship',
    title: 'Ocean Stewardship Fellowship',
    organization: 'Blue Horizon Network',
    category: 'FELLOWSHIP',
    verified: false,
    location: 'International · Remote',
    duration: '3–6 months',
    closes: '9 Apr',
    compensation: 'Unpaid',
    domain: 'Ocean & Marine Conservation',
  },
  {
    id: 'circular-cities-design',
    title: 'Circular Cities Design Intern',
    organization: 'ReLoop Collective',
    category: 'INTERNSHIP',
    verified: true,
    location: 'Bengaluru, India',
    duration: '3 months',
    closes: '17 Apr',
    compensation: 'Paid',
    domain: 'Circular Economy',
  },
  {
    id: 'climate-data-policy',
    title: 'Climate Data & Policy Fellow',
    organization: 'Terra Nova Institute',
    category: 'FELLOWSHIP',
    verified: true,
    location: 'Remote · India',
    duration: '6 months',
    closes: '28 May',
    compensation: 'Stipend',
    domain: 'Climate Change',
  },
  {
    id: 'clean-energy-access',
    title: 'Clean Energy Access Associate',
    organization: 'Sunrise Commons',
    category: 'RESEARCH',
    verified: true,
    location: 'New Delhi, India',
    duration: '12 months',
    closes: '12 Jun',
    compensation: 'Scholarship',
    domain: 'Renewable Energy',
  },
];

export default function FellowshipPage() {
  const [statement, setStatement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!statement.trim()) return;
    setSubmitted(true);
  }

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* ── Hero ── */}
      <section className="bg-[#F8FAF4] text-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-16 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-20">
          <div className="max-w-2xl">
            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Build your future. <span className="text-[#14532d]">Create real-world impact.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Find fellowships, internships, and research opportunities with teams shaping a more sustainable world.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#opportunities"
                className="inline-flex items-center justify-center rounded-full bg-[#0f3e1f] px-8 py-4 text-sm font-semibold text-white shadow-[0_15px_40px_-25px_rgba(15,23,42,0.3)] transition hover:bg-[#164e28]"
              >
                Explore opportunities
              </a>
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-full border border-[#0f3e1f] bg-white px-8 py-4 text-sm font-semibold text-[#0f3e1f] transition hover:bg-slate-50"
              >
                Post a fellowship
              </a>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] bg-white px-6 py-6 text-center shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">4+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">opportunities</p>
              </div>
              <div className="rounded-[28px] bg-white px-6 py-6 text-center shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">4+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">organizations</p>
              </div>
              <div className="rounded-[28px] bg-white px-6 py-6 text-center shadow-sm">
                <p className="text-3xl font-semibold text-slate-950">4+</p>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-slate-500">impact domains</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:max-w-[52rem] lg:-mr-16">
            <div className="relative overflow-visible rounded-[44px] p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.18)] lg:-mr-14">
              <div className="absolute inset-0 rounded-[40px] border border-[#dce8db]" />
              <div className="absolute -top-4 -left-4 h-full w-full rounded-[40px] border border-[#d7e6d9] bg-white/0" />
              <div className="relative overflow-hidden rounded-[34px] border border-[#ebf3ec] bg-white">
                <div className="relative aspect-[5/4] w-full">
                  <Image
                    src="/fellowship.png"
                    alt="Fellowship image"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="opportunities" className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_0.5fr] lg:items-end">
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Opportunities with purpose built in.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 lg:text-right">
            Every listing is a chance to learn, contribute, and move the needle on the issues that matter.
          </p>
        </div>

        <div className="mt-10 grid gap-4 xl:grid-cols-[1.75fr_0.9fr_0.9fr_0.9fr]">
          <label className="relative block rounded-[18px] border border-slate-200 bg-white px-4 py-4 shadow-sm focus-within:border-slate-900">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="search"
              placeholder="Search roles, organizations, or skills"
              className="w-full rounded-[18px] border-none bg-transparent pl-11 text-sm text-slate-950 outline-none placeholder:text-slate-400"
            />
          </label>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>All domains</option>
            <option>Ocean & Marine</option>
            <option>Climate</option>
          </select>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>All types</option>
            <option>Fellowship</option>
            <option>Internship</option>
            <option>Research</option>
          </select>
          <select className="rounded-[18px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-900">
            <option>Closing soon</option>
            <option>Newest</option>
            <option>Verified</option>
          </select>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">4 opportunities</p>
          <p className="text-sm text-slate-500">Curated for your impact journey</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {OPPORTUNITIES.map((opportunity) => (
            <article key={opportunity.id} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                  {opportunity.title.split(' ').map((word) => word[0]).slice(0,2).join('')}
                </span>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100">
                  <span className="text-xs">☆</span>
                </button>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">
                  {opportunity.category}
                </span>
                {opportunity.verified && (
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Verified</span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-950">{opportunity.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{opportunity.organization}</p>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  {opportunity.location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  {opportunity.duration}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-sm text-slate-600">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Closes</p>
                  <p className="mt-1 font-semibold text-slate-950">{opportunity.closes}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{opportunity.compensation}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <p>{opportunity.domain}</p>
                <Link href={`/projects/${opportunity.id}`} className="font-semibold text-slate-950 transition hover:text-slate-700">
                  View details <ArrowRight className="ml-1 inline-block h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
