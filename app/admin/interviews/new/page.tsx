'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['BUSINESS_LEADERS','DOCTORS_HEALTHCARE','CAs_LEGAL','INNOVATORS_TECH','CELEBRITIES','SPORTS_EVENTS'];
const CATEGORY_LABELS: Record<string,string> = { BUSINESS_LEADERS:'Business Leaders', DOCTORS_HEALTHCARE:'Doctors & Healthcare', CAs_LEGAL:'CAs & Legal', INNOVATORS_TECH:'Innovators & Tech', CELEBRITIES:'Celebrities', SPORTS_EVENTS:'Sports & Events' };

export default function NewInterviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [guests, setGuests] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: '', slug: '', summary: '', videoUrl: '', youtubeVideoId: '',
    thumbnailUrl: '', duration: '', guestId: '', categorySlug: 'BUSINESS_LEADERS',
    featured: false, status: 'DRAFT',
    guestName: '', guestHeadline: '', guestCompany: '',
  });

  useEffect(() => {
    fetch('/api/admin/guests').then(r => r.json()).then(d => setGuests(d.guests || []));
  }, []);

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/interviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        slug: form.slug || generateSlug(form.title),
        duration: form.duration ? parseInt(form.duration) : null,
        publishedAt: form.status === 'PUBLISHED' ? new Date().toISOString() : null,
      }),
    });
    if (res.ok) { router.push('/admin/interviews'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Error'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Interviews</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>New Interview</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div><label style={labelStyle}>Title *</label><input type='text' value={form.title} onChange={e => { update('title', e.target.value); update('slug', generateSlug(e.target.value)); }} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Slug</label><input type='text' value={form.slug} onChange={e => update('slug', e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Summary</label><textarea value={form.summary} onChange={e => update('summary', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'none' as const }} /></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>YouTube Video ID</label><input type='text' value={form.youtubeVideoId} onChange={e => { update('youtubeVideoId', e.target.value); update('videoUrl', 'https://www.youtube.com/embed/' + e.target.value); }} placeholder='dQw4w9WgXcQ' style={inputStyle} /></div>
            <div><label style={labelStyle}>Duration (seconds)</label><input type='number' value={form.duration} onChange={e => update('duration', e.target.value)} placeholder='2280' style={inputStyle} /></div>
          </div>
          
          <div><label style={labelStyle}>Thumbnail URL</label><input type='url' value={form.thumbnailUrl} onChange={e => update('thumbnailUrl', e.target.value)} style={inputStyle} /></div>
          
          <div><label style={labelStyle}>Category *</label>
            <select value={form.categorySlug} onChange={e => update('categorySlug', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
            </select>
          </div>

          <div style={{ border: '1px solid #252830', borderRadius: '8px', padding: '16px' }}>
            <p style={{ color: '#D4A832', fontSize: '12px', fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Guest Details</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.guestName} onChange={e => update('guestName', e.target.value)} required style={inputStyle} /></div>
              <div><label style={labelStyle}>Headline / Title</label><input type='text' value={form.guestHeadline} onChange={e => update('guestHeadline', e.target.value)} placeholder='Founder & CEO, Company Name' style={inputStyle} /></div>
              <div><label style={labelStyle}>Company</label><input type='text' value={form.guestCompany} onChange={e => update('guestCompany', e.target.value)} style={inputStyle} /></div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Status</label>
              <select value={form.status} onChange={e => update('status', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value='DRAFT'>Draft</option>
                <option value='PUBLISHED'>Published</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '28px' }}>
              <input type='checkbox' checked={form.featured} onChange={e => update('featured', e.target.checked)} />
              <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Featured</span>
            </div>
          </div>

          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Create Interview'}
            </button>
            <a href='/admin/interviews' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
