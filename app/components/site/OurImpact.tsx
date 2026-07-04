"use client";

import { motion } from "framer-motion";
import { Handshake, Globe, type LucideIcon } from "lucide-react";
import { Counter } from "@/app/components/site/Counter";

type ImpactCard = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const impactCards: ImpactCard[] = [
  {
    icon: Handshake,
    title: "Partnerships",
    desc: "Connecting NGOs, schools, volunteers, and companies to create measurable impact.",
  },
  {
    icon: Globe,
    title: "Sustainable Communities",
    desc: "Building long-term educational ecosystems that support the UN Sustainable Development Goals.",
  },
];

const stats = [
  { to: 1, suffix: "M+", label: "Students Impacted" },
  { to: 500, suffix: "+", label: "Schools Supported" },
  { to: 200, suffix: "+", label: "Partner Organizations" },
  { to: 100, suffix: "+", label: "Projects Completed" },
];

function StatBox({ s, delay }: { s: typeof stats[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-2xl p-6 text-center lift"
    >
      <div className="font-display text-3xl font-bold grad-text">
        <Counter to={s.to} suffix={s.suffix} />
      </div>
      <div className="mt-2 text-sm text-muted-text">{s.label}</div>
    </motion.div>
  );
}

function ImpactCardBox({ card, delay }: { card: ImpactCard; delay: number }) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      whileHover={{ y: -10 }}
      className="impact-card group relative flex h-full flex-col rounded-[24px] p-[1.5px]"
    >
      <div className="impact-surface relative flex h-full flex-col gap-4 rounded-[23px] p-6">
        <span className="impact-icon grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-6 w-6 text-white transition-colors duration-300 group-hover:text-white" />
        </span>
        <h3 className="font-display text-lg font-semibold text-white transition-colors duration-300 group-hover:text-white">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#CBD5E1] transition-colors duration-300 group-hover:text-white/90">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function OurImpact() {
  return (
    <div className="mx-auto max-w-6xl">
      {/* Heading + intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">Our Impact</h2>
        <p className="mt-4 text-muted-text">
          Real, measurable change — driven by partnerships that put learners
          first and build educational ecosystems designed to last.
        </p>
      </motion.div>

      {/* Row 1: Partnerships left, Sustainable right */}
      <div className="mt-12 grid grid-cols-2 gap-6">
        <ImpactCardBox card={impactCards[0]} delay={0} />
        <ImpactCardBox card={impactCards[1]} delay={0.1} />
      </div>

      {/* Row 2: all 4 stats */}
      <div className="mt-6 grid grid-cols-4 gap-6">
        <StatBox s={stats[0]} delay={0} />
        <StatBox s={stats[1]} delay={0.1} />
        <StatBox s={stats[2]} delay={0.2} />
        <StatBox s={stats[3]} delay={0.3} />
      </div>
    </div>
  );
}
