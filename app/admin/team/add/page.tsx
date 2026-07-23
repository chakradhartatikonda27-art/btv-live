'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ROLES = [
  { value: 'SUPER_ADMIN', label: 'Super Admin' },
  { value: 'STATE_HEAD', label: 'State Head' },
  { value: 'DISTRICT_HEAD', label: 'District Head' },
  { value: 'CITY_REPORTER', label: 'City Reporter' },
  { value: 'CAMERA_PERSON', label: 'Camera Person' },
  { value: 'VIEWER', label: 'Viewer' },
];

export default function AddTeamMemberPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [states, setStates] = useState<{id:string,name:string}[]>([]);
  const [districts, setDistricts] = useState<{id:string,name:string}[]>([]);
  const [cities, setCities] = useState<{id:string,name:string}[]>([]);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'CITY_REPORTER',
    stateId: '',
    districtId: '',
    cityId: '',
  });

  useEffect(() => {
    fetch('/api/admin/territories').then((r) => r.json()).then((d) => setStates(d.states || []));
  }, []);

  useEffect(() => {
    if (form.stateId) {
      fetch('/api/admin/territories?stateId=' + form.stateId).then((r) => r.json()).then((d) => {
        setDistricts(d.districts || []);
        setCities([]);
      });
    } else {
      setDistricts([]);
      setCities([]);
    }
  }, [form.stateId]);

  useEffect(() => {
    if (form.districtId) {
      fetch('/api/admin/territories?districtId=' + form.districtId).then((r) => r.json()).then((d) => {
        setCities(d.cities || []);
      });
    } else {
      setCities([]);
    }
  }, [form.districtId]);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/admin/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin/team');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    background: '#1C1E23',
    border: '1px solid #252830',
    borderRadius: '10px',
    color: '#EDEEF0',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  const labelStyle = {
    display: 'block',
    color: '#D4D6DA',
    fontSize: '13px',
    fontWeight: '500',
    marginBottom: '6px',
  };

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Team Management</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Add Team Member</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input type='text' value={form.fullName} onChange={(e) => update('fullName', e.target.value)} placeholder='John Doe' required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type='tel' value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder='+91 98765 43210' style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email Address *</label>
            <input type='email' value={form.email} onChange={(e) => update('email', e.target.value)} placeholder='reporter@btvlive.in' required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Password *</label>
            <input type='password' value={form.password} onChange={(e) => update('password', e.target.value)} placeholder='Min 8 characters' required style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Role *</label>
            <select value={form.role} onChange={(e) => update('role', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <div style={{ borderTop: '1px solid #252830', paddingTop: '16px' }}>
            <p style={{ color: '#7A7D85', fontSize: '12px', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Territory Assignment</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={labelStyle}>State</label>
                <select value={form.stateId} onChange={(e) => { update('stateId', e.target.value); update('districtId', ''); update('cityId', ''); }} style={{ ...inputStyle, cursor: 'pointer' }}>
                  <option value=''>Select State (All India)</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {districts.length > 0 && (
                <div>
                  <label style={labelStyle}>District</label>
                  <select value={form.districtId} onChange={(e) => { update('districtId', e.target.value); update('cityId', ''); }} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value=''>Select District (All districts)</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {cities.length > 0 && (
                <div>
                  <label style={labelStyle}>City</label>
                  <select value={form.cityId} onChange={(e) => update('cityId', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value=''>Select City (All cities)</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
            <button type='submit' disabled={loading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Adding...' : 'Add Team Member'}
            </button>
            <a href='/admin/team' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textAlign: 'center', textDecoration: 'none' }}>
              Cancel
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
