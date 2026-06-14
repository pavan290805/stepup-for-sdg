import { SiteHeader } from '@/components/site-header'
import { SdgContribution, OurImpact } from '@/components/about-sections'
import ImpactMap from '@/components/impact-map'
import { SiteFooter } from '@/components/site-footer'

export default function SdgPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-extrabold text-navy">Our SDG Work</h1>
          <p className="mt-2 text-sm text-muted-foreground">Projects mapped to the Sustainable Development Goals with measurable outcomes.</p>
        </div>
      </section>
      <SdgContribution />
      <ImpactMap />
      <OurImpact />
      <SiteFooter />
    </main>
  )
}
