'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Award, BadgeCheck, Briefcase, CalendarDays, CheckCircle2, Clock, HeartHandshake, MapPin, Sparkles, Users } from 'lucide-react';
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

export default function FellowshipPage() {
  const [statement, setStatement] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!statement.trim()) return;
    setSubmitted(true);
  }

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>

      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden text-white"
        style={{ background: 'var(--navy)' }}
      >
        {/* background image */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: "url('/sdg/cg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* overlays */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,11,24,0.96) 0%, rgba(5,11,24,0.82) 40%, rgba(16,29,51,0.42) 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 -z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(5,11,24,1) 0%, rgba(5,11,24,0.5) 48%, transparent 100%)',
          }}
        />

        <div className="mx-auto max-w-[1460px] px-5 py-20 md:px-8 md:py-28">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition hover:text-white mb-10"
          >
            ← All projects
          </Link>

          <FadeUp>
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-4"
              style={{ color: 'var(--gold)' }}
            >
              Fellowship Program
            </p>
            <h1
              className="text-[2.8rem] leading-[1.05] text-white md:text-[4.2rem] max-w-3xl"
              style={{ fontFamily: headingFont }}
            >
              Turn a certificate<br />
              into a{' '}
              <span style={{ color: 'var(--gold)' }}>fellowship.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">
              The StepUp Fellowship is for certificate holders who want to go further —
              mentorship, community, and a direct line to internships with our partner organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
                style={{
                  background: 'var(--cta)',
                  boxShadow: '0 18px 40px -20px rgba(255,122,0,0.7)',
                }}
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#internships"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                View Internships
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Eligibility + Benefits ── */}
      <section className="mx-auto max-w-[1460px] px-5 py-16 md:px-8 md:py-20">
        <FadeUp>
          <div className="grid gap-8 lg:grid-cols-2">

            {/* Eligibility */}
            <div
              className="rounded-[24px] p-8"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 22px 50px -30px rgba(21,93,252,0.18)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: 'color-mix(in srgb, var(--electric) 12%, var(--card) 88%)', color: 'var(--electric)' }}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)', fontFamily: headingFont }}>
                  Eligibility
                </h2>
              </div>
              <ul className="space-y-4">
                {ELIGIBILITY.map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'var(--electric)' }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div
              className="rounded-[24px] p-8"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 22px 50px -30px rgba(21,93,252,0.18)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-2xl"
                  style={{ background: 'color-mix(in srgb, var(--cta) 12%, var(--card) 88%)', color: 'var(--cta)' }}
                >
                  <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--foreground)', fontFamily: headingFont }}>
                  What you get
                </h2>
              </div>
              <ul className="space-y-4">
                {BENEFITS.map(({ icon: Icon, text }, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0" style={{ color: 'var(--cta)' }} />
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--muted-text)' }}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </FadeUp>
      </section>

      {/* ── Application Form ── */}
      <section id="apply" className="mx-auto max-w-[1460px] px-5 pb-16 md:px-8 md:pb-20">
        <FadeUp>
          <div
            className="rounded-[28px] p-8 md:p-10"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: '0 28px 60px -36px rgba(21,93,252,0.22)',
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ background: 'color-mix(in srgb, var(--electric) 12%, var(--card) 88%)', color: 'var(--electric)' }}
              >
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: headingFont }}>
                Apply for the fellowship
              </h2>
            </div>
            <p className="mb-8 text-sm" style={{ color: 'var(--muted-text)' }}>
              Takes less than 2 minutes. We'll reach out within 3 business days.
            </p>

            {submitted ? (
              <div
                className="flex flex-col items-center gap-3 rounded-2xl py-12 text-center"
                style={{ background: 'color-mix(in srgb, var(--electric) 6%, var(--card) 94%)' }}
              >
                <CheckCircle2 className="h-10 w-10" style={{ color: 'var(--electric)' }} />
                <p className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Application submitted!</p>
                <p className="text-sm" style={{ color: 'var(--muted-text)' }}>We'll be in touch within 3 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Statement of interest
                  </label>
                  <textarea
                    value={statement}
                    onChange={(e) => setStatement(e.target.value)}
                    placeholder="Tell us which course you completed and why the fellowship interests you..."
                    rows={5}
                    required
                    className="w-full rounded-xl p-4 text-sm outline-none transition focus:ring-2"
                    style={{
                      background: 'var(--input)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground)',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      // @ts-ignore
                      '--tw-ring-color': 'var(--electric)',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
                  style={{
                    background: 'var(--electric)',
                    boxShadow: '0 14px 32px -16px rgba(21,93,252,0.55)',
                  }}
                >
                  Submit application <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </FadeUp>
      </section>

      {/* ── Internships ── */}
      <section
        id="internships"
        className="py-16 md:py-20"
        style={{ background: 'color-mix(in srgb, var(--electric) 4%, var(--background) 96%)' }}
      >
        <div className="mx-auto max-w-[1460px] px-5 md:px-8">
          <FadeUp>
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-2"
              style={{ color: 'var(--gold)' }}
            >
              Open Roles
            </p>
            <h2
              className="text-3xl font-bold md:text-4xl mb-2"
              style={{ color: 'var(--foreground)', fontFamily: headingFont }}
            >
              Internships open to fellows
            </h2>
            <p className="text-sm mb-10" style={{ color: 'var(--muted-text)' }}>
              Visible once your fellowship application is approved.
            </p>
          </FadeUp>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INTERNSHIPS.map((role, i) => (
              <FadeUp key={role.id} delay={i * 80}>
                <div
                  className="group flex flex-col rounded-[22px] p-6 transition-all duration-300 hover:-translate-y-1.5"
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 18px 40px -28px rgba(21,93,252,0.18)',
                  }}
                >
                  {/* SDG badge + location */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center justify-center rounded-lg text-xs font-bold text-white"
                      style={{ background: role.sdgColor, width: 32, height: 32 }}
                    >
                      {role.sdgNumber}
                    </span>
                    <span
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        background: 'color-mix(in srgb, var(--electric) 8%, var(--card) 92%)',
                        color: 'var(--electric)',
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      {role.location}
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-1" style={{ color: 'var(--foreground)' }}>
                    {role.role}
                  </h3>
                  <p className="text-sm mb-4 flex-1" style={{ color: 'var(--muted-text)' }}>
                    {role.organization}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--muted-text)' }}>
                      <Clock className="h-3.5 w-3.5" />
                      {role.duration}
                    </span>
                    <button
                      className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                      style={{ background: 'var(--electric)' }}
                    >
                      Apply <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="mx-auto max-w-[1460px] px-5 py-16 md:px-8 md:py-20">
        <FadeUp>
          <div
            className="rounded-[30px] px-8 py-10 text-white md:px-12 md:py-12"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 45%, #0369a1 100%)',
              boxShadow: '0 28px 60px -36px rgba(29,78,216,0.55)',
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2
                  className="text-[2rem] leading-tight md:text-[2.5rem]"
                  style={{ fontFamily: headingFont }}
                >
                  Ready to take the next step?
                </h2>
                <p className="mt-2 max-w-xl text-base leading-7 text-white/75">
                  Join the StepUp Fellowship and turn your learning into real-world impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#apply"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:brightness-105"
                  style={{ background: 'var(--cta)', boxShadow: '0 18px 40px -20px rgba(255,122,0,0.7)' }}
                >
                  Apply Now <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  All Projects
                </Link>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
