"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "violet",
    skills: [
      { name: "HTML", level: "Expert", years: "3 yrs" },
      { name: "CSS", level: "Expert", years: "3 yrs" },
      { name: "JavaScript", level: "Advanced", years: "2 yrs" },
      { name: "TypeScript", level: "Intermediate", years: "1 yr" },
      { name: "React", level: "Advanced", years: "2 yrs" },
      { name: "Next.js", level: "Intermediate", years: "1 yr" },
      { name: "Tailwind CSS", level: "Advanced", years: "1.5 yrs" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "indigo",
    skills: [
      { name: "Node.js", level: "Intermediate", years: "1.5 yrs" },
      { name: "Express.js", level: "Intermediate", years: "1.5 yrs" },
      { name: "Firebase", level: "Intermediate", years: "1 yr" },
      { name: "MongoDB", level: "Intermediate", years: "1 yr" },
      { name: "PostgreSQL", level: "Beginner", years: "6 mos" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    color: "cyan",
    skills: [
      { name: "Java", level: "Intermediate", years: "2 yrs" },
      { name: "Python", level: "Intermediate", years: "1.5 yrs" },
      { name: "C++", level: "Beginner", years: "1 yr" },
      { name: "PHP", level: "Beginner", years: "6 mos" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Platforms",
    color: "emerald",
    skills: [
      { name: "Git", level: "Advanced", years: "2 yrs" },
      { name: "GitHub", level: "Advanced", years: "2 yrs" },
      { name: "Docker", level: "Beginner", years: "6 mos" },
      { name: "Figma", level: "Intermediate", years: "1 yr" },
      { name: "VS Code", level: "Expert", years: "3 yrs" },
    ],
  },
];

const colorMap: Record<string, { pill: string; glow: string; tab: string }> = {
  violet: {
    pill: "bg-violet-500/15 border-violet-500/30 text-violet-300 hover:bg-violet-500/25 hover:border-violet-400/60 hover:shadow-violet-500/20",
    glow: "shadow-violet-500/30",
    tab: "bg-violet-500/20 text-violet-300 border-violet-500/40",
  },
  indigo: {
    pill: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 hover:border-indigo-400/60 hover:shadow-indigo-500/20",
    glow: "shadow-indigo-500/30",
    tab: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
  },
  cyan: {
    pill: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400/60 hover:shadow-cyan-500/20",
    glow: "shadow-cyan-500/30",
    tab: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  },
  emerald: {
    pill: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400/60 hover:shadow-emerald-500/20",
    glow: "shadow-emerald-500/30",
    tab: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
};

const levelColors: Record<string, string> = {
  Expert: "text-violet-400",
  Advanced: "text-indigo-400",
  Intermediate: "text-cyan-400",
  Beginner: "text-slate-400",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeCategory = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Skills"
          title="My Toolbox"
          description="The technologies I use to bring ideas to life."
          inView={inView}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16"
        >
          {/* Category tabs */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  active === cat.id
                    ? colorMap[cat.color].tab
                    : "glass border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {/* Skill pills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {activeCategory.skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className={`relative group px-5 py-3 rounded-xl border text-sm font-medium cursor-default transition-all duration-200 shadow-lg ${colorMap[activeCategory.color].pill}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.08, y: -3 }}
                >
                  <span className="relative z-10">{skill.name}</span>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {hoveredSkill === skill.name && (
                      <motion.div
                        className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-2 rounded-lg glass border border-white/15 text-xs whitespace-nowrap z-20 pointer-events-none"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span className={`font-semibold ${levelColors[skill.level]}`}>
                          {skill.level}
                        </span>
                        <span className="text-white/40 ml-2">{skill.years}</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white/10" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-10 flex-wrap">
            {Object.entries(levelColors).map(([level, color]) => (
              <span key={level} className="flex items-center gap-2 text-xs text-white/30">
                <span className={`w-2 h-2 rounded-full bg-current ${color}`} />
                {level}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
