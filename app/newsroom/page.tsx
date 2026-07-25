'use client';

import { useState, useEffect } from 'react';
import { Share2, Bookmark, Volume2 } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  BUSINESS: 'Business', TECHNOLOGY: 'Technology', HEALTHCARE: 'Healthcare',
  FINANCE: 'Finance', REAL_ESTATE: 'Real Estate', EDUCATION: 'Education',
  SPORTS: 'Sports', ENTERTAINMENT: 'Entertainment', POLITICS: 'Politics', AGRICULTURE: 'Agriculture',
};

const CATEGORY_COLORS: Record<string, string> = {
  BUSINESS: '#D4A832', TECHNOLOGY: '#3B82F6', HEALTHCARE: '#22C55E',
  FINANCE: '#F59E0B', REAL_ESTATE: '#8B5CF6', EDUCATION: '#06B6D4',
  SPORTS: '#EF4444', ENTERTAINMENT: '#EC4899', POLITICS: '#9CA3AF', AGRICULTURE: '#84CC16',
};

function timeAgo(date: string | null): string {
  if (!date) return '';
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return diff + 's ago';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  return Math.floor(diff / 86400) + 'd ago';
}

export default function NewsroomPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setLoading(true);
    fetch('/api/newsroom' + (category ? '?category=' + category : ''))
      .then((r) => r.json())
      .then((d) => { setArticles(d.articles || []); setLoading(false); });
  }, [category]);

  function handleShare(article: any) {
    if (navigator.share) {
      navigator.share({ title: article.title, text: article.summary, url: window.location.origin + '/newsroom/' + article.slug });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/newsroom/' + article.slug);
      alert('Link copied!');
    }
  }

  const categories = ['', ...Object.keys(CATEGORY_LABELS)];

  return (
    <main style={{ minHeight: '100vh', background: '#111827', paddingTop: '56px' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: '56px', zIndex: 50, background: '#111827', borderBottom: '1px solid #1F2937' }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 style={{ color: '#F9FAFB', fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: 'Georgia, serif' }}>
            Newsroom
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
            <span style={{ color: '#9CA3AF', fontSize: '12px', fontFamily: 'monospace' }}>LIVE</span>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderTop: '1px solid #1F2937' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ flexShrink: 0, padding: '10px 16px', fontSize: '13px', fontWeight: '600', background: 'transparent', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', color: category === cat ? (cat ? CATEGORY_COLORS[cat] : '#D4A832') : '#6B7280', borderBottom: category === cat ? '2px solid ' + (cat ? CATEGORY_COLORS[cat] : '#D4A832') : '2px solid transparent' }}>
              {cat ? CATEGORY_LABELS[cat] : 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 0 80px' }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ padding: '16px', borderBottom: '1px solid #1F2937', display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: '12px', background: '#1F2937', borderRadius: '4px', marginBottom: '8px', width: '60%' }} />
                <div style={{ height: '16px', background: '#1F2937', borderRadius: '4px', marginBottom: '6px' }} />
                <div style={{ height: '16px', background: '#1F2937', borderRadius: '4px', width: '80%' }} />
              </div>
              <div style={{ width: '90px', height: '90px', background: '#1F2937', borderRadius: '8px', flexShrink: 0 }} />
            </div>
          ))
        ) : articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>No news published yet.</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} style={{ borderBottom: '1px solid #1F2937', background: '#111827' }}>
              <a href={'/newsroom/' + article.slug} style={{ display: 'flex', gap: '12px', padding: '16px', textDecoration: 'none' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: CATEGORY_COLORS[article.category] || '#D4A832', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {CATEGORY_LABELS[article.category] || article.category}
                    </span>
                    {article.featured && (
                      <span style={{ fontSize: '10px', fontWeight: '600', color: '#EF4444', background: 'rgba(239,68,68,0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                        Featured
                      </span>
                    )}
                    <span style={{ color: '#4B5563', fontSize: '11px', fontFamily: 'monospace', marginLeft: 'auto' }}>
                      {article.readTime && article.readTime + ' MIN READ'}
                    </span>
                  </div>

                  <h2 style={{ color: '#F9FAFB', fontSize: '16px', fontWeight: '700', margin: '0 0 6px', lineHeight: 1.4, fontFamily: 'Georgia, serif' }}>
                    {article.title}
                  </h2>

                  {article.summary && (
                    <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0, lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as any }}>
                      {article.summary}
                    </p>
                  )}
                </div>

                {article.coverImage && (
                  <div style={{ flexShrink: 0, width: '96px', height: '96px', borderRadius: '10px', overflow: 'hidden', background: '#1F2937' }}>
                    <img src={article.coverImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </a>

              {/* Action bar */}
              <div style={{ display: 'flex', alignItems: 'center', padding: '4px 16px 12px', borderTop: '1px solid #1F2937' }}>
                <button onClick={() => alert('Coming soon')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', fontSize: '13px', fontWeight: '500', padding: '6px 0' }}>
                  <Volume2 size={15} />
                  Listen
                </button>
                <button onClick={() => setSaved((p) => ({ ...p, [article.id]: !p[article.id] }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved[article.id] ? '#D4A832' : '#6B7280', padding: '6px 16px', marginLeft: 'auto' }}>
                  <Bookmark size={16} fill={saved[article.id] ? '#D4A832' : 'none'} />
                </button>
                <button onClick={() => handleShare(article)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#D4A832', fontSize: '13px', fontWeight: '600', padding: '6px 0' }}>
                  <Share2 size={15} />
                  Share
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
