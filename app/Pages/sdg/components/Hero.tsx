"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SDGGrid from "./SDGGrid";
import { useTheme } from "@/app/components/ThemeProvider";

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const goalsRef = useRef<HTMLElement | null>(null);
  const { theme } = useTheme();
  const videoSrc = theme === "dark" ? "/B__change_the_background.mp4" : "/chnage_the_background_to_this.mp4";

  const v1 = useRef<HTMLVideoElement>(null);
  const v2 = useRef<HTMLVideoElement>(null);
  const [topVideo, setTopVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const vid1 = v1.current;
    const vid2 = v2.current;
    if (!vid1 || !vid2) return;

    vid1.currentTime = 0;
    vid2.currentTime = 0;
    vid1.play();

    const onUpdate1 = () => {
      if (!vid1.duration) return;
      if (vid1.currentTime >= vid1.duration - 0.8) {
        vid2.currentTime = 0;
        vid2.play();
        setTopVideo(2);
      }
    };
    const onUpdate2 = () => {
      if (!vid2.duration) return;
      if (vid2.currentTime >= vid2.duration - 0.8) {
        vid1.currentTime = 0;
        vid1.play();
        setTopVideo(1);
      }
    };

    vid1.addEventListener("timeupdate", onUpdate1);
    vid2.addEventListener("timeupdate", onUpdate2);
    return () => {
      vid1.removeEventListener("timeupdate", onUpdate1);
      vid2.removeEventListener("timeupdate", onUpdate2);
    };
  }, [videoSrc]);

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
      className="relative min-h-screen overflow-x-hidden dark:[background:radial-gradient(ellipse_at_50%_60%,#0d2a4a_0%,#061020_50%,#000810_100%)] [background:radial-gradient(ellipse_at_50%_40%,#b8d4ee_0%,#cfe0f0_40%,#e2eef7_100%)]"
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
          <div
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] max-w-[900px]"
            style={{
              aspectRatio: "16/9",
              WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 75%)",
              maskImage: "radial-gradient(ellipse 75% 80% at 65% 50%, black 30%, transparent 75%)",
            }}
          >
            <video
              ref={v1}
              muted
              playsInline
              src={videoSrc}
              style={{ ...videoStyle, opacity: topVideo === 1 ? 1 : 0 }}
            />
            <video
              ref={v2}
              muted
              playsInline
              src={videoSrc}
              style={{ ...videoStyle, opacity: topVideo === 2 ? 1 : 0 }}
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
