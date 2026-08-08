import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.btvlive.net';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/shows`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/newsroom`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/morning-digest`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/opportunities`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/directory`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/apply`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // Dynamic interview pages
  const interviews = await prisma.interview.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  }).catch(() => []);

  const interviewPages = interviews.map(i => ({
    url: `${baseUrl}/shows/${i.slug}`,
    lastModified: i.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic article pages
  const articles = await prisma.article.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  }).catch(() => []);

  const articlePages = articles.map(a => ({
    url: `${baseUrl}/newsroom/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...interviewPages, ...articlePages];
}
