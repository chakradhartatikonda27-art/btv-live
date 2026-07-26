'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminMorningDigestPage() {
  const [digests, setDigests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/morning-digest').then(r => r.json()).then(d => {
      setDigests(d.digests || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Delete this digest?')) return;
    await fetch('/api/admin/morning-digest/' + id, { method: 'DELETE' });
    setDigests(prev => prev.filter(d => d.id !== id));
  }

  async function togglePublished(id: string, current: boolean) {
    await fetch('/api/admin/morning-digest/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ published: !current }),
    });
    setDigests(prev => prev.map(d => d.id === id ? { ...d, published: !current } : d));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Content</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Morning Digest</h1>
        </div>
        <Link href='/admin/morning-digest/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Digest
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{digests.length} digests</p>
        </div>

        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : digests.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No digests yet.</p>
            <Link href='/admin/morning-digest/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Create today digest</Link>
          </div>
        ) : (
          <div>
            {digests.map((digest, i) => (
              <div key={digest.id} style={{ padding: '16px 24px', borderBottom: i < digests.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px' }}>{digest.title}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>
                      {new Date(digest.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{digest.bulletins.length} bulletins</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => togglePublished(digest.id, digest.published)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: digest.published ? '#22c55e' : '#D4A832' }}>
                    {digest.published ? 'Published' : 'Draft'}
                  </button>
                  <Link href={'/admin/morning-digest/' + digest.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <button onClick={() => handleDelete(digest.id)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
