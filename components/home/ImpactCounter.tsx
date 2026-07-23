"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const DEFAULT_STATS = [
  { key: "stories_featured", label: "Stories Featured", suffix: "+" },
  { key: "total_viewers", label: "Million+ Viewers", suffix: "M+" },
  { key: "award_ceremonies", label: "Award Ceremonies", suffix: "+" },
  { key: "industries_covered", label: "Industries Covered", suffix: "+" },
];

function useCountUp(target: number, duration: number, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, inView]);

  return count;
}

const STAT_VALUES: Record<string, number> = {
  stories_featured: 500,
  total_viewers: 1,
  award_ceremonies: 50,
  industries_covered: 12,
};

function StatItem({
  label,
  suffix,
  target,
  inView,
  delay,
  isLast,
}: {
  label: string;
  suffix: string;
  target: number;
  inView: boolean;
  delay: number;
  isLast: boolean;
}) {
  const count = useCountUp(target, 2000, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center relative group px-6"
    >
      {!isLast && (
        <div
          className="hidden md:block absolute right-0 top-4 bottom-4 w-[1px]"
          style={{ background: "#252830" }}
        />
      )}
      <div
        className="text-5xl md:text-6xl font-bold mb-2 tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: "#E8C35A",
        }}
      >
        {count}
        <span style={{ color: "#8C6510" }}>{suffix}</span>
      </div>
      <p className="text-platinum-400 text-sm font-medium">{label}</p>
      <div
        className="w-8 h-[2px] mx-auto mt-3 transition-colors group-hover:bg-gold-500"
        style={{ background: "#8C6510" }}
      />
    </motion.div>
  );
}

export default function ImpactCounter({
  stats,
}: {
  stats: Record<string, number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="py-20 px-4 border-y relative overflow-hidden"
      style={{
        background: "#0D0F12",
        borderColor: "#1C1E23",
      }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          background: "linear-gradient(135deg, #D4A832 0%, #F5D98A 50%, #B8891A 100%)",
        }}
      />

      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="text-center mb-14">
          <p className="text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-3">
            The BTV LIVE Impact
          </p>
          <h2
            className="text-4xl md:text-5xl text-platinum-50"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Numbers Don't Lie.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0" ref={ref}>
          {DEFAULT_STATS.map((stat, i) => {
            const target = stats[stat.key] ?? STAT_VALUES[stat.key] ?? 0;
            return (
              <StatItem
                key={stat.key}
                label={stat.label}
                suffix={stat.suffix}
                target={target}
                inView={inView}
                delay={i * 0.1}
                isLast={i === DEFAULT_STATS.length - 1}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
