"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp, Star } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import TiltCard from "@/components/ui/tilt-card";

const projects = [
  {
    id: 1,
    featured: true,
    title: "Smart Task Manager",
    tagline: "AI-Powered Productivity Platform",
    description:
      "An AI-powered productivity platform featuring authentication, intelligent task prioritization, reminders, and personalized analytics dashboards. Designed to help users work smarter, not harder.",
    details:
      "Built with a focus on performance and user experience. The AI engine analyzes your work patterns and automatically surfaces the most important tasks. Features include real-time collaboration, smart reminders, progress analytics, and a clean minimal interface.",
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    gradient: "from-violet-600/20 via-indigo-600/10 to-transparent",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
    demo: "#",
    github: "https://github.com/fira29",
    color: "violet",
  },
  {
    id: 2,
    featured: false,
    title: "Food Delivery Platform",
    tagline: "Modern Ordering Experience",
    description:
      "Modern food ordering system with real-time order tracking and secure payment integration. Supports multiple restaurants, real-time delivery tracking on a live map.",
    details:
      "Full-stack application with restaurant management dashboard, customer ordering flow, real-time order tracking via WebSockets, and Stripe payment integration. Mobile-first responsive design.",
    stack: ["Next.js", "Firebase", "Stripe"],
    gradient: "from-orange-600/15 via-amber-600/10 to-transparent",
    border: "border-orange-500/25",
    glow: "shadow-orange-500/15",
    demo: "#",
    github: "https://github.com/fira29",
    color: "orange",
  },
  {
    id: 3,
    featured: false,
    title: "AI Study Assistant",
    tagline: "Intelligent Academic Companion",
    description:
      "An intelligent academic companion that summarizes notes, generates quizzes, and answers student questions using OpenAI's API.",
    details:
      "Students upload their notes and the AI generates summaries, creates practice quizzes, and answers questions in context. Supports multiple file formats and has a conversation-style interface for natural learning.",
    stack: ["Python", "OpenAI API", "React"],
    gradient: "from-cyan-600/15 via-blue-600/10 to-transparent",
    border: "border-cyan-500/25",
    glow: "shadow-cyan-500/15",
    demo: "#",
    github: "https://github.com/fira29",
    color: "cyan",
  },
  {
    id: 4,
    featured: false,
    title: "Portfolio Website",
    tagline: "This Very Website",
    description:
      "Responsive personal portfolio focused on storytelling, interaction, and performance. Cinematic loading, smooth animations, glassmorphism design.",
    details:
      "Built from scratch with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion. Features a custom loading sequence, particle background, magnetic buttons, tilt cards, and a contact form with validation.",
    stack: ["React", "Framer Motion", "Tailwind CSS"],
    gradient: "from-emerald-600/15 via-green-600/10 to-transparent",
    border: "border-emerald-500/25",
    glow: "shadow-emerald-500/15",
    demo: "#",
    github: "https://github.com/fira29",
    color: "emerald",
  },
];

const colorAccent: Record<string, string> = {
  violet: "text-violet-400",
  orange: "text-orange-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
};

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(null);

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="What I've Built"
          description="A selection of projects I'm proud of — each one a story of a problem solved."
          inView={inView}
        />

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 mb-10"
        >
          <TiltCard className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${featured.gradient} border ${featured.border} shadow-2xl ${featured.glow} p-8 sm:p-12`}>
            {/* Featured badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-700/20 border border-red-500/40 text-red-300 text-xs font-semibold">
                <Star size={12} className="fill-current" />
                Featured Build
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-violet-400/80 text-sm font-mono mb-3">{featured.tagline}</p>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{featured.title}</h3>
                <p className="text-white/55 text-base leading-relaxed mb-6">{featured.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg glass border border-white/15 text-white/60 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={featured.demo}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-white/15 text-white/70 hover:text-white text-sm font-semibold transition-colors"
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Project preview placeholder */}
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-white/10 overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">📋</span>
                    </div>
                    <p className="text-white/30 text-xs">Smart Task Manager</p>
                  </div>
                  {/* Fake UI elements */}
                  <div className="absolute inset-0 flex flex-col p-4 opacity-20">
                    <div className="h-2 w-1/3 bg-violet-400 rounded mb-2" />
                    <div className="flex gap-2 flex-1">
                      <div className="flex-1 bg-white/10 rounded" />
                      <div className="w-1/3 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              <TiltCard
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} border ${project.border} p-6 h-full flex flex-col`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className={`text-xs font-mono mb-1 ${colorAccent[project.color]}`}>
                      {project.tagline}
                    </p>
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                {/* Expandable details */}
                <AnimatePresence>
                  {expanded === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-4"
                    >
                      <p className="text-white/40 text-xs leading-relaxed border-t border-white/8 pt-4">
                        {project.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md glass border border-white/10 text-white/50 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <a
                      href={project.demo}
                      className={`flex items-center gap-1.5 text-xs font-medium ${colorAccent[project.color]} hover:opacity-80 transition-opacity`}
                    >
                      <ExternalLink size={12} />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Github size={12} />
                      Code
                    </a>
                  </div>

                  <button
                    onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                    className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                  >
                    {expanded === project.id ? (
                      <>Less <ChevronUp size={12} /></>
                    ) : (
                      <>More <ChevronDown size={12} /></>
                    )}
                  </button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
