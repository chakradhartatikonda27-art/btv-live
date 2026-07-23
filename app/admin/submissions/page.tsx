import { prisma } from '@/lib/prisma';

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.submission.findMany({
    orderBy: { submittedAt: 'desc' },
  });

  const pending = submissions.filter((s) => s.status === 'PENDING');
  const underReview = submissions.filter((s) => s.status === 'UNDER_REVIEW');
  const approved = submissions.filter((s) => s.status === 'APPROVED');
  const rejected = submissions.filter((s) => s.status === 'REJECTED');

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#CC0000', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Nominations</p>
        <h1 style={{ color: '#1A1A2E', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Submissions</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Pending', count: pending.length, bg: '#FEF3C7', color: '#D97706' },
          { label: 'Under Review', count: underReview.length, bg: '#DBEAFE', color: '#2563EB' },
          { label: 'Approved', count: approved.length, bg: '#DCFCE7', color: '#16A34A' },
          { label: 'Rejected', count: rejected.length, bg: '#FEE2E2', color: '#DC2626' },
        ].map((stat) => (
          <div key={stat.label} style={{ padding: '20px', borderRadius: '12px', background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: stat.color, margin: '0 0 4px' }}>{stat.count}</p>
            <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>{submissions.length} total submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px', margin: 0 }}>No submissions yet.</p>
          </div>
        ) : (
          <div>
            {submissions.map((sub, i) => (
              <div key={sub.id} style={{ padding: '20px 24px', borderBottom: i < submissions.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <p style={{ color: '#1A1A2E', fontSize: '15px', fontWeight: '600', margin: 0 }}>{sub.fullName}</p>
                      <span style={{
                        fontSize: '11px', padding: '2px 8px', borderRadius: '999px', fontWeight: '600',
                        background: sub.status === 'PENDING' ? '#FEF3C7' : sub.status === 'APPROVED' ? '#DCFCE7' : sub.status === 'UNDER_REVIEW' ? '#DBEAFE' : '#FEE2E2',
                        color: sub.status === 'PENDING' ? '#D97706' : sub.status === 'APPROVED' ? '#16A34A' : sub.status === 'UNDER_REVIEW' ? '#2563EB' : '#DC2626',
                      }}>
                        {sub.status}
                      </span>
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 2px' }}>{sub.profession}{sub.company ? ' — ' + sub.company : ''}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#9CA3AF', fontFamily: 'monospace' }}>
                      <span>{sub.email}</span>
                      {sub.city && <span>· {sub.city}</span>}
                      {sub.industry && <span>· {sub.industry}</span>}
                      <span>· {new Date(sub.submittedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', fontSize: '13px', color: '#374151', lineHeight: 1.5 }}>
                  {sub.achievements.substring(0, 200)}...
                </div>
                {sub.videoLink && (
                  <a href={sub.videoLink} target='_blank' style={{ color: '#CC0000', fontSize: '12px', textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>
                    View Video Link
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
