import { ArrowRight, Building2, GraduationCap, HeartHandshake } from "lucide-react";
import { FadeUp } from "./FadeUp";

const cards = [
  {
    icon: Building2,
    title: "Companies",
    body: "Channel CSR funding into transparent, measurable education programs and track impact in real time.",
    cta: "Explore Partnership",
    accent: "from-electric to-cyan-glow",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    body: "Join our network to access resources, infrastructure support and quality learning programs.",
    cta: "Join as School",
    accent: "from-teal to-leaf",
  },
  {
    icon: HeartHandshake,
    title: "NGOs",
    body: "Collaborate on the ground to uplift communities and deliver lasting, sustainable social change.",
    cta: "Collaborate Now",
    accent: "from-cta to-[#ffb070]",
  },
];

export function PartnerCards() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-glow">Partner With Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Three ways to make impact together</h2>
          </div>
        </FadeUp>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <FadeUp key={c.title} delay={i * 120}>
              <div className="glass rounded-2xl p-7 h-full flex flex-col lift">
                <div className={`h-12 w-12 rounded-xl grid place-items-center bg-gradient-to-br ${c.accent} shadow-[0_0_24px_rgba(0,194,255,0.3)]`}>
                  <c.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-text leading-relaxed flex-1">{c.body}</p>
                <button className="btn-arrow mt-6 text-sm font-medium text-cyan-glow hover:text-white transition">
                  {c.cta} <ArrowRight className="arr h-4 w-4" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}