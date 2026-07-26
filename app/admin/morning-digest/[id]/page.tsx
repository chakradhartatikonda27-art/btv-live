'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';

export default function EditMorningDigestPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [digestId, setDigestId] = useState('');
  const [bulletins, setBulletins] = useState<string[]>(['']);
  const [form, setForm] = useState({ title: '', date: '', published: false });

  useEffect(() => {
    params.then(p => {
      setDigestId(p.id);
      fetch('/api/admin/morning-digest/' + p.id).then(r => r.json()).then(d => {
        if (d.digest) {
          setForm({
            title: d.digest.title,
            date: new Date(d.digest.date).toISOString().split('T')[0],
            published: d.digest.published,
          });
          setBulletins(d.digest.bulletins.length ? d.digest.bulletins : ['']);
        }
        setFetching(false);
      });
    });
  }, [params]);

  function updateBulletin(i: number, v: string) { setBulletins(p => p.map((b, idx) => idx === i ? v : b)); }
  function addBulletin() { if (bulletins.length < 10) setBulletins(p => [...p, '']); }
  function removeBulletin(i: number) { if (bulletins.length > 1) setBulletins(p => p.filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/morning-digest/' + digestId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, date: new Date(form.date).toISOString(), bulletins: bulletins.filter(b => b.trim()) }),
    });
    if (res.ok) { router.push('/admin/morning-digest'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Morning Digest</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit Digest</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Title</label><input type='text' value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inputStyle} /></div>
            <div><label style={labelStyle}>Date</label><input type='date' value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={inputStyle} /></div>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Bulletins</label>
              <button type='button' onClick={addBulletin} disabled={bulletins.length >= 10} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', color: '#D4A832', fontSize: '12px' }}>
                <Plus size={12} /> Add
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bulletins.map((b, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: '28px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <input type='text' value={b} onChange={e => updateBulletin(i, e.target.value)} placeholder={'Update ' + (i + 1) + '...'} style={{ ...inputStyle, flex: 1 }} />
                  <button type='button' onClick={() => removeBulletin(i)} style={{ flexShrink: 0, width: '36px', height: '36px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', cursor: 'pointer', color: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.published} onChange={e => setForm(p => ({ ...p, published: e.target.checked }))} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Published</span>
          </label>
          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update Digest'}
            </button>
            <a href='/admin/morning-digest' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
