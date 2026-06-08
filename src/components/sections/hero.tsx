"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, ArrowDown, Download, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/magnetic-button";
import ProfilePhoto from "@/components/ui/profile-photo";

const typingPhrases = [
  "Building impactful products.",
  "Creating meaningful experiences.",
  "Turning ideas into reality.",
  "Learning relentlessly.",
  "Designing for humans.",
];

const socials = [
  { icon: Github, href: "https://github.com/fira29", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/firaol-gebi", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/@olfira29", label: "Telegram" },
  { icon: Mail, href: "mailto:olfiragebi@gmail.com", label: "Email" },
];

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentPhrase = typingPhrases[phraseIndex];

    if (!isDeleting && displayText !== currentPhrase) {
      intervalRef.current = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, 65);
    } else if (!isDeleting && displayText === currentPhrase) {
      intervalRef.current = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText !== "") {
      intervalRef.current = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 40);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [displayText, isDeleting, phraseIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-red-600/30 text-sm text-red-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-white/50 text-lg mb-2 font-light"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none mb-4"
            >
              <span className="text-white">Firaol </span>
              <span className="gradient-text">Gebi</span>
              <span className="text-violet-400">.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-x-3 gap-y-1 mb-6"
            >
              {["Computer Science Student", "Full Stack Developer", "Future Software Engineer"].map(
                (role, i) => (
                  <span key={role} className="flex items-center gap-2">
                    <span className="text-white/70 text-base sm:text-lg font-medium">{role}</span>
                    {i < 2 && <span className="text-violet-500/60 text-sm">·</span>}
                  </span>
                )
              )}
            </motion.div>

            {/* Typing animation */}
            <motion.div
              variants={itemVariants}
              className="h-8 flex items-center mb-8"
            >
              <span className="text-lg sm:text-xl text-red-400 font-mono">
                {displayText}
                <span className="cursor-blink text-white/60">|</span>
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/55 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
            >
              I&apos;m a Computer Science student at{" "}
              <span className="text-white/80">Infolink University College</span>{" "}
              who loves transforming ideas into products people genuinely enjoy using.
              I combine engineering logic, curiosity, and design thinking to build modern digital experiences.
              <br />
              <span className="text-white/80 font-medium mt-2 block">Build things that matter.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <MagneticButton
                onClick={() => {
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-xl bg-red-700 hover:bg-red-600 text-white font-semibold text-sm transition-colors shadow-lg shadow-red-700/30 flex items-center gap-2"
              >
                <Sparkles size={16} />
                Explore My Work
              </MagneticButton>

              <MagneticButton
                onClick={() => window.open("/resume.pdf", "_blank")}
                className="px-7 py-3.5 rounded-xl glass border border-white/15 text-white/80 hover:text-white font-semibold text-sm transition-colors flex items-center gap-2 hover:border-white/30"
              >
                <Download size={16} />
                Download Resume
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-7 py-3.5 rounded-xl text-red-400 hover:text-red-300 font-semibold text-sm transition-colors border border-red-600/25 hover:border-red-500/50 hover:bg-red-700/8"
              >
                Let&apos;s Connect
              </MagneticButton>
            </motion.div>

            {/* Socials */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <span className="text-white/30 text-xs uppercase tracking-widest">Find me on</span>
              <div className="h-[1px] w-8 bg-white/15" />
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/50 hover:text-red-400 hover:border-red-500/40 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Profile visual */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="relative flex items-center justify-center py-16">
              <ProfilePhoto />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={() => document.getElementById("trust")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={14} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
