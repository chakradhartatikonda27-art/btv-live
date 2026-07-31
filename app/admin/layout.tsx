'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Video, FileText, Calendar, Users, Newspaper, Sun, Briefcase, Building2, Settings, UserCircle } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/interviews', label: 'Interviews', icon: Video },
  { href: '/admin/articles', label: 'Newsroom', icon: Newspaper },
  { href: '/admin/morning-digest', label: 'Morning Digest', icon: Sun },
  { href: '/admin/opportunities', label: 'Opportunities', icon: Briefcase },
  { href: '/admin/directory', label: 'Directory', icon: Building2 },
  { href: '/admin/submissions', label: 'Submissions', icon: FileText },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/about-team', label: 'About Team', icon: UserCircle },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

function PublishButton() {
  const [publishing, setPublishing] = useState(false);
  const [done, setDone] = useState(false);

  async function handlePublish() {
    setPublishing(true);
    await fetch('/api/admin/revalidate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    setPublishing(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  }

  return (
    <button onClick={handlePublish} disabled={publishing} style={{ background: done ? '#22c55e' : '#CC0000', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer', fontSize: '12px', fontWeight: '700' }}>
      {publishing ? 'Publishing...' : done ? '✓ Published' : '🚀 Publish'}
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return (
      <div style={{ minHeight: '100vh', background: '#08090B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#08090B' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#0D0F12', borderRight: '1px solid #1C1E23', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #1C1E23' }}>
          <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <Image src='/btv-logo.jpg' alt='BTV LIVE' width={36} height={36} style={{ borderRadius: '6px', objectFit: 'contain' }} />
            <div>
              <p style={{ color: '#EDEEF0', fontWeight: '700', fontSize: '14px', margin: 0 }}>BTV LIVE</p>
              <p style={{ color: '#CC0000', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, fontWeight: '700' }}>Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', color: isActive ? '#EDEEF0' : '#7A7D85', fontSize: '13px', fontWeight: isActive ? '600' : '500', marginBottom: '2px', background: isActive ? 'rgba(204,0,0,0.15)' : 'transparent', borderLeft: isActive ? '2px solid #CC0000' : '2px solid transparent' }}>
                <item.icon size={15} color={isActive ? '#CC0000' : '#5C6070'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid #1C1E23' }}>
          <Link href='/' style={{ display: 'block', color: '#7A7D85', fontSize: '12px', textDecoration: 'none', marginBottom: '8px' }}>
            ← View Site
          </Link>
          <Link href='/api/admin/logout' style={{ display: 'block', color: '#CC0000', fontSize: '12px', textDecoration: 'none', fontWeight: '600' }}>
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, marginLeft: '220px', minHeight: '100vh', background: '#08090B' }}>
        {/* Top bar */}
        <div style={{ background: '#0D0F12', borderBottom: '1px solid #1C1E23', padding: '0 24px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '3px', height: '18px', background: '#CC0000', borderRadius: '2px' }} />
            <p style={{ color: '#EDEEF0', fontSize: '13px', fontWeight: '600', margin: 0 }}>BTV LIVE CMS</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PublishButton />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e' }} />
              <p style={{ color: '#7A7D85', fontSize: '11px', margin: 0 }}>Online</p>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}
