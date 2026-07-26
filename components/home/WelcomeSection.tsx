import Link from 'next/link';

export default function WelcomeSection() {
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg, #08090B 0%, #0D0F12 50%, #08090B 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,50,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,50,0.08)', border: '1px solid rgba(212,168,50,0.25)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CC0000', display: 'inline-block' }} />
            <span style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700' }}>Welcome to BTV LIVE</span>
          </div>

          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 5vw, 52px)', color: '#EDEEF0', margin: '0 0 20px', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            India's Premier Business &<br />
            <span style={{ color: '#D4A832' }}>Lifestyle Media Platform</span>
          </h2>

          <p style={{ color: '#9A9DA5', fontSize: 'clamp(14px, 2vw, 17px)', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 32px' }}>
            BTV LIVE is a premium media platform dedicated to showcasing the inspiring journeys of entrepreneurs,
            business leaders, doctors, innovators, and extraordinary individuals who transformed their lives
            from zero to hero through vision, perseverance, and integrity.
          </p>

          <Link href='/about' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4A832', fontSize: '14px', fontWeight: '600', textDecoration: 'none', border: '1px solid rgba(212,168,50,0.3)', borderRadius: '999px', padding: '10px 24px', background: 'rgba(212,168,50,0.05)' }}>
            Learn More About Us →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {[
            { icon: '🎙️', title: 'Exclusive Interviews', desc: 'In-depth conversations with the most inspiring entrepreneurs, doctors, CAs, innovators, and celebrities across India.' },
            { icon: '🏆', title: 'Awards & Events', desc: 'Prestigious business excellence awards, conferences, and live events that celebrate extraordinary achievement.' },
            { icon: '📰', title: 'Business Newsroom', desc: 'Daily business news, morning digest, job opportunities, and a local business directory — all in one platform.' },
          ].map((pillar) => (
            <div key={pillar.title} style={{ padding: '28px', borderRadius: '16px', background: '#141619', border: '1px solid #252830', textAlign: 'center' }}>
              <div style={{ fontSize: '36px', marginBottom: '16px' }}>{pillar.icon}</div>
              <h3 style={{ color: '#EDEEF0', fontSize: '18px', fontFamily: 'Georgia, serif', margin: '0 0 10px' }}>{pillar.title}</h3>
              <p style={{ color: '#7A7D85', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '40px', borderRadius: '20px', background: 'linear-gradient(135deg, #0D0F12, #141619)', border: '1px solid rgba(212,168,50,0.15)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(135deg, #D4A832, #F5D98A, #B8891A)' }} />
          <p style={{ color: '#7A7D85', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 16px' }}>Our Mission</p>
          <p style={{ color: '#D4D6DA', fontSize: 'clamp(16px, 2.5vw, 22px)', fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 20px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            "To celebrate excellence, inspire leadership, and preserve the legacies of remarkable individuals who serve as role models for future generations."
          </p>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '13px', fontWeight: '700', margin: 0, letterSpacing: '0.1em' }}>
            BTV LIVE — Trusted Business Channel. Inspiring Success. Creating Legacy.
          </p>
        </div>
      </div>
    </section>
  );
}
