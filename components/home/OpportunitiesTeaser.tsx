import Link from 'next/link';
import { Briefcase, TrendingUp, FileText, Users, MapPin, ExternalLink } from 'lucide-react';

const TYPE_LABELS: Record<string, string> = {
  JOB: 'Job', BUSINESS_LEAD: 'Business Lead', TENDER: 'Tender', FRANCHISE: 'Franchise', PARTNERSHIP: 'Partnership',
};

const TYPE_COLORS: Record<string, string> = {
  JOB: '#3B82F6', BUSINESS_LEAD: '#22C55E', TENDER: '#F59E0B', FRANCHISE: '#8B5CF6', PARTNERSHIP: '#EC4899',
};

const TYPE_ICONS: Record<string, any> = {
  JOB: Briefcase, BUSINESS_LEAD: TrendingUp, TENDER: FileText, FRANCHISE: Users, PARTNERSHIP: Users,
};

export default function OpportunitiesTeaser({ opportunities }: { opportunities: any[] }) {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <section style={{ padding: '60px 16px', background: '#0D0F12', borderTop: '1px solid #1C1E23', borderBottom: '1px solid #1C1E23' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ color: '#D4A832', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 6px' }}>BTV Opportunity Feed</p>
            <h2 style={{ color: '#EDEEF0', fontSize: 'clamp(22px, 4vw, 32px)', fontFamily: 'Georgia, serif', margin: 0 }}>Latest Opportunities</h2>
          </div>
          <Link href='/opportunities' style={{ color: '#D4A832', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
            View All →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {opportunities.slice(0, 6).map((opp) => {
            const Icon = TYPE_ICONS[opp.type] || Briefcase;
            return (
              <div key={opp.id} style={{ padding: '16px', borderRadius: '12px', background: '#141619', border: '1px solid #252830', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: TYPE_COLORS[opp.type] + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={TYPE_COLORS[opp.type]} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: TYPE_COLORS[opp.type], textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {TYPE_LABELS[opp.type]}
                    </span>
                    <h3 style={{ color: '#EDEEF0', fontSize: '14px', fontWeight: '600', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'Georgia, serif' }}>
                      {opp.title}
                    </h3>
                  </div>
                </div>

                {opp.company && <p style={{ color: '#9A9DA5', fontSize: '12px', margin: 0 }}>{opp.company}</p>}

                <p style={{ color: '#7A7D85', fontSize: '12px', lineHeight: 1.5, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as any, overflow: 'hidden' }}>
                  {opp.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#5C6070', fontSize: '11px' }}>
                    {(opp.city || opp.state) && <><MapPin size={10} />{[opp.city, opp.state].filter(Boolean).join(', ')}</>}
                  </div>
                  {opp.salary && (
                    <span style={{ color: '#22C55E', fontSize: '12px', fontWeight: '600' }}>{opp.salary}</span>
                  )}
                </div>

                <Link href='/opportunities' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'rgba(212,168,50,0.1)', border: '1px solid rgba(212,168,50,0.3)', borderRadius: '8px', padding: '8px', color: '#D4A832', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>
                  <ExternalLink size={12} /> View Details
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
