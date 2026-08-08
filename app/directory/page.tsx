'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Globe, MessageCircle, Mail, CheckCircle, Star } from 'lucide-react';

const CATEGORY_LABELS: Record<string, string> = {
  RESTAURANT: 'Restaurant', HOSPITAL: 'Hospital', CA_FIRM: 'CA Firm',
  TECH_COMPANY: 'Tech Company', RETAIL: 'Retail', REAL_ESTATE: 'Real Estate',
  EDUCATION: 'Education', HOTEL: 'Hotel', MANUFACTURING: 'Manufacturing',
  TRANSPORT: 'Transport', LEGAL: 'Legal', OTHER: 'Other',
};

const CATEGORY_EMOJIS: Record<string, string> = {
  RESTAURANT: '🍽️', HOSPITAL: '🏥', CA_FIRM: '📊',
  TECH_COMPANY: '💻', RETAIL: '🛍️', REAL_ESTATE: '🏢',
  EDUCATION: '🎓', HOTEL: '🏨', MANUFACTURING: '🏭',
  TRANSPORT: '🚛', LEGAL: '⚖️', OTHER: '🏪',
};

export default function DirectoryPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/directory' + (category ? '?category=' + category : ''))
      .then((r) => r.json())
      .then((d) => { setBusinesses(d.businesses || []); setLoading(false); });
  }, [category]);

  const filtered = businesses.filter((b) =>
    !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.city?.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['', ...Object.keys(CATEGORY_LABELS)];

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: 'var(--accent-gold)', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 8px' }}>BTV LIVE</p>
          <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(28px, 5vw, 48px)', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>Business Directory</h1>
          <p style={{ color: 'var(--text-subtle)', fontSize: '14px', margin: 0 }}>Discover trusted businesses across AP and Telangana</p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search businesses or cities...'
            style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const }}
          />
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px', overflowX: 'auto' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ flexShrink: 0, padding: '7px 14px', borderRadius: '999px', border: category === cat ? 'none' : '1px solid #252830', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: category === cat ? '#D4A832' : '#141619', color: category === cat ? '#08090B' : '#9A9DA5', whiteSpace: 'nowrap' }}>
              {cat ? CATEGORY_EMOJIS[cat] + ' ' + CATEGORY_LABELS[cat] : 'All'}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', height: '280px' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-subtle)', fontSize: '16px', margin: '0 0 8px' }}>No businesses found.</p>
            <p style={{ color: 'var(--text-faint)', fontSize: '13px', margin: 0 }}>Be the first to list your business.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filtered.map((biz) => (
              <div key={biz.id} className='btv-card' style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--bg-card)', border: '1px solid ' + (biz.featured ? 'rgba(212,168,50,0.4)' : 'var(--border-color)') }}>
                
                {/* Cover */}
                <div style={{ height: '140px', background: 'var(--bg-card-hover)', position: 'relative', overflow: 'hidden' }}>
                  {biz.coverImage ? (
                    <img src={biz.coverImage} alt={biz.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                      {CATEGORY_EMOJIS[biz.category] || '🏪'}
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,9,11,0.7) 0%, transparent 60%)' }} />
                  
                  {/* Badges */}
                  <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px' }}>
                    <span style={{ background: 'var(--accent-gold)', color: '#08090B', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px' }}>
                      {CATEGORY_LABELS[biz.category]}
                    </span>
                    {biz.verified && (
                      <span style={{ background: 'rgba(34,197,94,0.9)', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 6px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <CheckCircle size={10} /> Verified
                      </span>
                    )}
                  </div>

                  {biz.featured && (
                    <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                      <span style={{ background: 'rgba(212,168,50,0.9)', color: '#08090B', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Star size={10} /> Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '14px' }}>
                  <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '600', margin: '0 0 4px', fontFamily: 'Georgia, serif' }}>{biz.name}</h3>
                  
                  {(biz.city || biz.state) && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-subtle)', fontSize: '12px', marginBottom: '8px' }}>
                      <MapPin size={11} />
                      {[biz.city, biz.state].filter(Boolean).join(', ')}
                    </div>
                  )}

                  {biz.description && (
                    <p style={{ color: 'var(--text-subtle)', fontSize: '13px', lineHeight: 1.5, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                      {biz.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {biz.whatsapp && (
                      <a href={'https://wa.me/' + biz.whatsapp.replace(/[^0-9]/g, '')} target='_blank' style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#22C55E', color: 'white', fontSize: '11px', fontWeight: '600', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none' }}>
                        <MessageCircle size={12} /> WhatsApp
                      </a>
                    )}
                    {biz.phone && (
                      <a href={'tel:' + biz.phone} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: '11px', fontWeight: '600', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none', border: '1px solid var(--border-color)' }}>
                        <Phone size={12} /> Call
                      </a>
                    )}
                    {biz.email && (
                      <a href={'mailto:' + biz.email} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-card-hover)', color: 'var(--text-primary)', fontSize: '11px', fontWeight: '600', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none', border: '1px solid var(--border-color)' }}>
                        <Mail size={12} /> Email
                      </a>
                    )}
                    {biz.website && (
                      <a href={biz.website} target='_blank' style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-card-hover)', color: 'var(--accent-gold)', fontSize: '11px', fontWeight: '600', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(212,168,50,0.3)' }}>
                        <Globe size={12} /> Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List your business CTA */}
        <div style={{ marginTop: '48px', padding: '32px', borderRadius: '12px', background: 'linear-gradient(135deg, #0D0F12, #141619)', border: '1px solid rgba(212,168,50,0.2)', textAlign: 'center' }}>
          <p style={{ fontSize: '24px', margin: '0 0 8px' }}>🏪</p>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>List Your Business</h3>
          <p style={{ color: 'var(--text-subtle)', fontSize: '14px', margin: '0 0 20px' }}>Get discovered by thousands of BTV LIVE viewers across AP and Telangana.</p>
          <a href='/apply' style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--accent-gold)', color: '#08090B', fontWeight: '600', fontSize: '14px', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none' }}>
            Submit Your Business
          </a>
        </div>
      </div>
    </main>
  );
}
