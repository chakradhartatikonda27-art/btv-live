'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['RESTAURANT','HOSPITAL','CA_FIRM','TECH_COMPANY','RETAIL','REAL_ESTATE','EDUCATION','HOTEL','MANUFACTURING','TRANSPORT','LEGAL','OTHER'];

export default function NewBusinessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', category: 'RESTAURANT', description: '', address: '',
    city: '', state: '', phone: '', whatsapp: '', email: '',
    website: '', coverImage: '', featured: false, verified: false,
  });

  function update(field: string, value: unknown) { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/directory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push('/admin/directory'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Error'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Directory</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Add Business</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Business Name *</label>
            <input type='text' value={form.name} onChange={(e) => update('name', e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Category *</label>
            <select value={form.category} onChange={(e) => update('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'none' as const }} />
          </div>
          <div>
            <label style={labelStyle}>Address</label>
            <input type='text' value={form.address} onChange={(e) => update('address', e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>City</label><input type='text' value={form.city} onChange={(e) => update('city', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>State</label><input type='text' value={form.state} onChange={(e) => update('state', e.target.value)} style={inputStyle} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Phone</label><input type='text' value={form.phone} onChange={(e) => update('phone', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>WhatsApp</label><input type='text' value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} style={inputStyle} /></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Email</label><input type='email' value={form.email} onChange={(e) => update('email', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Website</label><input type='url' value={form.website} onChange={(e) => update('website', e.target.value)} style={inputStyle} /></div>
          </div>
          <div>
            <label style={labelStyle}>Cover Image URL</label>
            <input type='url' value={form.coverImage} onChange={(e) => update('coverImage', e.target.value)} placeholder='https://...' style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type='checkbox' checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
              <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Featured</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type='checkbox' checked={form.verified} onChange={(e) => update('verified', e.target.checked)} />
              <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Verified</span>
            </label>
          </div>
          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Add Business'}
            </button>
            <a href='/admin/directory' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
