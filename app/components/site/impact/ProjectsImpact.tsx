"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Counter } from "@/app/components/site/Counter";
import { fadeLeft, fadeRight, fadeUp, staggerContainer, viewportOnce } from "./variants";
import { impactProjects, type ImpactProject } from "@/app/data/impact";

/* ── Stat card ──────────────────────────────────────────────────────────────
   Layout: [icon circle]  [large number]
                          [small label]
   Glassmorphism card with hover lift, matching website dark palette.
────────────────────────────────────────────────────────────────────────── */
function StatCard({
  stat,
  accent,
}: {
  stat: ImpactProject["stats"][number];
  accent: string;
}) {
  const Icon = stat.icon;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      className="proj-stat-card relative flex items-start gap-3.5 overflow-hidden rounded-[16px] p-5"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 6px 28px -6px rgba(0,0,0,0.28)",
      }}
    >
      {/* Subtle inner accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[16px]"
        style={{
          background: `radial-gradient(circle at 20% 10%, color-mix(in srgb, ${accent} 10%, transparent), transparent 60%)`,
        }}
      />

      {/* Icon badge */}
      <span
        className="relative mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)` }}
      >
        <Icon className="h-[18px] w-[18px]" style={{ color: accent }} />
      </span>

      {/* Number + label */}
      <div className="relative min-w-0">
        <div
          className="font-display text-[1.55rem] font-bold leading-none"
          style={{ color: "var(--foreground)" }}
        >
          <Counter to={stat.value} suffix={stat.suffix} duration={2000} />
        </div>
        <div
          className="mt-1.5 text-xs font-medium leading-snug"
          style={{ color: "var(--muted-text)" }}
        >
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

/* ── A single alternating project row ──────────────────────────────────────
   Even index  (0, 2) → Image LEFT  | Content RIGHT
   Odd index   (1, 3) → Content LEFT | Image RIGHT
   On mobile, image is always first in visual order (DOM-first).
────────────────────────────────────────────────────────────────────────── */
function ProjectRow({
  project,
  index,
}: {
  project: ImpactProject;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="grid items-center gap-12 md:gap-16 lg:grid-cols-2 lg:gap-20"
    >
      {/* ── Image column ── */}
      <motion.div
        variants={isReversed ? fadeRight : fadeLeft}
        className={`relative ${isReversed ? "lg:order-2" : "lg:order-1"}`}
      >
        <div
          className="proj-img-wrap relative overflow-hidden rounded-[24px]"
          style={{ boxShadow: "0 36px 70px -22px rgba(6,13,46,0.55)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.imageAlt}
            className="proj-img h-[380px] w-full object-cover md:h-[500px]"
          />
          {/* Bottom fade overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 52%, rgba(5,11,24,0.38) 100%)",
            }}
          />
          {/* Top accent line */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${project.accent} 50%, transparent 100%)`,
            }}
          />
        </div>
      </motion.div>

      {/* ── Content column ── */}
      <motion.div
        variants={isReversed ? fadeLeft : fadeRight}
        className={`flex flex-col gap-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
      >
        {/* Project number + gold dash */}
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <span
            className="font-display text-sm font-bold tracking-[0.22em]"
            style={{ color: "var(--gold)" }}
          >
            {project.number}
          </span>
          <span
            className="h-[2px] w-10 rounded-full"
            style={{ background: "var(--gold)" }}
          />
        </motion.div>

        {/* Title */}
        <motion.h3
          variants={fadeUp}
          className="font-display text-3xl font-bold leading-tight md:text-[2.4rem]"
        >
          {project.title}
        </motion.h3>

        {/* Activity checklist */}
        <motion.ul
          variants={staggerContainer(0.07)}
          className="flex flex-col gap-2.5"
        >
          {project.activities.map((a) => (
            <motion.li
              key={a.label}
              variants={fadeUp}
              className={`flex items-start gap-2.5 ${a.indent ? "ml-5" : ""}`}
            >
              <CheckCircle2
                className="mt-0.5 h-[15px] w-[15px] shrink-0"
                style={{ color: "var(--gold)" }}
              />
              <span
                className="text-sm leading-snug"
                style={{ color: "var(--muted-text)" }}
              >
                {a.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Stat cards — 2 × 2 grid */}
        <motion.div
          variants={staggerContainer(0.09)}
          className="mt-1 grid grid-cols-2 gap-4"
        >
          {project.stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} accent={project.accent} />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Thin divider between project rows ─────────────────────────────────── */
function SectionDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="my-20 origin-left md:my-28"
      style={{ height: "1px", background: "var(--border)" }}
    />
  );
}

/* ── Main exported section ──────────────────────────────────────────────── */
export function ProjectsImpact() {
  return (
    <section
      id="our-projects"
      className="relative overflow-hidden px-6 py-24 scroll-mt-20 md:py-32"
    >
      {/* Section intro */}
      <div className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="text-xs font-semibold uppercase tracking-[0.28em]"
          style={{ color: "var(--cyan-glow)" }}
        >
          Our Projects Impact
        </motion.span>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ delay: 0.1 }}
          className="mt-3 font-display text-3xl font-bold md:text-4xl"
        >
          Four Programmes,{" "}
          <span className="grad-text">Lasting Change</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          transition={{ delay: 0.2 }}
          className="mt-4 text-base leading-relaxed"
          style={{ color: "var(--muted-text)" }}
        >
          Each flagship programme is built to educate, empower, and uplift
          communities across India — one school, one drive, one career at a time.
        </motion.p>
      </div>

      {/* Project rows */}
      <div className="relative mx-auto" style={{ maxWidth: "1320px", zIndex: 1 }}>
        {impactProjects.map((project, i) => (
          <div key={project.title}>
            <ProjectRow project={project} index={i} />
            {i < impactProjects.length - 1 && <SectionDivider />}
          </div>
        ))}
      </div>
    </section>
  );
}
