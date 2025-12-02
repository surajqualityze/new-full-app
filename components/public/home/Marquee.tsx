"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { memo, useMemo } from "react";

// ---------- Types ----------
interface Tool {
  name: string;
  img: string;
}

interface ReviewCardProps {
  img: string;
  name: string;
}

// ---------- Data ----------
const TOOLS: readonly Tool[] = [
  {
    name: "Semrush",
    img: "https://logo.clearbit.com/semrush.com",
  },
  {
    name: "Ahrefs",
    img: "https://logo.clearbit.com/ahrefs.com",
  },
  {
    name: "Moz",
    img: "https://logo.clearbit.com/moz.com",
  },
  {
    name: "Screaming Frog",
    img: "https://logo.clearbit.com/screamingfrog.co.uk",
  },
  {
    name: "Surfer SEO",
    img: "https://logo.clearbit.com/surferseo.com",
  },
  {
    name: "Google Analytics",
    img: "https://logo.clearbit.com/marketingplatform.google.com",
  },
  {
    name: "Google Search Console",
    img: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Yoast SEO",
    img: "https://logo.clearbit.com/yoast.com",
  },
  {
    name: "Rank Math",
    img: "https://logo.clearbit.com/rankmath.com",
  },
  {
    name: "SE Ranking",
    img: "https://logo.clearbit.com/seranking.com",
  },
  {
    name: "Similarweb",
    img: "https://logo.clearbit.com/similarweb.com",
  },
  {
    name: "Keyword.com",
    img: "https://logo.clearbit.com/keyword.com",
  },
] as const;

// ---------- Components ----------
const ReviewCard = memo<ReviewCardProps>(({ img, name }) => {
  return (
    <figure
      className={cn(
        "relative h-full cursor-pointer overflow-hidden rounded-full flex items-center mr-4 px-6 py-2 min-w-fit whitespace-nowrap",
        "bg-white/80 backdrop-blur-sm border border-gray-200/50",
        "transition-all duration-300 ease-in-out",
        "hover:bg-white/90 hover:border-gray-300/50 hover:scale-105 hover:shadow-lg"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <Image
          className="rounded-full flex-shrink-0"
          width={32}
          height={32}
          alt={`${name} logo`}
          src={img}
          loading="lazy"
          unoptimized // External URLs from Clearbit
        />
        <figcaption className="text-sm font-medium text-gray-800">
          {name}
        </figcaption>
      </div>
    </figure>
  );
});

ReviewCard.displayName = "ReviewCard";

// ---------- Main Component ----------
export function MarqueeDemo() {
  // Memoize row splits to prevent recalculation
  const { firstRow, secondRow } = useMemo(() => {
    const midPoint = Math.ceil(TOOLS.length / 2);
    
    return {
      firstRow: TOOLS.slice(0, midPoint),
      secondRow: TOOLS.slice(midPoint),
    };
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50/50 to-white pt-[150px]">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center text-center mb-12 px-4">
        <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px] max-w-4xl">
          We are using
          <br />
          the best-fit tool stack to scale
          <br />
          your marketing performance
        </h2>
      </header>

      {/* Marquee Section */}
      <div className="relative w-full">
        <Marquee
          pauseOnHover
          className="[--duration:30s] mb-4"
        >
          {firstRow.map((tool, index) => (
            <ReviewCard key={`${tool.name}-${index}`} img={tool.img} name={tool.name} />
          ))}
        </Marquee>

        <Marquee
          reverse
          pauseOnHover
          className="[--duration:30s]"
        >
          {secondRow.map((tool, index) => (
            <ReviewCard key={`${tool.name}-reverse-${index}`} img={tool.img} name={tool.name} />
          ))}
        </Marquee>

        {/* Gradient overlays for smooth fade effect */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}