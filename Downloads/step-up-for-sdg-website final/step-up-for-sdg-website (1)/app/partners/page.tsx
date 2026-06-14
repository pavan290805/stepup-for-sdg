import { SiteHeader } from '@/components/site-header'
import { Partners } from '@/components/partners'
import { CtaCards } from '@/components/cta-cards'
import { SiteFooter } from '@/components/site-footer'

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h1 className="font-heading text-3xl font-extrabold text-navy">Partners</h1>
          <p className="mt-2 text-sm text-muted-foreground">Organisations and companies we collaborate with to deliver impact.</p>
        </div>
      </section>
      <Partners />
      <CtaCards />
      <SiteFooter />
    </main>
  )
}
