"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { sdgs, withAlpha } from "../data/sdgs";

type Props = {
  currentGoalId: number;
};

const HOVER_TRANSITION = {
  type: "spring",
  duration: 0.25,
  bounce: 0,
} as const;

export default function SdgGoalNavigator({ currentGoalId }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const activeCard = scroller?.querySelector<HTMLElement>('[aria-current="page"]');

    if (!scroller || !activeCard) {
      return;
    }

    const activeRect = activeCard.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    const scrollLeft = scroller.scrollLeft + activeRect.left - scrollerRect.left - scroller.clientWidth / 2 + activeRect.width / 2;

    scroller.scrollTo({ left: Math.max(0, scrollLeft), behavior: "auto" });
  }, [currentGoalId]);

  return (
    <nav
      aria-label="SDG goal navigator"
      className="mb-8 w-full"
      data-sdg-goal-navigator
    >
      <div
        className="scrollbar-hide mx-auto max-w-[720px] overflow-x-auto overflow-y-visible scroll-smooth px-1 py-4"
        ref={scrollerRef}
      >
        <ul className="flex w-max items-center gap-3">
          {sdgs.map((goal) => {
            const isCurrent = goal.id === currentGoalId;
            const imagePath = `/sdg/goal-${String(goal.id).padStart(2, "0")}.png`;

            return (
              <li className="flex h-[116px] w-[84px] shrink-0 items-center justify-center" key={goal.id}>
                <motion.div
                  animate={{
                    boxShadow: isCurrent
                      ? `0 18px 44px -14px ${withAlpha(goal.color, 0.95)}`
                      : `0 10px 26px -18px ${withAlpha(goal.color, 0.72)}`,
                    scale: isCurrent ? 1.06 : 1,
                    y: isCurrent ? -2 : 0,
                  }}
                  className="relative h-[98px] w-[76px] transform-gpu cursor-pointer will-change-transform"
                  transition={HOVER_TRANSITION}
                  whileHover={{
                    scale: isCurrent ? 1.12 : 1.12,
                    y: -6,
                    boxShadow: `0 22px 48px -16px ${withAlpha(goal.color, 1)}`,
                  }}
                  whileTap={{ scale: 1.02 }}
                >
                  <Link
                    aria-current={isCurrent ? "page" : undefined}
                    aria-label={`Open SDG Goal ${goal.id}: ${goal.title}`}
                    className="block h-full w-full overflow-hidden rounded-lg border bg-white outline-none transition-[filter] duration-300 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-cyan-200/80"
                    href={`/Pages/sdg/${goal.id}`}
                    style={{
                      backgroundColor: goal.color,
                      borderColor: isCurrent ? "#ffffff" : withAlpha(goal.color, 0.48),
                      borderWidth: isCurrent ? 2 : 1,
                    }}
                  >
                    <Image
                      alt={`SDG Goal ${goal.id}: ${goal.title}`}
                      className="object-contain"
                      fill
                      sizes="80px"
                      src={imagePath}
                    />
                  </Link>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
