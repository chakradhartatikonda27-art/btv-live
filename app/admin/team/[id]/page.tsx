'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [memberId, setMemberId] = useState('');
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', role: 'VIEWER',
    stateId: '', districtId: '', cityId: '', isActive: true,
  });
  const [states, setStates] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/territories?type=states').then(r => r.json()).then(d => setStates(d.states || []));
    params.then(p => {
      setMemberId(p.id);
      fetch('/api/admin/team').then(r => r.json()).then(d => {
        const member = (d.members || []).find((m: any) => m.id === p.id);
        if (member) {
          setForm({
            fullName: member.fullName || '',
            email: member.email || '',
            phone: member.phone || '',
            role: member.role || 'VIEWER',
            stateId: member.stateId || '',
            districtId: member.districtId || '',
            cityId: member.cityId || '',
            isActive: member.isActive !== false,
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
    const res = await fetch('/api/admin/team', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: memberId, ...form }),
    });
    if (res.ok) { router.push('/admin/team'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Team</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit Team Member</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.fullName} onChange={e => update('fullName', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Email *</label><input type='email' value={form.email} onChange={e => update('email', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Phone</label><input type='text' value={form.phone} onChange={e => update('phone', e.target.value)} style={inputStyle} /></div>
          <div><label style={labelStyle}>Role</label>
            <select value={form.role} onChange={e => update('role', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value='VIEWER'>Viewer</option>
              <option value='REPORTER'>Reporter</option>
              <option value='MANAGER'>Manager</option>
              <option value='STATE_HEAD'>State Head</option>
            </select>
          </div>
          <div><label style={labelStyle}>State</label>
            <select value={form.stateId} onChange={e => update('stateId', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value=''>All India</option>
              {states.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.isActive} onChange={e => update('isActive', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Active</span>
          </label>
          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update Member'}
            </button>
            <a href='/admin/team' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
