"use client";

import { Header } from '@/components/paywave/header';
import { BottomNav } from '@/components/paywave/bottom-nav';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 md:flex md:items-center md:justify-center md:p-4">
      <div className="w-full h-full bg-background md:max-w-sm md:h-[844px] md:rounded-[40px] md:shadow-2xl md:border-8 md:border-neutral-800 overflow-hidden flex flex-col relative">
        <Header />
        <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
          {children}
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
