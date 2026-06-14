import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, HeartHandshake, School } from 'lucide-react'
import { Reveal } from '@/components/reveal'

function FloatingBadge({
  icon,
  title,
  subtitle,
  className,
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  className?: string
}) {
  return (
    <div
      className={`glass-surface absolute hidden max-w-[18rem] items-center gap-3 rounded-3xl border border-border px-4 py-3 shadow-xl backdrop-blur-xl lg:flex ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-navy">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background/90 py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_45%),radial-gradient(circle_at_top_right,rgba(0,102,204,0.08),transparent_40%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/5">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Students <span className="text-slate-300">|</span> Companies <span className="text-slate-300">|</span>{' '}
                NGOs
              </div>
              <h1 className="mt-8 text-5xl font-semibold tracking-tight text-navy sm:text-6xl">
                Empowering Education Through Partnerships
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
                Connecting schools, NGOs, companies and communities to create measurable impact for SDG 4.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
                >
                  Join as School
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-white p-6 shadow-[0_40px_120px_rgba(15,23,42,0.08)]">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 p-4">
                <Image
                  src="/images/hero-sdg.png"
                  alt="Students, a school and globe representing sustainable development education partnerships"
                  width={760}
                  height={680}
                  priority
                  className="h-auto w-full rounded-[1.5rem] object-cover"
                />
              </div>
              <FloatingBadge
                icon={<School className="h-5 w-5" />}
                title="Better Education"
                subtitle="Better Future"
                className="-left-4 top-6"
              />
              <FloatingBadge
                icon={<School className="h-5 w-5" />}
                title="Better Education"
                subtitle="Better Future"
                className="-left-3 top-6"
              />
              <FloatingBadge
                icon={<HeartHandshake className="h-5 w-5" />}
                title="Stronger Communities"
                subtitle="Shared growth"
                className="right-3 top-16"
              />
            </div>
