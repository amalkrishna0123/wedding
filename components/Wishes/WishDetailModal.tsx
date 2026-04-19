"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Quote } from "lucide-react";
import { useEffect } from "react";

interface WishDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  wishText: string;
}

export default function WishDetailModal({ isOpen, onClose, name, wishText }: WishDetailModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white border border-black/10 rounded-[60px] p-12 md:p-16 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")' }} />

            <button
              onClick={onClose}
              className="absolute top-8 right-8 md:top-12 md:right-12 p-3 md:p-4 rounded-full hover:bg-black/5 transition-all duration-500 group z-50 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-black/30 group-hover:text-black transition-colors" />
            </button>

            <div className="relative z-10 space-y-12">
               <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 <Quote className="w-16 h-16 text-black/5" />
               </motion.div>
               
               <div className="space-y-8">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-4xl font-medium tracking-tight italic leading-[1.4] text-black"
                  >
                     “{wishText}”
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="pt-12 border-t border-black/5 space-y-2"
                  >
                     <span className="block text-[10px] font-black tracking-[0.5em] uppercase text-black/20">
                        With Heartfelt Love
                     </span>
                     <span className="block text-2xl font-bold tracking-tight uppercase text-black/80">
                        {name}
                     </span>
                  </motion.div>
               </div>
            </div>

            {/* Decorative Floating Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-black/[0.02] rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
