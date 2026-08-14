'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Globe2,
  GraduationCap,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { FadeUp } from '@/app/components/site/FadeUp';

const headingFont = '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif';

const TOP_STATS = [
  { label: 'UN SDGs', value: '17' },
  { label: 'Free courses', value: '12+' },
  { label: 'Impact', value: '∞' },
];

const PATHWAY_STEPS = [
  {
    icon: BookOpen,
    title: 'Learn the SDGs',
    description:
      'Watch a curated introductory video on the UN’s 2030 Agenda for Sustainable Development.',
  },
  {
    icon: GraduationCap,
    title: 'Enroll in UN Courses',
    description:
      'Access 12+ official free courses from UN SDG Learn and UN Women aligned with each SDG.',
  },
  {
    icon: ShieldCheck,
    title: 'Get Verified',
    description:
      'Upload your official UN certificate for verification and unlock the “Verified” badge on your profile.',
  },
];

const IMPACT_METRICS = [
  { label: 'Learners', value: '10,000+', icon: Users },
  { label: 'Countries', value: '190+', icon: Globe2 },
  { label: 'SDG Tracks', value: '17', icon: Trophy },
  { label: 'Verified Courses', value: '100%', icon: CheckCircle2 },
];

const FORM_FEATURES = [
  'Instant access to the introductory SDG lesson',
  '12+ free official UN course pathway',
  'Certificate upload & verification',
];

export default function SustainabilityEducationPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [organization, setOrganization] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !country.trim() || !organization.trim()) {
      setErrorMessage('Please fill out all fields before continuing.');
      return;
    }
    router.push('/projects/sustainability-education/lesson');
  }

  return (
    <div className="bg-[#f0f9ff] text-slate-950">
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute inset-x-0 top-0 h-48 bg-[#f0f9ff]" />
        <div className="mx-auto max-w-365 px-5 lg:px-8 relative">
          <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeUp>
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl" style={{ fontFamily: headingFont }}>
                  Sustainable <span className="text-[#0fae83]">Education</span> Program
                </h1>
                <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  A free global learning journey to master the 17 UN Sustainable Development Goals through curated video lessons, official UN internship courses, and verifiable certification.
                </p>

                <div className="mt-10">
                  <a
                    href="#start"
                    className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-[#0fae83] to-[#1f80ff] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:from-[#0d9d76] hover:to-[#1a72e6]"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  {TOP_STATS.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-4xl font-semibold text-slate-950">{stat.value}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            <FadeUp>
              <div className="relative mx-auto w-full max-w-2xl">
                <div className="rounded-[32px] border border-slate-200 bg-white p-1 shadow-2xl shadow-slate-400/10">
                  <div className="overflow-hidden rounded-[30px]">
                    <Image
                      src="/id.jpg"
                      alt="Student reading a book in a field"
                      width={1080}
                      height={720}
                      className="h-120 w-full object-cover"
                    />
                  </div>
                  <div className="-mt-14 rounded-[24px] border border-white bg-white/95 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-sm">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-950">Join learners from 190+ countries</p>
                        <p className="mt-1 text-sm text-slate-500">Certified pathways to real UN internships.</p>
                      </div>
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0fae83] text-white">
                        <Globe2 className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-365 px-5 pb-24 lg:px-8">
        <FadeUp>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.36em] text-[#0fae83]">A structured pathway to global impact</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Three simple steps take you from curiosity to a UN-recognized certification pathway.
            </h2>
          </div>
        </FadeUp>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PATHWAY_STEPS.map((step, idx) => (
            <FadeUp key={step.title} delay={idx * 80}>
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-xl">
                <div className="absolute right-6 top-6">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
                    STEP {idx + 1}
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E6FBF6] text-[#0fae83] shadow-sm">
                    <step.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-slate-950 text-center">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600 text-center">{step.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-linear-to-r from-[#0d9488] via-[#059669] to-[#2563eb] py-16 text-white">
        <div className="mx-auto max-w-365 px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-4">
            {IMPACT_METRICS.map((metric) => (
              <div key={metric.label} className="rounded-[28px] bg-white/10 px-6 py-8 text-center shadow-xl shadow-slate-950/10">
                <metric.icon className="mx-auto h-7 w-7 text-white" />
                <p className="mt-5 text-3xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/80">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="start" className="mx-auto max-w-365 px-5 py-24 lg:px-8">
        <FadeUp>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-teal-700">
                New Registration
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Begin your SDG journey today.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Register once and unlock the full learning path, SDG video lessons, official UN internship courses, and certificate verification.
              </p>

              <ul className="mt-8 space-y-4">
                {FORM_FEATURES.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[32px] border border-[#0fae83]/20 bg-white p-10 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.15)]">
              {submitted ? (
                <div className="rounded-[28px] bg-[#ECFDF5] p-10 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#047857]" />
                  <h3 className="mt-6 text-2xl font-semibold text-slate-950">You’re registered!</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    We have received your details. Our team will contact you with the next steps.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMessage}
                    </div>
                  ) : null}
                  <div className="space-y-5">
                    <label className="block text-sm font-semibold text-slate-900">
                      Full Name
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="Jane Doe"
                        required
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-900">
                      Email Address
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="jane@example.org"
                        required
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-900">
                      Phone
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="+1 555 123 4567"
                        required
                      />
                    </label>
                    <label className="block text-sm font-semibold text-slate-900">
                      Country
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                        placeholder="Kenya"
                        required
                      />
                    </label>
                  </div>

                  <label className="block text-sm font-semibold text-slate-900">
                    Institution / Organization
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="mt-2 w-full rounded-[18px] border border-[#D7EFD9] bg-[#F8FFF9] px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 focus:border-[#0fae83] focus:ring-2 focus:ring-[#0fae83]/10"
                      placeholder="University of Nairobi"
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#0fae83] to-[#1f80ff] px-6 py-3 text-base font-semibold text-white shadow-[0_20px_35px_-18px_rgba(15,23,42,0.4)] transition duration-200 hover:shadow-[0_24px_40px_-18px_rgba(15,23,42,0.45)]"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    By registering you agree to receive course updates.
                  </p>
                </form>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/projects/sustainability-education/courses"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#0fae83] to-[#1f80ff] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/15 transition hover:opacity-95"
            >
              Get Verified
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
