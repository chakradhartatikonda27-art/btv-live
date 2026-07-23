'use client';

import { useState, useEffect, useRef } from 'react';

const DEFAULT_STATS = [
  { key: 'stories_featured', label: 'Stories Featured', suffix: '+' },
  { key: 'total_viewers', label: 'Million+ Viewers', suffix: 'M+' },
  { key: 'award_ceremonies', label: 'Award Ceremonies', suffix: '+' },
  { key: 'industries_covered', label: 'Industries Covered', suffix: '+' },
];

const STAT_VALUES = {
  stories_featured: 500,
  total_viewers: 1,
  award_ceremonies: 50,
  industries_covered: 12,
};

function StatItem({ label, suffix, value }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 16px', position: 'relative' }}>
      <div style={{ fontSize: 'clamp(36px, 10vw, 56px)', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: '#E8C35A', marginBottom: '8px' }}>
        {value}<span style={{ color: '#8C6510' }}>{suffix}</span>
      </div>
      <p style={{ color: '#9A9DA5', fontSize: '13px', fontWeight: '500', margin: 0 }}>{label}</p>
      <div style={{ width: '32px', height: '2px', background: '#8C6510', margin: '12px auto 0' }} />
    </div>
  );
}

export default function ImpactCounter({ stats }) {
  return (
    <section style={{ padding: '60px 16px', borderTop: '1px solid #1C1E23', borderBottom: '1px solid #1C1E23', background: '#0D0F12', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>
            The BTV LIVE Impact
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 8vw, 48px)', color: '#EDEEF0', margin: 0 }}>
            Numbers Don't Lie.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 8px' }}>
          {DEFAULT_STATS.map((stat) => (
            <StatItem
              key={stat.key}
              label={stat.label}
              suffix={stat.suffix}
              value={stats[stat.key] ?? STAT_VALUES[stat.key] ?? 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
