"use client";

import Link from 'next/link';
import { Play, Eye, Share2 } from 'lucide-react';

function formatViews(count: number): string {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
  if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
  return count + '';
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
  function handleShare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const url = window.location.origin + '/shows/' + interview.slug;
    if (navigator.share) {
      navigator.share({ title: interview.title, text: interview.guest.fullName + ' on BTV LIVE', url });
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  }

  return (
    <Link href={'/shows/' + interview.slug} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        
        {/* Square thumbnail */}
        <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', background: '#1C1E23', overflow: 'hidden' }}>
          {interview.thumbnailUrl ? (
            <img
              src={interview.thumbnailUrl}
              alt={interview.title}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Play size={24} color='#8C6510' />
            </div>
          )}
          
          {/* Dark overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,11,0.8) 0%, transparent 50%)' }} />

          {/* Play button */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212,168,50,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={14} fill='#08090B' color='#08090B' style={{ marginLeft: '2px' }} />
          </div>

          {/* Category badge */}
          <div style={{ position: 'absolute', top: '6px', left: '6px' }}>
            <span style={{ background: '#D4A832', color: '#08090B', fontSize: '9px', fontWeight: '700', padding: '2px 6px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {interview.category.name}
            </span>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            style={{ position: 'absolute', top: '6px', right: '6px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(8,9,11,0.7)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}
          >
            <Share2 size={11} />
          </button>

          {/* Duration */}
          {interview.duration && (
            <div style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(8,9,11,0.8)', borderRadius: '4px', padding: '1px 5px' }}>
              <span style={{ color: '#EDEEF0', fontFamily: 'monospace', fontSize: '10px' }}>
                {Math.floor(interview.duration / 60)}m
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '8px 10px 10px' }}>
          <h3 style={{ color: '#EDEEF0', fontSize: '12px', fontWeight: '600', margin: '0 0 4px', lineHeight: 1.3, fontFamily: 'Georgia, serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
            {interview.title}
          </h3>
          <p style={{ color: '#7A7D85', fontSize: '11px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {interview.guest.fullName}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#5C6070', fontSize: '10px', fontFamily: 'monospace' }}>
              <Eye size={9} />
              {formatViews(interview.viewCount)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function InterviewCardSkeleton() {
  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', background: '#1C1E23' }} />
      <div style={{ padding: '8px 10px' }}>
        <div style={{ height: '11px', background: '#1C1E23', borderRadius: '3px', marginBottom: '4px', width: '90%' }} />
        <div style={{ height: '10px', background: '#1C1E23', borderRadius: '3px', width: '60%' }} />
      </div>
    </div>
  );
}
