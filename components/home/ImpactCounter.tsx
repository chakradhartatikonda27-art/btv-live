import { prisma } from '@/lib/prisma';

export default async function ImpactCounter() {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);

  const STATS = [
    { label: 'Stories Featured', value: settings?.storiesFeatured ?? 500, suffix: '+' },
    { label: 'Million+ Viewers', value: settings?.totalViewers ?? 1, suffix: 'M+' },
    { label: 'Award Ceremonies', value: settings?.awardCeremonies ?? 50, suffix: '+' },
    { label: 'Industries Covered', value: settings?.industriesCovered ?? 12, suffix: '+' },
  ];

  return (
    <section style={{ padding: '60px 16px', borderTop: '1px solid #1C1E23', borderBottom: '1px solid #1C1E23', background: '#0D0F12' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px' }}>
            The BTV LIVE Impact
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 8vw, 48px)', color: '#EDEEF0', margin: 0 }}>
            Numbers Don't Lie.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px 16px' }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', padding: '0 16px', position: 'relative' }}>
              <div style={{ fontSize: 'clamp(36px, 10vw, 56px)', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: '#E8C35A', marginBottom: '8px' }}>
                {stat.value}<span style={{ color: '#8C6510' }}>{stat.suffix}</span>
              </div>
              <p style={{ color: '#9A9DA5', fontSize: '13px', fontWeight: '500', margin: 0 }}>{stat.label}</p>
              <div style={{ width: '32px', height: '2px', background: '#8C6510', margin: '12px auto 0' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
