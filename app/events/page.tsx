import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 60;

export const metadata = {
  title: 'Events and Awards',
  description: 'BTV LIVE events, award ceremonies, conferences and live coverage.',
};

const TYPE_LABELS: Record<string, string> = {
  CONFERENCE: 'Conference',
  AWARD_CEREMONY: 'Award Ceremony',
  LIVE_STREAM: 'Live Stream',
  SUMMIT: 'Summit',
  WORKSHOP: 'Workshop',
};

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { scheduledAt: 'desc' },
    include: { gallery: { take: 1 } },
  });

  const liveEvents = events.filter((e) => e.status === 'LIVE');
  const upcomingEvents = events.filter((e) => e.status === 'UPCOMING');
  const pastEvents = events.filter((e) => e.status === 'PAST');

  return (
    <main className='min-h-screen pt-24 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='mb-12'>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-2'>BTV LIVE</p>
          <h1 className='text-4xl md:text-6xl text-platinum-50 mb-4' style={{ fontFamily: 'var(--font-display)' }}>
            Events and Awards
          </h1>
          <p className='text-platinum-400 text-base'>
            Conferences, award ceremonies, and live coverage across India.
          </p>
        </div>

        {liveEvents.length > 0 && (
          <div className='mb-14'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='live-dot' />
              <h2 className='text-2xl text-white' style={{ fontFamily: 'var(--font-display)' }}>Happening Now</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {liveEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <div className='mb-14'>
            <h2 className='text-2xl text-white mb-6' style={{ fontFamily: 'var(--font-display)' }}>Upcoming Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}

        {pastEvents.length > 0 && (
          <div className='mb-14'>
            <h2 className='text-2xl text-platinum-400 mb-6' style={{ fontFamily: 'var(--font-display)' }}>Past Events</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {pastEvents.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </div>
        )}

        {events.length === 0 && (
          <div className='text-center py-24'>
            <p className='text-platinum-400 text-lg'>No events scheduled yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}

function EventCard({ event }: { event: any }) {
  const isLive = event.status === 'LIVE';
  const isUpcoming = event.status === 'UPCOMING';

  return (
    <Link href={'/events/' + event.slug} className='group block rounded-xl overflow-hidden transition-all duration-300' style={{ background: '#141619', border: '1px solid #252830' }}>
      <div className='relative h-48 flex items-center justify-center' style={{ background: 'linear-gradient(135deg, #0D0F12, #1C1E23)' }}>
        {event.coverImageUrl ? (
          <img src={event.coverImageUrl} alt={event.title} className='w-full h-full object-cover' />
        ) : (
          <p className='text-gold-700 text-3xl' style={{ fontFamily: 'var(--font-display)' }}>
            {TYPE_LABELS[event.type] || event.type}
          </p>
        )}
        <div className='absolute top-3 left-3 flex gap-2'>
          {isLive && (
            <span className='flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold' style={{ background: '#BC1F38', color: 'white' }}>
              LIVE
            </span>
          )}
          <span className='px-2.5 py-1 rounded-full text-xs font-semibold' style={{ background: 'rgba(212,168,50,0.9)', color: '#08090B' }}>
            {TYPE_LABELS[event.type] || event.type}
          </span>
        </div>
      </div>

      <div className='p-5'>
        <h3 className='text-lg text-platinum-50 mb-2 group-hover:text-white transition-colors' style={{ fontFamily: 'var(--font-display)' }}>
          {event.title}
        </h3>
        <div className='flex items-center gap-3 text-xs text-platinum-400 font-mono'>
          <span>
            {new Date(event.scheduledAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          {event.city && <><span>·</span><span>{event.city}</span></>}
        </div>
        {event.venue && <p className='text-platinum-500 text-xs mt-1'>{event.venue}</p>}
        <div className='mt-4 flex items-center justify-between'>
          <span className='text-xs font-medium' style={{ color: isLive ? '#F05070' : isUpcoming ? '#D4A832' : '#7A7D85' }}>
            {isLive ? 'Happening Now' : isUpcoming ? 'Upcoming' : 'Completed'}
          </span>
          <span className='text-gold-400 text-xs group-hover:text-gold-300 transition-colors'>View Details</span>
        </div>
      </div>
    </Link>
  );
}
