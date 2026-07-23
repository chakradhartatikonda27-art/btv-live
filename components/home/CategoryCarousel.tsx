'use client';

import Link from 'next/link';
import { Briefcase, Heart, Scale, Lightbulb, Star, Trophy, Home, GraduationCap } from 'lucide-react';

const CATEGORY_ICONS = {
  BUSINESS_LEADERS: Briefcase,
  DOCTORS_HEALTHCARE: Heart,
  CAs_LEGAL: Scale,
  INNOVATORS_TECH: Lightbulb,
  CELEBRITIES: Star,
  SPORTS_EVENTS: Trophy,
  REAL_ESTATE: Home,
  EDUCATION: GraduationCap,
};

export default function CategoryCarousel({ categories }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
      className='sm:grid-cols-3 lg:grid-cols-6'>
      {categories.map((cat) => {
        const Icon = CATEGORY_ICONS[cat.slug] || Briefcase;
        return (
          <Link
            key={cat.id}
            href={'/shows?category=' + cat.slug}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 12px', borderRadius: '12px', textDecoration: 'none', background: '#141619', border: '1px solid #252830', textAlign: 'center', transition: 'all 0.3s' }}
          >
            <div style={{ color: '#D4A832' }}>
              <Icon size={24} />
            </div>
            <div>
              <p style={{ color: '#EDEEF0', fontSize: '12px', fontWeight: '500', margin: '0 0 2px', lineHeight: '1.3' }}>{cat.name}</p>
              <p style={{ color: '#9A9DA5', fontSize: '11px', margin: 0, fontFamily: 'monospace' }}>{cat._count.interviews} stories</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
