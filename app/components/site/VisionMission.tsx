"use client";

import { Eye, Target, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type Stat = { icon: string; to: number; suffix: string; label: string };

type CardData = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  highlight: string;
  image: string;
  imageAlt: string;
  stats: Stat[];
  from: "left" | "right";
  delay: number;
};

const cards: CardData[] = [
  {
    id: "vision",
    icon: Eye,
    eyebrow: "Our Vision",
    headline: "Empowering Every Learner to Build a Better Tomorrow",
    paragraphs: [
      "We envision a future where every child, regardless of geography, income, or background, has equal access to quality education, technology, and opportunities that unlock their full potential.",
      "StepUp for SDG aims to create inclusive schools, empowered educators, and connected communities that inspire lifelong learning and sustainable development.",
    ],
    highlight: "Education is the foundation for lasting change.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80",
    imageAlt: "Children learning inside a modern classroom",
    stats: [],
    from: "left",
    delay: 0,
  },
  {
    id: "mission",
    icon: Target,
    eyebrow: "Our Mission",
    headline: "Transforming Partnerships into Measurable Educational Impact",
    paragraphs: [
      "Our mission is to connect schools, NGOs, companies, volunteers, and communities through one collaborative platform that enables transparent educational initiatives, innovation, and measurable social impact.",
      "Every contribution helps children gain knowledge, confidence, and opportunities for a brighter future.",
    ],
    highlight: "Together we create opportunities that transform lives.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    imageAlt: "Volunteers helping students in a rural school",
    stats: [],
    from: "right",
    delay: 0.2,
  },
];

function PremiumCard({ data }: { data: CardData }) {
  const Icon = data.icon;

  return (
    <div className="vm-card group relative rounded-[32px] p-[1.5px]">
      <div className="vm-surface relative flex h-full flex-col gap-5 rounded-[31px] p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="vm-icon grid h-12 w-12 place-items-center rounded-2xl">
            <Icon className="h-6 w-6 text-white" />
          </span>
          <h3 className="font-display text-xl font-bold text-white md:text-2xl">
            {data.eyebrow}
          </h3>
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h4 className="font-display text-lg font-semibold leading-snug text-white">
            {data.headline}
          </h4>
          {data.paragraphs.map((p, i) => (
            <p key={i} className="text-[13px] leading-relaxed text-[#CBD5E1]">
              {p}
            </p>
          ))}
          <p className="vm-highlight mt-0.5 border-l-2 pl-3 text-[13px] font-medium italic">
            "{data.highlight}"
          </p>
        </div>
      </div>
    </div>
  );
}

export function VisionMission() {
  return (
    <section className="vm-section relative overflow-hidden">
      <div className="vm-bg pointer-events-none absolute inset-0 -z-10">
        <span className="vm-blob vm-blob-blue" />
        <span className="vm-blob vm-blob-green" />
        <span className="vm-rays" />
        <span className="vm-particles" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="vision-title font-display text-4xl font-bold md:text-5xl relative inline-block">
          Vision &amp;{" "}
          <span className="grad-text relative">
            Mission
            <span className="absolute left-0 -bottom-1 w-full h-[3px] rounded-full" style={{ background: "linear-gradient(90deg,#00C2FF,#155DFC)" }} />
          </span>
        </h2>
      </motion.div>

      <div className="mx-auto mt-12 grid w-full max-w-[1120px] grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <PremiumCard key={c.id} data={c} />
        ))}
      </div>
    </section>
  );
}
