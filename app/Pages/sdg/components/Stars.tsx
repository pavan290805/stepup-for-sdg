"use client";

import type { CSSProperties } from "react";

const STAR_COUNT = 160;
const PARTICLE_COUNT = 42;

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 93.9898 + salt * 47.233) * 43758.5453;
  return value - Math.floor(value);
}

function fixed(value: number, digits = 3) {
  return value.toFixed(digits);
}

const stars = Array.from({ length: STAR_COUNT }, (_, index) => {
  const size = index % 21 === 0 ? 3 : index % 7 === 0 ? 2 : 1;

  return {
    id: `star-${index}`,
    style: {
      width: `${size}px`,
      height: `${size}px`,
      left: `${fixed(seeded(index, 1) * 100)}%`,
      top: `${fixed(seeded(index, 2) * 100)}%`,
      opacity: fixed(0.38 + seeded(index, 3) * 0.62),
      animationDelay: `${fixed(seeded(index, 4) * -7)}s`,
      animationDuration: `${fixed(3.4 + seeded(index, 5) * 4.8)}s`,
    } satisfies CSSProperties,
  };
});

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const isDot = index % 4 === 0;

  return {
    id: `particle-${index}`,
    className: "rounded-full",
    style: {
      width: isDot ? `${fixed(2 + seeded(index, 6) * 4)}px` : `${fixed(12 + seeded(index, 7) * 30)}px`,
      height: isDot ? `${fixed(2 + seeded(index, 8) * 4)}px` : "2px",
      left: `${fixed(seeded(index, 9) * 100)}%`,
      top: `${fixed(seeded(index, 10) * 100)}%`,
      opacity: fixed(0.34 + seeded(index, 11) * 0.5),
      animationDelay: `${fixed(seeded(index, 12) * -14)}s`,
      animationDuration: `${fixed(9 + seeded(index, 13) * 9)}s`,
    } satisfies CSSProperties,
  };
});

export default function Stars() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(18,98,164,0.38),transparent_30%),radial-gradient(circle_at_20%_0%,rgba(8,47,73,0.54),transparent_35%),linear-gradient(180deg,#01040b_0%,#071b31_52%,#020712_100%)]" />
      <div className="absolute inset-0 opacity-80">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] will-change-[opacity] transform-gpu"
            style={{
              ...star.style,
              animationName: "sdgStarTwinkle",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className={`absolute bg-cyan-300/80 shadow-[0_0_12px_rgba(34,211,238,0.85)] will-change-transform transform-gpu ${particle.className}`}
            style={{
              ...particle.style,
              animationName: "sdgParticleDrift",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes sdgStarTwinkle {
          0%, 100% { opacity: 0.32; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.35); }
        }

        @keyframes sdgParticleDrift {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(24px, -12px, 0); }
        }
      `}</style>
    </div>
  );
}
