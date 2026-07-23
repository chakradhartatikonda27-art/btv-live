"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Heart, Scale, Lightbulb, Star, Trophy, Home, GraduationCap } from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  BUSINESS_LEADERS: <Briefcase size={28} />,
  DOCTORS_HEALTHCARE: <Heart size={28} />,
  CAs_LEGAL: <Scale size={28} />,
  INNOVATORS_TECH: <Lightbulb size={28} />,
  CELEBRITIES: <Star size={28} />,
  SPORTS_EVENTS: <Trophy size={28} />,
  REAL_ESTATE: <Home size={28} />,
  EDUCATION: <GraduationCap size={28} />,
};

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { interviews: number };
}

export default function CategoryCarousel({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
        >
          <Link
            href={`/shows?category=${cat.slug}`}
            className="group flex flex-col items-center gap-3 p-5 rounded-xl text-center transition-all duration-300"
            style={{
              background: "#141619",
              border: "1px solid #252830",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,168,50,0.5)";
              e.currentTarget.style.background = "#1C1E23";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#252830";
              e.currentTarget.style.background = "#141619";
            }}
          >
            <div className="text-gold-500 group-hover:text-gold-300 transition-colors">
              {CATEGORY_ICONS[cat.slug] ?? <Briefcase size={28} />}
            </div>
            <div>
              <p className="text-platinum-100 text-sm font-medium leading-snug group-hover:text-white transition-colors">
                {cat.name}
              </p>
              <p className="text-platinum-400 text-xs mt-0.5 font-mono">
                {cat._count.interviews} stories
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
