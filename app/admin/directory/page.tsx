'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDirectoryPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/directory').then(r => r.json()).then(d => {
      setBusinesses(d.businesses || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm('Delete "' + name + '"?')) return;
    await fetch('/api/admin/directory/' + id, { method: 'DELETE' });
    setBusinesses(prev => prev.filter(b => b.id !== id));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Management</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Business Directory</h1>
        </div>
        <Link href='/admin/directory/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + Add Business
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{businesses.length} businesses listed</p>
        </div>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : businesses.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <Link href='/admin/directory/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add first business</Link>
          </div>
        ) : (
          <div>
            {businesses.map((biz, i) => (
              <div key={biz.id} style={{ padding: '16px 24px', borderBottom: i < businesses.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                {biz.coverImage && <img src={biz.coverImage} alt={biz.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px' }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: 0 }}>{biz.name}</p>
                    {biz.verified && <span style={{ fontSize: '10px', color: '#22c55e' }}>✓ Verified</span>}
                    {biz.featured && <span style={{ fontSize: '10px', color: '#D4A832' }}>★ Featured</span>}
                  </div>
                  <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{biz.category.replace('_',' ')}{biz.city ? ' · ' + biz.city : ''}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <Link href={'/admin/directory/' + biz.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <button onClick={() => handleDelete(biz.id, biz.name)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
