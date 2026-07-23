import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminInterviewsPage() {
  const interviews = await prisma.interview.findMany({
    include: { guest: true, category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#CC0000', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Content</p>
        <h1 style={{ color: '#1A1A2E', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Interviews</h1>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>{interviews.length} total interviews</p>
        </div>

        {interviews.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px', margin: 0 }}>No interviews yet.</p>
          </div>
        ) : (
          <div>
            {interviews.map((interview, i) => (
              <div key={interview.id} style={{ padding: '16px 24px', borderBottom: i < interviews.length - 1 ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#1A1A2E', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{interview.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{interview.guest.fullName}</p>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{interview.category.name}</p>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <p style={{ color: '#9CA3AF', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{interview.viewCount} views</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600',
                    background: interview.status === 'PUBLISHED' ? '#DCFCE7' : interview.status === 'DRAFT' ? '#FEF3C7' : '#F3F4F6',
                    color: interview.status === 'PUBLISHED' ? '#16A34A' : interview.status === 'DRAFT' ? '#D97706' : '#6B7280',
                  }}>
                    {interview.status}
                  </span>
                  <a href={'/shows/' + interview.slug} target='_blank' style={{ color: '#CC0000', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>View</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
