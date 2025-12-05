"use client";

import React, { FC, ReactNode, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceLayoutProps } from "@/types/service";
import { motion, useScroll, useTransform } from "framer-motion";

/* ------------------------ Bullet Component ------------------------ */
const Bullet: FC<{ children: ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2">
    <span className="text-neutral-400 select-none">-</span>
    <span>{children}</span>
  </li>
);

/* ------------------------ MAIN LAYOUT ------------------------ */
const ServiceLayout: FC<ServiceLayoutProps> = ({
  heroData,
  servicesData,
  industriesData,
  className = "",
}) => {
  return (
    <>
      {/* ------------------------ HERO SECTION ------------------------ */}
      {/* ------------------------ HERO SECTION ------------------------ */}
      <section
        className={`relative h-[70vh] w-full flex items-end px-8 lg:px-16 ${className}`}
      >
        <div className="flex-1 pr-8 z-20">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 w-3/5">
            {heroData.title}
          </h1>

          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
            {heroData.description}
          </p>
        </div>
      </section>

      {/* ------------------------ SERVICE SECTIONS ------------------------ */}
      {servicesData.map((service, index) => {
  const isEven = index % 2 === 0;

  // ref for scroll animation
  const sectionRef = useRef<HTMLDivElement>(null);

  // detect scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // triggers when next section approaches
  });

  // image moves upward from 0px → -150px
  const imageY = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);

  return (
    <section
      key={service.slug}
      ref={sectionRef}
      className="h-screen w-full sticky top-0 bg-white flex items-center px-8 lg:px-16"
    >
      <div
        className={`flex w-full items-center ${
          isEven ? "flex-row" : "flex-row-reverse"
        }`}
      >
        {/* TEXT BLOCK (unchanged) */}
        <div
          className={`flex-1 ${
            isEven ? "pr-10" : "pl-10"
          } max-w-[600px] z-20`}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            {service.title}
          </h2>

          <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed">
            {service.description}
          </p>

          {service.bullets?.length > 0 && (
            <ul className="space-y-2 text-sm">
              {service.bullets.map((b, i) => (
                <Bullet key={i}>{b}</Bullet>
              ))}
            </ul>
          )}

          <Link
            href={`/services/${heroData.slug}/${service.slug}`}
            className="text-blue-500 underline-offset-2 hover:underline inline-block mt-6"
          >
            Read More
          </Link>
        </div>

        {/* IMAGE BLOCK WITH PARALLAX SLIDE-UP */}
        <motion.div
          style={{ y: imageY }}
          className="flex-1 flex items-center justify-center"
        >
          <Image
            src={service.image.src}
            alt={service.image.alt}
            width={1200}
            height={800}
            className="max-h-[80vh] object-contain rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
})}

      {/* ------------------------ INDUSTRIES SECTION ------------------------ */}
      {industriesData?.length > 0 && (
        <section className="h-screen sticky top-0 bg-neutral-950 text-neutral-100 py-16 px-8 lg:px-16 flex flex-col justify-center">
          <h3 className="text-xl font-semibold tracking-tight">Industries</h3>
          <p className="mt-2 text-sm text-neutral-400 max-w-[60ch]">
            We partner with clients across multiple sectors to build meaningful
            solutions.
          </p>

          <div className="mt-8 divide-y divide-neutral-800 border-y border-neutral-800">
            {industriesData.map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
                <div className="font-medium">{row.name}</div>
                <div className="md:col-span-2 text-sm text-neutral-400">
                  {row.detail}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceLayout;
