import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const businesses = await prisma.business.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ businesses });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const biz = await prisma.business.create({ data: { ...body, coverImage: body.coverImage || null, phone: body.phone || null, whatsapp: body.whatsapp || null, email: body.email || null, website: body.website || null, address: body.address || null } });
    return NextResponse.json({ id: biz.id }, { status: 201 });
  } catch (err) { console.error(err); return NextResponse.json({ error: 'Server error' }, { status: 500 }); }
}
