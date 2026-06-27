import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./FadeUp";

export function VisionBanner() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center border border-border"
               style={{ background: "radial-gradient(ellipse at top, rgba(21,93,252,0.4), rgba(5,11,24,0.9))" }}>
            <div className="stars-layer opacity-50" />
            <span className="text-xs uppercase tracking-[0.3em] text-cyan-glow">United for Tomorrow</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold grad-text">UNITE 2030 Vision</h2>
            <p className="mt-5 max-w-2xl mx-auto text-muted-text">
              Building a future through collaboration, education, innovation and community-driven impact.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/partners" className="btn-arrow inline-flex items-center gap-2 bg-cta text-white font-semibold rounded-full px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition">
                Become a Partner <ArrowRight className="arr h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-cyan-glow/60 text-white rounded-full px-6 py-3 hover:bg-cyan-glow/10 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}