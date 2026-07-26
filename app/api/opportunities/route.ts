import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  const opportunities = await prisma.opportunity.findMany({
    where: {
      status: 'ACTIVE',
      ...(type ? { type: type as any } : {}),
    },
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ opportunities });
}
