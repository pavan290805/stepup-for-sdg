"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Counter } from "@/app/components/site/Counter";
import { FadeUp } from "@/app/components/site/FadeUp";
import { useEffect, useState } from "react";

// Simple metric data
const metrics = [
  { value: 1240, suffix: "+", label: "Schools Supported", color: "#155DFC" },
  { value: 380000, suffix: "+", label: "Students Enrolled", color: "#00B050" },
  { value: 560, suffix: "+", label: "Projects Completed", color: "#00A8A8" },
  { value: 45000, suffix: "+", label: "Volunteer Hours", color: "#FF7A00" },
];

export default function HeroSection() {
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  useEffect(() => {
    // Dynamically import particles to avoid SSR issues
    let cleanup: (() => void) | undefined;

    import("@tsparticles/react").then(({ default: Particles }) => {
      import("@tsparticles/slim").then(({ loadSlim }) => {
        setParticlesLoaded(true);
      });
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
      {/* Animated particle background using CSS fallback */}
      <div className="absolute inset-0 hero-bg" />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-3xl text-center px-4 py-12" style={{ animation: "fadeInUp 0.8s ease both" }}>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6">
          Empowering Education for a Sustainable Future
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join schools, NGOs, and corporates in a collaborative platform that delivers measurable, lasting impact across India.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            href="/work-with-us"
            className="bg-gradient-to-r from-primary to-accent text-white font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:from-accent hover:to-primary transition-colors duration-300"
          >
            Work With Us <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/sdg"
            className="bg-transparent border border-primary text-primary font-medium py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:bg-primary hover:text-white transition-colors duration-300"
          >
            Explore SDGs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {/* Stats cards with glass‑morphism */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {metrics.map(m => (
            <div key={m.label} className="stat-card-glass p-4 rounded-xl text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-2" style={{ background: `${m.color}22` }}>
                {/* Optional icon could go here */}
              </div>
              <div className="font-display font-black text-xl text-white leading-none">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-1 text-xs text-white/60 font-medium">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
