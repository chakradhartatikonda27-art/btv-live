"use client";

import { motion } from "framer-motion";
import InterviewCard from "@/components/interviews/InterviewCard";

interface Story {
  id: string;
  title: string;
  slug: string;
  thumbnailUrl: string | null;
  duration: number | null;
  viewCount: number;
  tags: { id: string; name: string }[];
  guest: { fullName: string; headline: string | null };
  category: { name: string };
}

export default function FeaturedStories({ stories }: { stories: Story[] }) {
  if (stories.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-platinum-400">No interviews published yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stories.map((story, i) => (
        <motion.div
          key={story.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
        >
          <InterviewCard interview={story} />
        </motion.div>
      ))}
    </div>
  );
}
