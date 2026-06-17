"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import EarthAnimation from "./EarthAnimation";
import SDGGrid from "./SDGGrid";
import Stars from "./Stars";

const TIMINGS = {
  mountGrid: 2500,
  revealGrid: 2500,
};

export default function Hero() {
  const reduceMotion = useReducedMotion() ?? false;
  const [isLaunching, setIsLaunching] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!isLaunching) {
      return;
    }

    const timings = reduceMotion ? { mountGrid: 140, revealGrid: 220 } : TIMINGS;

    timers.current = [
      window.setTimeout(() => {
        startTransition(() => {
          setShowGrid(true);
        });
      }, timings.mountGrid),
      window.setTimeout(() => {
        setGridVisible(true);
      }, timings.revealGrid),
    ];

    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [isLaunching, reduceMotion]);

  const handleExplore = () => {
    if (isLaunching) {
      return;
    }

    setIsLaunching(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      <Stars />
      {!showGrid && (
        <EarthAnimation
          isLaunching={isLaunching}
          onExplore={handleExplore}
          reduceMotion={reduceMotion}
        />
      )}
      {showGrid && <SDGGrid isVisible={gridVisible} reduceMotion={reduceMotion} />}
    </main>
  );
}
