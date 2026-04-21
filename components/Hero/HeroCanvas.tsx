"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function HeroCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // We can still use scrollYProgress for subtle parallax or scale if desired
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0]);

  return (
    <div className="relative h-full w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        <motion.div
          style={{ scale, opacity }}
          className="relative w-full h-full"
        >
          <img
            src="/assets/Us/2.jpeg"
            alt="Jerrin & Jesny"
            className="block w-full h-full object-cover"
            loading="eager"
          />
          
          {/* subtle light gradient overlay for text readability if needed */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/20 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}
