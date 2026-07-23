'use client';

import { useState, useEffect } from 'react';

const HERO_SLIDES = [
  {
    id: 1,
    youtubeVideoId: 'dQw4w9WgXcQ',
    title: 'From Zero to 500 Crore Empire',
    guest: 'Rajiv Nair',
    designation: 'Founder & Chairman, NairTech Industries',
    category: 'Business Leaders',
    watchTime: '38 min',
    bg: 'linear-gradient(135deg, #0D0F12 0%, #111A30 50%, #0D0F12 100%)',
  },
  {
    id: 2,
    youtubeVideoId: 'dQw4w9WgXcQ',
    title: 'Healing Thousands, Building a Healthcare Legacy',
    guest: 'Dr. Priya Venkatesh',
    designation: 'Director, Venkatesh Multispecialty Hospitals',
    category: 'Doctors & Healthcare',
    watchTime: '44 min',
    bg: 'linear-gradient(135deg, #08090B 0%, #0C1222 50%, #08090B 100%)',
  },
  {
    id: 3,
    youtubeVideoId: 'dQw4w9WgXcQ',
    title: 'The CA Who Built a 200 Crore Consulting Firm',
    guest: 'Vikram Mehta',
    designation: 'Managing Partner, Mehta and Associates',
    category: 'CAs and Legal',
    watchTime: '52 min',
    bg: 'linear-gradient(135deg, #0D0F12 0%, #1C1E23 50%, #0D0F12 100%)',
  },
];

export default function HeroBanner({ interview }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (videoOpen) return;
    const t = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(t);
  }, [videoOpen]);

  const current = HERO_SLIDES[activeSlide];

  return (
    <section style={{ position: 'relative', minHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', zIndex: 1 }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: current.bg, transition: 'background 1s ease' }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'linear-gradient(rgba(212,168,50,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,50,0.3) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Gold top line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(135deg, #D4A832, #F5D98A, #B8891A)', zIndex: 10 }} />

      {/* Ambient glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 60%, rgba(212,168,50,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '80px 20px 40px', maxWidth: '800px' }}>
        {/* Category badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px', padding: '4px 12px', borderRadius: '999px', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)' }}>
          <span style={{ color: '#D4A832', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
            {current.category}
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 8vw, 72px)', color: 'white', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
          {current.title}
        </h1>

        {/* Guest */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4A832', fontWeight: 'bold', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
            {current.guest.charAt(0)}
          </div>
          <div>
            <p style={{ color: '#EDEEF0', fontWeight: '600', margin: 0, fontSize: '14px' }}>{current.guest}</p>
            <p style={{ color: '#9A9DA5', margin: 0, fontSize: '12px' }}>{current.designation}</p>
          </div>
          <span style={{ color: '#9A9DA5', fontSize: '12px', fontFamily: 'monospace' }}>{current.watchTime}</span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setVideoOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#D4A832', color: '#08090B', border: 'none', borderRadius: '999px', padding: '12px 24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
          >
            Watch Now
          </button>
          <a href='/shows' style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#EDEEF0', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', padding: '12px 24px', fontWeight: '500', fontSize: '14px', textDecoration: 'none', background: 'rgba(255,255,255,0.05)' }}>
            All Interviews
          </a>
        </div>

        {/* Slide indicators */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '32px' }}>
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              style={{ height: '3px', borderRadius: '999px', border: 'none', cursor: 'pointer', transition: 'all 0.5s', width: i === activeSlide ? '40px' : '20px', background: i === activeSlide ? '#D4A832' : 'rgba(154,157,165,0.3)' }}
            />
          ))}
        </div>
      </div>

      {/* Tagline */}
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', zIndex: 10, display: 'none' }}>
        <p style={{ color: 'rgba(154,157,165,0.4)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '12px' }}>
          Where Success Goes Live... Legacy Lives Forever.
        </p>
      </div>

      {/* Video Modal */}
      {videoOpen && (
        <div
          onClick={() => setVideoOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(8,9,11,0.95)' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '900px', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(212,168,50,0.2)' }}
          >
            <iframe
              src={'https://www.youtube.com/embed/' + current.youtubeVideoId + '?autoplay=1&rel=0'}
              style={{ width: '100%', height: '100%' }}
              allow='autoplay; encrypted-media'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
