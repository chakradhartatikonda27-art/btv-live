import { prisma } from '@/lib/prisma';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { scheduledAt: 'desc' },
    include: { gallery: { select: { id: true } } },
  });

  const TYPE_LABELS: Record<string, string> = {
    CONFERENCE: 'Conference',
    AWARD_CEREMONY: 'Award Ceremony',
    LIVE_STREAM: 'Live Stream',
    SUMMIT: 'Summit',
    WORKSHOP: 'Workshop',
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <p style={{ color: '#CC0000', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Coverage</p>
        <h1 style={{ color: '#1A1A2E', fontSize: '28px', fontFamily: 'Georgia, serif', margin: 0 }}>Events</h1>
      </div>

      <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #E5E7EB' }}>
          <p style={{ color: '#6B7280', fontSize: '14px', margin: 0 }}>{events.length} total events</p>
        </div>

        {events.length === 0 ? (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ color: '#9CA3AF', fontSize: '14px', margin: 0 }}>No events yet.</p>
          </div>
        ) : (
          <div>
            {events.map((event, i) => (
              <div key={event.id} style={{ padding: '16px 24px', borderBottom: i < events.length - 1 ? '1px solid #F3F4F6' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: '#1A1A2E', fontSize: '14px', fontWeight: '500', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{TYPE_LABELS[event.type] || event.type}</p>
                    {event.city && <><span style={{ color: '#D1D5DB' }}>·</span><p style={{ color: '#6B7280', fontSize: '12px', margin: 0 }}>{event.city}</p></>}
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <p style={{ color: '#9CA3AF', fontSize: '12px', margin: 0, fontFamily: 'monospace' }}>
                      {new Date(event.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <span style={{ color: '#D1D5DB' }}>·</span>
                    <p style={{ color: '#9CA3AF', fontSize: '12px', margin: 0 }}>{event.gallery.length} media</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '16px' }}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '999px', fontWeight: '600',
                    background: event.status === 'LIVE' ? '#FEE2E2' : event.status === 'UPCOMING' ? '#FEF3C7' : '#F3F4F6',
                    color: event.status === 'LIVE' ? '#DC2626' : event.status === 'UPCOMING' ? '#D97706' : '#6B7280',
                  }}>
                    {event.status}
                  </span>
                  <a href={'/events/' + event.slug} target='_blank' style={{ color: '#CC0000', fontSize: '12px', textDecoration: 'none', fontWeight: '500' }}>View</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
