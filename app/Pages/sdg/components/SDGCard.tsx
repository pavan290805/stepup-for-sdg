"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { type SDG, withAlpha } from "../data/sdgs";

type Props = {
  index: number;
  reduceMotion: boolean;
  sdg: SDG;
};

export default function SDGCard({ index, reduceMotion, sdg }: Props) {
  const glow = withAlpha(sdg.color, 0.3);
  const border = withAlpha(sdg.color, 0.4);
  const highlight = withAlpha("#FFFFFF", 0.15);
  const background = `linear-gradient(160deg, ${withAlpha(sdg.color, 0.9)} 0%, ${withAlpha(
    sdg.color,
    0.7,
  )} 34%, rgba(8, 12, 27, 0.85) 100%)`;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: (i) => ({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            delay: i * 0.05,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.04,
              y: -8,
              boxShadow: `0 30px 60px -20px ${glow}`,
            }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      className="transform-gpu"
    >
      <Link
        className="group relative flex min-h-72 overflow-hidden rounded-3xl border p-6 text-left shadow-lg backdrop-blur-lg transition-all duration-300"
        href={`/sdg/${sdg.id}`}
        style={{
          backgroundImage: `${background}, radial-gradient(circle at top right, ${highlight}, transparent 40%)`,
          borderColor: border,
          boxShadow: `0 10px 40px -15px ${glow}`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-80" />
        <div className="pointer-events-none absolute -right-2 -top-4 text-8xl font-black text-white/5">
          {String(sdg.id).padStart(2, "0")}
        </div>

        <div className="relative flex h-full flex-1 flex-col justify-between">
          <div>
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-white/90">
              Goal {String(sdg.id).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-2xl font-bold leading-tight text-white">
              {sdg.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              {sdg.summary}
            </p>
          </div>

          <div className="mt-6 inline-flex items-center gap-3 text-sm font-medium tracking-wider text-white/90">
            <span>Explore Goal</span>
            <span className="h-px flex-1 bg-white/40 transition-colors duration-300 group-hover:bg-white/70" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
