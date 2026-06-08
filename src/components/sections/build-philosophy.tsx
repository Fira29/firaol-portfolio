"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Heart, Target, RefreshCw } from "lucide-react";
import TiltCard from "@/components/ui/tilt-card";
import SectionHeading from "@/components/ui/section-heading";

const principles = [
  {
    number: "01",
    icon: Search,
    title: "Think Before Coding",
    subtitle: "Understand the problem deeply.",
    description:
      "I spend significant time understanding the problem before writing a single line of code. The best solution often isn't the first one you think of. Clarity first, code second.",
    color: "violet",
    gradient: "from-violet-500/15 to-transparent",
    border: "border-violet-500/20",
  },
  {
    number: "02",
    icon: Heart,
    title: "Design With Empathy",
    subtitle: "Create experiences people enjoy.",
    description:
      "Technology serves humans. Every UI decision, every API response, every error message should be crafted with the end user in mind. Empathy is the best engineering tool.",
    color: "pink",
    gradient: "from-pink-500/15 to-transparent",
    border: "border-pink-500/20",
  },
  {
    number: "03",
    icon: Target,
    title: "Build With Purpose",
    subtitle: "Focus on meaningful outcomes.",
    description:
      "I don't build features for the sake of building. Every function, every component, every line of code should serve a clear purpose and contribute to a meaningful outcome.",
    color: "cyan",
    gradient: "from-cyan-500/15 to-transparent",
    border: "border-cyan-500/20",
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Never Stop Learning",
    subtitle: "Improve continuously.",
    description:
      "The best developers are perpetual students. I embrace new tools, revisit fundamentals, learn from failures, and stay curious. Mastery is a direction, not a destination.",
    color: "emerald",
    gradient: "from-emerald-500/15 to-transparent",
    border: "border-emerald-500/20",
  },
];

const iconColors: Record<string, string> = {
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/30",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/30",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
};

const numberColors: Record<string, string> = {
  violet: "text-violet-500/30",
  pink: "text-pink-500/30",
  cyan: "text-cyan-500/30",
  emerald: "text-emerald-500/30",
};

export default function BuildPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="philosophy" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Build Philosophy"
          title="How I Approach Building"
          description="The principles that guide every project, every decision, every line of code."
          inView={inView}
        />

        <div className="grid sm:grid-cols-2 gap-6 mt-16">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient} border ${p.border} p-7 h-full`}
              >
                {/* Big number background */}
                <div
                  className={`absolute top-4 right-6 text-7xl font-black ${numberColors[p.color]} select-none pointer-events-none leading-none`}
                >
                  {p.number}
                </div>

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${iconColors[p.color]}`}
                  >
                    <p.icon size={22} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{p.title}</h3>
                  <p className={`text-sm font-medium mb-3 ${iconColors[p.color].split(" ")[0]}`}>
                    {p.subtitle}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">{p.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
