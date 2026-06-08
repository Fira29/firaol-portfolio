"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Code, GitBranch, Users, Zap, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const achievements = [
  {
    icon: Code,
    title: "Built 10+ Projects",
    description: "From concept to deployment across various domains",
    color: "violet",
    delay: 0,
  },
  {
    icon: Trophy,
    title: "Hackathon Participant",
    description: "Competed and built under pressure with tight deadlines",
    color: "yellow",
    delay: 0.05,
  },
  {
    icon: GitBranch,
    title: "Open Source Contributor",
    description: "Contributing to the developer community",
    color: "emerald",
    delay: 0.1,
  },
  {
    icon: Users,
    title: "Active Tech Community Member",
    description: "Networking and growing with fellow developers",
    color: "cyan",
    delay: 0.15,
  },
  {
    icon: Zap,
    title: "Strong Problem Solver",
    description: "Analytical thinking with algorithmic approach",
    color: "orange",
    delay: 0.2,
  },
  {
    icon: BookOpen,
    title: "Fast Learner",
    description: "Pick up new technologies rapidly and apply effectively",
    color: "indigo",
    delay: 0.25,
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
  violet: {
    bg: "from-violet-500/15 to-transparent",
    border: "border-violet-500/25",
    icon: "text-violet-400 bg-violet-500/10",
    glow: "hover:shadow-violet-500/15",
  },
  yellow: {
    bg: "from-yellow-500/10 to-transparent",
    border: "border-yellow-500/20",
    icon: "text-yellow-400 bg-yellow-500/10",
    glow: "hover:shadow-yellow-500/15",
  },
  emerald: {
    bg: "from-emerald-500/15 to-transparent",
    border: "border-emerald-500/25",
    icon: "text-emerald-400 bg-emerald-500/10",
    glow: "hover:shadow-emerald-500/15",
  },
  cyan: {
    bg: "from-cyan-500/15 to-transparent",
    border: "border-cyan-500/25",
    icon: "text-cyan-400 bg-cyan-500/10",
    glow: "hover:shadow-cyan-500/15",
  },
  orange: {
    bg: "from-orange-500/10 to-transparent",
    border: "border-orange-500/20",
    icon: "text-orange-400 bg-orange-500/10",
    glow: "hover:shadow-orange-500/15",
  },
  indigo: {
    bg: "from-indigo-500/15 to-transparent",
    border: "border-indigo-500/25",
    icon: "text-indigo-400 bg-indigo-500/10",
    glow: "hover:shadow-indigo-500/15",
  },
};

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-20 sm:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones & Recognition"
          description="Markers of growth along the journey."
          inView={inView}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-16">
          {achievements.map((achievement, i) => {
            const c = colorMap[achievement.color];
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: achievement.delay,
                  ease: [0.22, 1, 0.36, 1],
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
              >
                <motion.div
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} p-5 sm:p-6 text-center h-full cursor-default shadow-lg ${c.glow} transition-shadow duration-300`}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center mx-auto mb-4`}
                  >
                    <achievement.icon size={22} />
                  </div>
                  <h3 className="text-white font-semibold text-sm sm:text-base mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed hidden sm:block">
                    {achievement.description}
                  </p>

                  {/* Unlock sparkle */}
                  <div className="absolute top-3 right-3 text-lg">
                    {i % 2 === 0 ? "✨" : "🏆"}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
