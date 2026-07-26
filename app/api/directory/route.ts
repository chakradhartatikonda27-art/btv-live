import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const businesses = await prisma.business.findMany({
    where: {
      ...(category ? { category: category as any } : {}),
    },
    orderBy: [{ featured: 'desc' }, { verified: 'desc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ businesses });
}
