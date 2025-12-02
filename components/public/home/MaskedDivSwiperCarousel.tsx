"use client";
import { useMemo, useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import MaskedDiv from "@/components/ui/masked-div";

import "swiper/css";

// ---------- Types ----------
type MaskType = "type-1" | "type-2" | "type-3" | "type-4";

interface SlideItem {
  maskType: MaskType;
  videoSrc: string;
  title: string;
}

// Slide Data as constant
const SLIDES_DATA: SlideItem[] = [
  {
    maskType: "type-1",
    videoSrc: "https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4",
    title: "Branding",
  },
  {
    maskType: "type-2",
    videoSrc: "https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4",
    title: "Experience Design",
  },
  {
    maskType: "type-3",
    videoSrc: "https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4",
    title: "Marketing",
  },
  {
    maskType: "type-4",
    videoSrc: "https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4",
    title: "Technologies",
  },
];

export function MaskedDivSwiperCarousel() {
  const [isInView, setIsInView] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection observer - load only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Pause autoplay when tab hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!swiperInstance) return;
      document.hidden ? swiperInstance.autoplay?.stop() : swiperInstance.autoplay?.start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [swiperInstance]);

  // Swiper Config
  const swiperConfig = useMemo(
    () => ({
      modules: [Autoplay],
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      speed: 600,
      grabCursor: true,
      touchRatio: 1,
      touchAngle: 45,
      breakpoints: {
        640: { slidesPerView: 1.5, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 2.5, spaceBetween: 40 },
        1280: { slidesPerView: 3, spaceBetween: 50 },
        1536: { slidesPerView: 3.5, spaceBetween: 60 },
      },
      onSwiper: (swiper: SwiperType) => setSwiperInstance(swiper),
    }),
    []
  );

  return (
    <div ref={containerRef} className="saas-container px-4 py-20 md:py-32">
      {isInView ? (
        <Swiper {...swiperConfig} className="maskedDiv-swiper">
          {/* Duplicate slides for smoother looping */}
          {[...SLIDES_DATA, ...SLIDES_DATA].map((slide, index) => (
            <SwiperSlide key={`${slide.maskType}-${index}`}>
              <MaskedDiv
                maskType={slide.maskType}
                size={0.95}
                className="mx-auto relative"
                overlay={
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <h3 className="relative z-10 text-white text-2xl md:text-3xl font-semibold drop-shadow-lg px-4 pb-4">
                      {slide.title}
                    </h3>
                  </div>
                }
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  <source src={slide.videoSrc} type="video/mp4" />
                </video>
              </MaskedDiv>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex gap-8 justify-center overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="w-full max-w-[400px] aspect-[460/591] bg-gray-200 animate-pulse rounded-lg" 
            />
          ))}
        </div>
      )}
    </div>
  );
}
