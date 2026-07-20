import Link from "next/link";
import { FadeUp } from "@/app/components/site/FadeUp";
import { SpaceBackdrop } from "@/app/components/site/SpaceBackdrop";
import { VisionMission } from "@/app/components/site/VisionMission";
import { TeamCards } from "@/app/components/site/TeamCards";
import { FivePCards } from "@/app/components/site/FivePCards";
import { hideFundsAndContact } from "@/app/lib/siteFlags";

export const metadata = {
  title: "About — StepUp for SDG",
  description: "Purpose-driven partnerships for a better tomorrow.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden py-14 px-6">
        <SpaceBackdrop />
        <div className="relative mx-auto max-w-4xl text-center">
          <FadeUp>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-tight">
              We believe every child deserves a{" "}
              <span className="grad-text">chance to thrive</span>
            </h1>
            <p className="mt-6 text-muted-text max-w-2xl mx-auto">
              StepUp for SDG brings together students, schools, NGOs and companies to create lasting educational change — rooted in the UN Sustainable Development Goals.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. Vision & Mission */}
      <section className="px-6 pt-0 pb-12 scroll-mt-20">
        <div className="mx-auto max-w-[1400px]">
          <VisionMission />
        </div>
      </section>

      {/* 3. Five Pillars (5P Model) */}
      <section id="5p" className="px-6 pt-8 pb-6 scroll-mt-20">
        <div className="mx-auto max-w-6xl text-center">
          <FadeUp>
            <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
              5P Model
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              Five pillars of sustainable impact
            </h2>
          </FadeUp>
          <FivePCards />
        </div>
      </section>

      {/* 4. Our Story / Who We Are */}
      <section id="story" className="px-6 py-12 scroll-mt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <FadeUp>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-cyan-glow">
                Who We Are
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold">
                Our Story
              </h2>
              <div className="mt-6 space-y-4 text-muted-text leading-relaxed">
                <p>
                  StepUp for SDG was born from a simple belief: that every
                  child deserves a fair chance to learn. What began as a small
                  group of passionate volunteers has grown into a movement
                  uniting students, educators, NGOs and companies around one
                  shared purpose.
                </p>
                <p>
                  We build bridges between those who want to help and the
                  communities that need it — making it easy to contribute,
                  collaborate and see the difference your support makes.
                </p>
                <p>
                  Every initiative we run is transparent, trackable and built
                  to last — because real change takes root when communities
                  own it.
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="overflow-hidden rounded-3xl glass p-[1.5px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80"
                alt="Students learning in classroom"
                className="aspect-[4/3] w-full rounded-3xl object-cover"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 5. Our Team */}
      <section id="team" className="px-6 py-12 bg-deep-blue/40 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <FadeUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Our Team
            </h2>
          </FadeUp>
          <TeamCards />
        </div>
      </section>


      {/* 7. Join Our Mission CTA */}
      <section id="join" className="px-6 pt-6 pb-10 scroll-mt-20">
        <FadeUp>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl glass p-10 text-center md:p-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Join Our <span className="grad-text">Mission</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-text">
              Whether you&apos;re a school, NGO, company or volunteer, there&apos;s
              a place for you in building a future where every child has access
              to quality education.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(255,122,0,0.45)] transition hover:brightness-110"
              >
                Work With Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-cyan-glow hover:text-cyan-glow"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
