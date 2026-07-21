"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "./variants";

export function SectionHead({
  eyebrow,
  title,
  desc,
  align = "center",
  tone = "default",
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  align?: "center" | "left";
  tone?: "default" | "invert";
}) {
  const eyebrowColor = tone === "invert" ? "rgba(255,255,255,0.75)" : "var(--cyan-glow)";
  const descColor = tone === "invert" ? "rgba(255,255,255,0.78)" : "var(--muted-text)";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      <span
        className="text-xs uppercase tracking-[0.28em] font-semibold"
        style={{ color: eyebrowColor }}
      >
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold" style={tone === "invert" ? { color: "#fff" } : undefined}>
        {title}
      </h2>
      {desc ? (
        <p className="mt-4 text-base leading-relaxed" style={{ color: descColor }}>
          {desc}
        </p>
      ) : null}
    </motion.div>
  );
}
