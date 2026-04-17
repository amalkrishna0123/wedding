"use client";

import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import { Music, Pause } from "lucide-react";

export default function AudioPlayer() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Soundwaves (Rendered underneath the button) */}
      {isPlaying && (
         <div className="absolute -inset-2 pointer-events-none">
           {[...Array(3)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute inset-0 border border-white/20 rounded-full"
               initial={{ opacity: 0.6, scale: 0.8 }}
               animate={{ opacity: 0, scale: 1.8 }}
               transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
             />
           ))}
         </div>
      )}

      <motion.button
        onClick={togglePlay}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 hover:text-white transition-colors overflow-hidden group shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect when playing */}
        <motion.div
           animate={{
             opacity: isPlaying ? [0.15, 0.4, 0.15] : 0,
             scale: isPlaying ? [1, 1.2, 1] : 1
           }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-white/30"
        />
        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? <Pause size={18} strokeWidth={2.5} /> : <Music size={18} strokeWidth={2.5} />}
        </div>
      </motion.button>
    </div>
  );
}
