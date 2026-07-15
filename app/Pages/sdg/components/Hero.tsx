"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SDGGrid from "./SDGGrid";
import { SpaceBackdrop } from "@/app/components/site/SpaceBackdrop";
import { RotatingEarth } from "@/app/components/site/RotatingEarth";
import { sdgs } from "../data/sdgs";

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const goalsRef = useRef<HTMLElement | null>(null);

  const handleExplore = () => {
    goalsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ color: "var(--foreground)" }}>
      <SpaceBackdrop />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
          <motion.div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] max-w-[900px]"
            initial={{ opacity: 0, x: reduceMotion ? 0 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ isolation: "isolate", background: "transparent" }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="hidden dark:block"
              style={{ width: "100%", background: "transparent" }}
            >
              <source src="/B__change_the_background.mp4" type="video/mp4" />
            </video>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="block dark:hidden"
              style={{ width: "100%", background: "transparent" }}
            >
              <source src="/chnage_the_background_to_this.mp4" type="video/mp4" />
            </video>
          </motion.div>

          <div className="relative z-20 mx-auto w-full max-w-7xl">
            <motion.div
              className="max-w-[42rem]"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0.15 : 0.6, delay: reduceMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-balance text-[clamp(2.5rem,5.8vw,5.2rem)] font-extrabold leading-[0.92] mb-4" style={{ color: "var(--foreground)" }}>
                Sustainable Development Goals
              </h2>
              <p className="text-[clamp(1rem,1.8vw,1.5rem)] font-medium mb-8" style={{ color: "var(--muted-text)" }}>
                17 Goals to Transform Our World
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  className="rounded-full border px-6 py-2.5 text-sm font-semibold backdrop-blur-md transition duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/80 dark:border-cyan-200/55 dark:bg-white/10 dark:text-white dark:shadow-[0_0_28px_rgba(34,211,238,0.28)] dark:hover:border-cyan-100 dark:hover:bg-cyan-300/15 border-[var(--electric)] bg-[var(--electric)]/10 text-[var(--electric)] hover:bg-[var(--electric)]/20"
                  onClick={handleExplore}
                  type="button"
                >
                  Explore Goals
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        <SDGGrid isVisible reduceMotion={reduceMotion} sectionRef={goalsRef} />
      </motion.div>
    </main>
  );
}
