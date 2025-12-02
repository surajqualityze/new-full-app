"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

interface GradientConfig {
  readonly gradient: string;
  readonly word: string;
}

const gradientConfigs: readonly GradientConfig[] = [
  { gradient: "linear-gradient(90deg, #007cf0, #00dfd8)", word: "Design." },
  { gradient: "linear-gradient(90deg, #7928ca, #ff0080)", word: "Build." },
  { gradient: "linear-gradient(90deg, #ff4d4d, #f9cb28)", word: "Market." },
] as const;

const TRANSITION_DURATION = 0.8;
const PAUSE_DURATION = 0.5;

export default function DesignBuildMarket() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const total = (TRANSITION_DURATION + PAUSE_DURATION) * 1000;
    const id = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % gradientConfigs.length),
      total
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-black text-white flex flex-col justify-center items-center px-6 text-center overflow-hidden space-y-10"
      aria-labelledby="design-heading"
    >
      <h2
        id="design-heading"
        className="text-4xl md:text-6xl flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0"
      >
        {gradientConfigs.map((config, idx) => {
          const isActive = idx === activeIndex;

          return (
            <span
              key={config.word}
              className="relative inline-block"
              // white is the base color so text is always visible
            >
              {/* base white text */}
              <span className="text-white">{config.word}</span>

              {/* gradient layer crossfading on top */}
              <motion.span
                className="absolute inset-0"
                style={{
                  backgroundImage: config.gradient,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
              >
                {config.word}
              </motion.span>
            </span>
          );
        })}
      </h2>

      <motion.p
        className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        It&apos;s in Saasential DNA to transform your brand into its best digital
        self. We are driven by a customer-centric approach in creating engaging,
        interactive and immersive experiences that deliver only the best.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <Link
          href="/expertise"
          className="inline-block px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition-colors duration-300"
          aria-label="View our expertise and services"
        >
          Our expertise →
        </Link>
      </motion.div>

      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-700 rounded-full opacity-30 blur-3xl animate-blob pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
