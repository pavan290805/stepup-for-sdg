"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.84a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  )
}

const quickLinks: [string, string][][] = [
  [
    ["Home", "/"],
    ["About Us", "/about"],
    ["SDG", "/sdg"],
  ],
  [
    ["Partners", "/partners"],
    ["Contact", "/contact"],
  ],
]

export function SiteFooter() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo-sdg.png"
              alt="StepUp for SDG logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-lg font-extrabold text-blue-600 dark:text-cyan-400">
                StepUp
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
                for SDG
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Uniting students, schools, NGOs and companies to build a better,
            sustainable and inclusive world.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            {t("Quick Links")}
          </h4>
          <div className="mt-4 flex gap-10">
            {quickLinks.map((col, i) => (
              <ul key={i} className="space-y-2">
                {col.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-600 dark:text-slate-400 transition-colors hover:text-blue-600 dark:hover:text-cyan-400"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            Follow Us
          </h4>
          <div className="mt-4 flex gap-3">
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 dark:bg-orange-500 text-white dark:text-slate-900 hover:bg-orange-700 dark:hover:bg-orange-400 transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500 text-white dark:text-slate-900 hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href="#"
              aria-label="X"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 dark:bg-slate-300 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              <span className="text-sm font-bold">𝕏</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-white">
            {t("Languages")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>• {t("English")}</li>
            <li>• {t("Telugu")}</li>
            <li>• {t("Hindi")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 py-5">
        <p className="text-center text-xs text-slate-600 dark:text-slate-400">
          © 2025 StepUp for SDG. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
