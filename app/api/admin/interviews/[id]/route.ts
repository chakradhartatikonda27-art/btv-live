import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const interview = await prisma.interview.findUnique({ where: { id }, include: { guest: true, category: true } });
  return NextResponse.json({ interview });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const interview = await prisma.interview.update({ where: { id }, data: body });
  return NextResponse.json(interview);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.interview.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
