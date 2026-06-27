"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FadeUp } from "./FadeUp";
import { stories } from "@/app/data/stories";

function Slider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative h-48 rounded-xl overflow-hidden select-none" style={{ border: "1px solid var(--border)" }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after} alt="after" className="w-full h-full object-cover" />
        <span className="absolute top-2 right-3 text-[10px] font-semibold tracking-wider text-white bg-black/50 px-2 py-0.5 rounded">AFTER</span>
      </div>
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="before" className="h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
        <span className="absolute top-2 left-3 text-[10px] font-semibold tracking-wider text-white bg-black/50 px-2 py-0.5 rounded">BEFORE</span>
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,194,255,0.8)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white grid place-items-center text-xs font-bold shadow-lg" style={{ color: "#050B18" }}>⇆</div>
      </div>
      <input type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" aria-label="Before/after slider" />
    </div>
  );
}

export function SuccessStories() {
  return (
    <section className="relative py-24 px-6" style={{ background: "var(--secondary)" }}>
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--cyan-glow)" }}>
              Real Outcomes
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              Success Stories
            </h2>
          </div>
        </FadeUp>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((s, i) => (
            <FadeUp key={s.slug} delay={i * 100}>
              <div className="rounded-2xl p-5 lift h-full flex flex-col"
                style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                <Slider before={s.before} after={s.after} />
                <h3 className="mt-5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed flex-1" style={{ color: "var(--muted-text)" }}>{s.body}</p>
                <Link href={`/stories/${s.slug}`} className="btn-arrow mt-4 text-sm font-semibold flex items-center gap-1" style={{ color: "var(--cyan-glow)" }}>
                  See impact <ArrowRight className="arr h-4 w-4" />
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/stories" className="inline-flex items-center gap-2 border border-border rounded-full px-6 py-3 text-sm font-semibold hover:bg-muted transition" style={{ color: "var(--foreground)" }}>
            View all stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
