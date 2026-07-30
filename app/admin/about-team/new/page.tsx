'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';

export default function NewAboutTeamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: '', role: '', bio: '', photoUrl: '', photoType: 'url', order: '0', active: true,
  });

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setPhotoPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/about-team/upload', { method: 'POST', body: formData });
    if (res.ok) {
      const { url } = await res.json();
      update('photoUrl', url);
      update('photoType', 'upload');
    } else {
      setError('Photo upload failed');
      setPhotoPreview('');
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/about-team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, order: parseInt(form.order) }),
    });
    if (res.ok) { router.push('/admin/about-team'); router.refresh(); }
    else { const d = await res.json(); setError(d.error || 'Error'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '600px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>About Team</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Add Team Member</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Photo */}
          <div>
            <label style={labelStyle}>Photo</label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <button type='button' onClick={() => update('photoType', 'upload')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid', borderColor: form.photoType === 'upload' ? '#D4A832' : '#252830', background: form.photoType === 'upload' ? 'rgba(212,168,50,0.1)' : 'transparent', color: form.photoType === 'upload' ? '#D4A832' : '#7A7D85', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                Upload Photo
              </button>
              <button type='button' onClick={() => update('photoType', 'url')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid', borderColor: form.photoType === 'url' ? '#D4A832' : '#252830', background: form.photoType === 'url' ? 'rgba(212,168,50,0.1)' : 'transparent', color: form.photoType === 'url' ? '#D4A832' : '#7A7D85', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                Image URL
              </button>
            </div>

            {form.photoType === 'upload' ? (
              <>
                {photoPreview ? (
                  <div style={{ position: 'relative', width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={photoPreview} alt='Preview' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button type='button' onClick={() => { update('photoUrl', ''); setPhotoPreview(''); }} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(8,9,11,0.8)', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✕</button>
                    {uploading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,9,11,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#D4A832', fontSize: '10px' }}>Uploading...</p></div>}
                  </div>
                ) : (
                  <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #252830', borderRadius: '12px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                    <Upload size={20} color='#9A9DA5' style={{ margin: '0 auto 6px' }} />
                    <p style={{ color: '#9A9DA5', fontSize: '13px', margin: 0 }}>Click to upload photo</p>
                    <p style={{ color: '#5C6070', fontSize: '11px', margin: '4px 0 0' }}>JPG, PNG — max 5MB</p>
                  </div>
                )}
                <input ref={fileRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={handlePhotoUpload} />
              </>
            ) : (
              <input type='url' value={form.photoUrl} onChange={e => update('photoUrl', e.target.value)} placeholder='https://example.com/photo.jpg' style={inputStyle} />
            )}
          </div>

          <div><label style={labelStyle}>Full Name *</label><input type='text' value={form.name} onChange={e => update('name', e.target.value)} required placeholder='John Doe' style={inputStyle} /></div>
          <div><label style={labelStyle}>Role / Title *</label><input type='text' value={form.role} onChange={e => update('role', e.target.value)} required placeholder='Founder & CEO' style={inputStyle} /></div>
          <div><label style={labelStyle}>Bio</label><textarea value={form.bio} onChange={e => update('bio', e.target.value)} rows={3} placeholder='Brief description...' style={{ ...inputStyle, resize: 'none' as const }} /></div>
          <div><label style={labelStyle}>Display Order</label><input type='number' value={form.order} onChange={e => update('order', e.target.value)} placeholder='0' style={inputStyle} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type='checkbox' checked={form.active} onChange={e => update('active', e.target.checked)} />
            <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Show on About page</span>
          </label>

          {error && <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading || uploading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Add Member'}
            </button>
            <a href='/admin/about-team' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
