"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const AboutVideoSec = () => {
  // Fix: Remove explicit RefObject type, let TypeScript infer it
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // When element enters viewport to when it leaves
  });

  // Transform scroll progress to various properties with optimized performance
  const width: MotionValue<string> = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    ["53%", "100%"]
  );
  
  const height: MotionValue<string> = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    ["400px", "600px"]
  );
  
  const opacity: MotionValue<number> = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0.5, 1]
  );
  
  const scale: MotionValue<number> = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0.95, 1]
  );

  // Transform scroll progress for smooth video zoom - SLOWER (1 to 1.1)
  const videoScale: MotionValue<number> = useTransform(
    scrollYProgress, 
    [0, 0.8], 
    [1, 1.1]
  );

  return (
    <section 
      className="flex justify-center w-full pt-10"
      aria-label="Company video showcase"
    >
      <motion.div
        ref={ref}
        style={{
          width,
          opacity,
          scale,
        }}
        className="overflow-hidden rounded-lg"
      >
        <motion.div 
          className="relative w-full overflow-hidden"
          style={{ height }}
        >
          <motion.video
            className="w-full h-full object-cover"
            style={{ scale: videoScale }}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="DataSack Solutions company overview video"
          >
            <source
              src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1758050961/about_cljjfy.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </motion.video>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutVideoSec;
