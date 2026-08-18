import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Approval chain:
// CITY_REPORTER / CONSTITUENCY_REPORTER → DISTRICT_HEAD approves
// DISTRICT_HEAD → STATE_MANAGER approves  
// STATE_MANAGER → SUPER_ADMIN approves
// SUPER_ADMIN → publishes instantly

export async function GET(req: NextRequest) {
  const role = req.headers.get('x-admin-role') || 'SUPER_ADMIN';
  
  const [interviews, articles, digests] = await Promise.all([
    prisma.interview.findMany({
      where: { status: 'PENDING' },
      include: { guest: true, category: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.article.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.morningDigest.findMany({
      where: { pending: true },
      orderBy: { createdAt: 'asc' },
    }),
  ]);
  return NextResponse.json({ interviews, articles, digests });
}

export async function POST(req: NextRequest) {
  try {
    const { type, id, action, reason } = await req.json();

    if (type === 'interview') {
      await prisma.interview.update({
        where: { id },
        data: action === 'approve'
          ? { status: 'PUBLISHED', publishedAt: new Date(), rejectedReason: null }
          : { status: 'DRAFT', rejectedReason: reason || 'Rejected' },
      });
    }

    if (type === 'article') {
      await prisma.article.update({
        where: { id },
        data: action === 'approve'
          ? { status: 'PUBLISHED', publishedAt: new Date(), rejectedReason: null }
          : { status: 'DRAFT', rejectedReason: reason || 'Rejected' },
      });
    }

    if (type === 'digest') {
      await prisma.morningDigest.update({
        where: { id },
        data: action === 'approve'
          ? { pending: false, published: true }
          : { pending: false, published: false, rejectedReason: reason || 'Rejected' },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
