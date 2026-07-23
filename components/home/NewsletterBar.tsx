"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      className="py-16 px-4 border-t"
      style={{
        background: "#0D0F12",
        borderColor: "#1C1E23",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-3">
          Stay in the Loop
        </p>
        <h3
          className="text-2xl md:text-3xl text-platinum-50 mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Weekly Success Brief
        </h3>
        <p className="text-platinum-400 text-sm mb-8">
          Curated stories, upcoming events, and exclusive interviews — every Thursday.
        </p>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-gold-400"
            >
              <CheckCircle size={20} />
              <span className="font-medium">You're in. Watch your inbox.</span>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 text-sm rounded-full outline-none transition-colors"
                style={{
                  background: "#1C1E23",
                  border: "1px solid #252830",
                  color: "#EDEEF0",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,168,50,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#252830";
                }}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 font-semibold px-5 py-3 rounded-full transition-colors text-sm disabled:opacity-50"
                style={{ background: "#D4A832", color: "#08090B" }}
              >
                <Send size={15} />
                {status === "loading" ? "..." : "Subscribe"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {status === "error" && (
          <p className="text-crimson-500 text-xs mt-2">
            Something went wrong. Try again.
          </p>
        )}
      </div>
    </section>
  );
}
