import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const digests = await prisma.morningDigest.findMany({
    orderBy: { date: 'desc' },
  });
  return NextResponse.json({ digests });
}

export async function POST(req: NextRequest) {
  try {
    const { title, date, bulletins, published } = await req.json();

    if (!title || !date || !bulletins || bulletins.length === 0) {
      return NextResponse.json({ error: 'Title, date and bulletins are required' }, { status: 400 });
    }

    const digest = await prisma.morningDigest.create({
      data: {
        title,
        date: new Date(date),
        bulletins,
        published: published || false,
      },
    });

    return NextResponse.json({ id: digest.id }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'A digest already exists for this date' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
