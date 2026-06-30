import { FadeUp } from "./FadeUp";

const partners = [
  { name: "Wipro", logo: "/assets/partners/wipro.png" },
  { name: "Accenture", logo: "/assets/partners/accenture.png" },
  { name: "HCLTech", logo: "/assets/partners/hcl.png" },
  { name: "World Bank", logo: "/assets/partners/worldbank.png" },
  { name: "Tech Mahindra", logo: "/assets/partners/techmahindra.png" },
  { name: "Save the Children", logo: "/assets/partners/savethechildren.png" },
  { name: "Tata", logo: "/assets/partners/tata.png" },
  { name: "Reliance Foundation", logo: "/assets/partners/reliance.png" },
  { name: "UNICEF", logo: "/assets/partners/unicef.png" },
  { name: "UNESCO", logo: "/assets/partners/unesco.png" },
  { name: "Microsoft", logo: "/assets/partners/microsoft.png" },
  { name: "Google", logo: "/assets/partners/google.png" },
  { name: "Infosys", logo: "/assets/partners/infosys.png" },
];

export function PartnersCarousel() {
  const loop = [...partners, ...partners];
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <FadeUp>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--cyan-glow)" }}>
              Our Partners
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ color: "var(--foreground)" }}>
              Trusted by leading organizations
            </h2>
            <p className="mt-3 text-sm" style={{ color: "var(--muted-text)" }}>
              Working together to advance SDG 4 — Quality Education.
            </p>
          </div>
        </FadeUp>
        <div
          className="relative rounded-2xl overflow-hidden py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
          style={{ background: "#ffffff", boxShadow: "0 6px 30px rgba(0,0,0,0.12)" }}
        >
          <div className="marquee items-center">
            {loop.map((p, i) => (
              <div key={i} className="flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt={p.name}
                  title={p.name}
                  className="h-9 md:h-11 w-auto max-w-[150px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
