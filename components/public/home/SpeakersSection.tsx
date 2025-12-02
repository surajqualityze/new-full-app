"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";

// Lazy load SpinningText when idle
const SpinningTextLazy = dynamic(
  () => import("@/components/ui/spinning-text").then((mod) => mod.SpinningText),
  { ssr: false }
);

const IMAGES = [
  "/images/speakers/speakers-1.jpg",
  "/images/speakers/speakers-2.jpg",
  "/images/speakers/speakers-3.jpg",
  "/images/speakers/speakers-4.jpg",
] as const;

const WAVE_MASK_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='420' viewBox='0 0 320 420'><rect width='320' height='420' fill='white'/><path d='M0 350 Q80 400 160 350 T320 350 V420 H0 Z' fill='black'/></svg>")`;

export default function SpeakersSection() {
  const [current, setCurrent] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger entrance only when section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);

          // mount spinning text AFTER main thread is idle
          requestIdleCallback(() => {
            setShowSpinner(true);
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto image cycling only when visible
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="w-full bg-white px-4 md:px-40 flex justify-center py-20 md:py-32"
      >
        <div className="flex flex-col md:flex-row items-start gap-14 max-w-7xl w-full">
          
          {/* LEFT COLUMN */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-10 md:space-y-14 flex-1"
          >
            {/* Mobile circular thumbnails */}
            <div className="flex md:hidden justify-center items-center gap-4">
              {IMAGES.slice(0, 3).map((src, i) => (
                <div
                  key={src}
                  className={`relative rounded-full overflow-hidden ${
                    i === 1 ? "w-28 h-28" : "w-20 h-20"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Speaker ${i + 1}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    priority={i === 0} // only first image LCP priority
                  />
                </div>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px] text-center md:text-left">
              The Power Behind <br /> the Training!
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-lg max-w-xl text-center md:text-left">
              Driven by results, backed by knowledge – meet the team behind your progress!
            </p>

            {/* CTA Button */}
            <div className="flex justify-center md:justify-start">
              <button
                className="border border-gray-800 px-6 py-3 text-base font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Explore opportunities"
              >
                Explore opportunities →
              </button>
            </div>
          </m.div>

          {/* RIGHT COLUMN (Desktop Only) */}
          <div className="hidden md:flex relative justify-center flex-1">
            <div className="relative w-[320px] h-[420px] overflow-hidden rounded-lg shadow-xl">
              
              {/* Base Image */}
              <Image
                src={IMAGES[current]}
                alt={`Speaker ${current + 1}`}
                fill
                sizes="320px"
                className="object-cover"
                priority={current === 0} // only FIRST cycle image gets priority
              />

              {/* Wave Mask Transition */}
              <AnimatePresence mode="sync">
                <m.div
                  key={current}
                  initial={{ y: "-100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  style={{
                    willChange: "transform",
                    WebkitMaskImage: WAVE_MASK_SVG,
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskSize: "cover",
                    maskImage: WAVE_MASK_SVG,
                    maskRepeat: "no-repeat",
                    maskSize: "cover",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={IMAGES[current]}
                    alt={`Speaker ${current + 1}`}
                    fill
                    sizes="320px"
                    className="object-cover"
                    fetchPriority="low"
                  />
                </m.div>
              </AnimatePresence>
            </div>

            {/* Spinning Text (loads after idle) */}
            {isInView && showSpinner && (
              <div className="absolute -bottom-26 -right-2 w-60 h-60 flex items-center justify-center">
                <SpinningTextLazy
                  className="text-gray-400 font-semibold text-sm uppercase tracking-tight"
                  duration={12}
                  radius={8}
                >
                  Certified Instructors • Certified Instructors •
                </SpinningTextLazy>
              </div>
            )}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
