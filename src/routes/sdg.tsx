import { createFileRoute } from "@tanstack/react-router";
import { SpaceBackdrop } from "@/components/site/SpaceBackdrop";
import { RotatingEarth } from "@/components/site/RotatingEarth";
import { FadeUp } from "@/components/site/FadeUp";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/sdg")({
  head: () => ({
    meta: [
      { title: "Sustainable Development Goals — StepUp for SDG" },
      { name: "description", content: "17 Goals to Transform Our World. Focus on SDG 4 — Quality Education." },
      { property: "og:title", content: "Sustainable Development Goals" },
      { property: "og:description", content: "17 Goals to Transform Our World." },
    ],
    links: [{ rel: "canonical", href: "/sdg" }],
  }),
  component: SdgPage,
});

const goals = [
  ["1", "No Poverty", "#E5243B"],
  ["2", "Zero Hunger", "#DDA63A"],
  ["3", "Good Health & Well-being", "#4C9F38"],
  ["4", "Quality Education", "#C5192D"],
  ["5", "Gender Equality", "#FF3A21"],
  ["6", "Clean Water & Sanitation", "#26BDE2"],
  ["7", "Affordable & Clean Energy", "#FCC30B"],
  ["8", "Decent Work & Growth", "#A21942"],
  ["9", "Industry & Innovation", "#FD6925"],
  ["10", "Reduced Inequalities", "#DD1367"],
  ["11", "Sustainable Cities", "#FD9D24"],
  ["12", "Responsible Consumption", "#BF8B2E"],
  ["13", "Climate Action", "#3F7E44"],
  ["14", "Life Below Water", "#0A97D9"],
  ["15", "Life on Land", "#56C02B"],
  ["16", "Peace & Justice", "#00689D"],
  ["17", "Partnerships", "#19486A"],
];

function SdgPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-20 px-6">
        <SpaceBackdrop />
        <div className="relative mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 items-center">
          <FadeUp>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">Global Agenda 2030</span>
              <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold leading-[1]">
                Sustainable <br />Development <br /><span className="grad-text">Goals</span>
              </h1>
              <p className="mt-6 text-lg text-muted-text">17 Goals to Transform Our World</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#goals" className="btn-arrow inline-flex items-center gap-2 border border-cyan-glow/60 text-white rounded-full px-6 py-3 hover:bg-cyan-glow/10 transition">
                  Explore Goals <ArrowRight className="arr h-4 w-4" />
                </a>
                <a href="#sdg4" className="btn-arrow inline-flex items-center gap-2 border border-border text-muted-text rounded-full px-6 py-3 hover:text-white transition">
                  Learn More
                </a>
              </div>
            </div>
          </FadeUp>
          <RotatingEarth showCards={false} />
        </div>
      </section>

      <section id="sdg4" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <div className="glass rounded-3xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#C5192D]/30 blur-3xl" />
              <span className="inline-block h-12 w-12 rounded-lg bg-[#C5192D] grid place-items-center text-white font-bold">04</span>
              <h2 className="mt-5 text-3xl md:text-4xl font-bold">Our Focus: Quality Education</h2>
              <p className="mt-4 text-muted-text max-w-2xl">
                Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all. We work directly with schools, NGOs and corporates to make SDG 4 a measurable reality.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="goals" className="px-6 py-20 bg-deep-blue/40">
        <div className="mx-auto max-w-7xl">
          <FadeUp><h2 className="text-3xl md:text-4xl font-bold text-center">All 17 Goals</h2></FadeUp>
          <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {goals.map(([n, name, color], i) => (
              <FadeUp key={n} delay={i * 40}>
                <div className="glass rounded-2xl p-5 lift group">
                  <div className="flex items-center gap-3">
                    <span className="h-12 w-12 rounded-lg grid place-items-center text-white font-bold" style={{ background: color }}>
                      {n}
                    </span>
                    <div className="text-sm font-semibold leading-tight">{name}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}