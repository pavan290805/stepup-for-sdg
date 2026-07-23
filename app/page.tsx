"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FadeUp } from "@/app/components/site/FadeUp";

const ImpactMetrics = dynamic(
  () => import("@/app/components/site/ImpactMetrics").then((m) => m.ImpactMetrics),
  { ssr: false, loading: () => <div className="h-24" /> }
);

const PartnerCards = dynamic(
  () => import("@/app/components/site/PartnerCards").then((m) => m.PartnerCards),
  { ssr: false, loading: () => <div className="h-40" /> }
);

const LiveImpactMap = dynamic(
  () => import("@/app/components/site/LiveImpactMap").then((m) => m.default),
  { ssr: false, loading: () => <div className="h-64" /> }
);

const VisionBanner = dynamic(
  () => import("@/app/components/site/VisionBanner").then((m) => m.VisionBanner),
  { ssr: false, loading: () => <div className="h-40" /> }
);

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1800&q=85",
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1800&q=85",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1800&q=85",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=85",
];

function HeroBgSlideshow() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCur((n) => (n + 1) % BG_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {BG_IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-[-8%]"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === cur ? 1 : 0,
            transition: "opacity 1.8s ease-in-out",
            animation: i === cur ? "slowZoom 20s ease-in-out infinite" : "none",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return <RahiniHome />;
}

function RahiniHome() {
  return (
    <>
      <style>{`
        @keyframes slowZoom {
          0%   { transform: scale(1.0); }
          50%  { transform: scale(1.1); }
          100% { transform: scale(1.0); }
        }
      `}</style>

      {/* Hero */}
      <section className="relative overflow-hidden flex items-center justify-center py-12 px-6" style={{ minHeight: "100vh" }}>

        {/* Background slideshow */}
        <HeroBgSlideshow />

        {/* Dark overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,rgba(2,6,18,0.82) 0%,rgba(4,10,24,0.75) 55%,rgba(2,6,16,0.82) 100%)", zIndex: 1 }} />

        {/* Aurora blobs */}
        <div className="absolute pointer-events-none rounded-full blur-[140px]" style={{ width: 700, height: 500, top: "-10%", left: "-5%", background: "radial-gradient(ellipse,rgba(59,130,246,0.30) 0%,rgba(6,182,212,0.12) 55%,transparent 75%)", zIndex: 1 }} />
        <div className="absolute pointer-events-none rounded-full blur-[160px]" style={{ width: 600, height: 500, top: "20%", right: "-5%", background: "radial-gradient(ellipse,rgba(99,102,241,0.25) 0%,rgba(139,92,246,0.10) 55%,transparent 75%)", zIndex: 1 }} />

        {/* Content */}
        <div className="relative w-full max-w-3xl mx-auto text-center" style={{ zIndex: 2 }}>
          <FadeUp>
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-white">
                StepUp for{" "}
                <span className="grad-text">SDG</span>
              </h1>
              <p className="mt-4 mx-auto max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "rgba(200,212,224,0.85)" }}>
                Empowering Students through the Sustainable Development Goals
              </p>
              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/work-with-us"
                  className="btn-arrow inline-flex items-center gap-2 bg-cta text-white font-semibold rounded-full px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
                >
                  Work With Us <ArrowRight className="arr h-4 w-4" />
                </Link>
                <Link
                  href="/sdg"
                  className="btn-arrow inline-flex items-center gap-2 bg-cta text-white font-semibold rounded-full px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
                >
                  Learn More about SDG Goals <ArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <ImpactMetrics />
      <PartnerCards />
      <LiveImpactMap />
      <VisionBanner />
    </>
  );
}
