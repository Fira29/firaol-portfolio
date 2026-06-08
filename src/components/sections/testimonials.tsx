"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";

const testimonials = [
  {
    id: 1,
    quote:
      "Firaol is a talented and dedicated developer with excellent problem-solving abilities. He approaches every challenge methodically and delivers clean, maintainable code. A pleasure to work with.",
    name: "Daniel Getachew",
    role: "Software Engineer",
    avatar: "DG",
    color: "violet",
  },
  {
    id: 2,
    quote:
      "Very creative and a fast learner. Great communication and teamwork skills. Firaol has a unique ability to blend technical precision with strong design sensibility — rare in developers.",
    name: "Misgana Hailu",
    role: "UI/UX Designer",
    avatar: "MH",
    color: "cyan",
  },
  {
    id: 3,
    quote:
      "Working with Firaol was a seamless experience. He understood the requirements quickly, asked the right questions, and delivered exactly what we needed — on time and beyond expectations.",
    name: "Yonas Bekele",
    role: "Startup Founder",
    avatar: "YB",
    color: "indigo",
  },
];

const colorMap: Record<string, { border: string; quote: string; avatar: string }> = {
  violet: {
    border: "border-violet-500/30",
    quote: "text-violet-400",
    avatar: "from-violet-600 to-indigo-600",
  },
  cyan: {
    border: "border-cyan-500/30",
    quote: "text-cyan-400",
    avatar: "from-cyan-600 to-blue-600",
  },
  indigo: {
    border: "border-indigo-500/30",
    quote: "text-indigo-400",
    avatar: "from-indigo-600 to-violet-600",
  },
};

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[current];
  const c = colorMap[t.color];

  return (
    <section id="testimonials" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What People Say"
          description="Words from people I've had the pleasure of working with."
          inView={inView}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 relative"
        >
          {/* Card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`glass border ${c.border} rounded-3xl p-8 sm:p-12 relative overflow-hidden`}
            >
              {/* Quote icon */}
              <div className={`absolute top-8 right-8 ${c.quote} opacity-20`}>
                <Quote size={60} />
              </div>

              <div className="relative z-10">
                <p className="text-white/75 text-lg sm:text-xl leading-relaxed mb-8 font-light italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.avatar} flex items-center justify-center text-white font-bold text-sm`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.name}</p>
                    <p className="text-white/40 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-violet-400 w-8" : "bg-white/20 w-4 hover:bg-white/40"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
