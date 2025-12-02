"use client";

import Link from "next/link";
import { motion, easeOut } from "motion/react";
import { GradientButton } from "../common/my-button/GradientButton";

// Impact data interface
interface ImpactItem {
  readonly number: string;
  readonly label: string;
}

const impactData: readonly ImpactItem[] = [
  { number: "700+", label: "Projects launched successfully across the globe" },
  { number: "10M", label: "Daily customer engagement through our projects" },
  { number: "100+", label: "Digital transformation stories that made a difference" },
] as const;

export default function OurImpact() {
  return (
    <section
      className="w-full min-h-screen py-24 bg-white text-black text-center px-6"
      aria-labelledby="impact-heading"
    >
      <div className="flex flex-col items-center justify-center space-y-16">
        {/* Heading */}
        <motion.h2
          id="impact-heading"
          className="text-2xl md:text-6xl font-normal capitalize leading-tight md:leading-[52px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          Our Impact
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          className="text-sm md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
        >
          Every innovation that happens here is out of a quest to get better at what we are
          already doing. We deliver ideas that make a difference, create experiences that
          transform lives and build ecosystems that foster progress.
        </motion.p>

        {/* Numbers Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {impactData.map((impact: ImpactItem, index: number) => (
            <motion.div
              key={`impact-${index}`}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: easeOut,
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.h3
                className="text-7xl md:text-8xl font-normal group-hover:text-blue-600 transition-colors duration-300"
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: easeOut,
                }}
              >
                {impact.number}
              </motion.h3>
              <p className="text-center text-gray-600 mt-4 max-w-xs text-sm md:text-base leading-relaxed">
                {impact.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: easeOut }}
        >
          <Link
            href="/impact"
            className="inline-block"
            aria-label="Learn more about our impact stories"
          >
            <GradientButton>Our Impact →</GradientButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
