import { Reveal } from "@/components/reveal"

const partners = [
  "UNICEF",
  "World Bank",
  "Microsoft",
  "UNESCO",
  "Save the Children",
  "TATA Trusts",
  "Reliance Foundation",
  "Adani Foundation",
  "Teach For India",
  "Bill & Melinda Gates Foundation",
]

export function Partners() {
  const loop = [...partners, ...partners]

  return (
    <section id="partners" className="border-y border-border bg-[radial-gradient(circle_at_top,rgba(0,168,168,0.08),transparent_45%),rgba(255,255,255,0.9)] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Partner Ecosystem
          </p>
          <h2 className="mb-9 text-center font-heading text-2xl font-extrabold text-navy sm:text-3xl">
            Global organizations driving education impact
          </h2>
        </Reveal>

        <div className="marquee-paused group relative overflow-hidden rounded-[2rem] border border-border bg-card/90 py-6 shadow-lg">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-marquee gap-5 px-8">
            {loop.map((p, i) => (
              <div
                key={`${p}-${i}`}
                aria-hidden={i >= partners.length}
                className="flex h-20 min-w-[180px] items-center justify-center rounded-3xl border border-border bg-white/85 px-6 text-center font-heading text-sm font-semibold text-navy shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:bg-primary/5"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
