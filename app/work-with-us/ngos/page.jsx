"use client";

import dynamic from 'next/dynamic';

const PartnerNGOPage = dynamic(() => import('../../../src/site-pages/partner/PartnerNGOPage'), { ssr: false });

export default function Page() {
  return <PartnerNGOPage />;
}
