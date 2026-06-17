"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GoldenRing from "./GoldenRing";
import CssSDGRing from "./CssSDGRing";
import TransitionOverlay from "./TransitionOverlay";

type Props = {
  isLaunching: boolean;
  onExplore: () => void;
  reduceMotion: boolean;
};

export default function EarthAnimation({ isLaunching, onExplore, reduceMotion }: Props) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.button
        aria-label="Explore the Sustainable Development Goals"
        className="group relative flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/80 focus-visible:ring-offset-4 focus-visible:ring-offset-[#020617] w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]"
        disabled={isLaunching}
        initial={false}
        onClick={onExplore}
        animate={isLaunching ? "launching" : "idle"}
        variants={{
          idle: { scale: 1, y: 0 },
          launching: {
            scale: reduceMotion ? 1 : 4,
            transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.7 },
          },
        }}
        whileHover={!isLaunching && !reduceMotion ? { scale: 1.02, y: -6 } : undefined}
        whileTap={!isLaunching ? { scale: 0.985 } : undefined}
      >
        <div className="absolute inset-[-16%] rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-[-26%] rounded-full bg-sky-500/10 blur-[130px]" />

        <CssSDGRing isLaunching={isLaunching} reduceMotion={reduceMotion} />
        <GoldenRing isActive={isLaunching} reduceMotion={reduceMotion} />

        <div className="relative z-20 aspect-square w-[250px] sm:w-[360px] overflow-hidden rounded-full border border-white/10 bg-black shadow-[0_0_50px_rgba(56,189,248,0.28)] transform-gpu animate-rotate-earth">
          <Image
            alt="Rotating Earth"
            className="object-cover object-center scale-[1.06]"
            fill
            priority
            sizes="(max-width: 640px) 250px, 360px"
            src="/sdg/earth.png"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.3),transparent_18%),radial-gradient(circle_at_68%_76%,transparent_24%,rgba(1,4,18,0.64)_88%)]" />
        </div>
      </motion.button>

      <motion.div
        className="relative z-20 mt-10 max-w-4xl space-y-4 px-4"
        initial={false}
        animate={isLaunching ? { opacity: 0, y: 18, transition: { duration: 0.5, delay: 0.2 } } : { opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-xs uppercase tracking-[0.48em] text-sky-200/75 sm:text-sm"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          STEPUP FOR SDG
        </motion.p>
        <motion.h1
          className="text-4xl font-semibold tracking-[0.16em] text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "\"Arial Narrow\", \"Trebuchet MS\", sans-serif" }}
        >
          STEPUP FOR SDG
        </motion.h1>
        <motion.p
          className="mx-auto max-w-2xl text-balance text-base leading-7 text-slate-200/80 sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Educating Students on UN Sustainable Development Goals
        </motion.p>
        <motion.div
          className="flex items-center justify-center pt-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex rounded-full border border-white/15 bg-white/6 px-5 py-2 text-sm tracking-[0.28em] text-sky-100 shadow-[0_0_30px_rgba(56,189,248,0.14)]">
            Click the Earth to Explore
          </span>
        </motion.div>
      </motion.div>
      <TransitionOverlay isActive={isLaunching} reduceMotion={reduceMotion} />
    </div>
  );
}
