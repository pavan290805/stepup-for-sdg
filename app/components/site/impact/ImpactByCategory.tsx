"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Lightbulb, TrendingUp } from "lucide-react";
import { Counter } from "@/app/components/site/Counter";
import { SectionHead } from "./SectionHead";
import { fadeUp, staggerContainer, viewportOnce } from "./variants";
import { impactCategories, type ImpactCategory } from "@/app/data/impact";

function StatUnit({ stat, accent }: { stat: ImpactCategory["stats"][number]; accent: string }) {
  const StatIcon = stat.icon;
  return (
    <motion.div variants={fadeUp} className="group">
      <span
        className="mb-3 grid h-11 w-11 place-items-center rounded-full transition-transform duration-500 group-hover:-translate-y-1"
        style={{ background: `color-mix(in srgb, ${accent} 14%, transparent)` }}
      >
        <StatIcon className="h-5 w-5" style={{ color: accent }} />
      </span>
      <div className="font-display text-2xl md:text-[26px] font-bold" style={{ color: accent }}>
        <Counter to={stat.value} suffix={stat.suffix} />
      </div>
      <div className="mt-1 text-xs leading-snug" style={{ color: "var(--muted-text)" }}>{stat.label}</div>
      <span className="mt-3 block h-[3px] w-8 rounded-full opacity-70" style={{ background: accent }} />
    </motion.div>
  );
}

function CategoryRow({ category, isLast }: { category: ImpactCategory; isLast: boolean }) {
  const Icon = category.icon;

  return (
    <motion.div
      variants={fadeUp}
      className={`flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:gap-10 ${isLast ? "" : "border-b"}`}
      style={{ borderColor: "var(--border)" }}
    >
      {/* Category label */}
      <div className="flex shrink-0 items-center gap-4 sm:w-48 sm:flex-col sm:items-start sm:gap-3">
        <span
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full"
          style={{ background: `color-mix(in srgb, ${category.accent} 16%, transparent)` }}
        >
          <Icon className="h-6 w-6" style={{ color: category.accent }} />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold">{category.title}</h3>
          <span className="mt-2 block h-[3px] w-9 rounded-full" style={{ background: category.accent }} />
        </div>
      </div>

      {/* Bare stat units — no card, no border, no shadow */}
      <motion.div
        variants={staggerContainer(0.08)}
        className="grid flex-1 grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4"
      >
        {category.stats.map((s) => (
          <StatUnit key={s.label} stat={s} accent={category.accent} />
        ))}
      </motion.div>

      {isLast && (
        <div className="hidden shrink-0 items-end justify-center lg:flex">
          <TrendingUp aria-hidden className="imp-float-slow h-14 w-14" style={{ color: "var(--gold)", opacity: 0.45 }} />
        </div>
      )}
    </motion.div>
  );
}

export function ImpactByCategory() {
  return (
    <section id="impact-numbers" className="relative overflow-hidden px-6 py-24 md:py-32 scroll-mt-24">
      <BookOpen aria-hidden className="imp-hero-icon imp-float" style={{ top: "8%", left: "4%" }} />
      <Sparkles aria-hidden className="imp-hero-icon imp-float" style={{ top: "62%", right: "5%", animationDelay: "-3s" }} />
      <Lightbulb aria-hidden className="imp-hero-icon imp-float" style={{ bottom: "6%", left: "8%", animationDelay: "-5s" }} />

      <div className="relative mx-auto max-w-7xl" style={{ zIndex: 1 }}>
        <SectionHead
          eyebrow="Our Impact in Action"
          title="Real change, measurable outcomes"
          desc="Countless lives transformed — one classroom, one volunteer, one partnership at a time."
        />

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-14 flex flex-col"
        >
          {impactCategories.map((c, i) => (
            <CategoryRow key={c.title} category={c} isLast={i === impactCategories.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
