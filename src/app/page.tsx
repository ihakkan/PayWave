"use client";

import { Header } from '@/components/paywave/header';
import { Services } from '@/components/paywave/services';
import { Banner } from '@/components/paywave/banner';
import { RecentPayments } from '@/components/paywave/recent-payments';
import { BottomNav } from '@/components/paywave/bottom-nav';

export default function Home() {
  return (
    <div className="bg-neutral-900 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm h-[844px] bg-background rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative border-8 border-neutral-800">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          <div className="p-4 space-y-6">
            <Services />
            <Banner />
            <RecentPayments />
          </div>
        </main>
        <BottomNav />
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
