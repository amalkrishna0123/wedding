"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    // Target Date: May 04, 2026
    const targetDate = new Date("2026-05-04T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setDaysLeft(0);
      } else {
        const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
        setDaysLeft(days);
      }
    };

    updateCountdown();
    // Update every 24 hours or just on mount is enough for "Days Left"
    // but we can do it periodically if they keep the tab open
    const interval = setInterval(updateCountdown, 1000 * 60 * 60);

    return () => clearInterval(interval);
  }, []);

  if (daysLeft === null) return <span className="animate-pulse opacity-20">--</span>;

  return <>{daysLeft}</>;
}
