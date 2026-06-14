"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageMenu } from "@/components/language-menu"
import { useLanguage } from "@/components/language-provider"

const navItems = [
  { key: "Home", href: "/" },
  { key: "About Us", href: "/about" },
  { key: "SDG", href: "/sdg" },
  { key: "Partners", href: "/partners" },
  { key: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === "/") return pathname === "/"
    return pathname === href || pathname.startsWith(href + "/")
  }

  const { t } = useLanguage()

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-sm shadow-slate-900/5 backdrop-blur-xl"
          : "border-transparent bg-transparent backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Logo className="max-w-[212px]" />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                isActive(item.href) 
                  ? "text-blue-600 dark:text-cyan-400" 
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageMenu />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-blue-600 dark:bg-cyan-500 px-4 py-2 text-sm font-semibold text-white dark:text-slate-900 transition-all duration-300 hover:bg-blue-700 dark:hover:bg-cyan-400 lg:inline-flex"
          >
            {t("Get Involved")}
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="flex flex-col gap-1 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl px-3 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
