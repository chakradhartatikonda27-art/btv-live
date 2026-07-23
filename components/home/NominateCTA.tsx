"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mic } from "lucide-react";

export default function NominateCTA() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #080C18 0%, #0D0F12 50%, #08090B 100%)",
        }}
      />

      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(212,168,50,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(224,48,79,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border"
            style={{
              background: "rgba(212,168,50,0.05)",
              borderColor: "rgba(212,168,50,0.3)",
            }}
          >
            <Mic size={13} className="text-gold-500" />
            <span className="text-gold-400 font-mono text-xs tracking-widest uppercase">
              Share Your Story
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-6xl text-white mb-6"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 1.1,
            }}
          >
            Is Your Journey Worth
            <br />
            <span className="text-gold-gradient">Telling the World?</span>
          </h2>

          <p className="text-platinum-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            BTV LIVE features the visionaries, disruptors, and changemakers
            shaping India's future. Nominate yourself or someone whose story
            deserves a global stage.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/apply"
                className="inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-full transition-colors shadow-gold text-base"
                style={{ background: "#D4A832", color: "#08090B" }}
              >
                Nominate a Leader
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/apply#self"
                className="inline-flex items-center gap-2 font-medium px-8 py-4 rounded-full transition-all text-base"
                style={{
                  color: "#D4D6DA",
                  border: "1px solid #252830",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,168,50,0.4)";
                  e.currentTarget.style.color = "#E8C35A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#252830";
                  e.currentTarget.style.color = "#D4D6DA";
                }}
              >
                Apply to Be Featured
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
