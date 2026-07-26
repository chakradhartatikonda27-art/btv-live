'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const TYPE_COLORS: Record<string,string> = { JOB:'#3B82F6', BUSINESS_LEAD:'#22C55E', TENDER:'#F59E0B', FRANCHISE:'#8B5CF6', PARTNERSHIP:'#EC4899' };

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/opportunities').then(r => r.json()).then(d => {
      setOpportunities(d.opportunities || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm('Delete "' + title + '"?')) return;
    await fetch('/api/admin/opportunities/' + id, { method: 'DELETE' });
    setOpportunities(prev => prev.filter(o => o.id !== id));
  }

  async function toggleStatus(id: string, current: string) {
    const next = current === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
    await fetch('/api/admin/opportunities/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    setOpportunities(prev => prev.map(o => o.id === id ? { ...o, status: next } : o));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Management</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Opportunities</h1>
        </div>
        <Link href='/admin/opportunities/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Opportunity
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{opportunities.length} total opportunities</p>
        </div>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : opportunities.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <Link href='/admin/opportunities/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add first opportunity</Link>
          </div>
        ) : (
          <div>
            {opportunities.map((opp, i) => (
              <div key={opp.id} style={{ padding: '16px 24px', borderBottom: i < opportunities.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: TYPE_COLORS[opp.type] }}>{opp.type.replace('_',' ')}</span>
                    {opp.featured && <span style={{ fontSize: '10px', color: '#D4A832' }}>★</span>}
                  </div>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{opp.title}</p>
                  <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{opp.company}{opp.city ? ' · ' + opp.city : ''}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleStatus(opp.id, opp.status)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: opp.status === 'ACTIVE' ? '#22c55e' : '#EF4444' }}>
                    {opp.status}
                  </button>
                  <Link href={'/admin/opportunities/' + opp.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <button onClick={() => handleDelete(opp.id, opp.title)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
