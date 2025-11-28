"use client";
import React, { useRef, useEffect } from "react";
import { GradientButton } from "../common/my-button/GradientButton";
import { GradientButtonTwo } from "../common/my-button/GradientButtonTwo";
import Link from "next/link";

export default function HeroSection() {
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  // Optimize video loading
  useEffect(() => {
    if (bgVideoRef.current) {
      bgVideoRef.current.playbackRate = 1;
    }
    if (rightVideoRef.current) {
      rightVideoRef.current.playbackRate = 1;
    }
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-5"
          poster="/images/hero/video-poster.jpg"
        >
          <source src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1757754812/media/website/kbnhdulig8ecglnxkmy2.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* Content Container */}
      <div className="saas-container relative h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 h-full items-center">
          
          {/* Left Section - Text Content */}
          <div className="flex flex-col justify-center space-y-4 z-10 px-4 lg:px-0">
            {/* Small Tag/Label */}
            <span className="text-saas-primary text-md lg:text-lg font-medium tracking-wide">
              Future Ready
            </span>

            {/* Main Heading */}
            <h1 className="text-2xl md:text-5xl leading-wide">
              WHERE BUSINESS<br />
              MEETS INNOVATION -<br />
              FROM SOFTWARE TO STRATEGY
              {/* <span className="text-saas-primary">FROM SOFTWARE TO STRATEGY</span> */}
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
              Transform your business with cutting-edge solutions tailored for tomorrow's challenges.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/consultation">
                <GradientButton className="w-full sm:w-auto">
                  Get a Free Consultation
                </GradientButton>
              </Link>
              
              <Link href="/services">
                <GradientButtonTwo className="w-full sm:w-auto">
                  Explore Services
                </GradientButtonTwo>
              </Link>
            </div>
          </div>

          {/* Right Section - Featured Video (BIGGER) */}
          <div className="hidden lg:flex items-center justify-center z-10">
            <div className="relative w-full h-full max-h-[700px]">
              {/* Video Container with Glass Effect */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl backdrop-blur-sm bg-white/5 ">
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
                  <source src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1757755547/media/website/i9aafcm1y8dabkp9ukiz.mp4" type="video/mp4" />
                  <source src="/videos/hero-feature.webm" type="video/webm" />
                </video>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-gray-600 rounded-full" />
        </div>
      </div>
    </section>
  );
}
