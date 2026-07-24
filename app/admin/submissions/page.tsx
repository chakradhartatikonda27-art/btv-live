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
    <div className='p-8'>
      <div className='mb-8'>
        <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-1'>Admin</p>
        <h1 className='text-3xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
          Submissions
        </h1>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        {[
          { label: 'Pending', count: pending.length, color: '#D4A832' },
          { label: 'Under Review', count: underReview.length, color: '#60a5fa' },
          { label: 'Approved', count: approved.length, color: '#22c55e' },
          { label: 'Rejected', count: rejected.length, color: '#ef4444' },
        ].map((stat) => (
          <div key={stat.label} className='p-4 rounded-xl text-center' style={{ background: '#141619', border: '1px solid #252830' }}>
            <p className='text-2xl font-bold mb-1' style={{ fontFamily: 'var(--font-display)', color: stat.color }}>
              {stat.count}
            </p>
            <p className='text-platinum-400 text-xs'>{stat.label}</p>
          </div>
        ))}
      </div>

      <div className='rounded-xl overflow-hidden' style={{ background: '#141619', border: '1px solid #252830' }}>
        <div className='px-6 py-4 border-b' style={{ borderColor: '#252830' }}>
          <p className='text-platinum-400 text-sm'>{submissions.length} total submissions</p>
        </div>

        {submissions.length === 0 ? (
          <div className='px-6 py-16 text-center'>
            <p className='text-platinum-400 text-sm'>No submissions yet.</p>
          </div>
        ) : (
          <div className='divide-y' style={{ borderColor: '#252830' }}>
            {submissions.map((sub) => (
              <div key={sub.id} className='px-6 py-5'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-1'>
                      <p className='text-platinum-100 font-medium'>{sub.fullName}</p>
                      <span className='text-xs px-2.5 py-0.5 rounded-full font-medium' style={{
                        background: sub.status === 'PENDING' ? 'rgba(212,168,50,0.1)' :
                          sub.status === 'APPROVED' ? 'rgba(34,197,94,0.1)' :
                          sub.status === 'UNDER_REVIEW' ? 'rgba(96,165,250,0.1)' :
                          'rgba(239,68,68,0.1)',
                        color: sub.status === 'PENDING' ? '#D4A832' :
                          sub.status === 'APPROVED' ? '#22c55e' :
                          sub.status === 'UNDER_REVIEW' ? '#60a5fa' :
                          '#ef4444',
                        border: '1px solid currentColor',
                      }}>
                        {sub.status}
                      </span>
                    </div>
                    <p className='text-platinum-400 text-sm'>{sub.profession} {sub.company ? '— ' + sub.company : ''}</p>
                    <div className='flex items-center gap-4 mt-1 text-xs text-platinum-500 font-mono'>
                      <span>{sub.email}</span>
                      {sub.city && <span>· {sub.city}</span>}
                      {sub.industry && <span>· {sub.industry}</span>}
                      <span>· {new Date(sub.submittedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className='mt-3 p-3 rounded-lg text-sm text-platinum-300 leading-relaxed line-clamp-2' style={{ background: '#1C1E23' }}>
                  {sub.achievements}
                </div>

                {sub.videoLink && (
                  <div className='mt-2'>
                    <a href={sub.videoLink} target='_blank' className='text-gold-400 text-xs hover:text-gold-300 transition-colors'>
                      View Video Link
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
