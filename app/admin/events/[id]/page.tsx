'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EVENT_TYPES = ['CONFERENCE','AWARD_CEREMONY','LIVE_STREAM','SUMMIT','WORKSHOP'];
const TYPE_LABELS: Record<string,string> = { CONFERENCE:'Conference', AWARD_CEREMONY:'Award Ceremony', LIVE_STREAM:'Live Stream', SUMMIT:'Summit', WORKSHOP:'Workshop' };

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [eventId, setEventId] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', description: '', type: 'CONFERENCE',
    status: 'UPCOMING', scheduledAt: '', city: '', venue: '',
    coverImageUrl: '', registrationUrl: '', featured: false,
  });

  useEffect(() => {
    params.then(p => {
      setEventId(p.id);
      fetch('/api/admin/events/' + p.id).then(r => r.json()).then(d => {
        if (d.event) {
          const ev = d.event;
          setForm({
            title: ev.title, slug: ev.slug, description: ev.description || '',
            type: ev.type, status: ev.status,
            scheduledAt: new Date(ev.scheduledAt).toISOString().slice(0, 16),
            city: ev.city || '', venue: ev.venue || '',
            coverImageUrl: ev.coverImageUrl || '', registrationUrl: '', featured: ev.featured,
          });
        }
        setFetching(false);
      });
    });
  }, [params]);

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/events/' + eventId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, scheduledAt: new Date(form.scheduledAt).toISOString() }),
    });
    if (res.ok) { router.push('/admin/events'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Events</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit Event</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={labelStyle}>Title *</label><input type='text' value={form.title} onChange={e => update('title', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Slug</label><input type='text' value={form.slug} onChange={e => update('slug', e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e => update('description', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'none' as const }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {EVENT_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
            </div>
            <div><label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => update('status', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value='UPCOMING'>Upcoming</option>
                <option value='LIVE'>Live</option>
                <option value='COMPLETED'>Completed</option>
              </select>
            </div>
          </div>
          <div><label style={labelStyle}>Date & Time</label><input type='datetime-local' value={form.scheduledAt} onChange={e => update('scheduledAt', e.target.value)} style={inputStyle} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>City</label><input type='text' value={form.city} onChange={e => update('city', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Venue</label><input type='text' value={form.venue} onChange={e => update('venue', e.target.value)} style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Cover Image URL</label><input type='url' value={form.coverImageUrl} onChange={e => update('coverImageUrl', e.target.value)} style={inputStyle} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.featured} onChange={e => update('featured', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Featured</span>
          </label>
          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update Event'}
            </button>
            <a href='/admin/events' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
