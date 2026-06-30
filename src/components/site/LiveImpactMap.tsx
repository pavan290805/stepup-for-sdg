import { Search } from "lucide-react";
import { FadeUp } from "./FadeUp";

const nodes = [
  { x: 22, y: 38, level: "high" },
  { x: 30, y: 50, level: "med" },
  { x: 48, y: 30, level: "high" },
  { x: 52, y: 48, level: "high" },
  { x: 55, y: 58, level: "med" },
  { x: 62, y: 42, level: "high" },
  { x: 70, y: 50, level: "med" },
  { x: 78, y: 55, level: "low" },
  { x: 82, y: 65, level: "low" },
  { x: 35, y: 70, level: "med" },
  { x: 68, y: 38, level: "high" },
  { x: 45, y: 55, level: "high" },
];

const color = (l: string) =>
  l === "high" ? "#00B050" : l === "med" ? "#FF7A00" : l === "low" ? "#155DFC" : "#AAB6C8";

export function LiveImpactMap() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-glow">Live Impact Count</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Impact across the world</h2>
            <p className="mt-3 text-sm text-muted-text">Track education impact across schools, NGOs and partner regions.</p>
          </div>
        </FadeUp>
        <FadeUp delay={100}>
          <div className="glass rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 bg-navy/60 border border-border rounded-full px-4 py-2 w-full md:max-w-sm">
                <Search className="h-4 w-4 text-muted-text" />
                <input
                  placeholder="Search country or region..."
                  className="bg-transparent outline-none text-sm w-full text-white placeholder:text-muted-text"
                />
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                {[
                  ["High Impact", "#00B050"],
                  ["Medium Impact", "#FF7A00"],
                  ["Low Impact", "#155DFC"],
                  ["No Data", "#AAB6C8"],
                ].map(([l, c]) => (
                  <span key={l} className="flex items-center gap-2 text-muted-text">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c, boxShadow: `0 0 10px ${c}` }} />
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative aspect-[2.2/1] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,#0c1a30_0%,#050B18_100%)] border border-border">
              {/* simple stylized world silhouette via SVG */}
              <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full opacity-40">
                <path
                  fill="rgba(0,194,255,0.18)"
                  stroke="rgba(0,194,255,0.35)"
                  strokeWidth="0.15"
                  d="M5,25 Q15,15 25,22 T45,20 Q55,25 60,22 Q70,18 80,24 Q90,30 95,28 L95,38 Q80,42 70,40 Q55,42 45,38 Q35,42 25,38 Q15,40 5,35 Z"
                />
              </svg>
              {nodes.map((n, i) => (
                <span
                  key={i}
                  className="absolute h-3 w-3 rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${n.x}%`,
                    top: `${n.y}%`,
                    background: color(n.level),
                    boxShadow: `0 0 0 4px ${color(n.level)}33, 0 0 16px ${color(n.level)}`,
                    animation: `nodePulse 2.5s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}