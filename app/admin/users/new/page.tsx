'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentRole, setCurrentRole] = useState('SUPER_ADMIN');
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'REPORTER',
    stateId: '', districtId: '', cityId: '',
  });

  useEffect(() => {
    setCurrentRole(localStorage.getItem('btv_admin_role') || 'SUPER_ADMIN');
    fetch('/api/admin/territories?type=states').then(r => r.json()).then(d => setStates(d.states || []));
  }, []);

  useEffect(() => {
    if (form.stateId) {
      fetch('/api/admin/territories?type=districts&stateId=' + form.stateId).then(r => r.json()).then(d => setDistricts(d.districts || []));
    }
  }, [form.stateId]);

  useEffect(() => {
    if (form.districtId) {
      fetch('/api/admin/territories?type=cities&districtId=' + form.districtId).then(r => r.json()).then(d => setCities(d.cities || []));
    }
  }, [form.districtId]);

  function update(field: string, value: string) { setForm(p => ({ ...p, [field]: value })); }

  const availableRoles = currentRole === 'SUPER_ADMIN' 
    ? ['MANAGER', 'REPORTER', 'EXECUTIVE']
    : ['REPORTER', 'EXECUTIVE'];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push('/admin/users'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Error'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Users</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Add New User</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.name} onChange={e => update('name', e.target.value)} required placeholder='John Doe' style={inputStyle} /></div>
          <div><label style={labelStyle}>Email Address *</label><input type='email' value={form.email} onChange={e => update('email', e.target.value)} required placeholder='john@btvlive.net' style={inputStyle} /></div>
          <div><label style={labelStyle}>Password *</label><input type='password' value={form.password} onChange={e => update('password', e.target.value)} required placeholder='Min 8 characters' minLength={8} style={inputStyle} /></div>
          
          <div>
            <label style={labelStyle}>Role *</label>
            <select value={form.role} onChange={e => update('role', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {availableRoles.map(r => (
                <option key={r} value={r}>{r.replace('_', ' ')}</option>
              ))}
            </select>
            <p style={{ color: '#5C6070', fontSize: '11px', margin: '4px 0 0' }}>
              {form.role === 'MANAGER' && 'Can manage Interviews, Newsroom, Opportunities, Directory, Events and add team members'}
              {form.role === 'REPORTER' && 'Can add/edit Interviews, Newsroom articles and Morning Digest only'}
              {form.role === 'EXECUTIVE' && 'Can manage Opportunities, Directory and Events only'}
            </p>
          </div>

          <div style={{ borderTop: '1px solid #252830', paddingTop: '16px' }}>
            <p style={{ color: '#D4A832', fontSize: '12px', fontWeight: '600', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'monospace' }}>Location Assignment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            </div>
          </div>

          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Creating...' : 'Create User'}
            </button>
            <a href='/admin/users' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
