import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ articles });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, slug, summary, content, category,
      tags, readTime, featured, status, publishedAt, coverImage,
    } = body;

    if (!title || !content || !slug) {
      return NextResponse.json({ error: 'Title, slug and content are required' }, { status: 400 });
    }

    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'An article with this slug already exists' }, { status: 400 });
    }

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        summary: summary || null,
        content,
        coverImage: coverImage || null,
        category: category || 'BUSINESS',
        tags: tags || [],
        readTime: readTime || null,
        featured: featured || false,
        status: status || 'DRAFT',
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    return NextResponse.json({ id: article.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
