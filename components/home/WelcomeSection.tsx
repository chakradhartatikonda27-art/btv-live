import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function WelcomeSection() {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);

  const title = settings?.welcomeTitle || "India's Premier Business & Lifestyle Media Platform";
  const desc = settings?.welcomeDesc || 'BTV LIVE is a premium media platform dedicated to showcasing the inspiring journeys of entrepreneurs, business leaders, doctors, innovators, and extraordinary individuals who transformed their lives from zero to hero through vision, perseverance, and integrity.';
  const mission = settings?.missionText || 'To celebrate excellence, inspire leadership, and preserve the legacies of remarkable individuals who serve as role models for future generations.';

  return (
    <section style={{ padding: '60px 20px', background: 'linear-gradient(180deg, #08090B 0%, #0D0F12 50%, #08090B 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,50,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,50,0.08)', border: '1px solid rgba(212,168,50,0.25)', borderRadius: '999px', padding: '6px 18px', marginBottom: '20px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CC0000', display: 'inline-block' }} />
            <span style={{ color: 'var(--accent-gold)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700' }}>Welcome to BTV LIVE</span>
          </div>

          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 4vw, 48px)', color: 'var(--text-primary)', margin: '0 0 16px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            {title.includes('&') ? (
              <>
                {title.split('&')[0]}&<br />
                <span style={{ color: 'var(--accent-gold)' }}>{title.split('&')[1]}</span>
              </>
            ) : title}
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(13px, 2vw, 16px)', lineHeight: 1.7, maxWidth: '680px', margin: '0 auto 24px' }}>
            {desc}
          </p>

          <Link href='/about' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', fontSize: '14px', fontWeight: '600', textDecoration: 'none', border: '1px solid rgba(212,168,50,0.3)', borderRadius: '999px', padding: '10px 24px', background: 'rgba(212,168,50,0.05)' }}>
            Learn More About Us →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: '🎙️', title: 'Exclusive Interviews', desc: 'In-depth conversations with the most inspiring entrepreneurs, doctors, CAs, innovators, and celebrities across India.' },
            { icon: '🏆', title: 'Awards & Events', desc: 'Prestigious business excellence awards, conferences, and live events that celebrate extraordinary achievement.' },
            { icon: '📰', title: 'Business Newsroom', desc: 'Daily business news, morning digest, job opportunities, and a local business directory — all in one platform.' },
          ].map((pillar) => (
            <div key={pillar.title} className='btv-card' style={{ padding: '24px', borderRadius: '16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{pillar.icon}</div>
              <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>{pillar.title}</h3>
              <p style={{ color: 'var(--text-subtle)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '32px', borderRadius: '20px', background: 'linear-gradient(135deg, #0D0F12, #141619)', border: '1px solid rgba(212,168,50,0.15)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(135deg, #D4A832, #F5D98A, #B8891A)' }} />
          <p style={{ color: 'var(--text-subtle)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px' }}>Our Mission</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(14px, 2vw, 20px)', fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 16px', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto' }}>
            "{mission}"
          </p>
          <p style={{ color: 'var(--accent-gold)', fontFamily: 'monospace', fontSize: '12px', fontWeight: '700', margin: 0, letterSpacing: '0.1em' }}>
            BTV LIVE — Trusted Business Channel. Inspiring Success. Creating Legacy.
          </p>
        </div>
      </div>
    </section>
  );
}
