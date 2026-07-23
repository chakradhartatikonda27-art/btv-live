import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stateId = searchParams.get('stateId');
  const districtId = searchParams.get('districtId');

  if (districtId) {
    const cities = await prisma.city.findMany({
      where: { districtId },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ cities });
  }

  if (stateId) {
    const districts = await prisma.district.findMany({
      where: { stateId },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ districts });
  }

  const states = await prisma.state.findMany({
    orderBy: { name: 'asc' },
  });
  return NextResponse.json({ states });
}
