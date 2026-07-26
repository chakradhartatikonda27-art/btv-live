import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const interviews = await prisma.interview.findMany({
    include: { guest: true, category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ interviews });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, summary, videoUrl, youtubeVideoId, thumbnailUrl, duration,
      categorySlug, featured, status, publishedAt, guestName, guestHeadline, guestCompany } = body;

    if (!title || !slug) return NextResponse.json({ error: 'Title and slug required' }, { status: 400 });

    // Find or create category
    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 400 });

    // Create guest
    const guestSlug = slug + '-guest';
    const guest = await prisma.guest.upsert({
      where: { slug: guestSlug },
      create: { fullName: guestName, slug: guestSlug, headline: guestHeadline || null, company: guestCompany || null },
      update: { fullName: guestName, headline: guestHeadline || null, company: guestCompany || null },
    });

    const interview = await prisma.interview.create({
      data: {
        title, slug, summary: summary || null, videoUrl: videoUrl || null,
        youtubeVideoId: youtubeVideoId || null, thumbnailUrl: thumbnailUrl || null,
        duration: duration || null, featured: featured || false,
        status: status || 'DRAFT', publishedAt: publishedAt ? new Date(publishedAt) : null,
        categoryId: category.id, guestId: guest.id,
      },
    });

    return NextResponse.json({ id: interview.id }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
