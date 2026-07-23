import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminInterviewsPage() {
  const interviews = await prisma.interview.findMany({
    include: { guest: true, category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-1'>Admin</p>
          <h1 className='text-3xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
            Interviews
          </h1>
        </div>
      </div>

      <div className='rounded-xl overflow-hidden' style={{ background: '#141619', border: '1px solid #252830' }}>
        <div className='px-6 py-4 border-b' style={{ borderColor: '#252830' }}>
          <p className='text-platinum-400 text-sm'>{interviews.length} total interviews</p>
        </div>

        {interviews.length === 0 ? (
          <div className='px-6 py-16 text-center'>
            <p className='text-platinum-400 text-sm'>No interviews yet.</p>
          </div>
        ) : (
          <div className='divide-y' style={{ borderColor: '#252830' }}>
            {interviews.map((interview) => (
              <div key={interview.id} className='px-6 py-4 flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-platinum-100 text-sm font-medium truncate'>{interview.title}</p>
                  <div className='flex items-center gap-3 mt-0.5'>
                    <p className='text-platinum-400 text-xs'>{interview.guest.fullName}</p>
                    <span className='text-platinum-600'>·</span>
                    <p className='text-platinum-400 text-xs'>{interview.category.name}</p>
                    <span className='text-platinum-600'>·</span>
                    <p className='text-platinum-500 text-xs font-mono'>{interview.viewCount} views</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 ml-4'>
                  <span className='text-xs px-2.5 py-1 rounded-full font-medium' style={{
                    background: interview.status === 'PUBLISHED' ? 'rgba(34,197,94,0.1)' : interview.status === 'DRAFT' ? 'rgba(212,168,50,0.1)' : 'rgba(100,116,139,0.1)',
                    color: interview.status === 'PUBLISHED' ? '#22c55e' : interview.status === 'DRAFT' ? '#D4A832' : '#64748b',
                    border: interview.status === 'PUBLISHED' ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(212,168,50,0.3)',
                  }}>
                    {interview.status}
                  </span>
                  <a href={'/shows/' + interview.slug} target='_blank' className='text-platinum-400 text-xs hover:text-gold-400 transition-colors'>
                    View
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
