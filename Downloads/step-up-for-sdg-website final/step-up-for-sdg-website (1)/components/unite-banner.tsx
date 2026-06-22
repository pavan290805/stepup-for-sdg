import Image from "next/image"
import Link from "next/link"

export function UniteBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0f3d2e] to-[#16623f] px-6 py-8 sm:px-10">
        <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h2 className="font-heading text-3xl font-extrabold text-white text-balance">
              UNITE 2030 Vision
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Building a future through collaboration, education, innovation and
              community-driven impact.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-[#0f3d2e] font-semibold hover:bg-white/90 transition-colors inline-flex items-center justify-center"
            >
              Become a Partner
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 bg-transparent px-6 py-3 text-white font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <Image
          src="/images/hero-sdg.png"
          alt=""
          aria-hidden="true"
          width={400}
          height={300}
          className="pointer-events-none absolute right-0 top-1/2 hidden h-auto w-auto -translate-y-1/2 object-contain opacity-70 lg:block"
        />
      </div>
    </section>
  )
}