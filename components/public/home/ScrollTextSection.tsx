"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ScrollTextSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Starts when section enters viewport
  });

  // Transform text color from gray to black
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgb(156, 163, 175)", "rgb(75, 85, 99)", "rgb(0, 0, 0)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-white py-20"
    >
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <motion.h2
          className="text-4xl md:text-6xl font-bold text-center leading-tight"
          style={{ color: textColor }}
          // Entrance animation when component enters viewport
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          We transform ideas into powerful digital experiences that drive growth
          and innovation
        </motion.h2>
      </div>
    </section>
  );
}
