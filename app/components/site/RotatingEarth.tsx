import { GraduationCap, Users, Building2, Leaf, Sparkles, School, Handshake, Trees, SunMedium } from "lucide-react";

type Props = {
  size?: string;
  showCards?: boolean;
  className?: string;
};

const cards = [
  {
    title: "Education For Sustainable Futures",
    icon: GraduationCap,
    accent: "#00C2FF",
    position: { top: "4%", left: "-8%" },
    path: "M24,44 C30,24 40,18 62,18",
    node: { left: "18%", top: "28%" },
  },
  {
    title: "Empowering Future Change Makers",
    icon: Users,
    accent: "#22C55E",
    position: { top: "28%", right: "-8%" },
    path: "M76,42 C84,36 90,34 112,32",
    node: { left: "78%", top: "34%" },
  },
  {
    title: "Together Towards Sustainable Futures",
    icon: Handshake,
    accent: "#FF7A00",
    position: { bottom: "16%", left: "-6%" },
    path: "M24,64 C34,78 44,86 62,86",
    node: { left: "18%", top: "72%" },
  },
  {
    title: "Students Leading Global Change",
    icon: Sparkles,
    accent: "#8B5CF6",
    position: { bottom: "4%", right: "-4%" },
    path: "M76,74 C86,80 94,84 112,84",
    node: { left: "78%", top: "70%" },
  },
];

const orbitNodes = [
  { icon: School, color: "#00C2FF", label: "Schools", top: "20%", left: "18%" },
  { icon: Users, color: "#22C55E", label: "Students", top: "16%", left: "74%" },
  { icon: Building2, color: "#FF7A00", label: "NGOs", top: "74%", left: "16%" },
  { icon: Sparkles, color: "#8B5CF6", label: "Companies", top: "74%", left: "76%" },
  { icon: Trees, color: "#00B050", label: "Sustainability", top: "48%", left: "10%" },
  { icon: SunMedium, color: "#F59E0B", label: "Energy", top: "48%", left: "84%" },
];

export function RotatingEarth({
  size = "min(560px, 90vw)",
  showCards = true,
  className = "",
}: Props) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: size, maxWidth: "100%" }}>
      <div className="earth-wrap">
        <div className="earth-glow" />
        <svg className="earth-orbit-svg" viewBox="0 0 140 140" aria-hidden="true">
          <path className="orbit-path orbit-path-1" d="M70 8 C95 8 116 28 116 52 C116 77 95 96 70 96 C45 96 24 77 24 52 C24 28 45 8 70 8" />
          <path className="orbit-path orbit-path-2" d="M70 12 C102 12 128 37 128 69 C128 100 102 126 70 126 C38 126 12 100 12 69 C12 37 38 12 70 12" />
          <path className="orbit-path orbit-path-3" d="M70 6 C108 6 136 33 136 70 C136 107 108 134 70 134 C32 134 4 107 4 70 C4 33 32 6 70 6" />
        </svg>

        <div className="earth-sphere" />
        <div className="earth-atmos" />

        {orbitNodes.map(({ icon: Icon, color, label, top, left }) => (
          <div key={label} className="earth-node" style={{ top, left, borderColor: `${color}55` }}>
            <span className="earth-node-dot" style={{ background: color }} />
            <span className="earth-node-icon" style={{ color }}><Icon className="h-3.5 w-3.5" /></span>
          </div>
        ))}

        {showCards && cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="earth-card-wrap" style={{ ...card.position, animationDelay: `${index * 0.8}s` }}>
              <svg className="earth-card-line" viewBox="0 0 140 100" preserveAspectRatio="none" aria-hidden="true">
                <path d={card.path} />
              </svg>
              <div className="earth-card-node" style={{ left: card.node.left, top: card.node.top }} />
              <div className="earth-card" style={{ borderColor: `${card.accent}40` }}>
                <span className="earth-card-icon" style={{ color: card.accent }}>
                  <Icon className="h-4 w-4" />
                </span>
                <span>{card.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
