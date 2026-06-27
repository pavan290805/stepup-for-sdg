"use client";
import Link from "next/link";
import { Linkedin, Instagram, ArrowRight } from "lucide-react";
import { useLanguage } from "@/app/components/LanguageProvider";

export function Footer() {
  const { language, setLanguage } = useLanguage();
  const languages: { code: "en" | "hi"; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
  ];

  return (
    <footer className="relative mt-24" style={{ background: "linear-gradient(180deg, var(--secondary) 0%, #020814 100%)", borderTop: "1px solid var(--border)" }}>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-12">

        {/* Brand col */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/SDG_LOGO-removebg-preview.png"
              alt="StepUp for SDG"
              className="h-20 w-52 object-contain"
            />
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted-text)" }}>
            Uniting students, schools, NGOs and companies to build a better, sustainable and inclusive world.
          </p>
          <div className="flex gap-3">
            {[Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full transition-all duration-200"
                style={{ border: "1px solid var(--border)", color: "var(--muted-text)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,194,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--muted-text)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {(["/", "Home"], ["/about", "About Us"], ["/events", "Events"], ["/sdg", "SDG"], ["/partners", "Partners"], ["/contact", "Contact"]) &&
              ([["/" , "Home"], ["/about", "About Us"], ["/events", "Events"], ["/sdg", "SDG"], ["/partners", "Partners"], ["/contact", "Contact"]] as [string, string][]).map(([to, label]) => (
                <li key={to}>
                  <Link
                    href={to}
                    className="transition-colors duration-200 hover:pl-1"
                    style={{ color: "var(--muted-text)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-glow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}
                  >
                    {label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Who We Serve */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Who We Serve</h4>
          <ul className="space-y-3 text-sm">
            {["Companies & CSR", "Schools / Colleges", "NGOs", "Volunteers", "Communities"].map((item) => (
              <li key={item} style={{ color: "var(--muted-text)" }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Languages + Contact */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Languages</h4>
          <ul className="space-y-3 text-sm mb-8">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => setLanguage(l.code)}
                  className="transition-colors duration-200"
                  style={{ color: language === l.code ? "var(--cyan-glow)" : "var(--muted-text)" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--foreground)" }}>Contact</h4>
          <p className="text-sm" style={{ color: "var(--muted-text)" }}>hello@stepupforsdg.org</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5 px-6"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
          <span>© {new Date().getFullYear()} StepUp for SDG. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
