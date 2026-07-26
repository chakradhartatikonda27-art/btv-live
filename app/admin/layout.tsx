'use client';
import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Video, FileText, Calendar, Users, Newspaper, Sun, Briefcase, Building2, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/interviews', label: 'Interviews', icon: Video },
  { href: '/admin/articles', label: 'Newsroom', icon: Newspaper },
  { href: '/admin/morning-digest', label: 'Morning Digest', icon: Sun },
  { href: '/admin/submissions', label: 'Submissions', icon: FileText },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/team', label: 'Team', icon: Users },
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
    <button onClick={handlePublish} disabled={publishing} style={{ background: done ? '#22c55e' : '#CC0000', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 16px', cursor: 'pointer', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' }}>
      {publishing ? 'Publishing...' : done ? '✓ Published' : '🚀 Publish Changes'}
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#08090B', flexDirection: 'row' }}>
      <aside style={{ width: '200px', flexShrink: 0, borderRight: '1px solid #1C1E23', background: '#0D0F12', display: 'flex', flexDirection: 'column', minWidth: '160px' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #1C1E23' }}>
          <Link href='/' style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #D4A832, #F5D98A)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#08090B', fontSize: '12px', fontWeight: 'bold' }}>B</span>
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '14px', fontFamily: 'Georgia, serif', margin: 0 }}>BTV LIVE</p>
              <p style={{ color: '#8C6510', fontSize: '9px', fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>Admin</p>
            </div>
          </Link>
        </div>

        <nav style={{ padding: '16px', flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', color: '#9A9DA5', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 24px', borderTop: '1px solid #1C1E23' }}>
          <Link href='/api/admin/logout' style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7A7D85', fontSize: '13px', textDecoration: 'none' }}>
            Sign Out
          </Link>
        </div>
      </aside>

      <main style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
