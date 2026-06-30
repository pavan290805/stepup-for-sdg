import { Link } from "@tanstack/react-router";
import { Globe2, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-deep-blue/60 backdrop-blur-xl mt-24">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-electric to-cyan-glow">
              <Globe2 className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-semibold">StepUp <span className="text-cyan-glow">for SDG</span></span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-muted-text leading-relaxed">
            Uniting students, schools, NGOs and companies to build a better, sustainable and inclusive world.
          </p>
          <div className="mt-5 flex gap-3">
            {[Linkedin, Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-border text-muted-text hover:text-cyan-glow hover:border-cyan-glow transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-text">
            {[["/", "Home"], ["/about", "About Us"], ["/sdg", "SDG"], ["/partners", "Partners"], ["/contact", "Contact"]].map(([to, label]) => (
              <li key={to}><Link to={to as any} className="hover:text-cyan-glow transition">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-4">Languages</h4>
          <ul className="space-y-2 text-sm text-muted-text">
            <li>English</li><li>Telugu</li><li>Hindi</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-text">
        © {new Date().getFullYear()} StepUp for SDG. All rights reserved.
      </div>
    </footer>
  );
}