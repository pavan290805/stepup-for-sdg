"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FadeUp } from "@/app/components/site/FadeUp";
import { useTheme } from "@/app/components/ThemeProvider";

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

export default function Home() {
  return <RahiniHome />;
}

function RahiniHome() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [loadHeroVideo, setLoadHeroVideo] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoadHeroVideo(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center py-12 px-6 space-bg" style={{ minHeight: "70vh" }}>
        {/* Dark mode: stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div className="stars-layer" />
          <div className="stars-layer" style={{ animationDelay: "-2s", opacity: 0.6, transform: "rotate(15deg) scale(1.1)" }} />
          <div className="stars-layer" style={{ animationDelay: "-4s", opacity: 0.5, transform: "rotate(-10deg) scale(0.95)" }} />
          <span className="streak" style={{ top: "20%", animationDelay: "0s" }} />
          <span className="streak" style={{ top: "45%", animationDelay: "2s" }} />
          <span className="streak" style={{ top: "70%", animationDelay: "4s" }} />
          <span className="streak" style={{ top: "10%", animationDelay: "1s" }} />
        </div>

        {/* Light mode: gradient mesh background */}
        <div className="absolute inset-0 pointer-events-none dark:hidden">
          <div className="absolute inset-0" style={{background:"linear-gradient(135deg,#e8f4ff 0%,#f0f7ff 30%,#eef2ff 60%,#f5f0ff 100%)"}}/>
          <div className="absolute rounded-full blur-[120px] opacity-60" style={{width:600,height:500,top:"-10%",left:"-5%",background:"radial-gradient(ellipse,rgba(59,130,246,0.25) 0%,rgba(99,102,241,0.1) 55%,transparent 75%)"}}/>
          <div className="absolute rounded-full blur-[140px] opacity-50" style={{width:500,height:400,top:"20%",right:"-5%",background:"radial-gradient(ellipse,rgba(99,102,241,0.2) 0%,rgba(139,92,246,0.08) 55%,transparent 75%)"}}/>
          <div className="absolute rounded-full blur-[100px] opacity-40" style={{width:400,height:350,bottom:"-10%",left:"30%",background:"radial-gradient(ellipse,rgba(16,185,129,0.15) 0%,rgba(6,182,212,0.06) 55%,transparent 75%)"}}/>
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(rgba(0,0,0,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,1) 1px,transparent 1px)",backgroundSize:"40px 40px"}}/>
        </div>
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] overflow-hidden"
            style={{
              aspectRatio: "16/9",
              WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 75%)",
              maskImage: "radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 75%)",
            }}
          >
            {loadHeroVideo ? (
              <video
                key={theme}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                src={isDark ? "home/home-dark.mp4" : "home/home-light.mp4"}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800" />
            )}
          </div>

        <div className="relative mx-auto max-w-7xl w-full" style={{ zIndex: 2 }}>
          <FadeUp>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: "var(--foreground)" }}>
                StepUp for{" "}
                <span className="grad-text">SDG</span>
              </h1>
              <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-text)" }}>
                Empowering Students through the Sustainable Development Goals
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
