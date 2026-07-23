"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, Eye, Clock } from "lucide-react";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  return `${m} min`;
}

function formatViews(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M views`;
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K views`;
  return `${count} views`;
}

interface InterviewCardProps {
  interview: {
    id: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    duration: number | null;
    viewCount: number;
    tags: { id: string; name: string }[];
    guest: { fullName: string; headline: string | null };
    category: { name: string };
  };
}

export default function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <Link href={`/shows/${interview.slug}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="rounded-xl overflow-hidden transition-all duration-300 shadow-card"
        style={{
          background: "#141619",
          border: "1px solid #252830",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,168,50,0.4)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,50,0.25)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "#252830";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.4)";
        }}
      >
        {/* Thumbnail */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/9", background: "#1C1E23" }}
        >
          {interview.thumbnailUrl ? (
            <img
              src={interview.thumbnailUrl}
              alt={interview.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play size={32} className="text-gold-600" />
            </div>
          )}

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-gold"
              style={{ background: "rgba(212,168,50,0.9)" }}
            >
              <Play size={22} fill="#08090B" className="text-obsidian-950 translate-x-0.5" />
            </div>
          </div>

          {/* Duration badge */}
          {interview.duration && (
            <div
              className="absolute bottom-2 right-2 rounded px-2 py-0.5 flex items-center gap-1"
              style={{ background: "rgba(8,9,11,0.85)" }}
            >
              <Clock size={10} className="text-platinum-400" />
              <span className="text-platinum-100 font-mono text-xs">
                {formatDuration(interview.duration)}
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span
              className="text-obsidian-950 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
              style={{ background: "#D4A832" }}
            >
              {interview.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="text-lg text-platinum-50 leading-snug mb-3 group-hover:text-white transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {interview.title}
          </h3>

          {/* Guest */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-gold-500 text-xs font-bold flex-shrink-0"
              style={{
                background: "rgba(212,168,50,0.1)",
                border: "1px solid rgba(212,168,50,0.3)",
                fontFamily: "var(--font-display)",
              }}
            >
              {interview.guest.fullName.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-platinum-100 text-xs font-medium truncate">
                {interview.guest.fullName}
              </p>
              {interview.guest.headline && (
                <p className="text-platinum-400 text-[11px] truncate">
                  {interview.guest.headline}
                </p>
              )}
            </div>
          </div>

          {/* Tags + views */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {interview.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag.id}
                  className="text-[10px] text-platinum-400 px-2 py-0.5 rounded"
                  style={{
                    background: "#1C1E23",
                    border: "1px solid #252830",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-platinum-400 text-xs font-mono">
              <Eye size={11} />
              {formatViews(interview.viewCount)}
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function InterviewCardSkeleton() {
  return (
    <div
      className="rounded-xl overflow-hidden animate-pulse"
      style={{ background: "#141619", border: "1px solid #252830" }}
    >
      <div style={{ aspectRatio: "16/9", background: "#1C1E23" }} />
      <div className="p-4 space-y-3">
        <div className="h-4 rounded w-3/4" style={{ background: "#1C1E23" }} />
        <div className="h-4 rounded w-1/2" style={{ background: "#1C1E23" }} />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full" style={{ background: "#1C1E23" }} />
          <div className="h-3 rounded w-32" style={{ background: "#1C1E23" }} />
        </div>
      </div>
    </div>
  );
}
