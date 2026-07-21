"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Lightbulb, PenTool } from "lucide-react";
import { heroStat } from "@/app/data/impact";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80";

export function ImpactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.4 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-12, 12]);
  const blobX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const blobY = useTransform(sy, [-0.5, 0.5], [10, -10]);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  const headingLines = ["Every Step We Take,", "Moves a Life Forward"];

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden flex items-center px-6 py-24"
      style={{ minHeight: "92vh", background: "var(--background)" }}
    >
      <motion.div aria-hidden className="imp-blob imp-blob-blue" style={{ x: blobX, y: blobY }} />
      <motion.div aria-hidden className="imp-blob imp-blob-green" style={{ x: blobX, y: blobY }} />
      <div aria-hidden className="imp-blob imp-blob-gold" />

      <BookOpen aria-hidden className="imp-hero-icon imp-float" style={{ top: "14%", left: "6%" }} />
      <GraduationCap aria-hidden className="imp-hero-icon imp-float" style={{ top: "68%", left: "10%", animationDelay: "-3s" }} />
      <PenTool aria-hidden className="imp-hero-icon imp-float" style={{ top: "20%", right: "8%", animationDelay: "-5s" }} />
      <Lightbulb aria-hidden className="imp-hero-icon imp-float" style={{ bottom: "10%", right: "16%", animationDelay: "-1.5s" }} />

      <div className="relative mx-auto max-w-7xl w-full grid gap-16 lg:grid-cols-2 items-center" style={{ zIndex: 2 }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--gold)", border: "1px solid var(--border)", background: "var(--card)" }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Our Impact
          </motion.div>

          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-[1.08]">
            {headingLines.map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? <span className="grad-text">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted-text)" }}
          >
            Beyond the headline numbers, this is where classrooms, mentors and
            communities meet — a closer look at the programmes turning access
            into real, lasting outcomes for learners across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="#impact-numbers"
              className="btn-arrow inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-[0_0_24px_rgba(21,93,252,0.4)] hover:brightness-110 transition"
              style={{ background: "var(--electric)" }}
            >
              See the Numbers <ArrowRight className="arr h-4 w-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ x: imgX, y: imgY }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-[28px] overflow-hidden"
            style={{ boxShadow: "0 40px 80px -30px rgba(6,13,46,0.45)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE}
              alt="Students learning together in a bright modern classroom"
              className="w-full h-[420px] md:h-[540px] object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 60%, rgba(5,11,24,0.35) 100%)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="absolute -bottom-6 -left-6 rounded-2xl px-5 py-4 imp-float-slow"
            style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 20px 40px -16px rgba(0,0,0,0.25)" }}
          >
            <div className="text-2xl font-display font-bold" style={{ color: "var(--leaf)" }}>
              {heroStat.value.toLocaleString()}
              {heroStat.suffix}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--muted-text)" }}>{heroStat.label}</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
