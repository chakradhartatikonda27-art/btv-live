import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const opportunities = await prisma.opportunity.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ opportunities });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, type, company, description, city, state, salary, deadline, applyUrl, applyEmail, featured, status } = body;
    if (!title || !type || !description) return NextResponse.json({ error: 'Title, type and description required' }, { status: 400 });
    const opp = await prisma.opportunity.create({
      data: { title, type, company: company || null, description, city: city || null, state: state || null, salary: salary || null, deadline: deadline ? new Date(deadline) : null, applyUrl: applyUrl || null, applyEmail: applyEmail || null, featured: featured || false, status: status || 'ACTIVE' },
    });
    return NextResponse.json({ id: opp.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
