"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleLeave = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Glow dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: isHovering ? 2.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.5 }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovering
              ? "w-8 h-8 bg-red-500/30 blur-sm"
              : "w-2 h-2 bg-red-500/90"
          }`}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{ x: pos.x - 16, y: pos.y - 16, scale: isHovering ? 1.5 : 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 25, mass: 0.8 }}
      >
        <div
          className={`w-8 h-8 rounded-full border border-red-500/40 transition-all duration-300 ${
            isHovering ? "opacity-100" : "opacity-50"
          }`}
        />
      </motion.div>
    </>
  );
}
