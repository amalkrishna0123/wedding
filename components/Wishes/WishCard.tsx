"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

interface WishCardProps {
  name: string;
  wishText: string;
  index: number;
  onClick?: () => void;
}

export default function WishCard({ name, wishText, index, onClick }: WishCardProps) {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Character truncation logic
  const truncatedName = name.length > 25 ? name.slice(0, 25).trim() + "..." : name;
  const truncatedWish = wishText.length > 120 ? wishText.slice(0, 120).trim() + "..." : wishText;

  // 3D Rotation based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Slight offset based on index for "unstructured" feel
  const offsetRotate = (index % 3 === 0 ? "2deg" : index % 3 === 1 ? "-1deg" : "0.5deg");
  const offsetY = (index % 2 === 0 ? "0px" : "20px");

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!mounted) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      initial={{ opacity: 0, y: 100, rotate: offsetRotate }}
      animate={{ opacity: 1, y: offsetY }}
      style={{
        rotateX: mounted && window.innerWidth >= 768 ? rotateX : 0,
        rotateY: mounted && window.innerWidth >= 768 ? rotateY : 0,
        rotateZ: offsetRotate,
        transformStyle: mounted && window.innerWidth >= 768 ? "preserve-3d" : "flat",
      }}
      className="relative flex-shrink-0 w-[320px] md:w-[380px] aspect-[4/5] p-12 bg-white border border-black/5 rounded-[60px] group transition-all duration-1000 hover:border-black/30 cursor-pointer active:scale-95 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] will-change-transform"
    >
      {/* Felt/Paper Texture Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay rounded-[60px]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/felt.png")' }} />

      {/* Parallax Content Layers */}
      <div style={{ transform: mounted && window.innerWidth >= 768 ? "translateZ(40px)" : "none" }} className="relative h-full flex flex-col justify-between pointer-events-none">
         <div className="space-y-8">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <Quote className="w-12 h-12 text-black/5 transition-colors duration-1000 group-hover:text-black/20" />
            </motion.div>
            
            <p className="text-2xl md:text-3xl font-medium tracking-tight italic leading-[1.4] text-black/60 group-hover:text-black transition-colors duration-1000 line-clamp-6">
               “{truncatedWish}”
            </p>
         </div>

         <div className="pt-10 border-t border-black/5 space-y-2">
            <span className="block text-[10px] font-black tracking-[0.5em] uppercase text-black/20">
               With Heartfelt Love
            </span>
            <span className="block text-lg font-bold tracking-tight uppercase text-black/80 group-hover:text-black transition-all duration-1000">
               {truncatedName}
            </span>
         </div>
      </div>
      
      {/* Decorative Floating Element for Depth */}
      <div 
        style={{ transform: mounted && window.innerWidth >= 768 ? "translateZ(60px)" : "none" }}
        className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/[0.02] border border-white/10 rounded-[30px] rotate-[-15deg] group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-1000 md:backdrop-blur-2xl pointer-events-none flex items-center justify-center"
      >
          <div className="w-1 h-1 bg-white/20 rounded-full" />
      </div>

      {/* Organic Light Bloom */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[60px] pointer-events-none" />
    </motion.div>
  );
}

