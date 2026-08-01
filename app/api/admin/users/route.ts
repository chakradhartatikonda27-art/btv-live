import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  const users = await prisma.adminUser.findMany({
    include: { state: true, district: true, city: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, stateId, districtId, cityId } = await req.json();
    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: 'Name, email, password and role required' }, { status: 400 });
    }
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    
    const hashed = await hashPassword(password);
    const user = await prisma.adminUser.create({
      data: {
        name, email, password: hashed, role,
        stateId: stateId || null,
        districtId: districtId || null,
        cityId: cityId || null,
      },
    });
    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
