import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Super Admin
    if (email === 'admin@btvlive.net' && password === 'btv@admin2026') {
      const res = NextResponse.json({ ok: true, role: 'SUPER_ADMIN', name: 'Super Admin', id: 'super_admin' });
      res.cookies.set('admin_token', 'super_admin', { httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 60 * 24 * 7, path: '/' });
      return res;
    }

    // DB users
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !user.active) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const valid = await verifyPassword(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    await prisma.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const res = NextResponse.json({ ok: true, role: user.role, name: user.name, id: user.id });
    res.cookies.set('admin_token', user.id, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 60 * 60 * 24 * 7, path: '/' });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
