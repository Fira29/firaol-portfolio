"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  inView: boolean;
  align?: "center" | "left";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  inView,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "text-center" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 text-red-500 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
          <span className="w-6 h-[1px] bg-red-600/60" />
          {eyebrow}
          <span className="w-6 h-[1px] bg-red-600/60" />
        </span>
      </motion.div>

      <motion.h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight ${isCenter ? "mx-auto" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className={`text-white/45 text-base sm:text-lg leading-relaxed max-w-2xl ${isCenter ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
