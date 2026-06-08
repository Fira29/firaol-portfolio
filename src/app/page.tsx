"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
import Navbar from "@/components/navbar";
import SmoothScroll from "@/components/providers/smooth-scroll";
import Hero from "@/components/sections/hero";
import TrustIndicators from "@/components/sections/trust-indicators";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import BuildPhilosophy from "@/components/sections/build-philosophy";
import Journey from "@/components/sections/journey";
import Achievements from "@/components/sections/achievements";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import ScrollProgress from "@/components/ui/scroll-progress";
import BackToTop from "@/components/ui/back-to-top";
import Background from "@/components/background";
import EasterEgg from "@/components/easter-egg";

// Dynamically import cursor to avoid SSR issues
const CustomCursor = dynamic(() => import("@/components/ui/custom-cursor"), {
  ssr: false,
});

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <SmoothScroll>
      <main className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden">
          {/* Ambient background */}
          <Background />

          {/* Scroll progress bar */}
          <ScrollProgress />

          {/* Custom cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navbar />

          {/* Sections */}
          <Hero />
          <TrustIndicators />
          <About />
          <Skills />
          <Projects />
          <BuildPhilosophy />
          <Journey />
          <Achievements />
          <Testimonials />
          <Contact />
          <Footer />

          {/* Utilities */}
          <BackToTop />
          <EasterEgg />
        </main>
        </SmoothScroll>
      )}
    </>
  );
}
