"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown, Award } from "lucide-react";
import { useState, useEffect } from "react";

const HERO_SLIDES = [
  {
    id: 1,
    youtubeVideoId: "dQw4w9WgXcQ",
    title: "From Zero to ₹500 Crore Empire",
    guest: "Rajiv Nair",
    designation: "Founder & Chairman, NairTech Industries",
    category: "Business Leaders",
    watchTime: "38 min",
    bg: "linear-gradient(135deg, #0D0F12 0%, #111A30 50%, #0D0F12 100%)",
  },
  {
    id: 2,
    youtubeVideoId: "dQw4w9WgXcQ",
    title: "Healing Thousands, Building a Healthcare Legacy",
    guest: "Dr. Priya Venkatesh",
    designation: "Director, Venkatesh Multispecialty Hospitals",
    category: "Doctors & Healthcare",
    watchTime: "44 min",
    bg: "linear-gradient(135deg, #08090B 0%, #0C1222 50%, #08090B 100%)",
  },
  {
    id: 3,
    youtubeVideoId: "dQw4w9WgXcQ",
    title: "The CA Who Built a ₹200 Crore Consulting Firm",
    guest: "Vikram Mehta",
    designation: "Managing Partner, Mehta & Associates",
    category: "CAs & Legal",
    watchTime: "52 min",
    bg: "linear-gradient(135deg, #0D0F12 0%, #1C1E23 50%, #0D0F12 100%)",
  },
];

interface HeroBannerProps {
  interview?: {
    id: string;
    title: string;
    slug: string;
    youtubeVideoId: string | null;
    duration: number | null;
    guest: { fullName: string; headline: string | null };
    category: { name: string };
  } | null;
}

export default function HeroBanner({ interview }: HeroBannerProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (videoOpen) return;
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, [videoOpen]);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section className="relative h-[90vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ background: current.bg }}
        />
      </AnimatePresence>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(212,168,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,50,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient z-10" />

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 60%, rgba(212,168,50,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pt-16 pb-24 px-6 md:px-16 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border"
              style={{
                background: "rgba(212,168,50,0.1)",
                borderColor: "rgba(212,168,50,0.3)",
              }}
            >
              <Award size={12} className="text-gold-400" />
              <span className="text-gold-400 text-xs tracking-widest uppercase font-mono">
                {current.category}
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="text-5xl md:text-7xl text-white mb-6 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.02em",
                textShadow: "0 2px 20px rgba(0,0,0,0.8)",
              }}
            >
              {current.title}
            </h1>

            {/* Guest info */}
            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center text-gold-500 font-bold text-sm"
                style={{
                  background: "rgba(212,168,50,0.1)",
                  borderColor: "rgba(212,168,50,0.4)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {current.guest.charAt(0)}
              </div>
              <div>
                <p className="text-platinum-50 font-semibold text-base leading-none mb-1">
                  {current.guest}
                </p>
                <p className="text-platinum-400 text-sm">{current.designation}</p>
              </div>
              <span className="ml-4 text-platinum-400 text-xs font-mono border-l border-obsidian-600 pl-4">
                {current.watchTime}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap">
              <motion.button
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 shadow-gold"
                style={{ background: "#D4A832", color: "#08090B" }}
              >
                <Play size={18} fill="currentColor" />
                Watch Now
              </motion.button>

              <motion.a
                href="/shows"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 font-medium transition-colors text-sm px-6 py-3.5 rounded-full"
                style={{
                  color: "#EDEEF0",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                Explore All Interviews
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className="h-[3px] rounded-full transition-all duration-500"
              style={{
                width: i === activeSlide ? "40px" : "20px",
                background: i === activeSlide ? "#D4A832" : "rgba(154,157,165,0.3)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tagline watermark */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <p
          className="text-sm tracking-wide italic"
          style={{
            color: "rgba(154,157,165,0.4)",
            fontFamily: "var(--font-display)",
          }}
        >
          "Where Success Goes Live... Legacy Lives Forever."
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ color: "rgba(154,157,165,0.4)" }}
      >
        <ChevronDown size={24} />
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(8,9,11,0.95)", backdropFilter: "blur(8px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl rounded-xl overflow-hidden shadow-gold-lg border"
              style={{
                aspectRatio: "16/9",
                borderColor: "rgba(212,168,50,0.2)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${current.youtubeVideoId}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
