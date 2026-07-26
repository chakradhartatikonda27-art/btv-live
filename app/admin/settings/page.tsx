'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    youtubeUrl: 'https://www.youtube.com/@Btvlive-b2b',
    instagramUrl: 'https://www.instagram.com/reel/DbGnjyWk0HY/',
    whatsappNumber: '+919876543210',
    storiesFeatured: '500',
    totalViewers: '1',
    awardCeremonies: '50',
    industriesCovered: '12',
    tickerText: 'BTV LIVE — Where Success Goes Live. Legacy Lives Forever.',
  });

  function update(field: string, value: string) { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  return (
    <div style={{ padding: '32px', maxWidth: '700px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Configuration</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Site Settings</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Social Links */}
          <div>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 16px', paddingBottom: '8px', borderBottom: '1px solid #252830' }}>Social Media Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div><label style={labelStyle}>YouTube Channel URL</label><input type='url' value={form.youtubeUrl} onChange={(e) => update('youtubeUrl', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Instagram URL</label><input type='url' value={form.instagramUrl} onChange={(e) => update('instagramUrl', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>WhatsApp Number (with country code)</label><input type='text' value={form.whatsappNumber} onChange={(e) => update('whatsappNumber', e.target.value)} placeholder='+919876543210' style={inputStyle} /></div>
            </div>
          </div>

          {/* Impact Counter */}
          <div>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 16px', paddingBottom: '8px', borderBottom: '1px solid #252830' }}>Impact Counter Numbers</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><label style={labelStyle}>Stories Featured</label><input type='number' value={form.storiesFeatured} onChange={(e) => update('storiesFeatured', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Million+ Viewers</label><input type='number' value={form.totalViewers} onChange={(e) => update('totalViewers', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Award Ceremonies</label><input type='number' value={form.awardCeremonies} onChange={(e) => update('awardCeremonies', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Industries Covered</label><input type='number' value={form.industriesCovered} onChange={(e) => update('industriesCovered', e.target.value)} style={inputStyle} /></div>
            </div>
          </div>

          {saved && <p style={{ color: '#22c55e', fontSize: '13px', margin: 0 }}>✓ Settings saved successfully</p>}

          <button type='submit' disabled={loading} style={{ padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
