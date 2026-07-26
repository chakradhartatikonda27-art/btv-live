'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminInterviewsPage() {
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/interviews').then(r => r.json()).then(d => {
      setInterviews(d.interviews || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm('Delete "' + title + '"?')) return;
    await fetch('/api/admin/interviews/' + id, { method: 'DELETE' });
    setInterviews(prev => prev.filter(i => i.id !== id));
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    await fetch('/api/admin/interviews/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, publishedAt: newStatus === 'PUBLISHED' ? new Date().toISOString() : null }),
    });
    setInterviews(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Content</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Interviews</h1>
        </div>
        <Link href='/admin/interviews/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Interview
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{interviews.length} total interviews</p>
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>Loading...</p>
          </div>
        ) : interviews.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No interviews yet.</p>
            <Link href='/admin/interviews/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add your first interview</Link>
          </div>
        ) : (
          <div>
            {interviews.map((interview, i) => (
              <div key={interview.id} style={{ padding: '16px 24px', borderBottom: i < interviews.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {interview.thumbnailUrl && (
                  <img src={interview.thumbnailUrl} alt={interview.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{interview.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{interview.guest?.fullName}</p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{interview.category?.name}</p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{interview.viewCount} views</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button
                    onClick={() => toggleStatus(interview.id, interview.status)}
                    style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent',
                      color: interview.status === 'PUBLISHED' ? '#22c55e' : '#D4A832' }}
                  >
                    {interview.status}
                  </button>
                  <Link href={'/admin/interviews/' + interview.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <a href={'/shows/' + interview.slug} target='_blank' style={{ color: '#7A7D85', fontSize: '12px', textDecoration: 'none' }}>View</a>
                  <button onClick={() => handleDelete(interview.id, interview.title)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
