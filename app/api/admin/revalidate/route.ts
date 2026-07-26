import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { paths } = await req.json();
    const allPaths = paths || ['/', '/shows', '/newsroom', '/morning-digest', '/opportunities', '/directory', '/events', '/about'];
    
    for (const path of allPaths) {
      revalidatePath(path);
    }
    
    return NextResponse.json({ revalidated: true, paths: allPaths });
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
