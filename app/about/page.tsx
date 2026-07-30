import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export const metadata = {
  title: 'About BTV LIVE',
  description: 'The story behind BTV LIVE. India trusted business media channel.',
};

const VALUES = [
  { title: 'Authenticity', description: 'Every story we feature is real, verified, and told in the words of the subject.' },
  { title: 'Legacy', description: 'We document journeys that inspire generations, not just headlines that fade.' },
  { title: 'Excellence', description: 'From production quality to editorial standards, we hold ourselves to the highest bar.' },
  { title: 'Impact', description: 'We measure success by how many lives a story changes, not just how many views it gets.' },
];

export default async function AboutPage() {
  const teamMembers = await prisma.aboutTeam.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  }).catch(() => []);

  return (
    <main className='min-h-screen' style={{ background: '#08090B', paddingTop: '40px' }}>

      {/* Hero */}
      <section style={{ padding: '80px 20px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,50,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,50,0.08)', border: '1px solid rgba(212,168,50,0.25)', borderRadius: '999px', padding: '6px 18px', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#CC0000', display: 'inline-block' }} />
            <span style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: '700' }}>Our Story</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(32px, 6vw, 64px)', color: '#EDEEF0', margin: '0 0 20px', letterSpacing: '-0.03em', fontWeight: '800', lineHeight: 1.1 }}>
            Where Success Goes <span style={{ color: '#D4A832' }}>Live.</span>
          </h1>
          <p style={{ color: '#9A9DA5', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, margin: '0 0 32px' }}>
            BTV LIVE is India's premier business and lifestyle media platform, dedicated to celebrating the extraordinary individuals who shape our economy, healthcare, technology, and culture.
          </p>
          <Link href='/apply' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4A832', color: '#08090B', fontWeight: '700', fontSize: '15px', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none' }}>
            Nominate a Leader →
          </Link>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '60px 20px', background: '#0D0F12', borderTop: '1px solid #1C1E23', borderBottom: '1px solid #1C1E23' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 16px' }}>Our Mission</p>
          <p style={{ color: '#D4D6DA', fontSize: 'clamp(18px, 3vw, 26px)', fontFamily: 'var(--font-sora, Georgia, serif)', fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 24px' }}>
            "To celebrate excellence, inspire leadership, and preserve the legacies of remarkable individuals who serve as role models for future generations."
          </p>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '13px', fontWeight: '700', margin: 0, letterSpacing: '0.1em' }}>
            BTV LIVE — Trusted Business Channel. Inspiring Success. Creating Legacy.
          </p>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px' }}>What We Stand For</p>
            <h2 style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(24px, 4vw, 40px)', color: '#EDEEF0', margin: 0, letterSpacing: '-0.02em', fontWeight: '800' }}>Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {VALUES.map((v, i) => (
              <div key={v.title} className='btv-card' style={{ padding: '28px', borderRadius: '16px', background: '#141619', border: '1px solid #252830', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #D4A832, transparent)' }} />
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: '#D4A832', fontWeight: '800', fontFamily: 'monospace', fontSize: '14px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ color: '#EDEEF0', fontSize: '18px', fontFamily: 'var(--font-sora, sans-serif)', margin: '0 0 8px', fontWeight: '700' }}>{v.title}</h3>
                <p style={{ color: '#7A7D85', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section style={{ padding: '80px 20px', background: '#0D0F12', borderTop: '1px solid #1C1E23' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 12px' }}>The People Behind BTV LIVE</p>
            <h2 style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(24px, 4vw, 40px)', color: '#EDEEF0', margin: '0 0 12px', letterSpacing: '-0.02em', fontWeight: '800' }}>Meet Our Team</h2>
            <p style={{ color: '#7A7D85', fontSize: '15px', margin: 0 }}>The dedicated professionals who bring BTV LIVE to life every day.</p>
          </div>

          {teamMembers.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
              {teamMembers.map((member: any) => (
                <div key={member.id} className='btv-card' style={{ borderRadius: '16px', overflow: 'hidden', background: '#141619', border: '1px solid #252830', textAlign: 'center' }}>
                  {/* Photo */}
                  <div style={{ height: '200px', background: 'linear-gradient(135deg, #1C1E23, #252830)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212,168,50,0.15)', border: '2px solid rgba(212,168,50,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-sora, sans-serif)' }}>
                        {member.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ color: '#EDEEF0', fontSize: '16px', fontWeight: '700', margin: '0 0 4px', fontFamily: 'var(--font-sora, sans-serif)' }}>{member.name}</h3>
                    <p style={{ color: '#D4A832', fontSize: '12px', fontWeight: '600', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'monospace' }}>{member.role}</p>
                    {member.bio && <p style={{ color: '#7A7D85', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px', borderRadius: '16px', background: '#141619', border: '1px solid #252830' }}>
              <p style={{ color: '#7A7D85', fontSize: '15px', margin: '0 0 16px' }}>Team members coming soon.</p>
              <Link href='/admin/team/add' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }}>Add Team Members →</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-sora, Georgia, serif)', fontSize: 'clamp(24px, 4vw, 40px)', color: '#EDEEF0', margin: '0 0 16px', letterSpacing: '-0.02em', fontWeight: '800' }}>
            Ready to Share Your Story?
          </h2>
          <p style={{ color: '#7A7D85', fontSize: '16px', margin: '0 0 32px' }}>Join hundreds of leaders who have shared their journey with BTV LIVE.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href='/apply' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4A832', color: '#08090B', fontWeight: '700', fontSize: '15px', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none' }}>
              Nominate a Leader →
            </Link>
            <Link href='/contact' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#D4D6DA', border: '1px solid #252830', fontWeight: '600', fontSize: '15px', padding: '14px 32px', borderRadius: '999px', textDecoration: 'none', background: 'rgba(255,255,255,0.03)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
