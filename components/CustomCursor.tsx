"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Instant position for the dot
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  // Springs for smoother trailing effect on the outer ring
  const cursorXSpring = useSpring(-100, { stiffness: 150, damping: 25, mass: 0.5 });
  const cursorYSpring = useSpring(-100, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    
    // Check if device is touch based. If it is, we don't need a custom cursor.
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    document.documentElement.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      setDotPos({ x: e.clientX, y: e.clientY });
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const computedStyle = window.getComputedStyle(target);
      if (
        computedStyle.cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.style.cursor = 'auto'; // Reset on cleanup
    };
  }, [cursorXSpring, cursorYSpring]);

  if (!isMounted) return null;

  return (
    <div className="hidden md:block">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white/60 flex items-center justify-center mix-blend-overlay"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? 64 : 36,
          height: isHovering ? 64 : 36,
          translateX: '-50%',
          translateY: '-50%',
          transition: "width 0.3s ease-out, height 0.3s ease-out"
        }}
      >
         {/* Spotlight glow inside ring when hovering */}
         <div 
           className={`absolute inset-0 rounded-full bg-white transition-opacity duration-300 ${isHovering ? 'opacity-20' : 'opacity-0'}`} 
           style={{ filter: "blur(4px)" }}
         />
      </motion.div>

      {/* Center Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white mix-blend-overlay opacity-90 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          transform: `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`,
          width: isHovering ? 0 : 8,
          height: isHovering ? 0 : 8,
          transition: "width 0.2s, height 0.2s"
        }}
      />
    </div>
  );
}
