import { Counter } from "./Counter";
import { FadeUp } from "./FadeUp";

const metrics = [
  { value: 1240, suffix: "+", label: "Schools Supported" },
  { value: 560, suffix: "+", label: "Projects Completed" },
  { value: 380000, suffix: "+", label: "Students Enrolled" },
  { value: 45000, suffix: "+", label: "Volunteer Hours" },
];

export function ImpactMetrics() {
  return (
    <section className="relative py-20 px-6">
      <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <FadeUp key={m.label} delay={i * 100}>
            <div className="glass rounded-2xl p-6 text-center lift">
              <div className="text-3xl md:text-4xl font-display font-bold grad-text">
                <Counter to={m.value} suffix={m.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-text">{m.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}