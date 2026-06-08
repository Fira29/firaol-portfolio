"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ProfilePhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3-D tilt on mouse move
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  };

  return (
    <div className="relative flex items-center justify-center select-none">

      {/* ── Outer slow-spin red ring ── */}
      <motion.div
        className="absolute rounded-[40px] pointer-events-none"
        style={{
          width: 290,
          height: 420,
          background:
            "conic-gradient(from 0deg, transparent 0deg 240deg, rgba(200,10,15,0.8) 240deg 260deg, transparent 260deg 330deg, rgba(200,10,15,0.4) 330deg 360deg)",
          filter: "blur(1.5px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Counter-spin second ring ── */}
      <motion.div
        className="absolute rounded-[36px] pointer-events-none"
        style={{
          width: 308,
          height: 438,
          background:
            "conic-gradient(from 150deg, transparent 0deg 300deg, rgba(255,40,40,0.45) 300deg 320deg, transparent 320deg 360deg)",
          filter: "blur(2px)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Pulsing red glow behind photo ── */}
      <motion.div
        className="absolute rounded-[32px] pointer-events-none"
        style={{ width: 260, height: 390 }}
        animate={{
          boxShadow: hovered
            ? [
                "0 0 40px 15px rgba(200,10,15,0.5)",
                "0 0 80px 35px rgba(200,10,15,0.7)",
                "0 0 40px 15px rgba(200,10,15,0.5)",
              ]
            : [
                "0 0 20px 8px rgba(180,10,15,0.25)",
                "0 0 45px 20px rgba(180,10,15,0.45)",
                "0 0 20px 8px rgba(180,10,15,0.25)",
              ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Corner accent dots (spider web nodes) ── */}
      {[
        { top: -6, left: "50%", x: "-50%" },
        { bottom: -6, left: "50%", x: "-50%" },
        { top: "50%", left: -6, y: "-50%" },
        { top: "50%", right: -6, y: "-50%" },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            ...pos,
            background: "rgba(220,30,30,0.9)",
            boxShadow: "0 0 8px 3px rgba(200,10,15,0.7)",
          }}
          animate={{ opacity: [0.6, 1, 0.6], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
        />
      ))}

      {/* ── Orbiting particles ── */}
      {[0, 72, 144, 216, 288].map((startDeg, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: i % 2 === 0 ? 5 : 3,
            height: i % 2 === 0 ? 5 : 3,
            background: "rgba(255,60,60,0.9)",
            boxShadow: "0 0 6px 2px rgba(220,20,20,0.6)",
          }}
          animate={{
            x: [
              Math.cos(((startDeg + 0) * Math.PI) / 180) * 175,
              Math.cos(((startDeg + 180) * Math.PI) / 180) * 175,
              Math.cos(((startDeg + 360) * Math.PI) / 180) * 175,
            ],
            y: [
              Math.sin(((startDeg + 0) * Math.PI) / 180) * 230,
              Math.sin(((startDeg + 180) * Math.PI) / 180) * 230,
              Math.sin(((startDeg + 360) * Math.PI) / 180) * 230,
            ],
          }}
          transition={{
            duration: 7 + i * 0.6,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* ── Main photo card with 3-D tilt ── */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 900,
        }}
        className="relative z-10 cursor-pointer"
      >
        {/* Tall rounded-rectangle frame — shows full body */}
        <motion.div
          className="relative overflow-hidden rounded-[28px]"
          style={{ width: 260, height: 390 }}
          initial={{ opacity: 0, scale: 0.7, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
        >
          {/* The actual photo — object-cover shows full portrait */}
          <Image
            src="/profile.jpg"
            alt="Firaol Gebi — Full Stack Developer"
            fill
            sizes="260px"
            className="object-cover object-center"
            priority
          />

          {/* Subtle dark-red bottom gradient for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.05) 50%, rgba(10,0,0,0.55) 100%)",
            }}
          />

          {/* Red tint overlay — fades on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "rgba(80,0,0,0.18)",
            }}
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Scan-line reveal on load */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(220,20,20,0.18) 0%, transparent 50%)",
            }}
            initial={{ y: "-100%" }}
            animate={{ y: "220%" }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
          />

          {/* Glimmer shimmer */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(110deg, transparent 35%, rgba(255,60,60,0.07) 50%, transparent 65%)",
              backgroundSize: "200% 200%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear", delay: 1 }}
          />

          {/* Name tag pinned at bottom of photo */}
          <motion.div
            className="absolute bottom-4 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <div
              className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-white/80"
              style={{
                background: "rgba(15,0,0,0.7)",
                border: "1px solid rgba(200,20,20,0.45)",
                backdropFilter: "blur(10px)",
              }}
            >
              Firaol Gebi
            </div>
          </motion.div>
        </motion.div>

        {/* Red border frame around the card */}
        <div
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            border: "1.5px solid rgba(200,20,20,0.4)",
            boxShadow: "inset 0 0 20px rgba(200,10,10,0.08)",
          }}
        />
      </motion.div>

      {/* ── Floating status badges ── */}
      <motion.div
        className="absolute top-6 -right-8 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/85 pointer-events-none whitespace-nowrap"
        style={{
          background: "rgba(15,0,0,0.75)",
          border: "1px solid rgba(180,10,20,0.45)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -6, 0] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.5 },
          x: { delay: 1.4, duration: 0.5 },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
      >
        🎓 CS Student
      </motion.div>

      <motion.div
        className="absolute bottom-10 -left-10 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/85 pointer-events-none whitespace-nowrap"
        style={{
          background: "rgba(15,0,0,0.75)",
          border: "1px solid rgba(180,10,20,0.45)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0, y: [0, 6, 0] }}
        transition={{
          opacity: { delay: 1.6, duration: 0.5 },
          x: { delay: 1.6, duration: 0.5 },
          y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
        }}
      >
        ⚡ Full Stack Dev
      </motion.div>

    </div>
  );
}
