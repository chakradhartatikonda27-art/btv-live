import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message, type } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Name, email, subject and message required' }, { status: 400 });
    }
    // Store as a submission for now
    await prisma.submission.create({
      data: {
        fullName: name,
        email,
        phone: phone || '',
        profession: type || 'GENERAL',
        company: '',
        industry: 'Contact Enquiry',
        city: '',
        achievements: subject + '\n\n' + message,
        legacyStory: message,
        status: 'PENDING',
      },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
