'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminAboutTeamPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/about-team').then(r => r.json()).then(d => {
      setMembers(d.members || []);
      setLoading(false);
    });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm('Delete "' + name + '"?')) return;
    await fetch('/api/admin/about-team/' + id, { method: 'DELETE' });
    setMembers(prev => prev.filter(m => m.id !== id));
  }

  async function toggleActive(id: string, current: boolean) {
    await fetch('/api/admin/about-team/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !current }),
    });
    setMembers(prev => prev.map(m => m.id === id ? { ...m, active: !current } : m));
  }

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>About Page</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Team Members</h1>
        </div>
        <Link href='/admin/about-team/new' style={{ background: '#D4A832', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none' }}>
          + Add Member
        </Link>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{members.length} team members</p>
        </div>
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}><p style={{ color: '#9A9DA5', margin: 0 }}>Loading...</p></div>
        ) : members.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', margin: '0 0 16px' }}>No team members yet.</p>
            <Link href='/admin/about-team/new' style={{ color: '#D4A832', fontSize: '14px', textDecoration: 'none' }}>Add first member</Link>
          </div>
        ) : (
          <div>
            {members.map((member, i) => (
              <div key={member.id} style={{ padding: '16px 24px', borderBottom: i < members.length - 1 ? '1px solid #1C1E23' : 'none', display: 'flex', alignItems: 'center', gap: '16px' }}>
                {member.photoUrl ? (
                  <img src={member.photoUrl} alt={member.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                ) : (
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontWeight: '700', fontSize: '16px', flexShrink: 0 }}>
                    {member.name?.charAt(0)}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: '0 0 2px' }}>{member.name}</p>
                  <p style={{ color: '#D4A832', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>{member.role}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => toggleActive(member.id, member.active)} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600', cursor: 'pointer', border: '1px solid currentColor', background: 'transparent', color: member.active ? '#22c55e' : '#EF4444' }}>
                    {member.active ? 'Active' : 'Hidden'}
                  </button>
                  <Link href={'/admin/about-team/' + member.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>Edit</Link>
                  <button onClick={() => handleDelete(member.id, member.name)} style={{ color: '#EF4444', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
