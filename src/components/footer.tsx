"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Send, Heart } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/fira29", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/firaol-gebi", label: "LinkedIn" },
  { icon: Send, href: "https://t.me/olfira29", label: "Telegram" },
  { icon: Mail, href: "mailto:olfiragebi@gmail.com", label: "Email" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-white/6">
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-700/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold mb-3">
              <span className="gradient-text">FG</span>
              <span className="text-white/40 text-lg font-normal">.dev</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Designed and developed with curiosity, caffeine, and a passion for building meaningful experiences.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Navigation</p>
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-white/40 hover:text-white/80 text-sm transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Socials */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Connect</p>
            <div className="flex gap-3 flex-wrap">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-600/40 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © 2026 Firaol Gebi. All rights reserved.
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1.5">
            Built with <Heart size={11} className="text-red-500/70 fill-current" /> in Hawassa, Ethiopia
          </p>
        </div>
      </div>
    </footer>
  );
}
