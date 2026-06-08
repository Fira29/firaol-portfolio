"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const roles = ["Developer.", "Designer.", "Problem Solver.", "Builder."];

export default function Loader({ onComplete }: LoaderProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"name" | "roles" | "exit">("name");
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Show name for 800ms, then transition to roles
    const nameTimer = setTimeout(() => setPhase("roles"), 800);
    return () => clearTimeout(nameTimer);
  }, []);

  useEffect(() => {
    if (phase !== "roles") return;

    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText !== currentRole) {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText === currentRole) {
      // Pause before deleting
      if (roleIndex === roles.length - 1) {
        // Last role — exit
        timeout = setTimeout(() => setPhase("exit"), 600);
        return;
      }
      timeout = setTimeout(() => setIsDeleting(true), 500);
    } else if (isDeleting && displayText !== "") {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 35);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [phase, displayText, isDeleting, roleIndex]);

  useEffect(() => {
    if (phase === "exit") {
      const exitTimer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-700/10 blur-[120px]" />
          </div>

          <div className="relative z-10 text-center">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] text-white">
                FIRAOL{" "}
                <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">GEBI</span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "roles" ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="h-10 flex items-center justify-center"
            >
              <span className="text-xl md:text-2xl text-white/70 font-light tracking-widest">
                {displayText}
                <span className="cursor-blink ml-0.5 text-red-400">|</span>
              </span>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="mt-12 w-48 h-[1px] bg-white/10 mx-auto overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-red-700 via-rose-500 to-red-400"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
