import { prisma } from '@/lib/prisma';
import Link from 'next/link';

const ROLE_LABELS = {
  SUPER_ADMIN: 'Super Admin',
  STATE_HEAD: 'State Head',
  DISTRICT_HEAD: 'District Head',
  CITY_REPORTER: 'City Reporter',
  CAMERA_PERSON: 'Camera Person',
  VIEWER: 'Viewer',
};

const ROLE_COLORS = {
  SUPER_ADMIN: '#D4A832',
  STATE_HEAD: '#60a5fa',
  DISTRICT_HEAD: '#34d399',
  CITY_REPORTER: '#a78bfa',
  CAMERA_PERSON: '#fb923c',
  VIEWER: '#9A9DA5',
};

export default async function TeamPage() {
  const members = await prisma.teamMember.findMany({
    include: { state: true, district: true, city: true },
    orderBy: { createdAt: 'desc' },
  });

  const stats = {
    total: members.length,
    active: members.filter((m) => m.isActive).length,
    reporters: members.filter((m) => m.role === 'CITY_REPORTER').length,
    stateHeads: members.filter((m) => m.role === 'STATE_HEAD').length,
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>Admin</p>
          <h1 style={{ color: '#EDEEF0', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Team Management</h1>
        </div>
        <Link href='/admin/team/add' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D4A832', color: '#08090B', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
          + Add Member
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Members', value: stats.total, color: '#D4A832' },
          { label: 'Active', value: stats.active, color: '#34d399' },
          { label: 'Reporters', value: stats.reporters, color: '#a78bfa' },
          { label: 'State Heads', value: stats.stateHeads, color: '#60a5fa' },
        ].map((stat) => (
          <div key={stat.label} style={{ padding: '20px', borderRadius: '12px', background: '#141619', border: '1px solid #252830', textAlign: 'center' }}>
            <p style={{ fontSize: '32px', fontWeight: 'bold', fontFamily: 'Georgia, serif', color: stat.color, margin: '0 0 4px' }}>{stat.value}</p>
            <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#141619', border: '1px solid #252830' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #252830', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ color: '#9A9DA5', fontSize: '14px', margin: 0 }}>{members.length} team members</p>
        </div>

        {members.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9A9DA5', fontSize: '14px', marginBottom: '16px' }}>No team members yet.</p>
            <Link href='/admin/team/add' style={{ color: '#D4A832', fontSize: '14px' }}>Add your first team member</Link>
          </div>
        ) : (
          <div>
            {members.map((member, i) => (
              <div key={member.id} style={{ padding: '16px 24px', borderBottom: i < members.length - 1 ? '1px solid #252830' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                    {member.fullName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <p style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '500', margin: 0 }}>{member.fullName}</p>
                      <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', fontWeight: '600', background: ROLE_COLORS[member.role] + '20', color: ROLE_COLORS[member.role], border: '1px solid ' + ROLE_COLORS[member.role] + '40' }}>
                        {ROLE_LABELS[member.role]}
                      </span>
                      {!member.isActive && (
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' }}>
                          Inactive
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#7A7D85' }}>
                      <span>{member.email}</span>
                      {member.state && <><span>·</span><span>{member.state.name}</span></>}
                      {member.district && <><span>·</span><span>{member.district.name}</span></>}
                      {member.city && <><span>·</span><span>{member.city.name}</span></>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Link href={'/admin/team/' + member.id} style={{ color: '#D4A832', fontSize: '12px', textDecoration: 'none' }}>
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
