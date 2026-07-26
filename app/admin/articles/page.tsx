'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CATEGORY_LABELS: Record<string, string> = {
  BUSINESS: 'Business', TECHNOLOGY: 'Technology', HEALTHCARE: 'Healthcare',
  FINANCE: 'Finance', REAL_ESTATE: 'Real Estate', EDUCATION: 'Education',
  SPORTS: 'Sports', ENTERTAINMENT: 'Entertainment', POLITICS: 'Politics', AGRICULTURE: 'Agriculture',
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/articles').then(r => r.json()).then(d => {
      setArticles(d.articles || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm('Delete "' + title + '"?')) return;
    await fetch('/api/admin/articles/' + id, { method: 'DELETE' });
    setArticles(prev => prev.filter(a => a.id !== id));
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    await fetch('/api/admin/articles/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : null }),
    });
    setArticles(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Newsroom</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Articles</h1>
        </div>
        <Link href='/admin/articles/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Article
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{articles.length} total articles</p>
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : articles.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No articles yet.</p>
            <Link href='/admin/articles/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Write your first article</Link>
          </div>
        ) : (
          <div>
            {articles.map((article, i) => (
              <div key={article.id} style={{ padding: '16px 24px', borderBottom: i < articles.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {article.coverImage && (
                  <img src={article.coverImage} alt={article.title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{CATEGORY_LABELS[article.category] || article.category}</p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{article.viewCount} views</p>
                    {article.readTime && <><span style={{ color: '#252830' }}>·</span><p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{article.readTime} min</p></>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleStatus(article.id, article.status)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: article.status === 'PUBLISHED' ? '#22c55e' : '#D4A832' }}>
                    {article.status}
                  </button>
                  <Link href={'/admin/articles/' + article.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <a href={'/newsroom/' + article.slug} target='_blank' style={{ color: '#7A7D85', fontSize: '12px', textDecoration: 'none' }}>View</a>
                  <button onClick={() => handleDelete(article.id, article.title)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
