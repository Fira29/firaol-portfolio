"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const timeline = [
  {
    id: 1,
    type: "education",
    icon: GraduationCap,
    period: "2023 – Present",
    title: "Bachelor of Computer Science",
    organization: "Infolink University College",
    description:
      "Pursuing a rigorous CS degree with focus on software engineering, algorithms, and modern development practices.",
    tags: [
      "Data Structures & Algorithms",
      "Database Systems",
      "Operating Systems",
      "Software Engineering",
      "Artificial Intelligence",
    ],
    color: "violet",
    side: "right",
  },
  {
    id: 2,
    type: "work",
    icon: Code2,
    period: "2024 – Present",
    title: "Freelance Web Developer",
    organization: "Self-Employed",
    description:
      "Designed and developed websites and dashboards for businesses and students. Delivered end-to-end solutions from wireframes to production.",
    tags: ["Client Projects", "Full Stack", "UI/UX Design"],
    color: "cyan",
    side: "left",
  },
  {
    id: 3,
    type: "work",
    icon: Briefcase,
    period: "2025",
    title: "Frontend Developer Intern",
    organization: "TechNova Solutions",
    description:
      "Built responsive interfaces and improved user experiences for enterprise clients. Collaborated with design and backend teams in an agile environment.",
    tags: ["React", "TypeScript", "Team Collaboration", "Agile"],
    color: "indigo",
    side: "right",
  },
];

const colorMap: Record<string, { dot: string; border: string; tag: string; icon: string; period: string }> = {
  violet: {
    dot: "bg-violet-500 shadow-violet-500/50",
    border: "border-violet-500/30",
    tag: "bg-violet-500/10 border-violet-500/20 text-violet-300",
    icon: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    period: "text-violet-400",
  },
  cyan: {
    dot: "bg-cyan-500 shadow-cyan-500/50",
    border: "border-cyan-500/30",
    tag: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
    icon: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    period: "text-cyan-400",
  },
  indigo: {
    dot: "bg-indigo-500 shadow-indigo-500/50",
    border: "border-indigo-500/30",
    tag: "bg-indigo-500/10 border-indigo-500/20 text-indigo-300",
    icon: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    period: "text-indigo-400",
  },
};

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Journey"
          title="My Path So Far"
          description="Education and experience woven together — the story of becoming a developer."
          inView={inView}
        />

        <div className="relative mt-16">
          {/* Center timeline line */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[1px] bg-gradient-to-b from-violet-500/60 via-indigo-500/40 to-transparent"
            initial={{ scaleY: 0, originY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            style={{ height: "calc(100% - 40px)" }}
          />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              const c = colorMap[item.color];

              return (
                <motion.div
                  key={item.id}
                  className={`relative flex items-start gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Card */}
                  <div className="flex-1">
                    <div className={`glass border ${c.border} rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${c.icon}`}>
                          <item.icon size={16} />
                        </div>
                        <span className={`text-xs font-mono font-semibold ${c.period}`}>
                          {item.period}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-white/40 text-sm mb-3">{item.organization}</p>
                      <p className="text-white/55 text-sm leading-relaxed mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`px-2.5 py-1 rounded-lg border text-xs ${c.tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="relative flex items-center justify-center w-12 shrink-0 mt-8">
                    <div className={`w-4 h-4 rounded-full shadow-lg ${c.dot}`} />
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
