import Link from 'next/link';

export default function MorningDigestTeaser({ digest }: { digest: any }) {
  if (!digest) return null;

  return (
    <section style={{ padding: '60px 16px', background: '#0D0F12', borderTop: '1px solid #1C1E23', borderBottom: '1px solid #1C1E23' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', borderRadius: '999px', padding: '6px 14px' }}>
              <span style={{ fontSize: '16px' }}>☀️</span>
              <span style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: '700' }}>Morning 7 Digest</span>
            </div>
            <span style={{ color: '#5C6070', fontSize: '12px', fontFamily: 'monospace' }}>
              {new Date(digest.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </span>
          </div>
          <Link href='/morning-digest' style={{ color: '#D4A832', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
            View All Digests →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
          {digest.bulletins.slice(0, 7).map((bulletin: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '14px', borderRadius: '10px', background: '#141619', border: '1px solid #252830' }}>
              <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(212,168,50,0.15)', border: '1px solid rgba(212,168,50,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontSize: '10px', fontWeight: '700', fontFamily: 'monospace' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{ color: '#D4D6DA', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>{bulletin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
