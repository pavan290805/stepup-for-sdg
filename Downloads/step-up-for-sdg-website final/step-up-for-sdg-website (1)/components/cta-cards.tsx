"use client"

import Link from "next/link"
import { ArrowRight, Building2, GraduationCap, HeartHandshake } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/components/language-provider"

const cards = [
  {
    icon: Building2,
    title: "Companies",
    desc: "Channel CSR funding into transparent, measurable education programs and track impact in real time.",
    cta: "Explore Partnership",
    iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    desc: "Join our network to access resources, infrastructure support and quality learning programs.",
    cta: "Join as School",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: HeartHandshake,
    title: "NGOs",
    desc: "Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.",
    cta: "Collaborate Now",
    iconBg: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
]

export function CtaCards() {
  const { t } = useLanguage()
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-400">
          {t("Get Involved")}
        </p>
        <h2 className="mb-3 text-center font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
          {t("Partner With Us")}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Whether you are a company, a school or an NGO, there is a meaningful
          way to create impact together.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <div className="group flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div
                className={`flex h-13 w-13 items-center justify-center rounded-xl p-3 ${c.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <c.icon className="h-6 w-6" />
              </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-slate-900 dark:text-white">
                {t(c.title)}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {c.desc}
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-cyan-400 transition-colors hover:text-blue-700 dark:hover:text-cyan-300"
              >
                {t(c.cta)} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
