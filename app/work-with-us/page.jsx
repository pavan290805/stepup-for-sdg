"use client";

import dynamic from 'next/dynamic';

const WorkWithUsPage = dynamic(() => import('../../src/site-pages/WorkWithUsPage'), { ssr: false });

export default function Page() {
  return <WorkWithUsPage />;
}
