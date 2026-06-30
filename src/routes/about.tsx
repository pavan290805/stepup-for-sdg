import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/site/FadeUp";
import { SpaceBackdrop } from "@/components/site/SpaceBackdrop";
import { Counter } from "@/components/site/Counter";
import { Users, Target, Eye, Briefcase, GraduationCap, HeartHandshake, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — StepUp for SDG" },
      { name: "description", content: "Purpose-driven partnerships for a better tomorrow." },
      { property: "og:title", content: "About StepUp for SDG" },
      { property: "og:description", content: "We bring together schools, NGOs, companies and communities for measurable impact." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const team = [
  { name: "Aarav Mehta", role: "Founder & Director" },
  { name: "Priya Nair", role: "Head of Partnerships" },
  { name: "Rahul Verma", role: "Programs Lead" },
  { name: "Sara Khan", role: "Impact & Research" },
];

const services = [
  { icon: GraduationCap, label: "Education Programs" },
  { icon: Briefcase, label: "Corporate Partnerships" },
  { icon: HeartHandshake, label: "NGO Collaboration" },
  { icon: BarChart3, label: "Impact Reporting" },
];

const sdgs = [
  ["SDG 1", "No Poverty", "#E5243B"],
  ["SDG 4", "Quality Education", "#C5192D"],
  ["SDG 5", "Gender Equality", "#FF3A21"],
  ["SDG 8", "Decent Work", "#A21942"],
  ["SDG 10", "Reduced Inequalities", "#DD1367"],
  ["SDG 11", "Sustainable Cities", "#FD9D24"],
  ["SDG 13", "Climate Action", "#3F7E44"],
  ["SDG 17", "Partnerships", "#19486A"],
];

const five = ["People", "Planet", "Prosperity", "Peace", "Partnership"];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-24 px-6">
        <SpaceBackdrop />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">About Us</span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
              Purpose-driven partnerships for a <span className="grad-text">better tomorrow</span>
            </h1>
            <p className="mt-6 text-muted-text max-w-2xl mx-auto">
              We bring together schools, NGOs, companies and communities to deliver transparent, measurable impact aligned with the UN Sustainable Development Goals.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2">
          {[
            { icon: Eye, title: "Our Vision", body: "A world where every learner has the chance to thrive." },
            { icon: Target, title: "Our Mission", body: "Turning partnerships into measurable, lasting impact." },
          ].map((b, i) => (
            <FadeUp key={b.title} delay={i * 100}>
              <div className="glass rounded-2xl p-8 lift h-full">
                <b.icon className="h-8 w-8 text-cyan-glow" />
                <h3 className="mt-4 text-2xl font-semibold">{b.title}</h3>
                <p className="mt-2 text-muted-text">{b.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 bg-deep-blue/40">
        <div className="mx-auto max-w-6xl">
          <FadeUp><h2 className="text-3xl md:text-4xl font-bold text-center">Our Team</h2></FadeUp>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <FadeUp key={m.name} delay={i * 80}>
                <div className="glass rounded-2xl p-6 text-center lift">
                  <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-electric to-cyan-glow grid place-items-center text-white text-2xl font-bold">
                    {m.name.split(" ").map((p) => p[0]).join("")}
                  </div>
                  <h4 className="mt-4 font-semibold">{m.name}</h4>
                  <p className="text-sm text-muted-text">{m.role}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp><h2 className="text-3xl md:text-4xl font-bold text-center">Our Services</h2></FadeUp>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <FadeUp key={s.label} delay={i * 80}>
                <div className="glass rounded-2xl p-6 lift">
                  <s.icon className="h-7 w-7 text-cyan-glow" />
                  <h4 className="mt-4 font-semibold">{s.label}</h4>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-deep-blue/40">
        <div className="mx-auto max-w-6xl">
          <FadeUp><h2 className="text-3xl md:text-4xl font-bold text-center">Our Impact</h2></FadeUp>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: 1240, s: "+", l: "Schools Supported" },
              { n: 560, s: "+", l: "Projects Completed" },
              { n: 380, s: "K+", l: "Students Enrolled" },
              { n: 18, s: "", l: "Regions Reached" },
            ].map((m, i) => (
              <FadeUp key={m.l} delay={i * 80}>
                <div className="glass rounded-2xl p-6 text-center lift">
                  <div className="text-3xl font-bold grad-text">
                    <Counter to={m.n} suffix={m.s} />
                  </div>
                  <div className="mt-2 text-sm text-muted-text">{m.l}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">5P Model</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Five pillars of sustainable impact</h2>
          </FadeUp>
          <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-5">
            {five.map((p, i) => (
              <FadeUp key={p} delay={i * 80}>
                <div className="glass rounded-2xl p-6 lift">
                  <Users className="h-6 w-6 text-cyan-glow mx-auto" />
                  <div className="mt-3 font-semibold">{p}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-deep-blue/40">
        <div className="mx-auto max-w-6xl">
          <FadeUp><h2 className="text-3xl md:text-4xl font-bold text-center">SDG Contribution</h2></FadeUp>
          <div className="mt-10 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {sdgs.map(([code, name, color], i) => (
              <FadeUp key={code} delay={i * 60}>
                <div className="glass rounded-xl p-5 lift flex items-center gap-3">
                  <span className="h-10 w-10 rounded-md grid place-items-center text-white font-bold text-xs" style={{ background: color }}>
                    {code.split(" ")[1]}
                  </span>
                  <div>
                    <div className="text-xs text-muted-text">{code}</div>
                    <div className="text-sm font-semibold">{name}</div>
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