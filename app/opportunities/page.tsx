'use client';

import { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, FileText, Users, MapPin, Clock, ExternalLink, Mail } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  JOB: 'Job', BUSINESS_LEAD: 'Business Lead', TENDER: 'Tender', FRANCHISE: 'Franchise', PARTNERSHIP: 'Partnership',
};

const TYPE_COLORS: Record<string, string> = {
  JOB: '#3B82F6', BUSINESS_LEAD: '#22C55E', TENDER: '#F59E0B', FRANCHISE: '#8B5CF6', PARTNERSHIP: '#EC4899',
};

const TYPE_ICONS: Record<string, any> = {
  JOB: Briefcase, BUSINESS_LEAD: TrendingUp, TENDER: FileText, FRANCHISE: Users, PARTNERSHIP: Users,
};

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/opportunities' + (type ? '?type=' + type : ''))
      .then((r) => r.json())
      .then((d) => { setOpportunities(d.opportunities || []); setLoading(false); });
  }, [type]);

  const types = ['', 'JOB', 'BUSINESS_LEAD', 'TENDER', 'FRANCHISE', 'PARTNERSHIP'];

  return (
    <main style={{ minHeight: '100vh', background: '#08090B', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 8px' }}>BTV LIVE</p>
          <h1 style={{ color: '#EDEEF0', fontSize: 'clamp(28px, 5vw, 48px)', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>Opportunity Feed</h1>
          <p style={{ color: '#7A7D85', fontSize: '14px', margin: 0 }}>Jobs, business leads, tenders and partnerships across AP and Telangana</p>
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {types.map((t) => (
            <button key={t} onClick={() => setType(t)} style={{ padding: '8px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: type === t ? (t ? TYPE_COLORS[t] : '#D4A832') : '#141619', color: type === t ? (t === 'TENDER' || t === '' ? '#08090B' : 'white') : '#9A9DA5', border: type === t ? 'none' : '1px solid #252830' }}>
              {t ? TYPE_LABELS[t] : 'All'}
            </button>
          ))}
        </div>

        {/* Opportunities list */}
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ padding: '20px', borderRadius: '12px', background: '#141619', border: '1px solid #252830', height: '100px' }} />
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', borderRadius: '12px', background: '#141619', border: '1px solid #252830' }}>
            <p style={{ color: '#7A7D85', fontSize: '16px', margin: 0 }}>No opportunities listed yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {opportunities.map((opp) => {
              const Icon = TYPE_ICONS[opp.type] || Briefcase;
              return (
                <div key={opp.id} style={{ padding: '20px', borderRadius: '12px', background: '#141619', border: '1px solid #252830', transition: 'border-color 0.2s' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    {/* Icon */}
                    <div style={{ flexShrink: 0, width: '44px', height: '44px', borderRadius: '10px', background: TYPE_COLORS[opp.type] + '20', border: '1px solid ' + TYPE_COLORS[opp.type] + '40', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={20} color={TYPE_COLORS[opp.type]} />
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '10px', fontWeight: '700', color: TYPE_COLORS[opp.type], textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                              {TYPE_LABELS[opp.type]}
                            </span>
                            {opp.featured && (
                              <span style={{ fontSize: '10px', fontWeight: '600', color: '#D4A832', background: 'rgba(212,168,50,0.1)', padding: '1px 6px', borderRadius: '4px' }}>Featured</span>
                            )}
                          </div>
                          <h3 style={{ color: '#EDEEF0', fontSize: '16px', fontWeight: '600', margin: 0, fontFamily: 'Georgia, serif' }}>{opp.title}</h3>
                          {opp.company && <p style={{ color: '#9A9DA5', fontSize: '13px', margin: '2px 0 0' }}>{opp.company}</p>}
                        </div>

                        {opp.salary && (
                          <div style={{ flexShrink: 0, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
                            <p style={{ color: '#22C55E', fontSize: '13px', fontWeight: '600', margin: 0 }}>{opp.salary}</p>
                          </div>
                        )}
                      </div>

                      <p style={{ color: '#7A7D85', fontSize: '13px', lineHeight: 1.5, margin: '8px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                        {opp.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
                        {(opp.city || opp.state) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5C6070', fontSize: '12px' }}>
                            <MapPin size={12} />
                            {[opp.city, opp.state].filter(Boolean).join(', ')}
                          </div>
                        )}
                        {opp.deadline && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5C6070', fontSize: '12px' }}>
                            <Clock size={12} />
                            {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </div>
                        )}

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
                          {opp.applyEmail && (
                            <a href={'mailto:' + opp.applyEmail} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#9A9DA5', fontSize: '12px', textDecoration: 'none', padding: '6px 12px', borderRadius: '999px', border: '1px solid #252830' }}>
                              <Mail size={12} /> Email
                            </a>
                          )}
                          {opp.applyUrl && (
                            <a href={opp.applyUrl} target='_blank' rel='noopener noreferrer' style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#08090B', fontSize: '12px', fontWeight: '600', textDecoration: 'none', padding: '6px 14px', borderRadius: '999px', background: '#D4A832' }}>
                              <ExternalLink size={12} /> Apply
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
