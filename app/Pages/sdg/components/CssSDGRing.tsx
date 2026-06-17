"use client";

import { motion } from "framer-motion";
import { sdgs } from "../data/sdgs";

type Props = {
  isLaunching: boolean;
  reduceMotion: boolean;
};

const conicGradient = `conic-gradient(from 180deg, ${sdgs.map((sdg) => sdg.color).join(", ")}, ${sdgs[0].color})`;

export default function CssSDGRing({ isLaunching, reduceMotion }: Props) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 transform-gpu animate-rotate-sdg-ring"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: conicGradient,
        maskImage: 'radial-gradient(transparent 85%, black 85%)',
        WebkitMaskImage: 'radial-gradient(transparent 85%, black 85%)',
      }}
      initial={false}
      animate={
        isLaunching
          ? {
              scale: reduceMotion ? 1 : 1.1,
              transition: { delay: 0.5, duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            }
          : {
              scale: 1,
            }
      }
    />
  );
}
