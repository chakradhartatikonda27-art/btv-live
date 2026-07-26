import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDirectoryPage() {
  const businesses = await prisma.business.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Management</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Business Directory</h1>
        </div>
        <Link href='/admin/directory/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + Add Business
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{businesses.length} businesses listed</p>
        </div>
        {businesses.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>No businesses yet.</p>
          </div>
        ) : (
          <div>
            {businesses.map((biz, i) => (
              <div key={biz.id} style={{ padding: '16px 24px', borderBottom: i < businesses.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: 0 }}>{biz.name}</p>
                    {biz.verified && <span style={{ fontSize: '10px', color: '#22c55e' }}>✓ Verified</span>}
                    {biz.featured && <span style={{ fontSize: '10px', color: '#D4A832' }}>★ Featured</span>}
                  </div>
                  <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{biz.category.replace('_', ' ')} {biz.city ? '· ' + biz.city : ''}</p>
                </div>
                <Link href={'/admin/directory/' + biz.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
