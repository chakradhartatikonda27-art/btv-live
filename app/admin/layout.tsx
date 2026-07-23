import Link from 'next/link';
import { LayoutDashboard, Video, FileText, Calendar } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/interviews', label: 'Interviews', icon: Video },
  { href: '/admin/submissions', label: 'Submissions', icon: FileText },
  { href: '/admin/events', label: 'Events', icon: Calendar },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#08090B' }}>
      <aside style={{ width: '240px', flexShrink: 0, borderRight: '1px solid #1C1E23', background: '#0D0F12', display: 'flex', flexDirection: 'column' }}>
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
