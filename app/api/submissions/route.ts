import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      city,
      profession,
      company,
      industry,
      achievements,
      legacyStory,
      videoLink,
      mediaUrls,
    } = body;

    if (!fullName || !email || !profession || !achievements || !legacyStory) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const submission = await prisma.submission.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        city: city || null,
        profession,
        company: company || null,
        industry: industry || null,
        achievements,
        legacyStory,
        videoLink: videoLink || null,
        mediaUrls: mediaUrls || [],
      },
    });

    return NextResponse.json({ id: submission.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
