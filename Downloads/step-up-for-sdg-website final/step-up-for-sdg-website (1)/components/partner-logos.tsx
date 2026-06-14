'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

const allPartners = [
  { name: 'Microsoft', src: '/logos/microsoft.svg' },
  { name: 'Google', src: '/logos/google.svg' },
  { name: 'UNICEF', src: '/logos/unicef.svg' },
  { name: 'Infosys', src: '/logos/infosys.svg' },
  { name: 'TCS', src: '/logos/tcs.svg' },
  { name: 'UNESCO', src: '/logos/unesco.svg' },
  { name: 'Wipro', src: '/logos/wipro.svg' },
  { name: 'Accenture', src: '/logos/accenture.svg' },
  { name: 'HCL', src: '/logos/hcl.svg' },
  { name: 'World Bank', src: '/logos/worldbank.svg' },
  { name: 'Tech Mahindra', src: '/logos/techmahindra.svg' },
  { name: 'Save the Children', src: '/logos/savethechildren.svg' },
  { name: 'TATA Trusts', src: '/logos/tata.svg' },
  { name: 'Reliance Foundation', src: '/logos/reliance.svg' },
  { name: 'Adani Foundation', src: '/logos/adani.svg' },
  { name: 'Bill & Melinda Gates', src: '/logos/bmgf.svg' },
]

interface PartnerCardProps {
  partner: {
    name: string
    src: string
  }
}

function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="group flex h-24 min-w-[180px] flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <Image
        src={partner.src}
        alt={partner.name}
        width={160}
        height={64}
        className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )
}

export function PartnerLogos() {
  const [partnerCount, setPartnerCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPartnerCount((prev) => {
        if (prev < 50) return prev + 2
        return 50
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  const extendedPartners = [...allPartners, ...allPartners]

  return (
    <section className="w-full px-4 py-16 sm:px-6 sm:py-20 md:px-0">
      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 px-4 py-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          <span className="text-sm font-semibold text-cyan-500">
            {partnerCount}+ Partners Supporting Education
          </span>
        </div>

        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
          Our Partners
        </h2>

        <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
          Trusted organizations working together to advance SDG 4 – Quality Education.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl">
        <style jsx>{`
          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .marquee-track {
            display: flex;
            width: max-content;
            gap: 1rem;
            animation: marquee 15s linear infinite;
            will-change: transform;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="marquee-track">
          {extendedPartners.map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-slate-950 sm:w-20" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-slate-950 sm:w-20" />
      </div>
    </section>
  )
}