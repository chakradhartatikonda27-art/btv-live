import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const members = await prisma.aboutTeam.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
  });
  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, bio, photoUrl, photoType, order, active } = body;
    if (!name || !role) return NextResponse.json({ error: 'Name and role required' }, { status: 400 });
    const member = await prisma.aboutTeam.create({
      data: { name, role, bio: bio || null, photoUrl: photoUrl || null, photoType: photoType || 'url', order: order || 0, active: active !== false },
    });
    return NextResponse.json({ id: member.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
