"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import EarthAnimation from "./EarthAnimation";
import Hero from "./Hero";
import Stars from "./Stars";
import TransitionOverlay from "./TransitionOverlay";

const EARTH_TRANSITION_MS = 980;

type Stage = "earth" | "hero" | "home";

type Props = {
  children: ReactNode;
};

function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setReduceMotion(media.matches);

    syncPreference();
    media.addEventListener("change", syncPreference);

    return () => media.removeEventListener("change", syncPreference);
  }, []);

  return reduceMotion;
}

export default function LandingExperience({ children }: Props) {
  const reduceMotion = usePrefersReducedMotion();
  const [stage, setStage] = useState<Stage>("earth");
  const [isLaunching, setIsLaunching] = useState(false);
  const launchTimer = useRef<number | null>(null);

  useEffect(() => {
    const isFlowActive = stage !== "home";

    document.body.classList.toggle("landing-flow-active", isFlowActive);

    return () => {
      document.body.classList.remove("landing-flow-active");
    };
  }, [stage]);

  useEffect(() => {
    return () => {
      if (launchTimer.current !== null) {
        window.clearTimeout(launchTimer.current);
      }
    };
  }, []);

  const showHero = () => {
    if (stage !== "earth" || isLaunching) {
      return;
    }

    setIsLaunching(true);
    launchTimer.current = window.setTimeout(
      () => {
        setStage("hero");
        setIsLaunching(false);
      },
      reduceMotion ? 180 : EARTH_TRANSITION_MS,
    );
  };

  const showExistingHome = () => {
    if (launchTimer.current !== null) {
      window.clearTimeout(launchTimer.current);
      launchTimer.current = null;
    }

    setIsLaunching(false);
    setStage("home");
  };

  if (stage === "home") {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className="relative min-h-screen overflow-hidden bg-black text-white"
        data-landing-flow-active="true"
        data-stage={stage}
      >
        <Stars />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_38%,rgba(56,189,248,0.12),transparent_26%),linear-gradient(180deg,rgba(3,7,18,0.05),rgba(0,0,0,0.48))]" />

        {stage === "earth" ? (
          <EarthAnimation
            isLaunching={isLaunching}
            onExplore={showHero}
            reduceMotion={reduceMotion}
          />
        ) : (
          <Hero onOpenHome={showExistingHome} reduceMotion={reduceMotion} />
        )}

        <TransitionOverlay
          isActive={isLaunching}
          reduceMotion={reduceMotion}
        />
      </div>

      <style>{`
        body:has([data-landing-flow-active="true"]) header,
        body:has([data-landing-flow-active="true"]) footer,
        body.landing-flow-active header,
        body.landing-flow-active footer {
          display: none !important;
        }

        body:has([data-landing-flow-active="true"]),
        body.landing-flow-active {
          overflow: hidden;
          background: #020617;
        }

        .sdg-earth-aura {
          position: absolute;
          left: 50%;
          top: 54%;
          height: min(76vh, 48rem);
          width: min(76vh, 48rem);
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: rgba(34, 211, 238, 0.16);
          filter: blur(56px);
          animation: sdgAuraPulse 5s ease-in-out infinite;
        }

        .sdg-globe-button {
          position: relative;
          z-index: 20;
          display: flex;
          height: clamp(20rem, 52vw, 38rem);
          width: clamp(20rem, 52vw, 38rem);
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          outline: none;
          transform: translateZ(0);
          transition: transform 320ms ease, filter 320ms ease;
        }

        .sdg-globe-button:hover {
          transform: scale(1.015);
          filter: brightness(1.06);
        }

        .sdg-globe-button:active {
          transform: scale(0.985);
        }

        .sdg-globe-button:focus-visible {
          box-shadow: 0 0 0 3px rgba(186, 230, 253, 0.92), 0 0 0 8px rgba(2, 6, 23, 0.9);
        }

        .sdg-globe-button[data-launching="true"] {
          pointer-events: none;
          animation: sdgGlobeLaunch 980ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .sdg-earth-image-shell {
          position: relative;
          z-index: 30;
          aspect-ratio: 1 / 1;
          width: 74%;
          overflow: hidden;
          border-radius: 9999px;
          box-shadow:
            0 0 58px rgba(56, 189, 248, 0.38),
            inset -24px -28px 58px rgba(0, 0, 0, 0.55);
          transform: translateZ(0);
          will-change: transform;
        }

        .sdg-earth-spin {
          animation: sdgEarthRotate 42s linear infinite;
        }

        .sdg-ring-spin {
          animation: sdgRingRotate 46s linear infinite;
        }

        .sdg-transition-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 50;
          overflow: hidden;
          display: none;
        }

        .sdg-transition-overlay[data-active="true"] {
          display: block;
        }

        .sdg-transition-flash,
        .sdg-transition-black {
          position: absolute;
          inset: 0;
          opacity: 0;
        }

        .sdg-transition-flash {
          background: white;
        }

        .sdg-transition-black {
          background: black;
        }

        .sdg-transition-overlay[data-active="true"] .sdg-transition-flash {
          animation: sdgWhiteFlash 700ms ease-in-out 180ms forwards;
        }

        .sdg-transition-overlay[data-active="true"] .sdg-transition-black {
          animation: sdgBlackVeil 500ms ease-in-out 620ms forwards;
        }

        @keyframes sdgEarthRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sdgRingRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes sdgAuraPulse {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.95; transform: translate(-50%, -50%) scale(1.06); }
        }

        @keyframes sdgGlobeLaunch {
          0% { transform: scale(1); }
          48% { transform: scale(1.08); }
          100% { transform: scale(1.62); }
        }

        @keyframes sdgWhiteFlash {
          0%, 100% { opacity: 0; }
          48% { opacity: 0.92; }
        }

        @keyframes sdgBlackVeil {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes sdgStarTwinkle {
          0%, 100% { opacity: 0.32; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        @keyframes sdgParticleDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(24px, -12px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sdg-earth-aura,
          .sdg-earth-spin,
          .sdg-ring-spin,
          [style*="sdgStarTwinkle"],
          [style*="sdgParticleDrift"] {
            animation: none !important;
          }

          .sdg-globe-button,
          .sdg-globe-button:hover,
          .sdg-globe-button:active {
            transform: none;
          }

          .sdg-globe-button[data-launching="true"] {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
