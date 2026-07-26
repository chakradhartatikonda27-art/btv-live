import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const digest = await prisma.morningDigest.findUnique({ where: { id } });
  return NextResponse.json({ digest });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const digest = await prisma.morningDigest.update({ where: { id }, data: body });
  return NextResponse.json(digest);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.morningDigest.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
