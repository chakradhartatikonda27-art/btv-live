'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/events').then(r => r.json()).then(d => {
      setEvents(d.events || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm('Delete "' + title + '"?')) return;
    await fetch('/api/admin/events/' + id, { method: 'DELETE' });
    setEvents(prev => prev.filter(e => e.id !== id));
  }

  async function toggleStatus(id: string, current: string) {
    const next = current === 'UPCOMING' ? 'LIVE' : current === 'LIVE' ? 'COMPLETED' : 'UPCOMING';
    await fetch('/api/admin/events/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: next }),
    });
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: next } : e));
  }

  const STATUS_COLORS: Record<string, string> = { LIVE: '#EF4444', UPCOMING: '#D4A832', COMPLETED: '#22c55e' };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Coverage</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Events</h1>
        </div>
        <Link href='/admin/events/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Event
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{events.length} total events</p>
        </div>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : events.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No events yet.</p>
            <Link href='/admin/events/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add first event</Link>
          </div>
        ) : (
          <div>
            {events.map((event, i) => (
              <div key={event.id} style={{ padding: '16px 24px', borderBottom: i < events.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{event.type?.replace('_', ' ')}</p>
                    {event.city && <><span style={{ color: '#252830' }}>·</span><p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{event.city}</p></>}
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>
                      {new Date(event.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleStatus(event.id, event.status)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: STATUS_COLORS[event.status] || '#9A9DA5' }}>
                    {event.status}
                  </button>
                  <Link href={'/admin/events/' + event.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <a href={'/events/' + event.slug} target='_blank' style={{ color: '#7A7D85', fontSize: '12px', textDecoration: 'none' }}>View</a>
                  <button onClick={() => handleDelete(event.id, event.title)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
