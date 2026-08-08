import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json({ settings });
  } catch (err) {
    return NextResponse.json({ settings: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const existing = await prisma.siteSettings.findFirst();
    const data = {
      youtubeUrl: body.youtubeUrl,
      instagramUrl: body.instagramUrl,
      whatsappNumber: body.whatsappNumber,
      storiesFeatured: parseInt(body.storiesFeatured) || 500,
      totalViewers: parseInt(body.totalViewers) || 1,
      awardCeremonies: parseInt(body.awardCeremonies) || 50,
      industriesCovered: parseInt(body.industriesCovered) || 12,
      tickerMessages: body.tickerMessages || [],
      welcomeTitle: body.welcomeTitle,
      welcomeDesc: body.welcomeDesc,
      missionText: body.missionText,
      footerTagline: body.footerTagline,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone,
      theme: body.theme || 'dark',
      youtubeVideos: body.youtubeVideos || [],
      instagramReels: body.instagramReels || [],
    };
    if (existing) {
      await prisma.siteSettings.update({ where: { id: existing.id }, data });
    } else {
      await prisma.siteSettings.create({ data });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
