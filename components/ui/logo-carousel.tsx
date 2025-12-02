"use client";

import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import Image from "next/image";

// ---------- Types ----------
interface Logo {
  name: string;
  id: number;
  src: string;
}

interface LogoColumnProps {
  logos: Logo[];
  columnIndex: number;
}

interface LogoCarouselProps {
  columnCount?: number;
}

// Logo data as constant - consider moving to a separate config file
const ALL_LOGOS: readonly Logo[] = [
  { name: "Apple", id: 1, src: "/images/clients-logos/1.png" },
  { name: "Supabase", id: 2, src: "/images/clients-logos/2.png" },
  { name: "Vercel", id: 3, src: "/images/clients-logos/3.png" },
  { name: "Lowes", id: 4, src: "/images/clients-logos/4.png" },
  { name: "Ally", id: 5, src: "/images/clients-logos/5.png" },
  { name: "Pierre", id: 6, src: "/images/clients-logos/6.png" },
  { name: "BMW", id: 7, src: "/images/clients-logos/7.png" },
  { name: "Claude", id: 8, src: "/images/clients-logos/1.png" },
  { name: "Next.js", id: 9, src: "/images/clients-logos/2.png" },
  { name: "Tailwind CSS", id: 10, src: "/images/clients-logos/3.png" },
  { name: "Upstash", id: 11, src: "/images/clients-logos/4.png" },
  { name: "TypeScript", id: 12, src: "/images/clients-logos/5.png" },
  { name: "Stripe", id: 13, src: "/images/clients-logos/6.png" },
  { name: "OpenAI", id: 14, src: "/images/clients-logos/7.png" },
] as const;

// Utility: Shuffle array (Fisher-Yates algorithm)
const shuffleArray = <T,>(array: readonly T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility: Distribute logos evenly across columns
const distributeLogos = (allLogos: readonly Logo[], columnCount: number): Logo[][] => {
  const shuffled = shuffleArray(allLogos);
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });
  return columns;
};

// Optimized LogoColumn component with React 19 optimizations
const LogoColumn = React.memo<LogoColumnProps>(
  ({ logos, columnIndex }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const CYCLE_INTERVAL = 2500; // 2.5 seconds per logo

    useEffect(() => {
      const startDelay = columnIndex * 400;

      const startTimer = setTimeout(() => {
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % logos.length);
        }, CYCLE_INTERVAL);
      }, startDelay);

      return () => {
        clearTimeout(startTimer);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }, [logos.length, columnIndex]);

    const currentLogo = logos[currentIndex];

    return (
      <m.div
        className="w-40 h-24 md:w-72 md:h-40 overflow-hidden relative flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: columnIndex * 0.15,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <m.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -10,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
          >
            <Image
              src={currentLogo.src}
              alt={currentLogo.name}
              width={500}
              height={500}
              className="w-full h-full object-contain"
              loading={columnIndex === 0 && currentIndex === 0 ? "eager" : "lazy"}
              sizes="(max-width: 768px) 160px, 288px"
              priority={columnIndex === 0 && currentIndex === 0}
            />
          </m.div>
        </AnimatePresence>
      </m.div>
    );
  },
  // Custom comparison function for better memoization
  (prevProps, nextProps) =>
    prevProps.columnIndex === nextProps.columnIndex &&
    prevProps.logos.length === nextProps.logos.length
);

LogoColumn.displayName = "LogoColumn";

// Main LogoCarousel Component
export default function LogoCarousel({ columnCount = 3 }: LogoCarouselProps) {
  // Memoize logo distribution to prevent recalculation
  const logoColumns = useMemo(
    () => distributeLogos(ALL_LOGOS, columnCount),
    [columnCount]
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
        {logoColumns.map((logos, index) => (
          <LogoColumn key={index} logos={logos} columnIndex={index} />
        ))}
      </div>
    </LazyMotion>
  );
}

export { LogoCarousel };