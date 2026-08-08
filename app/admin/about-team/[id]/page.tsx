'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function EditAboutTeamPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [memberId, setMemberId] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '', role: '', bio: '', photoUrl: '', photoType: 'url', order: '0', active: true,
  });

  useEffect(() => {
    params.then(p => {
      setMemberId(p.id);
      fetch('/api/admin/about-team/' + p.id).then(r => r.json()).then(d => {
        if (d.member) {
          setForm({
            name: d.member.name, role: d.member.role, bio: d.member.bio || '',
            photoUrl: d.member.photoUrl || '', photoType: d.member.photoType || 'url',
            order: d.member.order?.toString() || '0', active: d.member.active,
          });
          setPhotoPreview(d.member.photoUrl || '');
        }
        setFetching(false);
      });
    });
  }, [params]);

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setPhotoPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/about-team/upload', { method: 'POST', body: formData });
    if (res.ok) { const { url } = await res.json(); update('photoUrl', url); update('photoType', 'upload'); }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/about-team/' + memberId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, order: parseInt(form.order) }),
    });
    if (res.ok) { router.push('/admin/about-team'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>About Team</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit Member</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Photo</label>
            {photoPreview ? (
              <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', marginBottom: '8px' }}>
                <img src={photoPreview} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {uploading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,9,11,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#D4A832', fontSize: '10px' }}>Uploading...</p></div>}
              </div>
            ) : null}
            <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #252830', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
              <Upload size={16} color='#9A9DA5' style={{ margin: '0 auto 4px' }} />
              <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>Click to upload new photo</p>
            </div>
            <input ref={fileRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={handlePhotoUpload} />
            <input type='url' value={form.photoUrl} onChange={e => update('photoUrl', e.target.value)} placeholder='Or paste image URL' style={{ ...inputStyle, marginTop: '8px' }} />
          </div>
          <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.name} onChange={e => update('name', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Role / Title *</label><input type='text' value={form.role} onChange={e => update('role', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Bio</label><textarea value={form.bio} onChange={e => update('bio', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'none' as const }} /></div>
          <div><label style={labelStyle}>Display Order</label><input type='number' value={form.order} onChange={e => update('order', e.target.value)} style={inputStyle} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.active} onChange={e => update('active', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Show on About page</span>
          </label>
          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading || uploading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update Member'}
            </button>
            <a href='/admin/about-team' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
