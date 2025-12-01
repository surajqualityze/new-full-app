"use client";
import React, { useRef, useEffect, useState } from "react";
import { LazyMotion, domAnimation, motion, useScroll, useTransform, type Variants } from "motion/react";
import { GradientButton } from "../common/my-button/GradientButton";
import { GradientButtonTwo } from "../common/my-button/GradientButtonTwo";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoContainerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [shouldLoadRightVideo, setShouldLoadRightVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track scroll to fade hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Fade hero to white as user scrolls
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Simple mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Single IntersectionObserver with proper cleanup
  useEffect(() => {
    if (isMobile || !rightVideoContainerRef.current) return;

    const container = rightVideoContainerRef.current;
    const videoElement = rightVideoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setShouldLoadRightVideo(true);
          videoElement?.play().catch(() => {});
        } else {
          videoElement?.pause();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.25,
      }
    );

    observer.observe(container);
    
    return () => {
      observer.disconnect();
      if (videoElement) {
        videoElement.pause();
        videoElement.removeAttribute('src');
        videoElement.load();
      }
    };
  }, [isMobile]);

  // Cleanup background video on unmount
  useEffect(() => {
    const bgVideo = bgVideoRef.current;
    
    return () => {
      if (bgVideo) {
        bgVideo.pause();
        bgVideo.removeAttribute('src');
        bgVideo.load();
      }
    };
  }, []);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "backOut",
      },
    },
  };

  const videoContainerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5,
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
        {/* White Overlay that fades in on scroll */}
        <motion.div
          className="absolute inset-0 bg-white pointer-events-none z-20"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content wrapper with fade effect */}
        <motion.div
          className="relative w-full h-full"
          style={{ opacity: heroOpacity }}
        >
          {/* Background */}
          {!isMobile && (
            <div className="absolute inset-0 w-full h-full">
              <video
                ref={bgVideoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover opacity-5"
                poster="/images/hero/video-poster.jpg"
              >
                <source
                  src="https://res.cloudinary.com/ddk3xqd3h/video/upload/q_auto:low,f_auto,w_1280,br_500k/v1757754812/media/website/kbnhdulig8ecglnxkmy2.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          )}

          {/* Content Container */}
          <div className="saas-container relative h-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 h-full items-center">
              {/* Left Section - Text Content */}
              <motion.div
                className="flex flex-col justify-center space-y-4 z-10 px-4 lg:px-0 pt-20 lg:pt-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span
                  className="text-saas-primary text-md lg:text-lg font-medium tracking-wide inline-block"
                  variants={itemVariants}
                >
                  Future Ready
                </motion.span>

                <motion.h1
                  className="text-2xl md:text-5xl leading-wide font-bold"
                  variants={titleVariants}
                >
                  WHERE BUSINESS
                  <br />
                  MEETS INNOVATION -
                  <br />
                  FROM SOFTWARE TO STRATEGY
                </motion.h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
                  variants={itemVariants}
                >
                  Transform your business with cutting-edge solutions tailored
                  for tomorrow&apos;s challenges.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                  variants={itemVariants}
                >
                  <Link href="/consultation" prefetch={false}>
                    <motion.div variants={buttonVariants}>
                      <GradientButton className="w-full sm:w-auto">
                        Get a Free Consultation
                      </GradientButton>
                    </motion.div>
                  </Link>

                  <Link href="/services" prefetch={false}>
                    <motion.div variants={buttonVariants}>
                      <GradientButtonTwo className="w-full sm:w-auto">
                        Explore Services
                      </GradientButtonTwo>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right Section - Featured Video */}
              <motion.div
                ref={rightVideoContainerRef}
                className="hidden lg:flex items-center justify-center z-10"
                variants={videoContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative w-full h-full max-h-[700px]">
                  {!shouldLoadRightVideo && (
                    <div className="relative w-full h-full overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5">
                      <Image
                        src="/images/hero/feature-video-poster.jpg"
                        alt="Business Innovation Preview"
                        fill
                        priority
                        fetchPriority="high"
                        className="object-cover"
                        sizes="(max-width: 1024px) 0vw, 50vw"
                        quality={90}
                      />
                    </div>
                  )}

                  {shouldLoadRightVideo && (
                    <motion.div
                      className="relative w-full h-full overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <video
                        ref={rightVideoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                        poster="/images/hero/feature-video-poster.jpg"
                      >
                        <source
                          src="https://res.cloudinary.com/ddk3xqd3h/video/upload/q_auto,f_auto,w_1280,br_1500k/v1757755547/media/website/i9aafcm1y8dabkp9ukiz.mp4"
                          type="video/mp4"
                        />
                      </video>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-fade-in">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2 animate-bounce">
              <div className="w-1 h-3 bg-gray-600 rounded-full" />
            </div>
          </div>
        </motion.div>
      </section>
    </LazyMotion>
  );
}
