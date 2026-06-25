"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import EarthAnimation from "./EarthAnimation";
import SDGGrid from "./SDGGrid";
import Stars from "./Stars";

const EARTH_TRANSITION_MS = 980;

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const [stage, setStage] = useState<"earth" | "hero">("earth");
  const [isLaunching, setIsLaunching] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const goalsRef = useRef<HTMLElement | null>(null);
  const launchTimer = useRef<number | null>(null);
  const scrollTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (launchTimer.current) {
        window.clearTimeout(launchTimer.current);
      }

      if (scrollTimer.current) {
        window.clearTimeout(scrollTimer.current);
      }
    };
  }, []);

  const handleExplore = () => {
    if (isLaunching || stage !== "earth") {
      return;
    }

    setIsLaunching(true);
    launchTimer.current = window.setTimeout(
      () => {
        setStage("hero");
      },
      reduceMotion ? 180 : EARTH_TRANSITION_MS,
    );
  };

  const handleRevealGoals = () => {
    setShowGoals(true);

    scrollTimer.current = window.setTimeout(() => {
      goalsRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }, reduceMotion ? 20 : 140);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <Stars />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_38%,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,rgba(3,7,18,0.05),rgba(0,0,0,0.48))]" />

      <AnimatePresence mode="wait">
        {stage === "earth" ? (
          <motion.section
            key="earth"
            className="relative z-10 min-h-screen overflow-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22 }}
          >
            <EarthAnimation isLaunching={isLaunching} onExplore={handleExplore} reduceMotion={reduceMotion} />
          </motion.section>
        ) : (
          <motion.div
            key="hero"
            className="relative z-10"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-20 sm:px-8 lg:px-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_44%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_18%_65%,rgba(14,165,233,0.12),transparent_32%)]" />

              <motion.div
                aria-hidden="true"
                className="absolute right-[-55vw] top-1/2 h-[58vh] w-[58vh] -translate-y-1/2 sm:right-[-28vw] sm:h-[64vh] sm:w-[64vh] lg:right-[-18vh] lg:h-[72vh] lg:w-[72vh]"
                initial={{ opacity: 0, x: reduceMotion ? 0 : 60, scale: reduceMotion ? 1 : 1.08 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_0_70px_rgba(56,189,248,0.28)] transform-gpu animate-rotate-earth will-change-transform">
                  <Image
                    alt=""
                    className="object-cover object-center scale-[1.22]"
                    fill
                    priority
                    sizes="(max-width: 768px) 58vh, 72vh"
                    src="/earth.png"
                  />
                </div>
              </motion.div>

              <div className="relative z-20 mx-auto w-full max-w-7xl">
                <motion.div
                  className="max-w-[43rem]"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0.15 : 0.68, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="text-balance text-[clamp(2.8rem,6.5vw,5.7rem)] font-extrabold leading-[0.95] text-white">
                    Sustainable Development Goals
                  </h2>
                  <p className="mt-6 text-[clamp(1.05rem,2vw,1.7rem)] font-medium text-slate-100/92">
                    17 Goals to Transform Our World
                  </p>

<div className="mt-9 flex flex-wrap gap-4">
  <button
    className="rounded-full border border-cyan-200/55 bg-white/10 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(34,211,238,0.28)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-cyan-100 hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80"
    onClick={handleRevealGoals}
    type="button"
  >
    Explore Goals
  </button>
</div>

</motion.div>
</div>
</section>

{showGoals && (
  <SDGGrid
    isVisible={showGoals}
    reduceMotion={reduceMotion}
    sectionRef={goalsRef}
  />
)}
</motion.div>
)}
</AnimatePresence>
</main>
);
}