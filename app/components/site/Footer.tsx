"use client";
import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/app/components/LanguageProvider";

export function Footer() {
  const { language, setLanguage } = useLanguage();
  const languages: { code: "en" | "hi"; label: string }[] = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
  ];
  return (
    <footer
      className="relative mt-24"
      style={{
        background: "var(--secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-9 w-9 grid place-items-center rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/SDG_LOGO-removebg-preview.png" alt="SDG Logo" className="h-full w-full object-contain" />
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "var(--muted-text)" }}>
            Uniting students, schools, NGOs and companies to build a better,
            sustainable and inclusive world.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full transition"
                style={{ border: "1px solid var(--border)", color: "var(--muted-text)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cyan-glow)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-glow)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted-text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Quick Links</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--muted-text)" }}>
            {([["/", "Home"], ["/about", "About Us"], ["/sdg", "SDG"], ["/partners", "Partners"], ["/contact", "Contact"]] as [string, string][]).map(([to, label]) => (
              <li key={to}>
                <Link href={to} className="transition hover:opacity-100" style={{ color: "var(--muted-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-glow)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--foreground)" }}>Languages</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--muted-text)" }}>
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => setLanguage(l.code)}
                  className="transition hover:opacity-100"
                  style={{ color: language === l.code ? "var(--cyan-glow)" : "var(--muted-text)" }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-5 text-center text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--muted-text)" }}>
        © {new Date().getFullYear()} StepUp for SDG. All rights reserved.
      </div>
    </footer>
  );
}
