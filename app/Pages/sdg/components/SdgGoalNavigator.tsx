"use client";

import Image from "next/image";
import Link from "next/link";
import { sdgs } from "../data/sdgs";

type Props = {
  currentGoalId: number;
};

function goalImagePath(id: number) {
  return `/sdg/goal-${String(id).padStart(2, "0")}.png`;
}

export default function SdgGoalNavigator({ currentGoalId }: Props) {
  const currentIndex = sdgs.findIndex((sdg) => sdg.id === currentGoalId);
  const previous = currentIndex > 0 ? sdgs[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < sdgs.length - 1 ? sdgs[currentIndex + 1] : null;

  return (
    <nav
      aria-label="SDG goal navigation"
      className="mb-8 rounded-2xl border border-white/12 bg-white/8 px-3 py-3 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md overflow-x-auto"
    >
      <div className="flex items-center gap-3 px-2 min-w-max">
        {sdgs.map((sdg) => {
          const active = sdg.id === currentGoalId;
          return (
            <Link
              key={sdg.id}
              aria-current={active ? "page" : undefined}
              href={`/Pages/sdg/${sdg.id}`}
              className={`relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border transition transform ${
                active ? "ring-2 ring-cyan-300/60 scale-105" : "border-white/10 hover:scale-105"
              }`}
              aria-label={`Open SDG Goal ${sdg.id}: ${sdg.title}`}
            >
              <Image
                src={goalImagePath(sdg.id)}
                alt={sdg.title}
                width={80}
                height={80}
                className="object-cover rounded-xl"
                unoptimized
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
