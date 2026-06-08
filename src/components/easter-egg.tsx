"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const next = [...sequence, e.key].slice(-KONAMI.length);
      setSequence(next);
      if (next.join(",") === KONAMI.join(",")) {
        setTriggered(true);
        setTimeout(() => setTriggered(false), 5000);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [sequence]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setTriggered(false)}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            className="relative z-10 text-center p-12 glass border border-red-600/40 rounded-3xl max-w-lg mx-4"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, rotate: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="text-6xl mb-6">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              You found the secret!
            </h2>
            <p className="text-red-400 text-lg font-light">
              &ldquo;Still exploring? Let&apos;s build the future together.&rdquo;
            </p>
            <p className="text-white/30 text-xs mt-6">
              Click anywhere to close • Konami Code unlocked ✓
            </p>

            {/* Sparkles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-red-500"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 150,
                  y: Math.sin((i / 8) * Math.PI * 2) * 150,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
