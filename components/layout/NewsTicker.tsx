'use client';

import { useEffect, useState } from 'react';

const DEFAULT_NEWS = [
  'BTV LIVE — Where Success Goes Live. Legacy Lives Forever.',
  'Watch exclusive interviews with top entrepreneurs and business leaders.',
  'Nominate a leader today and share their inspiring story with the world.',
  'BTV Business Excellence Awards 2025 — Hyderabad, 15 Sept.',
  'Follow BTV LIVE on YouTube @Btvlive-b2b for daily business inspiration.',
  'Subscribe to Morning 7 Digest — Top 7 business updates every day at 7 AM.',
];

export default function NewsTicker() {
  return (
    <div style={{ background: '#CC0000', color: 'white', height: '32px', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative', zIndex: 1001 }}>
      <div style={{ flexShrink: 0, background: '#08090B', height: '100%', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px', zIndex: 2 }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#CC0000', animation: 'btvLiveBlink 1s infinite', display: 'inline-block' }} />
        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.1em', color: 'white' }}>BTV LIVE</span>
        <style>{`@keyframes btvLiveBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </div>
      <div style={{ overflow: 'hidden', flex: 1 }}>
        <div style={{ display: 'flex', animation: 'btv-ticker 40s linear infinite', whiteSpace: 'nowrap' }}>
          {[...DEFAULT_NEWS, ...DEFAULT_NEWS].map((item, i) => (
            <span key={i} style={{ fontSize: '12px', fontWeight: '500', padding: '0 32px', letterSpacing: '0.02em' }}>
              {item} &nbsp;◆
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes btv-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
