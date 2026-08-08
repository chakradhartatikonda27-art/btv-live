'use client';

import { useRef } from 'react';
import InterviewCard from '@/components/interviews/InterviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedStories({ stories }: { stories: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 'left' | 'right') {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' });
    }
  }

  if (stories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 0' }}>
        <p style={{ color: 'var(--text-muted)' }}>No interviews published yet.</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Left arrow */}
      <button
        onClick={() => scroll('left')}
        className='btv-arrow' style={{ position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(20,22,25,0.95)', border: '1px solid var(--border-color)', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px', scrollSnapType: 'x mandatory' }}
      >
        <style>{`
          .story-scroll::-webkit-scrollbar { display: none; }
          .story-card { flex-shrink: 0; width: 160px; scroll-snap-align: start; }
          @media (min-width: 640px) { .story-card { width: 200px; } }
          @media (min-width: 1024px) { .story-card { width: 240px; } }
          .btv-arrow { display: none; }
          @media (min-width: 768px) { .btv-arrow { display: flex; } }
        `}</style>
        {stories.map((story) => (
          <div key={story.id} className='story-card'>
            <InterviewCard interview={story} />
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll('right')}
        className='btv-arrow' style={{ position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,168,50,0.9)', border: '1px solid #D4A832', cursor: 'pointer', alignItems: 'center', justifyContent: 'center', color: '#08090B', boxShadow: '0 4px 12px rgba(0,0,0,0.4)' }}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
