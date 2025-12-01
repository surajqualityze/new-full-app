// app/page.tsx
import HeroSection from '@/components/public/home/HeroSection';
import ScrollTextSection from '@/components/public/home/ScrollTextSection';
import HomeCarousel from '@/components/public/home/HomeCarousel';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <div className="w-full">
      <Suspense fallback={
        <div className="h-screen w-full bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      }>
        <HeroSection />
        <ScrollTextSection />
        <HomeCarousel />
      </Suspense>
    </div>
  );
}
