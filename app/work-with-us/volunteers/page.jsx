"use client";

import dynamic from 'next/dynamic';

const PartnerVolunteerPage = dynamic(() => import('../../../src/site-pages/partner/PartnerVolunteerPage'), { ssr: false });

export default function Page() {
  return <PartnerVolunteerPage />;
}
