"use client"

import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

export default function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* left content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-slate-900 dark:text-white">
              {t("Students, Companies and NGOs for SDG Impact")}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              {t("Connecting schools, NGOs, companies and communities to improve education through SDG 4.") || t("Students, Companies and NGOs for SDG Impact")}
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#get-involved" className="rounded-full bg-blue-600 dark:bg-cyan-500 px-5 py-2 text-sm font-semibold text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors">{t("Partner With Us")}</a>
              <a href="/contact" className="rounded-full border border-slate-300 dark:border-slate-600 px-5 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">{t("Join the School")}</a>
            </div>
          </div>

          {/* right image */}
          <div>
            <Image
              src="/images/hero-sdg.png"
              alt="StepUp SDG Hero"
              width={900}
              height={600}
              className="w-full rounded-3xl shadow-2xl object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
