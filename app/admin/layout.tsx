'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LayoutDashboard, Video, FileText, Calendar, Users, Newspaper, Sun, Briefcase, Building2, Settings, UserCircle, Shield } from 'lucide-react';

const ALL_NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['SUPER_ADMIN', 'MANAGER', 'REPORTER', 'EXECUTIVE'] },
  { href: '/admin/interviews', label: 'Interviews', icon: Video, roles: ['SUPER_ADMIN', 'MANAGER', 'REPORTER'] },
  { href: '/admin/articles', label: 'Newsroom', icon: Newspaper, roles: ['SUPER_ADMIN', 'MANAGER', 'REPORTER'] },
  { href: '/admin/morning-digest', label: 'Morning Digest', icon: Sun, roles: ['SUPER_ADMIN', 'MANAGER', 'REPORTER'] },
  { href: '/admin/opportunities', label: 'Opportunities', icon: Briefcase, roles: ['SUPER_ADMIN', 'MANAGER', 'EXECUTIVE'] },
  { href: '/admin/directory', label: 'Directory', icon: Building2, roles: ['SUPER_ADMIN', 'MANAGER', 'EXECUTIVE'] },
  { href: '/admin/events', label: 'Events', icon: Calendar, roles: ['SUPER_ADMIN', 'MANAGER', 'EXECUTIVE'] },
  { href: '/admin/submissions', label: 'Submissions', icon: FileText, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { href: '/admin/users', label: 'Users', icon: Shield, roles: ['SUPER_ADMIN', 'MANAGER'] },
  { href: '/admin/team', label: 'Team', icon: Users, roles: ['SUPER_ADMIN'] },
  { href: '/admin/about-team', label: 'About Team', icon: UserCircle, roles: ['SUPER_ADMIN'] },
  { href: '/admin/settings', label: 'Settings', icon: Settings, roles: ['SUPER_ADMIN', 'MANAGER'] },
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
  const router = useRouter();
  const [role, setRole] = useState('SUPER_ADMIN');
  const [name, setName] = useState('Admin');
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem('btv_admin_auth');
    const storedRole = localStorage.getItem('btv_admin_role') || 'SUPER_ADMIN';
    const storedName = localStorage.getItem('btv_admin_name') || 'Admin';
    
    if (auth) {
      setAuthed(true);
      setRole(storedRole);
      setName(storedName);
    } else if (pathname !== '/admin/login') {
      router.push('/admin/login');
    }
    setChecking(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return (
      <div style={{ minHeight: '100vh', background: '#08090B' }}>
        {children}
      </div>
    );
  }

  if (checking) return <div style={{ minHeight: '100vh', background: '#08090B' }} />;
  if (!authed) return null;

  const navItems = ALL_NAV_ITEMS.filter(item => item.roles.includes(role));

  const ROLE_COLORS: Record<string, string> = {
    SUPER_ADMIN: '#D4A832',
    MANAGER: '#3B82F6',
    REPORTER: '#22C55E',
    EXECUTIVE: '#8B5CF6',
  };

  const ROLE_LABELS: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    MANAGER: 'Manager',
    REPORTER: 'Reporter',
    EXECUTIVE: 'Executive',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#08090B' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', flexShrink: 0, background: '#0D0F12', borderRight: '1px solid #1C1E23', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '16px', borderBottom: '1px solid #1C1E23' }}>
          <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '12px' }}>
            <Image src='/btv-logo.jpg' alt='BTV LIVE' width={32} height={32} style={{ borderRadius: '6px', objectFit: 'contain' }} />
            <div>
              <p style={{ color: '#EDEEF0', fontWeight: '700', fontSize: '13px', margin: 0 }}>BTV LIVE</p>
              <p style={{ color: '#CC0000', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>CMS</p>
            </div>
          </Link>
          {/* User info */}
          <div style={{ background: '#141619', borderRadius: '8px', padding: '8px 10px', border: '1px solid #252830' }}>
            <p style={{ color: '#EDEEF0', fontSize: '12px', fontWeight: '600', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
            <span style={{ fontSize: '10px', fontWeight: '700', color: ROLE_COLORS[role], fontFamily: 'monospace' }}>{ROLE_LABELS[role]}</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: '8px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '8px', textDecoration: 'none', color: isActive ? '#EDEEF0' : '#7A7D85', fontSize: '13px', fontWeight: isActive ? '600' : '500', marginBottom: '2px', background: isActive ? 'rgba(204,0,0,0.12)' : 'transparent', borderLeft: isActive ? '2px solid #CC0000' : '2px solid transparent' }}>
                <item.icon size={14} color={isActive ? '#CC0000' : '#5C6070'} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '10px 14px', borderTop: '1px solid #1C1E23' }}>
          <Link href='/' style={{ display: 'block', color: '#7A7D85', fontSize: '12px', textDecoration: 'none', marginBottom: '8px' }}>← View Site</Link>
          <button onClick={() => { localStorage.removeItem('btv_admin_auth'); localStorage.removeItem('btv_admin_role'); localStorage.removeItem('btv_admin_name'); window.location.href = '/admin/login'; }} style={{ display: 'block', color: '#CC0000', fontSize: '12px', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            Sign Out
          </button>
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
            {role === 'SUPER_ADMIN' && <PublishButton />}
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
