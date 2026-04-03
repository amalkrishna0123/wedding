"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";

const weddingDetails = {
  bride: "Jesny",
  groom: "Jerrin",

  date: {
    day: "Monday",
    full: "May 4, 2026",
  },

  ceremony: {
    time: "3:00 PM",
    location: {
      name: "St. George Orthodox Church",
      place: "Peechi",
    },
  },

  reception: {
    time: "6:00 PM",
    location: {
      name: "Jeevz Square Convention Centre",
      place: "Kallidukku, Thrissur",
    },
  },

  groomParents: {
    father: "Aji George",
    mother: "Mini Aji",
  },

  brideParents: {
    father: "Saju P. U.",
    mother: "Jitha Saju",
  },

  wishesFrom: ["Jeswin", "Joyal"],
};

// ─── Floating Particle ────────────────────────────────────────────────────────
function Particle({ index }: { index: number }) {
  const size = 2 + Math.random() * 3;
  const xStart = Math.random() * 100;
  const duration = 8 + Math.random() * 14;
  const delay = Math.random() * -20;
  const xDrift = (Math.random() - 0.5) * 120;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${xStart}%`,
        bottom: "-10px",
        background: `radial-gradient(circle, rgba(255,255,255,${0.06 + Math.random() * 0.12}), transparent)`,
      }}
      animate={{
        y: [0, -(600 + Math.random() * 400)],
        x: [0, xDrift],
        opacity: [0, 0.7, 0.4, 0],
        scale: [0.5, 1, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      key={index}
    />
  );
}

// ─── Blur Blob ────────────────────────────────────────────────────────────────
function BlurBlob({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        filter: "blur(80px)",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        scale: [1, 1.18, 0.92, 1],
        opacity: [0.3, 0.55, 0.25, 0.3],
      }}
      transition={{
        duration: 9 + delay * 2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Decorative String (hanging line) ─────────────────────────────────────────
function HangingString() {
  return (
    <motion.div
      className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
      initial={{ scaleY: 0, opacity: 0 }}
      whileInView={{ scaleY: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{ transformOrigin: "top" }}
    >
      <div
        style={{
          width: 1,
          height: 60,
          background:
            "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), rgba(255,255,255,0.08))",
        }}
      />
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.35)",
          boxShadow: "0 0 8px 2px rgba(255,255,255,0.15)",
        }}
      />
    </motion.div>
  );
}

// ─── Card Face: Front ─────────────────────────────────────────────────────────
function CardFront() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
      {/* Ornamental top */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-5 flex items-center gap-3"
      >
        <div
          style={{
            width: 40,
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.25))",
          }}
        />
        <div
          style={{
            width: 5,
            height: 5,
            transform: "rotate(45deg)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />
        <div
          style={{
            width: 40,
            height: 1,
            background:
              "linear-gradient(to left, transparent, rgba(255,255,255,0.25))",
          }}
        />
      </motion.div>

      {/* Sub-label */}
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        style={{
          fontSize: 9,
          letterSpacing: "0.55em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          marginBottom: 20,
          fontWeight: 700,
        }}
      >
        A Celebration of Love
      </motion.p>

      {/* Names */}
      <motion.h2
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.4, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
          fontWeight: 300,
          fontStyle: "italic",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          textAlign: "center",
          color: "rgba(255,255,255,0.92)",
          textShadow: "0 0 40px rgba(255,255,255,0.1)",
        }}
      >
        {weddingDetails.groom}
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            margin: "0 12px",
            fontStyle: "normal",
            fontWeight: 200,
          }}
        >
          &amp;
        </span>
        {weddingDetails.bride}
      </motion.h2>

      {/* Thin line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        style={{
          width: 48,
          height: 1,
          background: "rgba(255,255,255,0.15)",
          margin: "16px auto",
        }}
      />

      {/* Date */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7 }}
        style={{
          fontSize: 11,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          fontWeight: 600,
        }}
      >
        {weddingDetails.date.day}, {weddingDetails.date.full}
      </motion.p>

      {/* Flip hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{
          position: "absolute",
          bottom: 20,
          fontSize: 8,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
          fontWeight: 600,
        }}
      >
        click to reveal
      </motion.p>
    </div>
  );
}

// ─── Card Face: Back ──────────────────────────────────────────────────────────
function CardBack() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 select-none">
      {/* Ceremony */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <p
          style={{
            fontSize: 8,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Holy Matrimony
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.08em",
          }}
        >
          {weddingDetails.ceremony.time}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
            marginTop: 3,
          }}
        >
          {weddingDetails.ceremony.location.name}
        </p>
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginTop: 2,
          }}
        >
          {weddingDetails.ceremony.location.place}
        </p>
      </div>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 30,
            height: 1,
            background: "rgba(255,255,255,0.12)",
          }}
        />
        <div
          style={{
            width: 4,
            height: 4,
            transform: "rotate(45deg)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        />
        <div
          style={{
            width: 30,
            height: 1,
            background: "rgba(255,255,255,0.12)",
          }}
        />
      </div>

      {/* Reception */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <p
          style={{
            fontSize: 8,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Reception
        </p>
        <p
          style={{
            fontSize: 22,
            fontWeight: 300,
            color: "rgba(255,255,255,0.88)",
            letterSpacing: "0.08em",
          }}
        >
          {weddingDetails.reception.time}
        </p>
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.1em",
            marginTop: 3,
          }}
        >
          {weddingDetails.reception.location.name}
        </p>
        <p
          style={{
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginTop: 2,
          }}
        >
          {weddingDetails.reception.location.place}
        </p>
      </div>

      {/* Thin rule */}
      <div
        style={{
          width: "100%",
          height: 1,
          background: "rgba(255,255,255,0.06)",
          marginBottom: 20,
        }}
      />

      {/* Parents */}
      <p
        style={{
          fontSize: 8,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        With the Blessings of
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "10px",
          textAlign: "center",
          marginBottom: 18,
        }}
      >
        {/* Groom Parents */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 7,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Groom's Parents
          </p>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.08em",
              fontWeight: 300,
              lineHeight: 1.4,
            }}
          >
            {weddingDetails.groomParents.father} <br />
            &amp; {weddingDetails.groomParents.mother}
          </p>
        </div>

        {/* Vertical divider */}
        <div style={{ width: 1, background: "rgba(255,255,255,0.06)", margin: "0 4px" }} />

        {/* Bride Parents */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 7,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              fontWeight: 700,
              marginBottom: 4,
            }}
          >
            Bride's Parents
          </p>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.08em",
              fontWeight: 300,
              lineHeight: 1.4,
            }}
          >
            {weddingDetails.brideParents.father} <br />
            &amp; {weddingDetails.brideParents.mother}
          </p>
        </div>
      </div>

      {/* Wishes from */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: 7,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.18)",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          With Love &amp; Wishes From
        </p>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.3em",
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          {weddingDetails.wishesFrom.join("  ·  ")}
        </p>
      </div>
    </div>
  );
}

// ─── Main Footer ─────────────────────────────────────────────────────────────
export default function WeddingFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Spring-based ambient tilt from mouse position
  const rawRotateX = useRef(0);
  const rawRotateY = useRef(0);
  const springRotateX = useSpring(0, { stiffness: 60, damping: 20 });
  const springRotateY = useSpring(0, { stiffness: 60, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped) return; // no tilt while showing back
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const intensity = isMobile ? 5 : 12;
      rawRotateX.current = -dy * intensity;
      rawRotateY.current = dx * intensity;
      springRotateX.set(rawRotateX.current);
      springRotateY.set(rawRotateY.current);
    },
    [isFlipped, isMobile, springRotateX, springRotateY]
  );

  const handleMouseLeave = useCallback(() => {
    springRotateX.set(0);
    springRotateY.set(0);
  }, [springRotateX, springRotateY]);

  // Particle pool
  const particles = Array.from({ length: 28 }, (_, i) => i);

  const flipSpring = { type: "spring" as const, stiffness: 55, damping: 14 };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, #0c0a0f 0%, #050407 60%, #000000 100%)",
      }}
    >
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Radial center glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(180,160,220,0.06) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Blobs */}
        <BlurBlob
          x="20%"
          y="30%"
          size={360}
          color="rgba(120,80,180,0.07)"
          delay={0}
        />
        <BlurBlob
          x="80%"
          y="60%"
          size={280}
          color="rgba(80,100,200,0.06)"
          delay={2}
        />
        <BlurBlob
          x="50%"
          y="75%"
          size={420}
          color="rgba(200,150,255,0.04)"
          delay={4}
        />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* Subtle horizontal grid lines */}
        {[20, 45, 70, 90].map((pct) => (
          <div
            key={pct}
            style={{
              position: "absolute",
              top: `${pct}%`,
              left: 0,
              right: 0,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.025) 50%, rgba(255,255,255,0.02) 70%, transparent)",
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen py-20 px-4">

        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontSize: 9,
            letterSpacing: "0.65em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
            fontWeight: 700,
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          The Wedding of
        </motion.p>

        {/* Hanging string */}
        <div style={{ position: "relative", marginBottom: 0 }}>
          <HangingString />
        </div>

        {/* ── Card Container ── */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setIsFlipped((f) => !f)}
          style={{
            perspective: 1200,
            cursor: "pointer",
            marginTop: 64,
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Continuous gentle float */}
          <motion.div
            animate={{
              y: [0, -10, 3, -7, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ perspective: 1200 }}
          >
            {/* Spring tilt wrapper */}
            <motion.div
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Flip wrapper */}
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={flipSpring}
                style={{
                  width: isMobile ? "min(340px, 88vw)" : 440,
                  height: isMobile ? 480 : 560,
                  position: "relative",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card glass surface */}
                {/* Front */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(200,180,255,0.04) 100%)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 0 60px rgba(180,150,255,0.08), 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <CardFront />
                </div>

                {/* Back */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 20,
                    background:
                      "linear-gradient(135deg, rgba(200,180,255,0.07) 0%, rgba(255,255,255,0.03) 50%, rgba(150,120,220,0.06) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 0 60px rgba(180,150,255,0.1), 0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <CardBack />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Card drop shadow glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scaleX: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: isMobile ? 200 : 260,
            height: 24,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(180,150,255,0.15) 0%, transparent 70%)",
            filter: "blur(12px)",
            marginTop: 16,
          }}
        />

        {/* Flip instruction */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{ marginTop: 32, textAlign: "center" }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              fontWeight: 600,
            }}
          >
            {isFlipped ? "click to close" : "scroll or click to reveal"}
          </span>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginTop: 64, width: "100%", maxWidth: 480 }}
        >
          <svg viewBox="0 0 480 24" fill="none" style={{ width: "100%", height: 24 }}>
            <path
              d="M0 12 Q60 2 120 12 Q180 22 240 12 Q300 2 360 12 Q420 22 480 12"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.7"
            />
            <circle cx="240" cy="12" r="2.5" fill="rgba(255,255,255,0.15)" />
            <polygon
              points="240,6 244,12 240,18 236,12"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.6"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          style={{
            marginTop: 40,
            display: "flex",
            gap: 32,
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.12)",
              fontWeight: 700,
            }}
          >
            J &amp; J · 2026
          </span>
          <div
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.12)",
              fontWeight: 700,
            }}
          >
            Forever Begins Here
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
