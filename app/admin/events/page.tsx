import { prisma } from '@/lib/prisma';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { scheduledAt: 'desc' },
    include: { gallery: { select: { id: true } } },
  });

  const TYPE_LABELS = {
    CONFERENCE: 'Conference',
    AWARD_CEREMONY: 'Award Ceremony',
    LIVE_STREAM: 'Live Stream',
    SUMMIT: 'Summit',
    WORKSHOP: 'Workshop',
  };

  return (
    <div className='p-8'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-1'>Admin</p>
          <h1 className='text-3xl text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
            Events
          </h1>
        </div>
      </div>

      <div className='rounded-xl overflow-hidden' style={{ background: '#141619', border: '1px solid #252830' }}>
        <div className='px-6 py-4 border-b' style={{ borderColor: '#252830' }}>
          <p className='text-platinum-400 text-sm'>{events.length} total events</p>
        </div>

        {events.length === 0 ? (
          <div className='px-6 py-16 text-center'>
            <p className='text-platinum-400 text-sm'>No events yet.</p>
          </div>
        ) : (
          <div className='divide-y' style={{ borderColor: '#252830' }}>
            {events.map((event) => (
              <div key={event.id} className='px-6 py-4 flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className='text-platinum-100 text-sm font-medium truncate'>{event.title}</p>
                  <div className='flex items-center gap-3 mt-0.5'>
                    <p className='text-platinum-400 text-xs'>{TYPE_LABELS[event.type] || event.type}</p>
                    {event.city && (
                      <>
                        <span className='text-platinum-600'>·</span>
                        <p className='text-platinum-400 text-xs'>{event.city}</p>
                      </>
                    )}
                    <span className='text-platinum-600'>·</span>
                    <p className='text-platinum-500 text-xs font-mono'>
                      {new Date(event.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                    <span className='text-platinum-600'>·</span>
                    <p className='text-platinum-500 text-xs'>{event.gallery.length} media</p>
                  </div>
                </div>
                <div className='flex items-center gap-3 ml-4'>
                  <span className='text-xs px-2.5 py-1 rounded-full font-medium' style={{
                    background: event.status === 'LIVE' ? 'rgba(224,48,79,0.1)' :
                      event.status === 'UPCOMING' ? 'rgba(212,168,50,0.1)' :
                      'rgba(100,116,139,0.1)',
                    color: event.status === 'LIVE' ? '#E0304F' :
                      event.status === 'UPCOMING' ? '#D4A832' :
                      '#64748b',
                    border: '1px solid currentColor',
                  }}>
                    {event.status}
                  </span>
                  <a href={'/events/' + event.slug} target='_blank' className='text-platinum-400 text-xs hover:text-gold-400 transition-colors'>
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
