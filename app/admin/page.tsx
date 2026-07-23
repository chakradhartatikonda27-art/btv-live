import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const [
    totalInterviews,
    publishedInterviews,
    totalSubmissions,
    pendingSubmissions,
    totalEvents,
    totalSubscribers,
  ] = await Promise.all([
    prisma.interview.count(),
    prisma.interview.count({ where: { status: 'PUBLISHED' } }),
    prisma.submission.count(),
    prisma.submission.count({ where: { status: 'PENDING' } }),
    prisma.event.count(),
    prisma.subscriber.count(),
  ]);

  const recentSubmissions = await prisma.submission.findMany({
    orderBy: { submittedAt: 'desc' },
    take: 5,
  });

  const STATS = [
    { label: 'Total Interviews', value: totalInterviews, sub: publishedInterviews + ' published', color: '#D4A832' },
    { label: 'Submissions', value: totalSubmissions, sub: pendingSubmissions + ' pending review', color: '#E8C35A' },
    { label: 'Events', value: totalEvents, sub: 'all time', color: '#D4A832' },
    { label: 'Subscribers', value: totalSubscribers, sub: 'newsletter', color: '#E8C35A' },
  ];

  return (
    <div className='p-8'>
      <div className='mb-8'>
        <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-1'>Admin</p>
        <h1 className='text-3xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
          Dashboard
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10'>
        {STATS.map((stat) => (
          <div key={stat.label} className='p-6 rounded-xl' style={{ background: '#141619', border: '1px solid #252830' }}>
            <p className='text-platinum-400 text-xs mb-2'>{stat.label}</p>
            <p className='text-4xl font-bold mb-1' style={{ fontFamily: 'var(--font-display)', color: stat.color }}>
              {stat.value}
            </p>
            <p className='text-platinum-500 text-xs'>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className='rounded-xl overflow-hidden' style={{ background: '#141619', border: '1px solid #252830' }}>
        <div className='px-6 py-4 border-b flex items-center justify-between' style={{ borderColor: '#252830' }}>
          <h2 className='text-platinum-50 font-semibold' style={{ fontFamily: 'var(--font-display)' }}>
            Recent Submissions
          </h2>
          <a href='/admin/submissions' className='text-gold-400 text-xs hover:text-gold-300 transition-colors'>
            View All
          </a>
        </div>

        {recentSubmissions.length === 0 ? (
          <div className='px-6 py-10 text-center'>
            <p className='text-platinum-400 text-sm'>No submissions yet.</p>
          </div>
        ) : (
          <div className='divide-y' style={{ borderColor: '#252830' }}>
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className='px-6 py-4 flex items-center justify-between'>
                <div>
                  <p className='text-platinum-100 text-sm font-medium'>{sub.fullName}</p>
                  <p className='text-platinum-400 text-xs mt-0.5'>{sub.profession} — {sub.city}</p>
                </div>
                <div className='flex items-center gap-3'>
                  <span className='text-xs px-2.5 py-1 rounded-full font-medium' style={{
                    background: sub.status === 'PENDING' ? 'rgba(212,168,50,0.1)' : sub.status === 'APPROVED' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    color: sub.status === 'PENDING' ? '#D4A832' : sub.status === 'APPROVED' ? '#22c55e' : '#ef4444',
                    border: sub.status === 'PENDING' ? '1px solid rgba(212,168,50,0.3)' : sub.status === 'APPROVED' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
                  }}>
                    {sub.status}
                  </span>
                  <a href={'/admin/submissions/' + sub.id} className='text-gold-400 text-xs hover:text-gold-300'>
                    Review
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
