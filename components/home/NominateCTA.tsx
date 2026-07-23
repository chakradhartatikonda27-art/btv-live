import Link from 'next/link';

export default function NominateCTA() {
  return (
    <section style={{ padding: '60px 20px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #080C18 0%, #0D0F12 50%, #08090B 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 50%, rgba(212,168,50,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', borderRadius: '999px', padding: '6px 16px', marginBottom: '24px', background: 'rgba(212,168,50,0.05)', border: '1px solid rgba(212,168,50,0.3)' }}>
          <span style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Share Your Story</span>
        </div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 8vw, 56px)', color: 'white', marginBottom: '16px', lineHeight: 1.1 }}>
          Is Your Journey Worth Telling the World?
        </h2>
        <p style={{ color: '#B0B3BB', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
          BTV LIVE features the visionaries, disruptors, and changemakers shaping India future. Nominate yourself or someone whose story deserves a global stage.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href='/apply' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4A832', color: '#08090B', padding: '14px 28px', borderRadius: '999px', fontWeight: '600', fontSize: '15px', textDecoration: 'none' }}>
            Nominate a Leader
          </Link>
          <Link href='/apply#self' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4D6DA', border: '1px solid #252830', padding: '14px 28px', borderRadius: '999px', fontWeight: '500', fontSize: '15px', textDecoration: 'none' }}>
            Apply to Be Featured
          </Link>
        </div>
      </div>
    </section>
  );
}
