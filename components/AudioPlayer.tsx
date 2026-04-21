"use client";

import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

export default function AudioPlayer() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-4">
      {/* Soundwaves (Rendered underneath the button) */}
      {isPlaying && (
         <div className="absolute -inset-2 pointer-events-none">
           {[...Array(3)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute inset-0 border border-black/10 rounded-full"
               initial={{ opacity: 0.6, scale: 0.8 }}
               animate={{ opacity: 0, scale: 1.8 }}
               transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
             />
           ))}
         </div>
      )}

      <motion.button
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border border-black/10 bg-white md:bg-black/5 md:backdrop-blur-md text-black/60 hover:text-black hover:bg-black/10 hover:border-black/20 transition-all overflow-hidden group shadow-[0_10px_30px_rgba(0,0,0,0.03)] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect when playing */}
        <motion.div
           animate={{
             opacity: isPlaying ? [0.05, 0.15, 0.05] : 0,
             scale: isPlaying ? [1, 1.2, 1] : 1
           }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-black/20"
         />
        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? <Pause size={18} strokeWidth={2} /> : <Music size={18} strokeWidth={2} />}
        </div>
      </motion.button>

      {/* Play Text Label for clarity */}
      {!isPlaying && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/30 pointer-events-none"
        >
          Play Music
        </motion.span>
      )}
    </div>
  );
}
