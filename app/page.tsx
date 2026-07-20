"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PartnerCards } from "@/app/components/site/PartnerCards";
import LiveImpactMap from "@/app/components/site/LiveImpactMap";
import { VisionBanner } from "@/app/components/site/VisionBanner";
import { FadeUp } from "@/app/components/site/FadeUp";
import { ImpactMetrics } from "@/app/components/site/ImpactMetrics";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Home() {
  return <RahiniHome />;
}

function RahiniHome() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center py-12 px-6 space-bg" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
          <div className="stars-layer" />
          <div className="stars-layer" style={{ animationDelay: "-2s", opacity: 0.6, transform: "rotate(15deg) scale(1.1)" }} />
          <div className="stars-layer" style={{ animationDelay: "-4s", opacity: 0.5, transform: "rotate(-10deg) scale(0.95)" }} />
          <span className="streak" style={{ top: "20%", animationDelay: "0s" }} />
          <span className="streak" style={{ top: "45%", animationDelay: "2s" }} />
          <span className="streak" style={{ top: "70%", animationDelay: "4s" }} />
          <span className="streak" style={{ top: "10%", animationDelay: "1s" }} />
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
            <video
              key={theme}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src={isDark
                ? "home/home-dark.mp4"
                : "home/home-light.mp4"
              }
            />
          </div>

        <div className="relative mx-auto max-w-7xl w-full" style={{ zIndex: 2 }}>
          <FadeUp>
            <div className="max-w-2xl">
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: "var(--foreground)" }}>
                StepUp for{" "}
                <span className="grad-text relative">
                  SDG
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full" style={{ background: "linear-gradient(90deg,#00C2FF,#155DFC)" }} />
                </span>
              </h1>
              <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-text)" }}>
                Connecting students, schools, NGOs and companies to drive real change through the UN Sustainable Development Goals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/sdg"
                  className="btn-arrow inline-flex items-center gap-2 bg-cta text-white font-semibold rounded-full px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
                >
                  Learn More about SDG Goals <ArrowRight className="arr h-4 w-4" />
                </Link>
                <Link
                  href="/work-with-us"
                  className="btn-arrow inline-flex items-center gap-2 bg-cta text-white font-semibold rounded-full px-6 py-3 shadow-[0_0_24px_rgba(255,122,0,0.5)] hover:brightness-110 transition"
                >
                  Work With Us <ArrowRight className="arr h-4 w-4" />
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
