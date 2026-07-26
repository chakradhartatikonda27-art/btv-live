'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { useRef } from 'react';

const CATEGORIES = [
  { value: 'BUSINESS', label: 'Business' }, { value: 'TECHNOLOGY', label: 'Technology' },
  { value: 'HEALTHCARE', label: 'Healthcare' }, { value: 'FINANCE', label: 'Finance' },
  { value: 'REAL_ESTATE', label: 'Real Estate' }, { value: 'EDUCATION', label: 'Education' },
  { value: 'SPORTS', label: 'Sports' }, { value: 'ENTERTAINMENT', label: 'Entertainment' },
  { value: 'POLITICS', label: 'Politics' }, { value: 'AGRICULTURE', label: 'Agriculture' },
];

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: '', summary: '', content: '', category: 'BUSINESS',
    tags: '', readTime: '', featured: false, status: 'DRAFT', coverImage: '',
  });
  const [articleId, setArticleId] = useState('');

  useEffect(() => {
    params.then(p => {
      setArticleId(p.id);
      fetch('/api/admin/articles/' + p.id).then(r => r.json()).then(d => {
        if (d.article) {
          const a = d.article;
          setForm({
            title: a.title, summary: a.summary || '', content: a.content,
            category: a.category, tags: (a.tags || []).join(', '),
            readTime: a.readTime?.toString() || '', featured: a.featured,
            status: a.status, coverImage: a.coverImage || '',
          });
          setCoverPreview(a.coverImage || '');
        }
        setFetching(false);
      });
    });
  }, [params]);

  function update(field: string, value: unknown) { setForm(p => ({ ...p, [field]: value })); }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setCoverPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/articles/upload', { method: 'POST', body: formData });
    if (res.ok) { const { url } = await res.json(); update('coverImage', url); }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/articles/' + articleId, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        readTime: form.readTime ? parseInt(form.readTime) : null,
        publishedAt: form.status === 'PUBLISHED' ? new Date().toISOString() : null,
      }),
    });
    if (res.ok) { router.push('/admin/articles'); router.refresh(); }
    else { setError('Failed to update'); setLoading(false); }
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  if (fetching) return <div style={{ padding: '32px', color: '#9A9DA5' }}>Loading...</div>;

  return (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Newsroom</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Edit Article</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Cover Image</label>
            {coverPreview ? (
              <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '180px' }}>
                <img src={coverPreview} alt='Cover' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button type='button' onClick={() => { update('coverImage', ''); setCoverPreview(''); }} style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(8,9,11,0.8)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={14} />
                </button>
                {uploading && <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,9,11,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#D4A832', fontSize: '14px' }}>Uploading...</p></div>}
              </div>
            ) : (
              <div onClick={() => fileRef.current?.click()} style={{ border: '2px dashed #252830', borderRadius: '8px', padding: '24px', textAlign: 'center', cursor: 'pointer' }}>
                <Upload size={20} color='#9A9DA5' style={{ margin: '0 auto 6px' }} />
                <p style={{ color: '#9A9DA5', fontSize: '13px', margin: 0 }}>Click to upload cover image</p>
              </div>
            )}
            <input ref={fileRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={handleImageUpload} />
          </div>
          <div><label style={labelStyle}>Title *</label><input type='text' value={form.title} onChange={e => update('title', e.target.value)} required style={inputStyle} /></div>
          <div><label style={labelStyle}>Summary</label><textarea value={form.summary} onChange={e => update('summary', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'none' as const }} /></div>
          <div><label style={labelStyle}>Content *</label><textarea value={form.content} onChange={e => update('content', e.target.value)} rows={12} required style={{ ...inputStyle, resize: 'vertical' as const }} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div><label style={labelStyle}>Category</label><select value={form.category} onChange={e => update('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>{CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}</select></div>
            <div><label style={labelStyle}>Read Time (min)</label><input type='number' value={form.readTime} onChange={e => update('readTime', e.target.value)} style={inputStyle} /></div>
          </div>
          <div><label style={labelStyle}>Tags (comma separated)</label><input type='text' value={form.tags} onChange={e => update('tags', e.target.value)} style={inputStyle} /></div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type='checkbox' checked={form.featured} onChange={e => update('featured', e.target.checked)} />
              <span style={{ color: '#D4D6DA', fontSize: '13px' }}>Featured</span>
            </label>
            <select value={form.status} onChange={e => update('status', e.target.value)} style={{ ...inputStyle, width: 'auto', cursor: 'pointer' }}>
              <option value='DRAFT'>Draft</option>
              <option value='PUBLISHED'>Published</option>
            </select>
          </div>
          {error && <p style={{ color: '#E0304F', fontSize: '13px', margin: 0 }}>{error}</p>}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type='submit' disabled={loading || uploading} style={{ flex: 1, padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              {loading ? 'Saving...' : 'Update Article'}
            </button>
            <a href='/admin/articles' style={{ flex: 1, padding: '12px', background: 'transparent', color: '#9A9DA5', border: '1px solid #252830', borderRadius: '999px', fontSize: '14px', textAlign: 'center' as const, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Cancel</a>
          </div>
        </div>
      </form>
    </div>
  );
}
