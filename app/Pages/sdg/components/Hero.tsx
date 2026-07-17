"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SDGGrid from "./SDGGrid";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const goalsRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const [, setDummy] = useState(0);

  const handleExplore = () => {
    goalsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const videoStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    background: "transparent",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: "translateZ(0)",
    transition: "opacity 0.6s ease",
  };

  return (
    <main
      className="relative min-h-screen overflow-x-hidden dark:bg-[#000810] bg-[#e2eef7]"
      style={{ color: "var(--foreground)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="stars-layer" />
        <span className="streak" style={{ top: "20%", animationDelay: "0s" }} />
        <span className="streak" style={{ top: "45%", animationDelay: "2s" }} />
        <span className="streak" style={{ top: "70%", animationDelay: "4s" }} />
        <span className="streak" style={{ top: "10%", animationDelay: "1s" }} />
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <section className="relative flex min-h-[80vh] items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="stars-layer" />
            <div className="stars-layer" style={{ animationDelay: "-2s", opacity: 0.6, transform: "rotate(15deg) scale(1.1)" }} />
            <div className="stars-layer" style={{ animationDelay: "-4s", opacity: 0.5, transform: "rotate(-10deg) scale(0.95)" }} />
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
              src={theme === "dark"
                ? "sdg-dark.mp4"
                : "sdg-white.mp4"
              }
            />
          </div>

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
