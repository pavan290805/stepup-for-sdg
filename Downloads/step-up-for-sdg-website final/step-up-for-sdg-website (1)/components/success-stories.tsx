"use client"

import { Reveal } from "@/components/reveal"

const cards = [
  {
    name: "Classroom Transformation",
    summary:
      "Old, overcrowded classrooms upgraded with new furniture, lighting and digital learning tools.",
    img: "/images/clssromms.png",
  },
  {
    name: "School Infrastructure Upgrade",
    summary:
      "Renovation of school buildings, sanitation and playgrounds to create safe learning spaces.",
    img: "/images/infrastructure.png",
  },
  {
    name: "Student Learning Transformation",
    summary:
      "Improved learning outcomes and engagement through classroom upgrades and digital access.",
    img: "/images/students.png",
  },
]

export function SuccessStories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-cyan-400">
          Real Change
        </p>
        <h2 className="mb-9 text-center font-heading text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
          Success Stories
        </h2>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((c, i) => (
          <Reveal key={c.name} delay={i * 100}>
            <div className="group h-full overflow-hidden rounded-[24px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-md transition-transform duration-300 hover:scale-105">
              <div className="overflow-hidden rounded-t-[24px]">
                <img
                  src={c.img}
                  alt={c.name}
                  className="h-[280px] w-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                  {c.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {c.summary}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
