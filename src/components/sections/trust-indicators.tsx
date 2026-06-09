"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const stats = [
  { value: 10, suffix: "+", label: "Projects Built", description: "From concept to deployment" },
  { value: 3, suffix: "+", label: "Years Learning & Building", description: "Every single day" },
  { value: 1000, suffix: "+", label: "Hours of Coding", description: "And counting" },
  { value: "∞", suffix: "", label: "Curiosity to Learn", description: "Limitless growth mindset" },
];

export default function TrustIndicators() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="trust" className="relative py-16 sm:py-20">
      {/* Divider line */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative p-6 sm:p-8 rounded-2xl glass border border-white/8 hover:border-violet-500/30 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/10">
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300" />

                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent mb-2 leading-none">
                    {typeof stat.value === "number" ? (
                      inView ? (
                        <>
                          <CountUp
                            end={stat.value}
                            duration={2}
                            delay={i * 0.1}
                          />
                          {stat.suffix}
                        </>
                      ) : (
                        <>0{stat.suffix}</>
                      )
                    ) : (
                      <>
                        {stat.value}
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-white/80 font-semibold text-sm sm:text-base mb-1">
                    {stat.label}
                  </div>
                  <div className="text-white/35 text-xs">{stat.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
