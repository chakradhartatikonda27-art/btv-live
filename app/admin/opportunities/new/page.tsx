'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TYPES = ['JOB', 'BUSINESS_LEAD', 'TENDER', 'FRANCHISE', 'PARTNERSHIP'];

export default function NewOpportunityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', type: 'JOB', company: '', description: '',
    location: '', city: '', state: '', salary: '',
    deadline: '', applyUrl: '', applyEmail: '',
    featured: false, status: 'ACTIVE',
  });

  function update(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : null }),
    });
    if (res.ok) { router.push('/admin/opportunities'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Error'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Opportunities</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>New Opportunity</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Type *</label>
              <select value={form.type} onChange={(e) => update('type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                {TYPES.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select value={form.status} onChange={(e) => update('status', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value='ACTIVE'>Active</option>
                <option value='CLOSED'>Closed</option>
                <option value='EXPIRED'>Expired</option>
              </select>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Title *</label>
            <input type='text' value={form.title} onChange={(e) => update('title', e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Company</label>
            <input type='text' value={form.company} onChange={(e) => update('company', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Description *</label>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} required style={{ ...inputStyle, resize: 'none' as const }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input type='text' value={form.city} onChange={(e) => update('city', e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>State</label>
              <input type='text' value={form.state} onChange={(e) => update('state', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Salary / Package</label>
              <input type='text' value={form.salary} onChange={(e) => update('salary', e.target.value)} placeholder='e.g. 12-18 LPA' style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deadline</label>
              <input type='date' value={form.deadline} onChange={(e) => update('deadline', e.target.value)} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Apply URL</label>
            <input type='url' value={form.applyUrl} onChange={(e) => update('applyUrl', e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Apply Email</label>
            <input type='email' value={form.applyEmail} onChange={(e) => update('applyEmail', e.target.value)} style={inputStyle} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.featured} onChange={(e) => update('featured', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Featured</span>
          </label>
          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving...' : 'Create Opportunity'}
            </button>
            <a href='/admin/opportunities' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
