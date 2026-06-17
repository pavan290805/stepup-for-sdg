"use client";

import { motion } from "framer-motion";

type Props = {
  isLaunching: boolean;
  reduceMotion: boolean;
};

type Star = {
  left: number;
  opacity: number;
  pulseDelay: number;
  pulseDuration: number;
  size: number;
  top: number;
  travelX: number;
  travelY: number;
};

function seededValue(seed: number) {
  const raw = Math.sin(seed * 12.9898) * 43758.5453;
  return raw - Math.floor(raw);
}

const stars: ReadonlyArray<Star> = Array.from({ length: 88 }, (_, index) => {
  const left = seededValue(index + 13) * 100;
  const top = seededValue(index + 61) * 100;
  const size = 0.8 + seededValue(index + 107) * 2.6;
  const opacity = 0.28 + seededValue(index + 151) * 0.72;
  const spread = 16 + seededValue(index + 199) * 8;

  return {
    left,
    opacity,
    pulseDelay: seededValue(index + 233) * 2.4,
    pulseDuration: 2.4 + seededValue(index + 271) * 3.3,
    size,
    top,
    travelX: (left - 50) * spread,
    travelY: (top - 50) * spread,
  };
});

"use client";

import { useMemo } from "react";

const Stars = () => {
  const stars = useMemo(() => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth > 768;
    const starCount = isDesktop ? 150 : 70;
    return Array.from({ length: starCount }).map((_, i) => {
      const size = Math.floor(Math.random() * 3) + 1;
      return {
        id: i,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.7 + 0.3,
          animation: `twinkle ${Math.random() * 3 + 3}s linear infinite`,
          animationDelay: `${Math.random() * 6}s`,
        },
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full transform-gpu"
          style={star.style}
        />
      ))}
    </div>
  );
};

export default Stars;
