import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import InterviewCard from '@/components/interviews/InterviewCard';

export const revalidate = 300;

export default async function InterviewPage({ params }) {
  const { slug } = await params;

  const interview = await prisma.interview.findUnique({
    where: { slug },
    include: { guest: true, category: true, tags: true },
  });

  if (!interview || interview.status !== 'PUBLISHED') notFound();

  await prisma.interview.update({
    where: { id: interview.id },
    data: { viewCount: { increment: 1 } },
  });

  const related = await prisma.interview.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: interview.categoryId,
      id: { not: interview.id },
    },
    include: { guest: true, category: true, tags: true },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  function formatDuration(seconds) {
    if (!seconds) return '';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return h + 'h ' + m + 'm';
    return m + ' min';
  }

  return (
    <main className='min-h-screen pt-20 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-6xl mx-auto px-4 md:px-8'>
        <div className='flex items-center gap-2 text-sm text-platinum-500 mb-8 pt-6'>
          <a href='/' className='hover:text-gold-400 transition-colors'>Home</a>
          <span>/</span>
          <a href='/shows' className='hover:text-gold-400 transition-colors'>Interviews</a>
          <span>/</span>
          <span className='text-platinum-300 truncate'>{interview.title}</span>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <div className='lg:col-span-2'>
            <div className='inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4 border' style={{ background: 'rgba(212,168,50,0.1)', borderColor: 'rgba(212,168,50,0.3)' }}>
              <span className='text-gold-400 text-xs tracking-widest uppercase font-mono'>
                {interview.category.name}
              </span>
            </div>

            <h1 className='text-3xl md:text-5xl text-white mb-6 leading-tight' style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {interview.title}
            </h1>

            <div className='flex items-center gap-4 mb-8 flex-wrap'>
              <div className='flex items-center gap-2'>
                <div className='w-9 h-9 rounded-full flex items-center justify-center text-gold-500 font-bold text-sm' style={{ background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', fontFamily: 'var(--font-display)' }}>
                  {interview.guest.fullName.charAt(0)}
                </div>
                <div>
                  <p className='text-platinum-100 text-sm font-semibold'>{interview.guest.fullName}</p>
                  {interview.guest.headline && (
                    <p className='text-platinum-400 text-xs'>{interview.guest.headline}</p>
                  )}
                </div>
              </div>
              {interview.duration && (
                <span className='text-platinum-400 text-xs font-mono border-l pl-4' style={{ borderColor: '#252830' }}>
                  {formatDuration(interview.duration)}
                </span>
              )}
              <span className='text-platinum-400 text-xs font-mono'>{interview.viewCount} views</span>
            </div>

            <div className='relative rounded-xl overflow-hidden mb-8' style={{ aspectRatio: '16/9', background: '#141619', boxShadow: '0 0 0 1px rgba(212,168,50,0.3)' }}>
              <iframe
                src={'https://www.youtube.com/embed/' + interview.youtubeVideoId + '?rel=0&modestbranding=1'}
                className='w-full h-full'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>

            {interview.tags.length > 0 && (
              <div className='flex flex-wrap gap-2 mb-8'>
                {interview.tags.map((tag) => (
                  <span key={tag.id} className='text-xs text-platinum-400 px-3 py-1 rounded-full' style={{ background: '#1C1E23', border: '1px solid #252830' }}>
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {interview.summary && (
              <div className='rounded-xl p-6 mb-8' style={{ background: '#141619', border: '1px solid #252830' }}>
                <h2 className='text-xl text-gold-400 mb-3' style={{ fontFamily: 'var(--font-display)' }}>
                  About This Interview
                </h2>
                <p className='text-platinum-300 leading-relaxed text-sm'>{interview.summary}</p>
              </div>
            )}
          </div>

          <div className='lg:col-span-1'>
            <div className='rounded-xl p-6 sticky top-24' style={{ background: '#141619', border: '1px solid #252830' }}>
              <h3 className='text-lg text-platinum-50 mb-4' style={{ fontFamily: 'var(--font-display)' }}>
                About the Guest
              </h3>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-14 h-14 rounded-full flex items-center justify-center text-gold-500 font-bold text-xl flex-shrink-0' style={{ background: 'rgba(212,168,50,0.1)', border: '2px solid rgba(212,168,50,0.3)', fontFamily: 'var(--font-display)' }}>
                  {interview.guest.fullName.charAt(0)}
                </div>
                <div>
                  <p className='text-platinum-50 font-semibold'>{interview.guest.fullName}</p>
                  {interview.guest.headline && (
                    <p className='text-platinum-400 text-xs mt-0.5'>{interview.guest.headline}</p>
                  )}
                </div>
              </div>
              {interview.guest.company && (
                <div className='flex items-center gap-2 text-sm text-platinum-300 mb-4'>
                  <span className='text-gold-600'>Company:</span>
                  <span>{interview.guest.company}</span>
                </div>
              )}
              <a href='/apply' className='mt-2 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full w-full justify-center' style={{ background: '#D4A832', color: '#08090B' }}>
                Nominate Like This
              </a>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className='mt-16'>
            <div className='mb-8'>
              <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-2'>More Like This</p>
              <h2 className='text-3xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
                Related Interviews
              </h2>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {related.map((r) => (
                <InterviewCard key={r.id} interview={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
