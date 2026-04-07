"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Target Date: May 04, 2026
    const targetDate = new Date("2026-05-04T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex gap-4 animate-pulse opacity-20">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-16 h-16 rounded-md bg-black/10" />
        ))}
      </div>
    );
  }

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3 md:gap-5 mt-6">
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white/60 backdrop-blur-md px-3 py-2 md:px-5 md:py-4 shadow-xl">
            {/* Subtle top glare */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent" />
            
            <AnimatePresence mode="popLayout">
              <motion.span
                key={block.value}
                initial={{ y: 15, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -15, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="block text-2xl md:text-5xl font-light tracking-tight tabular-nums text-black"
              >
                {block.value.toString().padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="mt-2 text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/60">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
