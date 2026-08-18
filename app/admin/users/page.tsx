'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ROLE_COLORS: Record<string,string> = { 
    SUPER_ADMIN: '#D4A832', STATE_MANAGER: '#3B82F6', DISTRICT_HEAD: '#F59E0B',
    CITY_REPORTER: '#22C55E', CONSTITUENCY_REPORTER: '#10B981', EXECUTIVE: '#8B5CF6',
    MANAGER: '#3B82F6', REPORTER: '#22C55E'
  };
const ROLE_LABELS: Record<string,string> = { 
    SUPER_ADMIN: 'Super Admin', STATE_MANAGER: 'State Manager', DISTRICT_HEAD: 'District Head',
    CITY_REPORTER: 'City Reporter', CONSTITUENCY_REPORTER: 'Constituency Reporter', EXECUTIVE: 'Executive',
    MANAGER: 'Manager', REPORTER: 'Reporter'
  };

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRole, setCurrentRole] = useState('SUPER_ADMIN');

  useEffect(() => {
    setCurrentRole(localStorage.getItem('btv_admin_role') || 'SUPER_ADMIN');
    fetch('/api/admin/users').then(r => r.json()).then(d => {
      setUsers(d.users || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm('Delete user "' + name + '"?')) return;
    await fetch('/api/admin/users/' + id, { method: 'DELETE' });
    setUsers(prev => prev.filter(u => u.id !== id));
  }

  async function toggleActive(id: string, current: boolean) {
    await fetch('/api/admin/users/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !current }),
    });
    setUsers(prev => prev.map(u => u.id === id ? { ...u, active: !current } : u));
  }

  // Manager can only see reporters and executives
  const visibleRoles = currentRole === 'SUPER_ADMIN'
    ? ['STATE_MANAGER', 'DISTRICT_HEAD', 'CITY_REPORTER', 'CONSTITUENCY_REPORTER', 'EXECUTIVE', 'MANAGER', 'REPORTER']
    : currentRole === 'STATE_MANAGER'
    ? ['DISTRICT_HEAD', 'CITY_REPORTER', 'CONSTITUENCY_REPORTER', 'EXECUTIVE']
    : ['CITY_REPORTER', 'CONSTITUENCY_REPORTER'];

  const filteredUsers = users.filter(u => visibleRoles.includes(u.role));

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Access Control</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Users</h1>
        </div>
        <Link href='/admin/users/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + Add User
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px' }}>
        {visibleRoles.map(role => (
          <div key={role} style={{ padding: '16px', borderRadius: '10px', background: '#141619', border: '1px solid #252830', textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: '800', color: ROLE_COLORS[role], margin: '0 0 4px' }}>
              {users.filter(u => u.role === role).length}
            </p>
            <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{ROLE_LABELS[role]}s</p>
          </div>
        ))}
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{filteredUsers.length} users</p>
        </div>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No users yet.</p>
            <Link href='/admin/users/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add first user</Link>
          </div>
        ) : (
          <div>
            {filteredUsers.map((user, i) => (
              <div key={user.id} style={{ padding: '16px 24px', borderBottom: i < filteredUsers.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: ROLE_COLORS[user.role] + '20', border: '1px solid ' + ROLE_COLORS[user.role] + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', color: ROLE_COLORS[user.role], fontWeight: '700', fontSize: '14px', flexShrink: 0 }}>
                  {user.name?.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: 0 }}>{user.name}</p>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: ROLE_COLORS[user.role], fontFamily: 'monospace' }}>{ROLE_LABELS[user.role]}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <p style={{ color: '#7A7D85', fontSize: '12px', margin: 0 }}>{user.email}</p>
                    {(user.state || user.district || user.city) && (
                      <p style={{ color: '#5C6070', fontSize: '11px', margin: 0, fontFamily: 'monospace' }}>
                        📍 {[user.city?.name, user.district?.name, user.state?.name].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleActive(user.id, user.active)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: user.active ? '#22c55e' : '#EF4444' }}>
                    {user.active ? 'Active' : 'Inactive'}
                  </button>
                  <Link href={'/admin/users/' + user.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <button onClick={() => handleDelete(user.id, user.name)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
