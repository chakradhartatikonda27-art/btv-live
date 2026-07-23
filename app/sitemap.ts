import { prisma } from '@/lib/prisma';

export default async function sitemap() {
  const interviews = await prisma.interview.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  });

  const events = await prisma.event.findMany({
    select: { slug: true, updatedAt: true },
  });

  const staticPages = [
    { url: 'https://btv-live-72s3.vercel.app', lastModified: new Date() },
    { url: 'https://btv-live-72s3.vercel.app/shows', lastModified: new Date() },
    { url: 'https://btv-live-72s3.vercel.app/events', lastModified: new Date() },
    { url: 'https://btv-live-72s3.vercel.app/about', lastModified: new Date() },
    { url: 'https://btv-live-72s3.vercel.app/apply', lastModified: new Date() },
  ];

  const interviewPages = interviews.map((i) => ({
    url: 'https://btv-live-72s3.vercel.app/shows/' + i.slug,
    lastModified: i.updatedAt,
  }));

  const eventPages = events.map((e) => ({
    url: 'https://btv-live-72s3.vercel.app/events/' + e.slug,
    lastModified: e.updatedAt,
  }));

  return [...staticPages, ...interviewPages, ...eventPages];
}
