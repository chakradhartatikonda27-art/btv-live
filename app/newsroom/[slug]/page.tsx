import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } }).catch(() => null);
  
  if (!article) return { title: 'Article | BTV LIVE' };
  
  return {
    title: `${article.title} | BTV LIVE`,
    description: article.summary || article.content?.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.summary || '',
      images: article.coverImage ? [{ url: article.coverImage }] : [],
      type: 'article',
    },
    alternates: { canonical: `https://www.btvlive.net/newsroom/${slug}` },
  };
}
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 300;

const CATEGORY_LABELS: Record<string, string> = {
  BUSINESS: 'Business',
  TECHNOLOGY: 'Technology',
  HEALTHCARE: 'Healthcare',
  FINANCE: 'Finance',
  REAL_ESTATE: 'Real Estate',
  EDUCATION: 'Education',
  SPORTS: 'Sports',
  ENTERTAINMENT: 'Entertainment',
  POLITICS: 'Politics',
  AGRICULTURE: 'Agriculture',
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || article.status !== 'PUBLISHED') notFound();

  await prisma.article.update({
    where: { id: article.id },
    data: { viewCount: { increment: 1 } },
  });

  const related = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      category: article.category,
      id: { not: article.id },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main className='min-h-screen pt-20 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-4xl mx-auto px-4 md:px-8'>

        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-platinum-500 mb-8 pt-6'>
          <a href='/' className='hover:text-gold-400 transition-colors'>Home</a>
          <span>/</span>
          <a href='/newsroom' className='hover:text-gold-400 transition-colors'>Newsroom</a>
          <span>/</span>
          <span className='text-platinum-300 truncate'>{article.title}</span>
        </div>

        {/* Category + meta */}
        <div className='flex items-center gap-3 mb-6 flex-wrap'>
          <span className='px-3 py-1 rounded-full text-xs font-bold' style={{ background: 'rgba(212,168,50,0.1)', color: '#D4A832', border: '1px solid rgba(212,168,50,0.3)' }}>
            {CATEGORY_LABELS[article.category] || article.category}
          </span>
          {article.readTime && (
            <span className='text-platinum-500 text-xs font-mono'>{article.readTime} min read</span>
          )}
          {article.publishedAt && (
            <span className='text-platinum-500 text-xs font-mono'>
              {new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          )}
          <span className='text-platinum-500 text-xs font-mono'>{article.viewCount} views</span>
        </div>

        {/* Title */}
        <h1 className='text-3xl md:text-5xl text-white mb-6 leading-tight' style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
          {article.title}
        </h1>

        {/* Summary */}
        {article.summary && (
          <p className='text-platinum-300 text-lg leading-relaxed mb-8 border-l-4 pl-4' style={{ borderColor: '#D4A832' }}>
            {article.summary}
          </p>
        )}

        {/* Cover image */}
        {article.coverImage && (
          <div className='rounded-xl overflow-hidden mb-8 h-64 md:h-96'>
            <img src={article.coverImage} alt={article.title} className='w-full h-full object-cover' />
          </div>
        )}

        {/* Content */}
        <div className='prose prose-invert max-w-none mb-12' style={{ color: '#D4D6DA', lineHeight: 1.8, fontSize: '16px' }}>
          {article.content.split('\n').map((para, i) => (
            para.trim() ? <p key={i} style={{ marginBottom: '16px', color: '#D4D6DA' }}>{para}</p> : null
          ))}
        </div>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-12'>
            {article.tags.map((tag) => (
              <span key={tag} className='text-xs text-platinum-400 px-3 py-1 rounded-full' style={{ background: '#1C1E23', border: '1px solid #252830' }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h2 className='text-2xl text-platinum-50 mb-6' style={{ fontFamily: 'var(--font-display)' }}>Related Articles</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
              {related.map((r) => (
                <Link key={r.id} href={'/newsroom/' + r.slug} className='group block rounded-xl p-4' style={{ background: '#141619', border: '1px solid #252830' }}>
                  <span className='text-xs text-gold-500 font-mono uppercase tracking-wide mb-2 block'>{CATEGORY_LABELS[r.category]}</span>
                  <h3 className='text-platinum-100 text-sm font-medium group-hover:text-gold-400 transition-colors line-clamp-2' style={{ fontFamily: 'var(--font-display)' }}>
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
