import { FadeUp } from "./FadeUp";

const partners = [
  "Wipro", "Accenture", "HCL", "World Bank", "Tech Mahindra",
  "Save the Children", "TATA", "Reliance Foundation", "UNICEF",
  "UNESCO", "Microsoft", "Google", "Infosys",
];

export function PartnersCarousel() {
  const loop = [...partners, ...partners];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-glow">Our Partners</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">Trusted by leading organizations</h2>
            <p className="mt-3 text-sm text-muted-text">Working together to advance SDG 4 — Quality Education.</p>
          </div>
        </FadeUp>
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee py-4">
            {loop.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-8 py-4 rounded-xl glass min-w-[180px] text-muted-text hover:text-cyan-glow transition font-display font-semibold text-lg whitespace-nowrap"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}