"use client";

import dynamic from 'next/dynamic';

const PartnerSchoolPage = dynamic(() => import('../../../src/site-pages/partner/PartnerSchoolPage'), { ssr: false });

export default function Page() {
  return <PartnerSchoolPage />;
}
