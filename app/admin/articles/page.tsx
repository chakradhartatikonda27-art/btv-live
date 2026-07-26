import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const CATEGORY_LABELS: Record<string, string> = {
    BUSINESS: 'Business', TECHNOLOGY: 'Technology', HEALTHCARE: 'Healthcare',
    FINANCE: 'Finance', REAL_ESTATE: 'Real Estate', EDUCATION: 'Education',
    SPORTS: 'Sports', ENTERTAINMENT: 'Entertainment', POLITICS: 'Politics', AGRICULTURE: 'Agriculture',
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Newsroom</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Articles</h1>
        </div>
        <Link href='/admin/articles/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + New Article
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{articles.length} total articles</p>
        </div>

        {articles.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No articles yet.</p>
            <Link href='/admin/articles/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>
              Write your first article
            </Link>
          </div>
        ) : (
          <div>
            {articles.map((article, i) => (
              <div key={article.id} style={{ padding: '16px 24px', borderBottom: i < articles.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{article.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{CATEGORY_LABELS[article.category] || article.category}</p>
                    <span style={{ color: '#252830' }}>·</span>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{article.viewCount} views</p>
                    {article.readTime && <><span style={{ color: '#252830' }}>·</span><p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{article.readTime} min read</p></>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600',
                    background: article.status === 'PUBLISHED' ? 'rgba(34,197,94,0.1)' : article.status === 'DRAFT' ? 'rgba(212,168,50,0.1)' : 'rgba(100,116,139,0.1)',
                    color: article.status === 'PUBLISHED' ? '#22c55e' : article.status === 'DRAFT' ? '#D4A832' : '#64748b',
                    border: '1px solid currentColor',
                  }}>
                    {article.status}
                  </span>
                  <Link href={'/admin/articles/' + article.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <Link href={'/newsroom/' + article.slug} target='_blank' style={{ color: '#9A9DA5', fontSize: '12px', textDecoration: 'none' }}>View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
