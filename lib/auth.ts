import { prisma } from './prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    
    const user = await prisma.adminUser.findFirst({
      where: { id: token, active: true },
      include: { state: true, district: true, city: true },
    });
    return user;
  } catch {
    return null;
  }
}

export function canAccess(role: string, section: string): boolean {
  const permissions: Record<string, string[]> = {
    SUPER_ADMIN: ['*'],
    MANAGER: ['interviews', 'articles', 'morning-digest', 'opportunities', 'directory', 'events', 'team'],
    REPORTER: ['interviews', 'articles', 'morning-digest'],
    EXECUTIVE: ['opportunities', 'directory', 'events'],
  };
  
  const allowed = permissions[role] || [];
  return allowed.includes('*') || allowed.includes(section);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
