"use client";
import Link from "next/link";

export function Footer() {

  return (
    <footer className="relative mt-0" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #020814 100%)", borderTop: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4">

        {/* Brand col */}
        <div className="flex flex-col items-start gap-6">
          <Link href="/" className="inline-block -ml-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="inline-flex h-24 w-24 items-center justify-center rounded-full overflow-hidden bg-white">
              <img
                src="/assets/SDG_LOGO-removebg-preview.png"
                alt="StepUp for SDG"
                className="h-full w-full object-contain [filter:none] opacity-100 [mix-blend-mode:normal]"
              />
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#94a3b8" }}>
            Educating students on the UN Sustainable Development Goals, empowering them to adopt sustainable lifestyles, make informed choices, explore meaningful careers, and drive positive change in their families and communities.
          </p>
          <div className="flex gap-3">
            {[
              { href: "#", label: "LinkedIn", svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
              { href: "#", label: "Instagram", svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> },
            ].map(({ href, label, svg }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="h-10 w-10 grid place-items-center rounded-full transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#94a3b8" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan-glow)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(0,194,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {svg}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Quick Links</h4>
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
                    style={{ color: "#94a3b8" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan-glow)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                  >
                    {label}
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>

        {/* Who We Serve */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Who We Serve</h4>
          <ul className="space-y-3 text-sm">
            {["Companies", "Schools", "NGOs", "Volunteers", "Universities", "Colleges"].map((item) => (
              <li key={item} style={{ color: "#94a3b8" }}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.15em] mb-5" style={{ color: "#f1f5f9" }}>Contact</h4>
          <div className="flex flex-col gap-1.5 text-sm" style={{ color: "#94a3b8" }}>
            <p>contact@stepupforsdg.org</p>
            <p>info@stepupforsdg.org</p>
            <p>partner@stepupforsdg.org</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-5 px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 text-xs" style={{ color: "#94a3b8" }}>
          <span>© {new Date().getFullYear()} Pavdhan foundation. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
