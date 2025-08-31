"use client";

import { Services } from '@/components/paywave/services';
import { Banner } from '@/components/paywave/banner';
import { RecentPayments } from '@/components/paywave/recent-payments';

export default function Home() {
  return (
    <div className="p-4 space-y-6">
      <Services />
      <Banner />
      <RecentPayments />
    </div>
  );
}
