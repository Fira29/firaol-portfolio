"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Rocket, Zap, Globe } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";
import SectionHeading from "@/components/ui/section-heading";

const cards = [
  {
    icon: Brain,
    title: "How I Think",
    description:
      "I approach every problem systematically—breaking it down, understanding the root cause, and crafting solutions that are elegant, scalable, and maintainable. Logic meets intuition.",
    color: "from-violet-500/20 to-indigo-500/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Rocket,
    title: "Why I Build",
    description:
      "I build because code is my way of creating impact. Every project is a chance to solve a real problem, serve real people, and leave something meaningful behind.",
    color: "from-indigo-500/20 to-blue-500/10",
    border: "border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: Zap,
    title: "What Drives Me",
    description:
      "The pursuit of mastery. Whether it's a new framework, a complex algorithm, or a design challenge—I stay curious, stay hungry, and stay consistent. Every day is a chance to level up.",
    color: "from-cyan-500/20 to-teal-500/10",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Globe,
    title: "Future Vision",
    description:
      "To work on products that touch millions of lives. I want to be at the intersection of great engineering, thoughtful design, and genuine purpose—building software that makes the world work better.",
    color: "from-emerald-500/20 to-green-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="About Me"
          title="The Person Behind the Code"
          description="Not just a developer — a curious human building things that matter."
          inView={inView}
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-16">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="space-y-5 text-white/60 text-base sm:text-lg leading-relaxed">
              <p>
                I discovered that programming wasn&apos;t just about writing code—it was about{" "}
                <span className="text-white font-medium">creating possibilities</span>.
              </p>
              <p>
                Whether it&apos;s building web applications, exploring artificial intelligence, or refining user
                experiences, I enjoy solving problems that{" "}
                <span className="text-violet-400 font-medium">challenge me to grow</span>.
              </p>
              <p>
                I thrive in collaborative environments, adapt quickly, and constantly seek opportunities to improve.
                Technology moves fast, and I intend to move with it.{" "}
                <span className="text-white/80 font-medium">One thoughtful project at a time.</span>
              </p>

              {/* Highlighted quote */}
              <div className="relative pl-6 py-4 mt-8">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-red-600 to-transparent" />
                <p className="text-white/80 text-lg italic font-light leading-relaxed">
                  &ldquo;The best software isn&apos;t the most complex — it&apos;s the most thoughtful.&rdquo;
                </p>
              </div>
            </div>

            {/* Personal stats */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { label: "Based in", value: "Hawassa, Ethiopia" },
                { label: "Currently", value: "CS @ Infolink UC" },
                { label: "Specializing in", value: "Full Stack Dev" },
                { label: "Open to", value: "Internships & Freelance" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-4 rounded-xl glass border border-white/8"
                >
                  <p className="text-white/35 text-xs mb-1 uppercase tracking-wider">{item.label}</p>
                  <p className="text-white/85 text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} h-full`}>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${card.iconColor}`}>
                    <card.icon size={20} />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{card.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
