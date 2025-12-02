"use client";

import { LazyMotion, domAnimation, m } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Optimized lazy loading with better loading state
const LogoCarousel = dynamic(() => import("@/components/ui/logo-carousel"), {
  loading: () => (
    <div 
      className="flex flex-wrap justify-center items-center gap-8 md:gap-10"
      role="status"
      aria-label="Loading logo carousel"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="w-40 h-24 md:w-72 md:h-40 rounded-xl border border-gray-200 bg-gray-100 animate-pulse"
          aria-hidden="true"
        />
      ))}
    </div>
  ),
  ssr: false,
});

export function LogoCarouselDemo() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Optimized intersection observer with proper cleanup
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1, 
        rootMargin: "100px" 
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={sectionRef} 
        className="py-20 md:py-32"
        aria-labelledby="clients-heading"
      >
        <div className="saas-container">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8"
          >
            {/* Heading */}
            <div className="text-center space-y-4">
              <h2 
                id="clients-heading"
                className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]"
              >
                The best are already here
              </h2>
              <Link
                href="https://www.newcult.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-blue-600 hover:text-blue-700 transition-colors inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Our Clients
              </Link>
            </div>

            {/* Logo Carousel - Only render when in view */}
            {isInView && <LogoCarousel columnCount={3} />}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
}