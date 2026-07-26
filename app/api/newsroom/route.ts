import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const articles = await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      ...(category ? { category: category as any } : {}),
    },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    take: 50,
  });

  return NextResponse.json({ articles });
}
