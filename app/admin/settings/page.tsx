'use client';

import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('social');
  const [form, setForm] = useState({
    // Social
    youtubeUrl: 'https://www.youtube.com/@Btvlive-b2b',
    instagramUrl: 'https://www.instagram.com/reel/DbGnjyWk0HY/',
    whatsappNumber: '+919876543210',
    // Impact Counter
    storiesFeatured: '500',
    totalViewers: '1',
    awardCeremonies: '50',
    industriesCovered: '12',
    // Welcome Section
    welcomeTitle: "India's Premier Business & Lifestyle Media Platform",
    welcomeDesc: 'BTV LIVE is a premium media platform dedicated to showcasing the inspiring journeys of entrepreneurs, business leaders, doctors, innovators, and extraordinary individuals.',
    missionText: 'To celebrate excellence, inspire leadership, and preserve the legacies of remarkable individuals who serve as role models for future generations.',
    // Footer
    footerTagline: 'Where Success Goes Live... Legacy Lives Forever.',
    // Ticker
    tickerMessages: 'BTV Business Excellence Awards 2025 — Hyderabad, 15 Sept ◆\nBTV LIVE is looking for Reporters & Field Agents across AP and Telangana ◆\nJoin BTV LIVE as a Business Development Agent — Earn while you grow ◆',
  });

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => r.json()).then((d) => {
      if (d.settings) {
        setForm((prev) => ({ ...prev, ...d.settings, tickerMessages: (d.settings.tickerMessages || []).join('\n') }));
      }
    });
  }, []);

  function update(field: string, value: string) { setForm((p) => ({ ...p, [field]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        storiesFeatured: parseInt(form.storiesFeatured),
        totalViewers: parseInt(form.totalViewers),
        awardCeremonies: parseInt(form.awardCeremonies),
        industriesCovered: parseInt(form.industriesCovered),
        tickerMessages: form.tickerMessages.split('\n').filter(Boolean),
      }),
    });
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputStyle = { width: '100%', padding: '10px 14px', background: '#1C1E23', border: '1px solid #252830', borderRadius: '8px', color: '#EDEEF0', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const };
  const labelStyle = { display: 'block' as const, color: '#D4D6DA', fontSize: '13px', fontWeight: '500' as const, marginBottom: '6px' };

  const TABS = [
    { id: 'social', label: 'Social Media' },
    { id: 'impact', label: 'Impact Counter' },
    { id: 'welcome', label: 'Welcome Section' },
    { id: 'ticker', label: 'Live Ticker' },
    { id: 'footer', label: 'Footer' },
  ];

  return (
    <div style={{ padding: '32px', maxWidth: '800px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Configuration</p>
        <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Site Settings</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', borderBottom: '1px solid #252830', paddingBottom: '0' }}>
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: activeTab === tab.id ? '#D4A832' : '#7A7D85', borderBottom: activeTab === tab.id ? '2px solid #D4A832' : '2px solid transparent', marginBottom: '-1px' }}>
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: '#141619', border: '1px solid #252830', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Social Media */}
          {activeTab === 'social' && <>
            <div><label style={labelStyle}>YouTube Channel URL</label><input type='url' value={form.youtubeUrl} onChange={(e) => update('youtubeUrl', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Instagram URL</label><input type='url' value={form.instagramUrl} onChange={(e) => update('instagramUrl', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>WhatsApp Number (with country code)</label><input type='text' value={form.whatsappNumber} onChange={(e) => update('whatsappNumber', e.target.value)} placeholder='+919876543210' style={inputStyle} /></div>
            <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>These links are used in the navbar, footer, and floating social buttons.</p>
          </>}

          {/* Impact Counter */}
          {activeTab === 'impact' && <>
            <p style={{ color: '#9A9DA5', fontSize: '13px', margin: 0 }}>These numbers appear in the "Numbers Don't Lie" section on the homepage.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div><label style={labelStyle}>Stories Featured</label><input type='number' value={form.storiesFeatured} onChange={(e) => update('storiesFeatured', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Million+ Viewers</label><input type='number' value={form.totalViewers} onChange={(e) => update('totalViewers', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Award Ceremonies</label><input type='number' value={form.awardCeremonies} onChange={(e) => update('awardCeremonies', e.target.value)} style={inputStyle} /></div>
              <div><label style={labelStyle}>Industries Covered</label><input type='number' value={form.industriesCovered} onChange={(e) => update('industriesCovered', e.target.value)} style={inputStyle} /></div>
            </div>
          </>}

          {/* Welcome Section */}
          {activeTab === 'welcome' && <>
            <p style={{ color: '#9A9DA5', fontSize: '13px', margin: 0 }}>This appears on the homepage between the hero and categories.</p>
            <div><label style={labelStyle}>Main Title</label><input type='text' value={form.welcomeTitle} onChange={(e) => update('welcomeTitle', e.target.value)} style={inputStyle} /></div>
            <div><label style={labelStyle}>Description</label><textarea value={form.welcomeDesc} onChange={(e) => update('welcomeDesc', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' as const }} /></div>
            <div><label style={labelStyle}>Mission Statement</label><textarea value={form.missionText} onChange={(e) => update('missionText', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' as const }} /></div>
          </>}

          {/* Ticker */}
          {activeTab === 'ticker' && <>
            <p style={{ color: '#9A9DA5', fontSize: '13px', margin: 0 }}>The scrolling news ticker below the navbar. One message per line.</p>
            <div><label style={labelStyle}>Ticker Messages (one per line)</label><textarea value={form.tickerMessages} onChange={(e) => update('tickerMessages', e.target.value)} rows={8} placeholder={'Message 1 ◆\nMessage 2 ◆\nMessage 3 ◆'} style={{ ...inputStyle, resize: 'vertical' as const, fontFamily: 'monospace', fontSize: '12px' }} /></div>
          </>}

          {/* Footer */}
          {activeTab === 'footer' && <>
            <div><label style={labelStyle}>Footer Tagline</label><input type='text' value={form.footerTagline} onChange={(e) => update('footerTagline', e.target.value)} style={inputStyle} /></div>
          </>}

          {saved && <p style={{ color: '#22c55e', fontSize: '13px', margin: 0 }}>✓ Settings saved successfully</p>}

          <button type='submit' disabled={loading} style={{ padding: '12px', background: loading ? '#8C6510' : '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
