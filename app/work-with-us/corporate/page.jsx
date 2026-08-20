"use client";

import dynamic from 'next/dynamic';

const PartnerCompanyPage = dynamic(() => import('../../../src/site-pages/partner/PartnerCompanyPage'), { ssr: false });

export default function Page() {
  return <PartnerCompanyPage />;
}
