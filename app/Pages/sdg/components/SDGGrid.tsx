"use client";

import { motion } from "framer-motion";
import { sdgs } from "../data/sdgs";
import SDGCard from "./SDGCard";

type Props = {
  isVisible: boolean;
  reduceMotion: boolean;
};

export default function SDGGrid({ isVisible, reduceMotion }: Props) {
  return (
    <motion.section
      className="absolute inset-0 z-40 overflow-y-auto bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.1),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_36%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:4rem_4rem]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 pb-16 pt-16 sm:px-6 lg:px-10">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ delay: reduceMotion ? 0 : 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex rounded-full border border-sky-300/20 bg-white/5 px-4 py-2 text-xs uppercase tracking-widest text-sky-100/80">
            United Nations Sustainable Development Goals
          </span>
          <h2
            className="mt-6 text-balance text-4xl font-bold tracking-wide text-white sm:text-5xl"
            style={{ fontFamily: "\"Arial Narrow\", \"Trebuchet MS\", sans-serif" }}
          >
            17 Goals. One Shared Future.
          </h2>
          <p className="mt-4 text-balance text-base leading-7 text-slate-200/70 sm:text-lg">
            Explore each goal through a cinematic entry point designed to feel like a mission briefing for global action.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sdgs.map((sdg, index) => (
            <SDGCard key={sdg.id} index={index} reduceMotion={reduceMotion} sdg={sdg} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
