"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Bubble = ({ index }: { index: number }) => {
  const [randomX, setRandomX] = useState(0);
  const [randomDelay, setRandomDelay] = useState(0);
  const [randomDuration, setRandomDuration] = useState(0);
  const [randomSize, setRandomSize] = useState(0);

  useEffect(() => {
    setRandomX(Math.random() * 100);
    setRandomDelay(Math.random() * 5);
    setRandomDuration(Math.random() * 10 + 10);
    setRandomSize(Math.random() * 40 + 10);
  }, []);

  return (
    <motion.div
      initial={{ y: "110vh", x: `${randomX}vw`, opacity: 0 }}
      animate={{
        y: "-10vh",
        opacity: [0, 0.4, 0.4, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "linear",
      }}
      style={{
        width: randomSize,
        height: randomSize,
      }}
      className="absolute rounded-full border border-black/10 bg-black/5 md:backdrop-blur-[1px]"
    />
  );
};

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<number[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setBubbles(Array.from({ length: isMobile ? 8 : 20 }, (_, i) => i));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((i) => (
        <Bubble key={i} index={i} />
      ))}
    </div>
  );
}
