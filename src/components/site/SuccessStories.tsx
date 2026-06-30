import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "./FadeUp";

const stories = [
  {
    title: "Classroom Transformation",
    body: "Old, overcrowded classrooms upgraded with new furniture, lighting and digital learning tools.",
    before: "linear-gradient(135deg,#3a2e1f,#5a4a35)",
    after: "linear-gradient(135deg,#155DFC,#00C2FF)",
  },
  {
    title: "School Infrastructure Upgrade",
    body: "Renovation of school buildings, sanitation and playgrounds to create safe learning spaces.",
    before: "linear-gradient(135deg,#2a2a2a,#444)",
    after: "linear-gradient(135deg,#00A8A8,#00B050)",
  },
  {
    title: "Student Learning Transformation",
    body: "Improved learning outcomes and engagement through classroom upgrades and digital access.",
    before: "linear-gradient(135deg,#3a1f1f,#5a3535)",
    after: "linear-gradient(135deg,#FF7A00,#FFB070)",
  },
];

function Slider({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative h-48 rounded-xl overflow-hidden border border-border select-none">
      <div className="absolute inset-0" style={{ background: after }}>
        <span className="absolute top-2 right-3 text-[10px] font-semibold tracking-wider text-white/90 bg-black/30 px-2 py-0.5 rounded">AFTER</span>
      </div>
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%`, background: before }}>
        <span className="absolute top-2 left-3 text-[10px] font-semibold tracking-wider text-white/90 bg-black/30 px-2 py-0.5 rounded">BEFORE</span>
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,194,255,0.8)]" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white grid place-items-center text-navy text-xs font-bold shadow-lg">⇆</div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
        aria-label="Before/after slider"
      />
    </div>
  );
}

export function SuccessStories() {
  return (
    <section className="relative py-24 px-6 bg-deep-blue/40">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-glow">Real Outcomes</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Success Stories</h2>
          </div>
        </FadeUp>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <FadeUp key={s.title} delay={i * 100}>
              <div className="glass rounded-2xl p-5 lift">
                <Slider before={s.before} after={s.after} />
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-text leading-relaxed">{s.body}</p>
                <div className="btn-arrow mt-4 text-sm text-cyan-glow">
                  See impact <ArrowRight className="arr h-4 w-4" />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}