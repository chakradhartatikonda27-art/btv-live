'use client';

const TICKER_ITEMS = [
  'BTV Business Excellence Awards 2025 — Hyderabad, 15 Sept ◆',
  'BTV LIVE is looking for Reporters & Field Agents across AP and Telangana ◆',
  'Join BTV LIVE as a Business Development Agent — Earn while you grow ◆',
  'Nominate a Business Leader today ◆',
  'Subscribe to Morning 7 Digest — Top 7 business updates every day at 7 AM ◆',
  'BTV LIVE — Where Success Goes Live. Legacy Lives Forever. ◆',
];

export default function LiveTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{ background: '#CC0000', height: '28px', display: 'flex', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ flexShrink: 0, background: '#08090B', height: '100%', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', display: 'inline-block', animation: 'btvblink 1s infinite' }} />
        <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '0.12em', color: 'white' }}>LIVE</span>
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ display: 'flex', animation: 'btv-ticker-scroll 60s linear infinite', whiteSpace: 'nowrap' }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ fontSize: '11px', color: 'white', padding: '0 24px', fontWeight: '500' }}>{item}</span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes btvblink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes btv-ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
