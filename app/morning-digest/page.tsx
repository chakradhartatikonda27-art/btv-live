import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Morning 7 Digest — BTV LIVE',
  description: 'Top 7 business updates you need to start your day at 7 AM.',
};

export default async function MorningDigestPage() {
  const digests = await prisma.morningDigest.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
    take: 10,
  });

  const today = digests[0];
  const previous = digests.slice(1);

  return (
    <main className='min-h-screen pt-24 pb-16' style={{ background: 'var(--bg-primary)' }}>
      <div className='max-w-3xl mx-auto px-4 md:px-8'>

        {/* Header */}
        <div className='mb-10 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6' style={{ background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)' }}>
            <span style={{ fontSize: '18px' }}>☀️</span>
            <span className='text-gold-400 font-mono text-xs tracking-widest uppercase font-bold'>Morning 7 Digest</span>
          </div>
          <h1 className='text-4xl md:text-5xl text-white mb-3' style={{ fontFamily: 'var(--font-display)' }}>
            Top 7 Business Updates
          </h1>
          <p className='text-platinum-400'>Every morning at 7 AM — curated for AP and Telangana business leaders</p>
        </div>

        {/* Today digest */}
        {today ? (
          <div className='mb-10 rounded-xl overflow-hidden' style={{ background: 'var(--bg-card)', border: '1px solid rgba(212,168,50,0.3)' }}>
            <div className='p-5 flex items-center justify-between' style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(212,168,50,0.05)' }}>
              <div>
                <p className='text-gold-500 font-mono text-xs tracking-widest uppercase mb-1'>Today</p>
                <h2 className='text-xl text-white' style={{ fontFamily: 'var(--font-display)', margin: 0 }}>{today.title}</h2>
              </div>
              <p className='text-platinum-500 text-xs font-mono'>
                {new Date(today.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className='p-5'>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {today.bulletins.map((bulletin, i) => (
                  <li key={i} style={{ display: 'flex', gap: '16px', padding: '12px 0', borderBottom: i < today.bulletins.length - 1 ? '1px solid #1C1E23' : 'none' }}>
                    <span style={{ flexShrink: 0, width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(212,168,50,0.15)', border: '1px solid rgba(212,168,50,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-gold)', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>{bulletin}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div className='text-center py-16 rounded-xl mb-10' style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>☀️</p>
            <p className='text-platinum-300 text-lg mb-2'>No digest yet for today.</p>
            <p className='text-platinum-500 text-sm'>Check back at 7 AM for your morning briefing.</p>
          </div>
        )}

        {/* Subscribe bar */}
        <div className='rounded-xl p-6 mb-10 text-center' style={{ background: 'linear-gradient(135deg, #080C18, #0D0F12)', border: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '24px', marginBottom: '8px' }}>📬</p>
          <h3 className='text-xl text-white mb-2' style={{ fontFamily: 'var(--font-display)' }}>Get It in Your Inbox</h3>
          <p className='text-platinum-400 text-sm mb-4'>Subscribe to receive the Morning 7 Digest every day at 7 AM.</p>
          <form action='/api/subscribe' method='POST' style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <input type='email' name='email' placeholder='your@email.com' required style={{ flex: 1, padding: '10px 14px', background: 'var(--bg-card-hover)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }} />
            <button type='submit' style={{ padding: '10px 20px', background: 'var(--accent-gold)', color: '#08090B', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Previous digests */}
        {previous.length > 0 && (
          <div>
            <h2 className='text-2xl text-platinum-50 mb-6' style={{ fontFamily: 'var(--font-display)' }}>Previous Digests</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {previous.map((digest) => (
                <div key={digest.id} className='rounded-xl p-5' style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <div className='flex items-center justify-between mb-4'>
                    <h3 className='text-lg text-platinum-100' style={{ fontFamily: 'var(--font-display)', margin: 0 }}>{digest.title}</h3>
                    <p className='text-platinum-500 text-xs font-mono'>
                      {new Date(digest.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </p>
                  </div>
                  <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {digest.bulletins.slice(0, 3).map((bulletin, i) => (
                      <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ flexShrink: 0, color: 'var(--accent-gold)', fontSize: '12px', fontWeight: '700', fontFamily: 'monospace', marginTop: '2px' }}>{String(i + 1).padStart(2, '0')}</span>
                        <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{bulletin}</p>
                      </li>
                    ))}
                    {digest.bulletins.length > 3 && (
                      <p style={{ color: 'var(--text-faint)', fontSize: '12px', margin: '4px 0 0 22px' }}>+{digest.bulletins.length - 3} more updates</p>
                    )}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
