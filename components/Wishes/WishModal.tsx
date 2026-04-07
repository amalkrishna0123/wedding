"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishModal({ isOpen, onClose }: WishModalProps) {
  const [name, setName] = useState("");
  const [wishText, setWishText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wishText.trim()) return;

    setIsSubmitting(true);
    try {
      await push(ref(db, "wishes"), {
        name: name.trim(),
        wishText: wishText.trim(),
        timestamp: serverTimestamp(),
      });
      setName("");
      setWishText("");
      onClose();
    } catch (error) {
      console.error("Error saving wish:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white border border-black/10 rounded-[40px] p-10 overflow-hidden shadow-2xl"
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")' }} />

            <button
              onClick={onClose}
              className="absolute top-8 right-8 p-3 rounded-full hover:bg-black/5 transition-colors group z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-black/40 group-hover:text-black transition-colors" />
            </button>

            <div className="relative z-10">
              <header className="mb-10">
                <h3 className="text-4xl font-extrabold tracking-tight mb-3 text-black">Leave a Wish</h3>
                <p className="text-black/30 text-[10px] tracking-[0.4em] uppercase font-black leading-none">
                  Share your love for Jerrin & Jesny
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-[0.3em] uppercase text-black/20 ml-6">
                    Identity
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name or Family"
                    className="w-full bg-black/[0.03] border border-black/[0.05] rounded-[24px] px-8 py-5 outline-none focus:border-black/20 focus:bg-black/[0.06] transition-all text-black placeholder:text-black/10 text-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black tracking-[0.3em] uppercase text-black/20 ml-6">
                    Sentiment
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="Write something heartfelt..."
                    className="w-full bg-black/[0.03] border border-black/[0.05] rounded-[24px] px-8 py-5 outline-none focus:border-black/20 focus:bg-black/[0.06] transition-all text-black placeholder:text-black/10 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative py-6 bg-black text-white text-xs font-black tracking-[0.4em] uppercase rounded-full overflow-hidden group transition-all active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed mt-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                >
                  <span className="relative z-10">{isSubmitting ? "Recording..." : "Seal with Love"}</span>
                  <div className="absolute inset-0 bg-zinc-800 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
