"use client";

import { motion } from "framer-motion";
import { Counter } from "@/app/components/site/Counter";
import { RotatingEarth } from "@/app/components/site/RotatingEarth";
import { fadeLeft, fadeRight, fadeUp, viewportOnce } from "./variants";
import { globalImpact, impactCategories } from "@/app/data/impact";

const CENTER = { x: 50, y: 50 };
const RADIUS = 34;

// Evenly spaced around a perfect circle (starting at 12 o'clock, clockwise)
// so the icons land in a neat, predictable order instead of scattered points.
const networkNodes = impactCategories.map((c, i) => {
  const angle = (-90 + i * (360 / impactCategories.length)) * (Math.PI / 180);
  return {
    icon: c.icon,
    color: c.accent,
    label: c.title,
    x: Math.round((CENTER.x + RADIUS * Math.cos(angle)) * 100) / 100,
    y: Math.round((CENTER.y + RADIUS * Math.sin(angle)) * 100) / 100,
  };
});

function CommunityNetwork() {
  return (
    <div className="relative mx-auto" style={{ width: "min(280px, 78vw)", height: "min(280px, 78vw)" }}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {networkNodes.map((n, i) => (
          <motion.path
            key={n.label}
            d={`M ${CENTER.x} ${CENTER.y} L ${n.x} ${n.y}`}
            fill="none"
            stroke={n.color}
            strokeWidth={0.6}
            strokeDasharray="2 2.4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.55 }}
            viewport={viewportOnce}
            transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <circle cx={CENTER.x} cy={CENTER.y} r={2.4} fill="#fff" />
      </svg>

      {networkNodes.map((n, i) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="imp-net-node absolute grid place-items-center rounded-full"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            width: 44,
            height: 44,
            transform: "translate(-50%, -50%)",
            border: `1.5px solid ${n.color}`,
            animationDelay: `${i * 0.5}s`,
          }}
          title={n.label}
        >
          <n.icon className="h-5 w-5" style={{ color: n.color }} />
        </motion.div>
      ))}
    </div>
  );
}

export function GlobalImpactBanner() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative overflow-hidden rounded-[28px] p-8 md:p-14"
          style={{
            background: "linear-gradient(135deg, #060d2e 0%, #0a2a7a 55%, #004466 100%)",
            boxShadow: "0 30px 70px -24px rgba(6,13,46,0.5)",
          }}
        >
          <div aria-hidden className="imp-blob imp-blob-gold" style={{ opacity: 0.28, top: "-12%", left: "38%" }} />
          <div aria-hidden className="imp-blob imp-blob-blue" style={{ opacity: 0.3, bottom: "-16%", right: "-8%" }} />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr]" style={{ zIndex: 1 }}>
            <motion.div variants={fadeLeft} className="flex justify-center">
              <RotatingEarth showCards={false} size="min(280px, 70vw)" />
            </motion.div>

            <motion.div variants={fadeUp} className="text-center px-2">
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                Our Collective Reach
              </span>
              <div className="mt-3 font-display text-5xl md:text-6xl font-bold text-white">
                <Counter to={globalImpact.value} suffix={globalImpact.suffix} duration={2200} />
              </div>
              <div className="mt-3 text-lg font-semibold text-white/90">{globalImpact.label}</div>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/70">{globalImpact.desc}</p>
            </motion.div>

            <motion.div variants={fadeRight} className="flex justify-center">
              <CommunityNetwork />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
