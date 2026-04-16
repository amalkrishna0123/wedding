"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Play } from "lucide-react";

export default function BeginExperience({ onStart }: { onStart: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleStart = () => {
    setIsVisible(false);
    onStart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-white"
        >
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")' }} />
          
          <div className="relative flex flex-col items-center gap-12 text-center p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-black tracking-[0.6em] uppercase text-black/20">
                 The Union of
              </span>
              <h1 className="text-4xl md:text-6xl font-light italic tracking-tight text-black">
                 Jerrin <span className="opacity-20">&</span> Jesny
              </h1>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              onClick={handleStart}
              className="group relative flex items-center gap-6 bg-black py-6 px-10 rounded-full overflow-hidden transition-all duration-700 hover:gap-10 hover:pr-14 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
               <div className="relative z-10 flex items-center justify-center p-2 rounded-full border border-white/20">
                 <Play className="w-4 h-4 text-white fill-current" />
               </div>
               <span className="relative z-10 text-white text-[10px] font-black tracking-[0.4em] uppercase">
                  Enter Invitation
               </span>
               <div className="absolute inset-0 bg-zinc-800 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/40"
            >
               Click to Begin the Journey
            </motion.p>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <motion.div 
               animate={{ y: [0, -20, 0], opacity: [0.05, 0.1, 0.05] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-[20%] left-[10%] w-64 h-64 border border-black/5 rounded-full"
             />
             <motion.div 
               animate={{ y: [0, 20, 0], opacity: [0.03, 0.08, 0.03] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute bottom-[20%] right-[15%] w-96 h-96 border border-black/5 rounded-full"
             />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
