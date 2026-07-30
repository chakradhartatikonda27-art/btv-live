import { prisma } from '@/lib/prisma';

export default async function ImpactCounter() {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);

  const STATS = [
    { label: 'Stories Featured', value: settings?.storiesFeatured ?? 500, suffix: '+', icon: null, desc: 'Inspiring journeys told' },
    { label: 'Million+ Viewers', value: settings?.totalViewers ?? 1, suffix: 'M+', icon: null, desc: 'Reached across India' },
    { label: 'Award Ceremonies', value: settings?.awardCeremonies ?? 50, suffix: '+', icon: null, desc: 'Excellence celebrated' },
    { label: 'Industries Covered', value: settings?.industriesCovered ?? 12, suffix: '+', icon: null, desc: 'Sectors represented' },
  ];

  return (
    <section style={{ padding: '80px 16px', background: 'linear-gradient(135deg, #08090B 0%, #0D0F12 50%, #08090B 100%)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,50,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,50,0.3), transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,168,50,0.3), transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,50,0.08)', border: '1px solid rgba(212,168,50,0.2)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A832', display: 'inline-block' }} />
            <span style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700' }}>The BTV LIVE Impact</span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(32px, 6vw, 56px)', color: '#EDEEF0', margin: 0, letterSpacing: '-0.03em', fontWeight: '800' }}>
            Numbers Don't <span style={{ color: '#D4A832' }}>Lie.</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} className='btv-card' style={{
              padding: '32px 24px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #141619, #1C1E23)',
              border: '1px solid rgba(212,168,50,0.15)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top gold line */}
              <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '2px', background: 'linear-gradient(90deg, transparent, #D4A832, transparent)', borderRadius: '999px' }} />
              

              {/* Number */}
              <div style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(42px, 8vw, 64px)', fontWeight: '800', color: '#EDEEF0', lineHeight: 1, marginBottom: '4px', letterSpacing: '-0.03em' }}>
                <span style={{ color: '#D4A832' }}>{stat.value}</span>
                <span style={{ color: '#8C6510', fontSize: '0.5em' }}>{stat.suffix}</span>
              </div>
              
              {/* Label */}
              <p style={{ color: '#EDEEF0', fontSize: '15px', fontWeight: '600', margin: '0 0 6px', fontFamily: 'var(--font-sora, sans-serif)' }}>{stat.label}</p>
              
              {/* Description */}
              <p style={{ color: '#5C6070', fontSize: '12px', margin: 0, fontFamily: 'monospace', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
