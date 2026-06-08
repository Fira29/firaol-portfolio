"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Mail, Send, Github, Linkedin, CheckCircle2, Loader2 } from "lucide-react";
import SectionHeading from "@/components/ui/section-heading";
import MagneticButton from "@/components/ui/magnetic-button";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactDetails = [
  {
    icon: MapPin,
    label: "Location",
    value: "Hawassa, Ethiopia",
    href: null,
  },
  {
    icon: Mail,
    label: "Email",
    value: "olfiragebi@gmail.com",
    href: "mailto:olfiragebi@gmail.com",
  },
  {
    icon: Send,
    label: "Telegram",
    value: "@olfira29",
    href: "https://t.me/olfira29",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "firaol-gebi",
    href: "https://linkedin.com/in/firaol-gebi",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "fira29",
    href: "https://github.com/fira29",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1500));
    console.log("Form data:", data);
    setSubmitting(false);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-32">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Build Something Great Together"
          description="Whether you have an opportunity, an idea, or simply want to connect — I'd love to hear from you."
          inView={inView}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-16">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border border-emerald-500/30"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="text-emerald-400" size={32} />
                  </motion.div>
                  <h3 className="text-white font-bold text-2xl mb-3">Message Sent!</h3>
                  <p className="text-white/50 text-base">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Your Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Firaol Gebi"
                      className={`w-full px-4 py-3.5 rounded-xl glass border text-white placeholder:text-white/25 bg-transparent focus:outline-none focus:ring-1 transition-all text-sm ${
                        errors.name
                          ? "border-red-500/60 focus:ring-red-500/40"
                          : "border-white/10 focus:ring-red-600/40 focus:border-red-600/40"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Email Address
                    </label>
                    <input
                      {...register("email")}
                      placeholder="you@example.com"
                      type="email"
                      className={`w-full px-4 py-3.5 rounded-xl glass border text-white placeholder:text-white/25 bg-transparent focus:outline-none focus:ring-1 transition-all text-sm ${
                        errors.email
                          ? "border-red-500/60 focus:ring-red-500/40"
                          : "border-white/10 focus:ring-red-600/40 focus:border-red-600/40"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className={`w-full px-4 py-3.5 rounded-xl glass border text-white placeholder:text-white/25 bg-transparent focus:outline-none focus:ring-1 transition-all text-sm resize-none ${
                        errors.message
                          ? "border-red-500/60 focus:ring-red-500/40"
                          : "border-white/10 focus:ring-red-600/40 focus:border-red-600/40"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs mt-1.5">{errors.message.message}</p>
                    )}
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-red-700 hover:bg-red-600 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-700/25"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            <div className="glass border border-white/8 rounded-2xl p-6 mb-6">
              <h3 className="text-white font-semibold text-lg mb-2">
                Open to Opportunities
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                I&apos;m actively looking for internships, freelance projects, and collaborative opportunities.
                If you have something interesting in mind, let&apos;s talk.
              </p>
            </div>

            {contactDetails.map((detail, i) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={detail.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 glass border border-white/8 rounded-xl hover:border-red-600/30 hover:bg-red-700/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-700/10 border border-red-600/20 flex items-center justify-center text-red-400 group-hover:bg-red-700/20 transition-colors">
                      <detail.icon size={16} />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-wider mb-0.5">
                        {detail.label}
                      </p>
                      <p className="text-white/80 text-sm font-medium">{detail.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 glass border border-white/8 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-red-700/10 border border-red-600/20 flex items-center justify-center text-red-400">
                      <detail.icon size={16} />
                    </div>
                    <div>
                      <p className="text-white/35 text-xs uppercase tracking-wider mb-0.5">
                        {detail.label}
                      </p>
                      <p className="text-white/80 text-sm font-medium">{detail.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Map placeholder */}
            <div className="mt-4 rounded-2xl overflow-hidden glass border border-white/8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-red-500 mx-auto mb-2" size={24} />
                <p className="text-white/40 text-sm">Hawassa, Ethiopia</p>
                <p className="text-white/25 text-xs mt-1">7°03&apos;N, 38°28&apos;E</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
