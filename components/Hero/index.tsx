"use client";

import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import HeroTextOverlays from "./HeroTextOverlays";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-[500vh] bg-black"
    >
      {/* 
        The canvas is sticky inside this 500vh section.
        The text overlays are fixed but react to the scroll progress 
        of this specific section or global scroll.
      */}
      <HeroCanvas />
      <HeroTextOverlays />
      
      {/* Scrollytelling Guide */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 group cursor-default"
      >
        <span className="text-[9px] font-bold tracking-[0.6em] uppercase text-white/30 group-hover:text-white/60 transition-colors">
          Scroll to Begin Journey
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 via-white/50 to-transparent relative overflow-hidden">
           <motion.div
             animate={{ top: ["-100%", "100%"] }}
             transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
             className="absolute left-0 right-0 h-1/2 bg-white"
           />
        </div>
      </motion.div>
    </motion.section>
  );
}
