import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import {
  AboutHero,
  VisionMission,
  OurTeam,
  OurServices,
  OurImpact,
  FivePModel,
  SdgContribution,
} from '@/components/about-sections'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <AboutHero />
      <VisionMission />
      <OurTeam />
      <OurServices />
      <OurImpact />
      <FivePModel />
      <SdgContribution />
      <SiteFooter />
    </main>
  )
}
