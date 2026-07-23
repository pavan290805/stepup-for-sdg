"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
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

export default function Home() {
  return <RahiniHome />;
}

function RahiniHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden flex items-center py-12 px-6" style={{ minHeight: "70vh" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{background:"linear-gradient(135deg,#e8f4ff 0%,#f0f7ff 30%,#eef2ff 60%,#f5f0ff 100%)"}}/>
          <div className="absolute rounded-full blur-[120px] opacity-60" style={{width:600,height:500,top:"-10%",left:"-5%",background:"radial-gradient(ellipse,rgba(59,130,246,0.25) 0%,rgba(99,102,241,0.1) 55%,transparent 75%)"}}/>
          <div className="absolute rounded-full blur-[140px] opacity-50" style={{width:500,height:400,top:"20%",right:"-5%",background:"radial-gradient(ellipse,rgba(99,102,241,0.2) 0%,rgba(139,92,246,0.08) 55%,transparent 75%)"}}/>
          <div className="absolute rounded-full blur-[100px] opacity-40" style={{width:400,height:350,bottom:"-10%",left:"30%",background:"radial-gradient(ellipse,rgba(16,185,129,0.15) 0%,rgba(6,182,212,0.06) 55%,transparent 75%)"}}/>
        </div>

        <div className="relative mx-auto max-w-7xl w-full flex flex-col items-center text-center" style={{ zIndex: 2 }}>
          <FadeUp>
            <div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: "var(--foreground)" }}>
                StepUp for{" "}
                <span className="grad-text">SDG</span>
              </h1>
              <p className="mt-4 mx-auto max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-text)" }}>
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
