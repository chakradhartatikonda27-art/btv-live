import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.adminUser.findUnique({ where: { id }, include: { state: true, district: true, city: true } });
  return NextResponse.json({ user });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  if (body.password) {
    body.password = await hashPassword(body.password);
  }
  const user = await prisma.adminUser.update({ where: { id }, data: body });
  return NextResponse.json(user);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.adminUser.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
