import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminMorningDigestPage() {
  const digests = await prisma.morningDigest.findMany({
    orderBy: { date: 'desc' },
    take: 30,
  });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Content</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Morning Digest</h1>
        </div>
        <Link href='/admin/morning-digest/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Digest
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{digests.length} digests published</p>
        </div>

        {digests.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No digests yet.</p>
            <Link href='/admin/morning-digest/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>
              Create today digest
            </Link>
          </div>
        ) : (
          <div>
            {digests.map((digest, i) => (
              <div key={digest.id} style={{ padding: '16px 24px', borderBottom: i < digests.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px' }}>{digest.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>
                      {new Date(digest.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{digest.bulletins.length} bulletins</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', background: digest.published ? 'rgba(34,197,94,0.1)' : 'rgba(212,168,50,0.1)', color: digest.published ? '#22c55e' : '#D4A832', border: '1px solid currentColor' }}>
                    {digest.published ? 'Published' : 'Draft'}
                  </span>
                  <Link href={'/admin/morning-digest/' + digest.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
