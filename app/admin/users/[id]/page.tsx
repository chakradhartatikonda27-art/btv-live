'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'REPORTER',
    stateId: '', districtId: '', cityId: '', active: true,
  });

  useEffect(() => {
    fetch('/api/admin/territories?type=states').then(r => r.json()).then(d => setStates(d.states || []));
    params.then(p => {
      setUserId(p.id);
      fetch('/api/admin/users/' + p.id).then(r => r.json()).then(d => {
        if (d.user) {
          setForm({
            name: d.user.name, email: d.user.email, password: '',
            role: d.user.role, stateId: d.user.stateId || '',
            districtId: d.user.districtId || '', cityId: d.user.cityId || '',
            active: d.user.active,
          });
          if (d.user.stateId) {
            fetch('/api/admin/territories?type=districts&stateId=' + d.user.stateId).then(r => r.json()).then(d2 => setDistricts(d2.districts || []));
          }
          if (d.user.districtId) {
            fetch('/api/admin/territories?type=cities&districtId=' + d.user.districtId).then(r => r.json()).then(d2 => setCities(d2.cities || []));
          }
        }
        setFetching(false);
      });
    });
  }, [params]);

  useEffect(() => {
    if (form.stateId) fetch('/api/admin/territories?type=districts&stateId=' + form.stateId).then(r => r.json()).then(d => setDistricts(d.districts || []));
  }, [form.stateId]);

  useEffect(() => {
    if (form.districtId) fetch('/api/admin/territories?type=cities&districtId=' + form.districtId).then(r => r.json()).then(d => setCities(d.cities || []));
  }, [form.districtId]);

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const body: any = { name: form.name, email: form.email, role: form.role, stateId: form.stateId || null, districtId: form.districtId || null, cityId: form.cityId || null, active: form.active };
    if (form.password) body.password = form.password;
    const res = await fetch('/api/admin/users/' + userId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) { router.push('/admin/users'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Users</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit User</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.name} onChange={e => update('name', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Email *</label><input type='email' value={form.email} onChange={e => update('email', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>New Password (leave blank to keep current)</label><input type='password' value={form.password} onChange={e => update('password', e.target.value)} placeholder='Leave blank to keep current' style={inputStyle} /></div>
          <div><label style={labelStyle}>Role</label>
            <select value={form.role} onChange={e => update('role', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value='MANAGER'>Manager</option>
              <option value='REPORTER'>Reporter</option>
              <option value='EXECUTIVE'>Executive</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>State</label>
            <select value={form.stateId} onChange={e => { update('stateId', e.target.value); update('districtId', ''); update('cityId', ''); }} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value=''>All India</option>
              {states.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          {form.stateId && (
            <div>
              <label style={labelStyle}>District</label>
              <select value={form.districtId} onChange={e => { update('districtId', e.target.value); update('cityId', ''); }} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value=''>All Districts</option>
                {districts.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          )}
          {form.districtId && (
            <div>
              <label style={labelStyle}>City</label>
              <select value={form.cityId} onChange={e => update('cityId', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value=''>All Cities</option>
                {cities.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.active} onChange={e => update('active', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Active</span>
          </label>
          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update User'}
            </button>
            <a href='/admin/users' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
