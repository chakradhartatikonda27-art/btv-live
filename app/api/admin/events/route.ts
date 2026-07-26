import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const events = await prisma.event.findMany({
    include: { gallery: { select: { id: true } } },
    orderBy: { scheduledAt: 'desc' },
  });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, description, type, status, scheduledAt, city, venue, coverImageUrl, featured } = body;
    if (!title || !slug || !type || !scheduledAt) return NextResponse.json({ error: 'Title, slug, type and date required' }, { status: 400 });
    const event = await prisma.event.create({
      data: { title, slug, description: description || null, type, status: status || 'UPCOMING', scheduledAt: new Date(scheduledAt), city: city || null, venue: venue || null, coverImageUrl: coverImageUrl || null },
    });
    return NextResponse.json({ id: event.id }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
