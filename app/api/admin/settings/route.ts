import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const stats = await prisma.siteStat.findFirst();
  return NextResponse.json({ stats });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = await prisma.siteStat.findFirst();
    if (existing) {
      await prisma.siteStat.update({ where: { id: existing.id }, data: { storiesFeatured: parseInt(body.storiesFeatured), totalViewers: parseInt(body.totalViewers), awardCeremonies: parseInt(body.awardCeremonies), industriesCovered: parseInt(body.industriesCovered) } });
    } else {
      await prisma.siteStat.create({ data: { storiesFeatured: parseInt(body.storiesFeatured), totalViewers: parseInt(body.totalViewers), awardCeremonies: parseInt(body.awardCeremonies), industriesCovered: parseInt(body.industriesCovered) } });
    }
    return NextResponse.json({ success: true });
  } catch (err) { console.error(err); return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
