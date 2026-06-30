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
<<<<<<< HEAD
    <footer className="relative mt-24" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #020814 100%)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
=======
    <footer className="relative mt-24" style={{ background: "linear-gradient(180deg, var(--secondary) 0%, #020814 100%)", borderTop: "1px solid var(--border)" }}>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-12">

        {/* Brand col */}
        <div className="md:col-span-4 flex flex-col items-start gap-6">
          <Link href="/" className="inline-block -ml-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full overflow-hidden bg-white">
              <img
                src="/assets/SDG_LOGO-removebg-preview.png"
                alt="StepUp for SDG"
                className="h-full w-full object-contain [filter:none] opacity-100 [mix-blend-mode:normal]"
              />
            </span>
          </Link>
<<<<<<< HEAD
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#94a3b8" }}>
=======
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted-text)" }}>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
            Uniting students, schools, NGOs and companies to build a better, sustainable and inclusive world.
          </p>
          <div className="flex gap-3">
            {[Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-10 w-10 grid place-items-center rounded-full transition-all duration-200"
<<<<<<< HEAD
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8" }}
=======
                style={{ border: "1px solid var(--border)", color: "var(--muted-text)" }}
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,194,255,0.08)";
                }}
                onMouseLeave={(e) => {
<<<<<<< HEAD
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
=======
                  (e.currentTarget as HTMLElement).style.color = "var(--muted-text)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
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
<<<<<<< HEAD
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Quick Links</h4>
=======
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Quick Links</h4>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
          <ul className="space-y-3 text-sm">
            {([
              ["/", "Home"],
              ["/about", "About Us"],
              ["/events", "Events"],
              ["/sdg", "SDG"],
              ["/partners", "Partners"],
              ["/contact", "Contact"],
            ] as [string, string][]).map(([to, label]) => (
                <li key={to}>
                  <Link
                    href={to}
                    className="transition-colors duration-200 hover:pl-1"
<<<<<<< HEAD
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-glow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
=======
                    style={{ color: "var(--muted-text)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-glow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
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
<<<<<<< HEAD
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Who We Serve</h4>
          <ul className="space-y-3 text-sm">
            {["Companies", "NGOs", "Volunteers"].map((item) => (
              <li key={item} style={{ color: "#94a3b8" }}>{item}</li>
            ))}
            <li style={{ color: "#94a3b8" }}>
              Schools<br /><span className="mt-3 block">Universities / Colleges</span>
            </li>
=======
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Who We Serve</h4>
          <ul className="space-y-3 text-sm">
            {["Companies", "Schools / Universities / Colleges", "NGOs", "Volunteers"].map((item) => (
              <li key={item} style={{ color: "var(--muted-text)" }}>{item}</li>
            ))}
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
          </ul>
        </div>

        {/* Languages + Contact */}
        <div className="md:col-span-3">
<<<<<<< HEAD
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Languages</h4>
=======
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "var(--foreground)" }}>Languages</h4>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
          <ul className="space-y-3 text-sm mb-8">
            {languages.map((l) => (
              <li key={l.code}>
                <button
                  onClick={() => setLanguage(l.code)}
                  className="transition-colors duration-200"
<<<<<<< HEAD
                  style={{ color: language === l.code ? "var(--cyan-glow)" : "#94a3b8" }}
=======
                  style={{ color: language === l.code ? "var(--cyan-glow)" : "var(--muted-text)" }}
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
<<<<<<< HEAD
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#f1f5f9" }}>Contact</h4>
          <div className="flex flex-col gap-1.5 text-sm" style={{ color: "#94a3b8" }}>
            <p>contact@stepupforsdg.org</p>
            <p>info@stepupforsdg.org</p>
            <p>partner@stepupforsdg.org</p>
          </div>
=======
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "var(--foreground)" }}>Contact</h4>
          <p className="text-sm" style={{ color: "var(--muted-text)" }}>hello@stepupforsdg.org</p>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5 px-6"
<<<<<<< HEAD
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "#94a3b8" }}>
=======
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "var(--muted-text)" }}>
>>>>>>> 209ba8992e49e77b121623b98a6243fe1d57f13a
          <span>© {new Date().getFullYear()} StepUp for SDG. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
