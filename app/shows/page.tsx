import { prisma } from '@/lib/prisma';
import FeaturedStories from '@/components/home/FeaturedStories';
import type { Metadata } from 'next';

export const revalidate = 120;

export const metadata: Metadata = {
  title: 'Interviews and Shows',
  description: 'Browse all BTV LIVE interviews.',
};

const CATEGORY_LABELS = {
  BUSINESS_LEADERS: 'Business Leaders',
  DOCTORS_HEALTHCARE: 'Doctors and Healthcare',
  CAs_LEGAL: 'CAs and Legal',
  INNOVATORS_TECH: 'Innovators and Tech',
  CELEBRITIES: 'Celebrities',
  SPORTS_EVENTS: 'Sports and Events',
  REAL_ESTATE: 'Real Estate',
  EDUCATION: 'Education',
};

export default async function ShowsPage({ searchParams }: { searchParams: Promise<{ category?: string; sort?: string }> }) {
  const params = await searchParams;
  const category = params.category;
  const sort = params.sort ?? 'latest';

  const interviews = await prisma.interview.findMany({
    where: {
      status: 'PUBLISHED',
      ...(category ? { category: { slug: category as any } } : {}),
    },
    include: { guest: true, category: true, tags: true },
    orderBy: sort === 'popular' ? { viewCount: 'desc' } : { publishedAt: 'desc' },
  });

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <main className='min-h-screen pt-24 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='mb-12'>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-2'>
            BTV LIVE
          </p>
          <h1 className='text-4xl md:text-6xl text-platinum-50 mb-4' style={{ fontFamily: 'var(--font-display)' }}>
            All Interviews
          </h1>
          <p className='text-platinum-400 text-base'>{interviews.length} stories published</p>
        </div>

        <div className='flex flex-wrap gap-3 mb-10'>
          <div className='flex flex-wrap gap-2'>
            <a href='/shows' className='px-4 py-2 rounded-full text-sm font-medium' style={{ background: category ? '#141619' : '#D4A832', color: category ? '#9A9DA5' : '#08090B', border: category ? '1px solid #252830' : '1px solid #D4A832' }}>
              All
            </a>
            {categories.map((cat) => (
              <a key={cat.id} href={'/shows?category=' + cat.slug} className='px-4 py-2 rounded-full text-sm font-medium' style={{ background: category === cat.slug ? '#D4A832' : '#141619', color: category === cat.slug ? '#08090B' : '#9A9DA5', border: category === cat.slug ? '1px solid #D4A832' : '1px solid #252830' }}>
                {CATEGORY_LABELS[cat.slug] || cat.name}
              </a>
            ))}
          </div>
          <div className='ml-auto flex gap-2'>
            <a href='/shows' className='px-4 py-2 rounded-full text-sm font-medium' style={{ background: sort === 'latest' ? '#1C1E23' : '#141619', color: sort === 'latest' ? '#EDEEF0' : '#9A9DA5', border: '1px solid #252830' }}>
              Latest
            </a>
            <a href='/shows?sort=popular' className='px-4 py-2 rounded-full text-sm font-medium' style={{ background: sort === 'popular' ? '#1C1E23' : '#141619', color: sort === 'popular' ? '#EDEEF0' : '#9A9DA5', border: '1px solid #252830' }}>
              Most Viewed
            </a>
          </div>
        </div>

        {interviews.length === 0 ? (
          <div className='text-center py-24'>
            <p className='text-platinum-400 text-lg'>No interviews found.</p>
            <a href='/shows' className='text-gold-400 text-sm mt-4 inline-block'>Clear filters</a>
          </div>
        ) : (
          <FeaturedStories stories={interviews} />
        )}
      </div>
    </main>
  );
}
