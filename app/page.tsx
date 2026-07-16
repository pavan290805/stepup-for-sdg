import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SpaceBackdrop } from "@/app/components/site/SpaceBackdrop";
import { ImpactMetrics } from "@/app/components/site/ImpactMetrics";
import { PartnerCards } from "@/app/components/site/PartnerCards";
import { LiveImpactMap } from "@/app/components/site/LiveImpactMap";
import { VisionBanner } from "@/app/components/site/VisionBanner";
import { FadeUp } from "@/app/components/site/FadeUp";
export const metadata = {
  title: "StepUp for SDG — Global Education Impact Platform",
  description: "Empowering Students through the Sustainable Development Goals",
};

export default function Home() {
  return <RahiniHome />;
}

function RahiniHome() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-8 md:pt-10 pb-6 px-6">
        <SpaceBackdrop />
        <div className="relative mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
          <FadeUp>
            <div>
<h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: "var(--foreground)" }}>
                Students, Companies and NGOs for{" "}
                <span className="grad-text">SDG Impact</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed" style={{ color: "var(--muted-text)" }}>
                Empowering Students through the Sustainable Development Goals
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
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
