import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe2 } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/sdg", label: "SDG" },
  { to: "/partners", label: "Partners" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan-glow shadow-[0_0_24px_rgba(0,194,255,0.5)]">
            <Globe2 className="h-5 w-5 text-white" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
        
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-cyan-glow" }}
              inactiveProps={{ className: "text-muted-text hover:text-white" }}
              className="text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/partners"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-cta px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(255,122,0,0.45)] hover:brightness-110 transition"
        >
          Work With Us
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 px-6 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-muted-text hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}