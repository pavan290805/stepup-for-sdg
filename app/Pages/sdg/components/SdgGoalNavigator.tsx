"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { sdgs } from "../data/sdgs";

type Props = {
  currentGoalId: number;
};

function goalImagePath(id: number) {
  return `/sdg/goal-${String(id).padStart(2, "0")}.png`;
}

export default function SdgGoalNavigator({ currentGoalId }: Props) {
  const currentIndex = sdgs.findIndex((sdg) => sdg.id === currentGoalId);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <nav aria-label="SDG goal navigation" className="mb-8 flex items-center gap-2">
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white backdrop-blur-md transition hover:bg-white/15"
      >
        &#8249;
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-none px-2 rounded-2xl border border-white/12 bg-white/8 py-3 shadow-[0_14px_34px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md"
        style={{ scrollbarWidth: "none" }}
      >
        {sdgs.map((sdg) => {
          const active = sdg.id === currentGoalId;
          return (
            <Link
              key={sdg.id}
              aria-current={active ? "page" : undefined}
              href={`/Pages/sdg/${sdg.id}`}
              className={`relative flex-shrink-0 flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border transition transform ${
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

      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white backdrop-blur-md transition hover:bg-white/15"
      >
        &#8250;
      </button>
    </nav>
  );
}
