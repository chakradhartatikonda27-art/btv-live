import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function EventPage({ params }) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug },
    include: { gallery: { orderBy: { sortOrder: 'asc' } } },
  });

  if (!event) notFound();

  const TYPE_LABELS = {
    CONFERENCE: 'Conference',
    AWARD_CEREMONY: 'Award Ceremony',
    LIVE_STREAM: 'Live Stream',
    SUMMIT: 'Summit',
    WORKSHOP: 'Workshop',
  };

  const isLive = event.status === 'LIVE';

  return (
    <main className='min-h-screen pt-20 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-6xl mx-auto px-4 md:px-8'>

        <div className='flex items-center gap-2 text-sm text-platinum-500 mb-8 pt-6'>
          <a href='/' className='hover:text-gold-400 transition-colors'>Home</a>
          <span>/</span>
          <a href='/events' className='hover:text-gold-400 transition-colors'>Events</a>
          <span>/</span>
          <span className='text-platinum-300 truncate'>{event.title}</span>
        </div>

        <div className='relative rounded-xl overflow-hidden mb-10 h-64 md:h-80 flex items-center justify-center' style={{ background: 'linear-gradient(135deg, #0D0F12, #1C1E23)' }}>
          {event.coverImageUrl ? (
            <img src={event.coverImageUrl} alt={event.title} className='w-full h-full object-cover' />
          ) : (
            <div className='text-center'>
              <p className='text-6xl md:text-8xl text-gold-700 mb-2' style={{ fontFamily: 'var(--font-display)' }}>
                {TYPE_LABELS[event.type] || event.type}
              </p>
            </div>
          )}

          <div className='absolute inset-0' style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(8,9,11,0.9) 100%)' }} />

          <div className='absolute bottom-6 left-6 flex gap-2'>
            {isLive && (
              <span className='flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold' style={{ background: '#BC1F38', color: 'white' }}>
                <span className='live-dot' style={{ width: '6px', height: '6px' }} />
                LIVE NOW
              </span>
            )}
            <span className='px-3 py-1.5 rounded-full text-xs font-semibold' style={{ background: 'rgba(212,168,50,0.9)', color: '#08090B' }}>
              {TYPE_LABELS[event.type] || event.type}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <div className='lg:col-span-2'>
            <h1 className='text-3xl md:text-5xl text-white mb-6' style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {event.title}
            </h1>

            {event.description && (
              <p className='text-platinum-300 leading-relaxed mb-8'>{event.description}</p>
            )}

            {isLive && event.liveStreamUrl && (
              <div className='mb-10'>
                <h2 className='text-xl text-gold-400 mb-4' style={{ fontFamily: 'var(--font-display)' }}>
                  Live Stream
                </h2>
                <div className='rounded-xl overflow-hidden' style={{ aspectRatio: '16/9', background: '#141619', border: '1px solid rgba(212,168,50,0.3)' }}>
                  <iframe
                    src={event.liveStreamUrl}
                    className='w-full h-full'
                    allow='autoplay; encrypted-media'
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {event.gallery.length > 0 && (
              <div>
                <h2 className='text-xl text-gold-400 mb-4' style={{ fontFamily: 'var(--font-display)' }}>
                  Gallery
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
                  {event.gallery.map((media) => (
                    <div key={media.id} className='rounded-xl overflow-hidden aspect-square' style={{ background: '#141619' }}>
                      {media.mediaType === 'image' ? (
                        <img src={media.mediaUrl} alt={media.caption || ''} className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' />
                      ) : (
                        <video src={media.mediaUrl} className='w-full h-full object-cover' controls />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className='lg:col-span-1'>
            <div className='rounded-xl p-6 sticky top-24' style={{ background: '#141619', border: '1px solid #252830' }}>
              <h3 className='text-lg text-platinum-50 mb-5' style={{ fontFamily: 'var(--font-display)' }}>
                Event Details
              </h3>

              <div className='space-y-4'>
                <div>
                  <p className='text-gold-600 text-xs font-mono uppercase tracking-wide mb-1'>Date</p>
                  <p className='text-platinum-200 text-sm'>
                    {new Date(event.scheduledAt).toLocaleDateString('en-IN', {
                      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <p className='text-gold-600 text-xs font-mono uppercase tracking-wide mb-1'>Time</p>
                  <p className='text-platinum-200 text-sm'>
                    {new Date(event.scheduledAt).toLocaleTimeString('en-IN', {
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>

                {event.venue && (
                  <div>
                    <p className='text-gold-600 text-xs font-mono uppercase tracking-wide mb-1'>Venue</p>
                    <p className='text-platinum-200 text-sm'>{event.venue}</p>
                  </div>
                )}

                {event.city && (
                  <div>
                    <p className='text-gold-600 text-xs font-mono uppercase tracking-wide mb-1'>City</p>
                    <p className='text-platinum-200 text-sm'>{event.city}</p>
                  </div>
                )}

                <div>
                  <p className='text-gold-600 text-xs font-mono uppercase tracking-wide mb-1'>Status</p>
                  <p className='text-sm font-medium' style={{ color: isLive ? '#F05070' : event.status === 'UPCOMING' ? '#D4A832' : '#7A7D85' }}>
                    {isLive ? 'Happening Now' : event.status === 'UPCOMING' ? 'Upcoming' : 'Completed'}
                  </p>
                </div>
              </div>

              <div className='mt-6 pt-6' style={{ borderTop: '1px solid #252830' }}>
                <a href='/apply' className='inline-flex items-center justify-center w-full font-semibold px-5 py-3 rounded-full text-sm' style={{ background: '#D4A832', color: '#08090B' }}>
                  Nominate for Next Event
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
