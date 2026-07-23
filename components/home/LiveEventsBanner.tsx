"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Radio } from "lucide-react";

interface Event {
  id: string;
  title: string;
  slug: string;
  status: string;
  scheduledAt: Date;
  city: string | null;
}

export default function LiveEventsBanner({ events }: { events: Event[] }) {
  if (events.length === 0) return null;

  return (
    <div
      className="border-y overflow-hidden"
      style={{
        background: "#0D0F12",
        borderColor: "#1C1E23",
      }}
    >
      <div className="flex items-center">
        {/* Static label */}
        <div
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 z-10"
          style={{ background: "#BC1F38" }}
        >
          <Radio size={14} className="text-white animate-pulse-live" />
          <span className="text-white font-mono text-xs font-bold tracking-widest uppercase">
            Live
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="overflow-hidden flex-1">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap"
          >
            {[...events, ...events].map((event, i) => (
              <Link
                key={i}
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-3 px-8 py-3 text-sm transition-colors"
                style={{ color: "#D4D6DA" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#E8C35A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#D4D6DA";
                }}
              >
                {event.status === "LIVE" && (
                  <span className="live-dot flex-shrink-0" />
                )}
                <span className="font-medium">{event.title}</span>
                {event.city && (
                  <span className="text-platinum-400 text-xs">— {event.city}</span>
                )}
                <span className="text-platinum-600 font-mono text-xs">
                  {new Date(event.scheduledAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span className="text-obsidian-600 mx-2">◆</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
