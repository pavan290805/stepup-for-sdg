import { SiteHeader } from '@/components/site-header'
import Hero from '@/components/simple-hero'
import { Stats } from '@/components/stats'
import dynamic from 'next/dynamic'
import { CtaCards } from '@/components/cta-cards'
import GetInvolved from '@/components/get-involved'
import { UniteBanner } from '@/components/unite-banner'
import { SiteFooter } from '@/components/site-footer'

const ImpactMap = dynamic(() => import('@/components/clients/ImpactMapClient'))
const SuccessStories = dynamic(() => import('@/components/clients/SuccessStoriesClient'))
const PartnerLogos = dynamic(() => import('@/components/clients/PartnerLogosClient'))

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Live Impact Stats */}
      <Stats />

      {/* 3. Students, Companies and NGOs (three cards) */}
      <CtaCards />

      {/* 4. Success Stories */}
      <SuccessStories />

      {/* 5. Partner Logos Scrolling Section */}
      <PartnerLogos />

      {/* 6. Get Involved (replaces Partner/School/NGO static sections) */}
      <GetInvolved />

      {/* 7. Live Impact Count World Map */}
      <ImpactMap />

      {/* 8. UNITE 2030 Vision */}
      <UniteBanner />

      {/* 9. Footer */}
      <SiteFooter />
    </main>
  )
}
