import Link from 'next/link';

export const metadata = {
  title: 'About BTV LIVE',
  description: 'The story behind BTV LIVE. India trusted business media channel.',
};

const VALUES = [
  { title: 'Authenticity', description: 'Every story we feature is real, verified, and told in the words of the subject.' },
  { title: 'Legacy', description: 'We document journeys that inspire generations, not just headlines that fade.' },
  { title: 'Excellence', description: 'From production quality to editorial standards, we hold ourselves to the highest bar.' },
  { title: 'Impact', description: 'We measure success by how many lives a story changes, not just how many views it gets.' },
];

const STATS = [
  { value: '500+', label: 'Stories Featured' },
  { value: '1M+', label: 'Total Viewers' },
  { value: '50+', label: 'Award Ceremonies' },
  { value: '12+', label: 'Industries Covered' },
];

const TEAM = [
  { name: 'Editorial Team', role: 'Story Research and Curation', initial: 'E' },
  { name: 'Production Team', role: 'Video and Audio Production', initial: 'P' },
  { name: 'Events Team', role: 'Award Ceremonies and Live Coverage', initial: 'V' },
  { name: 'Digital Team', role: 'Platform and Distribution', initial: 'D' },
];

export default function AboutPage() {
  return (
    <main className='min-h-screen pt-24 pb-16' style={{ background: '#08090B' }}>
      <div className='max-w-6xl mx-auto px-4 md:px-8'>

        <div className='max-w-3xl mb-20 pt-6'>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-4'>Our Mission</p>
          <h1 className='text-5xl md:text-7xl text-white mb-8 leading-tight' style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            Inspiring Success.
            <br />
            <span style={{ color: '#D4A832' }}>Creating Legacy.</span>
          </h1>
          <p className='text-platinum-300 text-lg leading-relaxed mb-6'>
            BTV LIVE is India premier Business and Lifestyle Media Platform. We exist to document, celebrate,
            and amplify the journeys of entrepreneurs, leaders, doctors, engineers, innovators,
            and changemakers who are shaping the future of our nation.
          </p>
          <p className='text-platinum-400 leading-relaxed'>
            Founded on the belief that every great achievement deserves a stage, BTV LIVE has
            featured over 500 inspiring stories across 12 industries.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-20'>
          {STATS.map((stat) => (
            <div key={stat.label} className='text-center p-6 rounded-xl' style={{ background: '#141619', border: '1px solid #252830' }}>
              <p className='text-4xl font-bold mb-2' style={{ fontFamily: 'var(--font-display)', color: '#E8C35A' }}>
                {stat.value}
              </p>
              <p className='text-platinum-400 text-sm'>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className='mb-20'>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-4'>What We Stand For</p>
          <h2 className='text-3xl md:text-4xl text-platinum-50 mb-10' style={{ fontFamily: 'var(--font-display)' }}>
            Our Core Values
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {VALUES.map((value, i) => (
              <div key={value.title} className='p-6 rounded-xl' style={{ background: '#141619', border: '1px solid #252830' }}>
                <div className='flex items-center gap-3 mb-3'>
                  <div className='w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold' style={{ background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', color: '#D4A832' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className='text-lg text-platinum-50' style={{ fontFamily: 'var(--font-display)' }}>
                    {value.title}
                  </h3>
                </div>
                <p className='text-platinum-400 text-sm leading-relaxed'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-20'>
          <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-4'>The People Behind the Platform</p>
          <h2 className='text-3xl md:text-4xl text-platinum-50 mb-10' style={{ fontFamily: 'var(--font-display)' }}>
            Our Teams
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {TEAM.map((member) => (
              <div key={member.name} className='p-6 rounded-xl text-center' style={{ background: '#141619', border: '1px solid #252830' }}>
                <div className='w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4' style={{ background: 'rgba(212,168,50,0.1)', border: '2px solid rgba(212,168,50,0.3)', color: '#D4A832', fontFamily: 'var(--font-display)' }}>
                  {member.initial}
                </div>
                <h3 className='text-platinum-50 font-semibold mb-1'>{member.name}</h3>
                <p className='text-platinum-400 text-xs'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-xl p-10 text-center relative overflow-hidden' style={{ background: 'linear-gradient(135deg, #080C18, #0D0F12)', border: '1px solid #252830' }}>
          <div className='absolute inset-0 pointer-events-none' style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,50,0.08) 0%, transparent 60%)' }} />
          <div className='relative'>
            <p className='text-gold-500 font-mono text-xs tracking-[0.2em] uppercase mb-4'>Join the Legacy</p>
            <h2 className='text-3xl md:text-5xl text-white mb-4' style={{ fontFamily: 'var(--font-display)' }}>
              Is Your Story Ready for the World?
            </h2>
            <p className='text-platinum-300 mb-8 max-w-xl mx-auto'>
              We are always looking for the next inspiring leader, innovator, or changemaker.
              Nominate yourself or someone you know.
            </p>
            <Link href='/apply' className='inline-flex items-center gap-2 font-semibold px-8 py-4 rounded-full text-base' style={{ background: '#D4A832', color: '#08090B' }}>
              Nominate a Leader
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
