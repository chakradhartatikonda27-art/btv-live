import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createHash } from 'crypto';

function hashPassword(password: string): string {
  return createHash('sha256').update(password + 'btv_salt_2026').digest('hex');
}

export async function GET() {
  const members = await prisma.teamMember.findMany({
    include: { state: true, district: true, city: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password, phone, role, stateId, districtId, cityId } = await req.json();

    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const existing = await prisma.teamMember.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        fullName,
        email,
        passwordHash: hashPassword(password),
        phone: phone || null,
        role,
        stateId: stateId || null,
        districtId: districtId || null,
        cityId: cityId || null,
      },
    });

    return NextResponse.json({ id: member.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
